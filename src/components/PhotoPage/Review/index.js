import React from 'react'
import TagDrawer from '../../UI/TagDrawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Chips from './Chips'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import MinimizeIcon from '@material-ui/icons/Minimize'
import WarningIcon from '@material-ui/icons/Warning'
import Fade from '@material-ui/core/Fade'
import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

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
  },
  navigation: {
    width: 500
  }
}))

const Review = props => {
  const classes = useStyles()

  return (
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

        <Fade in={true} {...{ timeout: 1000 }}>
          <Paper elevation={3} variant='outlined'>
            <Card className={classes.root}>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image={props.url}
                title='Contemplative Reptile'
              />

              <CardActions>
                <BottomNavigation
                  value={0}
                  showLabels
                  className={classes.navigation}
                >
                  <BottomNavigationAction
                    label='Negative'
                    icon={
                      <Badge
                        color='secondary'
                        badgeContent={1}
                        invisible={false}
                      >
                        <MinimizeIcon
                          style={{
                            transform: 'rotate(90deg)',
                            marginLeft: '10%'
                          }}
                        />
                      </Badge>
                    }
                  />
                  <BottomNavigationAction
                    label='Invalid'
                    icon={
                      <Badge
                        color='secondary'
                        badgeContent={1}
                        invisible={false}
                      >
                        {' '}
                        <WarningIcon />
                      </Badge>
                    }
                  />
                  <BottomNavigationAction
                    label='Positive'
                    icon={
                      <Badge
                        color='secondary'
                        badgeContent={1}
                        invisible={false}
                      >
                        <DragHandleIcon
                          style={{ transform: 'rotate(90deg)' }}
                        />
                      </Badge>
                    }
                  />
                </BottomNavigation>
              </CardActions>
            </Card>
          </Paper>
        </Fade>

        <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
          <Fab aria-label={'fab.label'} className={classes.fab}>
            <AddIcon color={'primary'} />
          </Fab>
        </Zoom>
      </Typography>
    </Container>
  )
}

export default Review
