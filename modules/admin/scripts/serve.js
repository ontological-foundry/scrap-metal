import esbuild from 'esbuild'
import * as http from 'http'

const serve = async (servedir, listen) => {
  // Start esbuild's local web server. Random port will be chosen by esbuild.
  const { host, port } = await esbuild.serve(
    {
      servedir,
    },
    {
      entryPoints: ['src/App.tsx'],
      outdir: 'static',
      bundle: true,
      format: 'esm',
      define: {
        'process.env.TARGET': JSON.stringify('development'),
      },
    }
  )

  // Proxy request to redirect all 404s to root path
  const proxy = http.createServer((req, res) => {
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
          return forwardRequest('/')
        }

        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      })

      req.pipe(proxyReq, { end: true })
    }

    forwardRequest(req.url)
  })

  proxy.listen(listen)

  console.log('Ready')
}

serve('static', 4567)


