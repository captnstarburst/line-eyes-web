import React from 'react'
import AppBar from '../UI/AppBar'
import Dragger from './Draggable'
import BackgroundCards from './BackgroundCards'

const Landing = props => {
    return(
      <>
        <AppBar />
        <main style={{display:'flex', justifyContent:'center', width: '99vw', height: '80vh', overflow:"hidden"}}>
          <div style={{position:"relative", marginTop: '10vh'}}>
            <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
              <BackgroundCards />
            </div>
            <div style={{width: '100%', height: '100%', zIndex: 1, marginTop: '50px'}}>
              <Dragger />
            </div>
            
          </div>
          
        </main>
      </>
    )
}

export default Landing