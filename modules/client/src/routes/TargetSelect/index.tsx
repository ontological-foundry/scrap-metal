import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import React, { ChangeEvent, ReactElement } from 'react'

import { setTarget, getTarget, TargetName } from '@scrapmetal/common/api-target'

export default function TargetSelect(): ReactElement {
  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value as TargetName)
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{ marginTop: theme => theme.spacing(8) }}>
        <form>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>API Target</FormLabel>

            <RadioGroup
              // TODO: Potential Optimization
              defaultValue={getTarget()}
              onChange={handleTargetChange}
            >
              <FormControlLabel
                value={TargetName.Edge}
                control={<Radio />}
                label='Edge'
              />

              <FormControlLabel
                value={TargetName.Dev}
                control={<Radio />}
                label='Development'
              />

              <FormControlLabel
                value={TargetName.Staging}
                control={<Radio />}
                label='Staging'
              />

              <FormControlLabel
                value={TargetName.Production}
                control={<Radio />}
                label='Production'
              />
            </RadioGroup>
          </FormControl>
        </form>
      </Box>
    </Container>
  )
}
