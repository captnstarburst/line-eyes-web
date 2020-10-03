import React from 'react'
import AppBar from '../UI/AppBar'
import Dragger from './Draggable'

const Landing = props => {
    return(
      <>
        <AppBar />
        <main style={{display:'flex', justifyContent:'center',  marginTop: '10vh'}}>
          <Dragger />
        </main>
      </>
    )
}

export default Landing