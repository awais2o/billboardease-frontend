import { Tooltip } from 'react-bootstrap'
import React from 'react'
export const renderTooltip = (props, message) => (
  <Tooltip id='button-tooltip' {...props}>
    {message}
  </Tooltip>
)
