import esbuild from 'esbuild'
import * as http from 'http'

// https://gist.github.com/martinrue/2896becdb8a5ed81761e11ff2ea5898e

const serve = async (servedir, listen) => {
  // Start esbuild's local web server. Random port will be chosen by esbuild.
  const { host, port } = await esbuild.serve(
    {
      servedir,
    },
    {
      entryPoints: ['api-target/App.tsx'],
      outdir: 'static',
      bundle: true,
      format: 'esm',
      define: {
        'process.env.TARGET': JSON.stringify('development'),
      },
    }
  )

  // Create a second (proxy) server that will forward requests to esbuild.
  const proxy = http.createServer((req, res) => {
    // forwardRequest forwards an http request through to esbuid.
    const forwardRequest = path => {
      const options = {
        hostname: host,
        port,
        path,
        method: req.method,
        headers: req.headers,
      }

      const proxyReq = http.request(options, proxyRes => {
        if (proxyRes.statusCode === 404) {
          // If esbuild 404s the request, assume it's a route needing to
          // be handled by the JS bundle, so forward a second attempt to `/`.
          return forwardRequest('/')
        }

        // Otherwise esbuild handled it like a champ, so proxy the response back.
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      })

      req.pipe(proxyReq, { end: true })
    }

    // When we're called pass the request right through to esbuild.
    forwardRequest(req.url)
  })

  // Start our proxy server at the specified `listen` port.
  proxy.listen(listen)

  console.log('Ready')
}

// Serves all content from ./static on :1234.
// If esbuild 404s the request, the request is attempted again
// from `/` assuming that it's an SPA route needing to be handled by the root bundle.
serve('static', 1234)
