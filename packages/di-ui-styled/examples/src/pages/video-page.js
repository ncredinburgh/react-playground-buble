import React from 'react'
import Title from '../components/title'
import { Caret, PageHeader, H2 } from '../../../src'
import styled from 'styled-components'
import Playground from '../components/themed-playground'
import DocPage from '../components/doc-page'

const YouTube = ({id, aspect}) => {

  return (
    <div style={{margin: '0'}}>
    <div
      style={{
        position: 'relative',
      	paddingBottom: `${100/aspect}%`,
      	height: 0,
      	overflow: 'hidden',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
  )
}

const VideoPage = () => (
  <DocPage>
    <Title>Videos</Title>
    <p>Please view these video full screen.</p>
    <H2>Installation</H2>
    <YouTube aspect={16/9} id={'ZHtvGtWPEKw'} />
    <H2>Overview</H2>
    <YouTube aspect={16/9} id={'OJ2lb4qYG8k'} />
  </DocPage>
)

export default VideoPage
