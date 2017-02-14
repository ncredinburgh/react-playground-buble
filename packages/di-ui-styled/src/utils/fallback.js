import React from 'react'

const isIe = /MSIE\s(10|9)/g.test(navigator.userAgent)

const fallback = (Component, Fallback) => ({ ie, ...props }) =>
  ie || isIe ?
    <Fallback {...props} /> :
    <Component {...props} />

export default fallback
