import React from 'react'
import ReactPlaygroundBare from 'react-playground-bare'
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
  display: flex;
  flex-direction: column;
  margin: ${fromTheme('gutter')}px;
  border: 1px solid #eee;
  min-width: ${fromTheme('minWidthEditor')}px;
  ${/Trident\/7/.test(navigator.userAgent) ? 'min-height: 200px;' : '' }
  & .ReactCodeMirror {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  & .CodeMirror {
    font-family: ${fromTheme('font')};
    font-weight: 400;
    height: auto;
    flex: 1;
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
  min-width: ${fromTheme('minWidthViewer')}px;
  min-height: ${fromTheme('minHeightViewer')}px;
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
  font,
  loadFont,
  theme,
  loadTheme,
  minWidthViewer,
  minHeightViewer,
  minWidthEditor,
  codeMirrorOptions,
  PlaygroundWrapper,
  EditorWrapper,
  ViewerWrapper,
  ViewerAlign,
  EvalWrapper,
  ErrorWrapper,
  defaultValue,
  scope,
  useRemoteEval,
  remoteEvalUrl,
}) => {
  const Inner = ({
    defaultValue,
    onChange,
    errorMessage,
    onViewerMount,
  }) => {
    const themeVars = {
      top,
      bottom,
      left,
      right,
      fullWidth,
      font,
      gutter,
      padding,
      borderRadius,
      backgroundColor,
      viewerFlex,
      editorFlex,
      minWidthViewer,
      minHeightViewer,
      minWidthEditor,
      errorMessage,
    }
    return (
      <PlaygroundWrapper {...themeVars}>
        <ViewerWrapper {...themeVars}>
          <ViewerAlign
            {...themeVars}
            ref={onViewerMount}
            innerRef={onViewerMount}
          />
          {
            !errorMessage ? null :
              <ErrorWrapper {...themeVars}>
                {errorMessage}
              </ErrorWrapper>
          }
        </ViewerWrapper>
        <EditorWrapper {...themeVars}>
          <PlaygroundEditor
            onChange={onChange}
            defaultValue={defaultValue}
            loadFont={loadFont}
            codeMirrorOptions={codeMirrorOptions}
            theme={theme}
            loadTheme={loadTheme}
          />
        </EditorWrapper>
      </PlaygroundWrapper>
    )
  }

  return (
    <ReactPlaygroundBare
      {...{
        defaultValue,
        scope,
        EvalWrapper,
        useRemoteEval,
        remoteEvalUrl,
      }}
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
  loadFont: `'Source Sans Pro', sans-serif`,
  font: `'Source Sans Pro'`,
  padding: 12,
  gutter: 4,
  backgroundColor: '#fcfcfc',
  viewerFlex: 1,
  editorFlex: 1,
  minWidthEditor: 240,
  minWidthViewer: 240,
  minHeightViewer: 25,
}
