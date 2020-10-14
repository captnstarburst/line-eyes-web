import React from 'react'
import AppBar from '../UI/AppBar'
import Dragger from './Draggable'
import BackgroundCards from './BackgroundCards'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { withAuthorization } from '../Session'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

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

  const handleRouteToPhotoPage = () => {
    props.history.push(ROUTES.PHOTO)
  }

  return (
    <>
      <AppBar />
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '99vw',
          height: '80vh',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', marginTop: '10vh' }}>
          <Dragger />
        </div>
        <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
          <Fab
            aria-label={'fab.label'}
            className={classes.fab}
            onClick={handleRouteToPhotoPage}
          >
            <AddIcon color={'primary'} />
          </Fab>
        </Zoom>
      </main>
    </>
  )
}

const condition = authUser => !!authUser

const ComposedLanding = compose(withRouter, withFirebase)(Landing)

export default withAuthorization(condition)(ComposedLanding)
