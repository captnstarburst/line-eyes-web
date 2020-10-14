import React, { useState } from 'react'
import AppBar from '../UI/AppBar'
import CenteredTabs from './Navigation'
import Stats from './Stats'
import Profile from './Profile'
import Uploads from './Uploads'
import Activity from './Activity'
import Settings from './Settings'
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
        <CenteredTabs selection={changeDisplay} />
        <Typography component='section' style={{ backgroundColor: '#cfe8fc' }}>
          {displaying === 'stats' && <Stats />}
          {displaying === 'uploads' && <Uploads />}
          {displaying === 'activity' && <Activity />}
          {displaying === 'settings' && <Settings />}
        </Typography>
      </Container>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(MyAccountPage)
