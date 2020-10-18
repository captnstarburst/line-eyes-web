import React, { useState } from 'react'
import AppBar from '../UI/AppBar'
import TagDrawer from '../UI/TagDrawer'
import Dragger from './Draggable'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Chips from './Chips'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { withAuthorization } from '../Session'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Toast from './Toast'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const Landing = props => {
  const classes = useStyles()

  const [selection, setSelection] = useState(null)

  const handleRouteToPhotoPage = () => {
    props.history.push(ROUTES.PHOTO)
  }

  const propagateSelection = selected => setSelection(selected)

  return (
    <>
      <AppBar />
      <CssBaseline />
      <Container fixed>
        <TagDrawer />
        <Typography
          component='main'
          style={{
            backgroundColor: '#cfe8fc',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            overflowX: 'hidden'
          }}
        >
          <Chips />
          <div style={{ position: 'relative' }}>
            <Dragger propagateSelection={propagateSelection} />
          </div>
          <Toast userSelection={selection} />
          <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
            <Fab
              aria-label={'fab.label'}
              className={classes.fab}
              onClick={handleRouteToPhotoPage}
            >
              <AddIcon color={'primary'} />
            </Fab>
          </Zoom>
        </Typography>
      </Container>
    </>
  )
}

const condition = authUser => !!authUser

const ComposedLanding = compose(withRouter, withFirebase)(Landing)

export default withAuthorization(condition)(ComposedLanding)
