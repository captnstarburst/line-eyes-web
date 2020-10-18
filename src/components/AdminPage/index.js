import React, { useState } from 'react'
import AppBar from '../UI/AppBar'
import Footer from '../UI/Footer'
import Profile from './Profile'
import Activity from './Activity'
import { withAuthorization } from '../Session'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const MyAccountPage = props => {
  const [displaying, setDisplaying] = useState('stats')

  const changeDisplay = selection => setDisplaying(selection)

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <Profile />
        <Typography component='section' style={{ backgroundColor: '#cfe8fc' }}>
          <Activity />
        </Typography>
      </Container>
      <Footer />
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(MyAccountPage)
