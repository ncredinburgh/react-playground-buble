import React from 'react'
import ReactPlaygroundBare from '@di/react-playground-bare'
import PlaygroundEditor from './playground-editor'
import styled from 'styled-components'

const fromTheme = key => props => props[key]
const getAlignment = ({ top, bottom, left, right }) => {
  let alignItems = 'center'
  let justifyContent = 'center'
  if (top) alignItems = 'flex-start'
  if (bottom) alignItems = 'flex-end'
  if (left) justifyContent = 'flex-start'
  if (right) justifyContent = 'flex-end'
  return `
    justify-content: ${justifyContent};
    align-items: ${alignItems};`
}

const getFullWidth = ({ fullWidth }) => fullWidth ?
  `display: block;
  width: 100%;` :
  'display: flex;'

export const PlaygroundWrapper = styled.div`
  margin: -${fromTheme('gutter')}px;
  display: flex;
  flex-wrap: wrap-reverse;
  line-height: 1.3;`

export const EditorWrapper = styled.div`
  border-radius: ${fromTheme('borderRadius')}px;
  flex: ${fromTheme('editorFlex')};
  margin: ${fromTheme('gutter')}px;
  border: 1px solid #eee;
  min-width: ${fromTheme('minWidth')}px;
  & .CodeMirror {
    font-family: ${fromTheme('fontFamily')};
    font-weight: 400;
    height: auto;
    padding: ${fromTheme('padding')}px;
    border-radius: ${fromTheme('borderRadius')};
  }`

export const ViewerWrapper = styled.div`
  ${getAlignment}
  display: flex;
  position: relative;
  flex: ${fromTheme('viewerFlex')};
  overflow: auto;
  border-radius: ${fromTheme('borderRadius')}px;
  margin: ${fromTheme('gutter')}px;
  background-color: ${fromTheme('backgroundColor')};
  box-sizing: border-box;
  min-width: ${fromTheme('minWidth')}px;
  ${({ errorMessage }) => errorMessage ? 'min-height: 100px;' : ''}`

export const ViewerAlign = styled.div`
  ${getFullWidth}
  margin: ${fromTheme('padding')}px;`

export const EvalWrapper = styled.div``

export const ErrorWrapper = styled.pre`
  min-width: calc(100% - ${fromTheme('padding')}px);
  background-color: rgba(200,200,200,0.9);
  color: red;
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 5px;
`

export const ReactPlaygroundStyled = ({
  top,
  bottom,
  left,
  right,
  gutter,
  padding,
  borderRadius,
  backgroundColor,
  viewerFlex,
  editorFlex,
  fullWidth,
  minWidth,
  PlaygroundWrapper,
  EditorWrapper,
  ViewerWrapper,
  ViewerAlign,
  EvalWrapper,
  ErrorWrapper,
  defaultValue,
  scope,
}) => {
  const Inner = ({
    defaultValue,
    onChange,
    errorMessage,
    onViewerMount,
  }) => {
    const theme = {
      top,
      bottom,
      left,
      right,
      fullWidth,
      gutter,
      padding,
      borderRadius,
      backgroundColor,
      viewerFlex,
      editorFlex,
      minWidth,
      errorMessage,
    }
    return (
      <PlaygroundWrapper {...theme}>
        <ViewerWrapper {...theme}>
          <ViewerAlign
            {...theme}
            ref={onViewerMount}
            innerRef={onViewerMount}
          />
          {
            !errorMessage ? null :
              <ErrorWrapper {...theme}>
                {errorMessage}
              </ErrorWrapper>
          }
        </ViewerWrapper>
        <EditorWrapper {...theme}>
          <PlaygroundEditor
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </EditorWrapper>
      </PlaygroundWrapper>
    )
  }

  return (
    <ReactPlaygroundBare
      defaultValue={defaultValue}
      scope={scope}
      EvalWrapper={EvalWrapper}
    >
      {Inner}
    </ReactPlaygroundBare>
  )
}

ReactPlaygroundStyled.defaultProps = {
  PlaygroundWrapper,
  EditorWrapper,
  ViewerWrapper,
  ViewerAlign,
  ErrorWrapper,
  defaultValue: '',
  borderRadius: 0,
  fontFamily: 'Source Sans Pro',
  padding: 12,
  gutter: 4,
  backgroundColor: '#fcfcfc',
  viewerFlex: 1,
  editorFlex: 1,
  minWidth: 320,
}
