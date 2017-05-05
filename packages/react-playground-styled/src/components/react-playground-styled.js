import React from 'react'
import ReactPlaygroundBare from 'react-playground-bare'
import PlaygroundEditor from './playground-editor'
import styled from 'styled-components'
import ThemeChooserProvider from './theme-chooser-provider'

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

const getFullWidth = ({ fullWidth }) =>
  (fullWidth
    ? `display: block;
  width: 100%;`
    : 'display: flex;')

export const PlaygroundWrapper = styled.div`
  margin: ${fromTheme('margin')}px;
  border: ${fromTheme('playgroundBorder')};
  display: flex;
  flex-wrap: wrap-reverse;
  line-height: 1.3;`

export const EditorWrapper = styled.div`
  border-radius: ${fromTheme('borderRadius')}px;
  flex: ${fromTheme('editorFlex')};
  display: flex;
  flex-direction: column;
  margin: ${fromTheme('gutter')}px;
  border: ${fromTheme('editorBorder')};
  min-width: ${fromTheme('minWidthEditor')}px;
  ${/Trident\/7/.test(navigator.userAgent) ? 'min-height: 200px;' : ''}
  & .ReactCodeMirror {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  & .CodeMirror {
    font-family: ${fromTheme('font')};
    font-size: ${fromTheme('editorFontSize')};
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
  border: ${fromTheme('viewerBorder')};
  overflow: auto;
  border-radius: ${fromTheme('borderRadius')}px;
  margin: ${fromTheme('gutter')}px;
  background-color: ${fromTheme('backgroundColor')};
  box-sizing: border-box;
  min-width: ${fromTheme('minWidthViewer')}px;
  min-height: ${fromTheme('minHeightViewer')}px;
  ${({ errorMessage }) => (errorMessage ? 'min-height: 100px;' : '')}`

export const ViewerAlign = styled.div`
  ${getFullWidth}
  margin: ${fromTheme('padding')}px;`

// export const EvalWrapper = styled.div``

export const ErrorWrapper = styled.pre`
  min-width: calc(100% - ${fromTheme('padding')}px);
  background-color: rgba(200,200,200,0.9);
  color: red;
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 5px;
`

const customizeWrapper = (prop, defaultValue) => prop(defaultValue)

export const ReactPlaygroundStyled = ({
  top,
  bottom,
  left,
  right,
  gutter,
  padding,
  borderRadius,
  backgroundColor,
  themeBroadcast,
  viewerFlex,
  editorFlex,
  fullWidth,
  font,
  googleFont,
  editorFontSize,
  theme,
  loadTheme,
  minWidthViewer,
  minHeightViewer,
  minWidthEditor,
  editorBorder,
  viewerBorder,
  playgroundBorder,
  margin,
  codeMirrorOptions,
  playgroundWrapper,
  editorWrapper,
  viewerWrapper,
  viewerAlign,
  EvalWrapper,
  errorWrapper,
  defaultValue,
  scope,
  useRemoteEval,
  remoteEvalUrl,
}) => {
  const x = {
    PlaygroundWrapper: customizeWrapper(playgroundWrapper, PlaygroundWrapper),
    EditorWrapper: customizeWrapper(editorWrapper, EditorWrapper),
    ViewerWrapper: customizeWrapper(viewerWrapper, ViewerWrapper),
    ViewerAlign: customizeWrapper(viewerAlign, ViewerAlign),
    //    EvalWrapper: customizeWrapper(evalWrapper, EvalWrapper),
    ErrorWrapper: customizeWrapper(errorWrapper, ErrorWrapper),
  }

  const EvalThemeWrapper = themeBroadcast
    ? props => {
        return (
          <ThemeChooserProvider themeBroadcast={themeBroadcast}>
            {EvalWrapper ? <EvalWrapper {...props} /> : props.children}
          </ThemeChooserProvider>
        )
      }
    : EvalWrapper

  const Inner = ({ defaultValue, onChange, errorMessage, onViewerMount }) => {
    const themeVars = {
      top,
      bottom,
      left,
      right,
      fullWidth,
      font,
      editorFontSize,
      gutter,
      padding,
      borderRadius,
      backgroundColor,
      viewerFlex,
      editorFlex,
      editorBorder,
      viewerBorder,
      playgroundBorder,
      minWidthViewer,
      minHeightViewer,
      minWidthEditor,
      margin,
      errorMessage,
    }
    return (
      <x.PlaygroundWrapper {...themeVars}>
        <x.ViewerWrapper {...themeVars}>
          <x.ViewerAlign
            {...themeVars}
            ref={onViewerMount}
            innerRef={onViewerMount}
          />
          {!errorMessage
            ? null
            : <x.ErrorWrapper {...themeVars}>
                {errorMessage}
              </x.ErrorWrapper>}
        </x.ViewerWrapper>
        <x.EditorWrapper {...themeVars}>
          <PlaygroundEditor
            onChange={onChange}
            defaultValue={defaultValue}
            googleFont={googleFont}
            codeMirrorOptions={codeMirrorOptions}
            theme={theme}
            loadTheme={loadTheme}
          />
        </x.EditorWrapper>
      </x.PlaygroundWrapper>
    )
  }

  return (
    <ReactPlaygroundBare
      {...{
        defaultValue,
        scope,
        EvalWrapper: EvalThemeWrapper,
        useRemoteEval,
        remoteEvalUrl,
      }}
    >
      {Inner}
    </ReactPlaygroundBare>
  )
}

ReactPlaygroundStyled.defaultProps = {
  playgroundWrapper: x => x,
  editorWrapper: x => x,
  viewerWrapper: x => x,
  viewerAlign: x => x,
  errorWrapper: x => x,
  defaultValue: '',
  borderRadius: 0,
  googleFont: 'Source Sans Pro',
  font: `'Source Sans Pro', 'sans-serif'`,
  padding: 12,
  gutter: 0,
  backgroundColor: '#fcfcfc',
  viewerFlex: 1,
  editorFlex: 1,
  editorBorder: '1px solid #eee',
  editorFontSize: '1em',
  viewerBorder: 'none',
  playgroundBorder: 'none',
  minWidthEditor: 240,
  minWidthViewer: 240,
  minHeightViewer: 25,
  margin: 0,
}
