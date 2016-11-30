import React from 'react'

const CodemirrorStyleSheet = ({
  hash,
  borderRadius = 4,
  fontFamily = 'Source Sans Pro',
  editorPadding = 10,
}) => <style
  type="text/css"
  dangerouslySetInnerHTML={{
    __html:
`.${hash} .CodeMirror {
  font-family: ${fontFamily};
  font-weight: 400;
  height: auto;
  padding: ${editorPadding}px;
  border-radius: ${borderRadius}px;
}`,
  }}
/>

export default CodemirrorStyleSheet
