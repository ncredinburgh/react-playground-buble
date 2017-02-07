import React from 'react'
import styled from 'styled-components'


const withLight = ({ light }) => light ? '#666' : '#333'

export const H1 = styled.h1`
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif, monospace; font-size: 28px;
  line-height: 40px;
  color: #333333;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 28px;
  color: (${withLight});
`

export const H2 = styled.h2`
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif, monospace; font-size: 28px;
  line-height: 34px;
  color: #333333;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
  color: (${withLight});
`

export const H3 = styled.h3`
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif, monospace; font-size: 28px;
  line-height: 18px;
  color: #333333;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  color: (${withLight});
`
