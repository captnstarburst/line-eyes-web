import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import MinimizeIcon from '@material-ui/icons/Minimize'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import WarningIcon from '@material-ui/icons/Warning'
import PregnancyTest from '../../../assets/u8f5w0o1e3t51.jpg'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    zIndex: 1
  },
  normalIcon: {
    fontSize: '24px',
    color: '#000'
  },
  activeIcon: {
    fontSize: '45px',
    color: 'primary'
  },
  navigation: {
    width: 500
  }
})

export default function ImgMediaCard (props) {
  const classes = useStyles()

  const [value, setValue] = React.useState()

  useEffect(() => {
    if (props.positionY > 49 && props.positionX > -99 && props.positionX < 99) {
      setValue(1)
    } else if (props.positionX < -100) {
      setValue(0)
    } else if (props.positionX > 100) {
      setValue(2)
    } else {
      setValue()
    }
  }, [props.positionX, props.positionY])

  return (
    <Paper elevation={3} variant='outlined'>
      <Card className={classes.root}>
        <CardMedia
          style={{ width: '500px' }}
          component='img'
          alt='Contemplative Reptile'
          height='200'
          image={PregnancyTest}
          title='Contemplative Reptile'
          draggable='false'
        />
        {/* {props.positionX}
        {props.positionY} */}
        <CardActions>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            showLabels
            className={classes.navigation}
          >
            <BottomNavigationAction
              label='Negative'
              icon={<MinimizeIcon style={{ transform: 'rotate(90deg)' }} />}
            />
            <BottomNavigationAction label='Invalid' icon={<WarningIcon />} />
            <BottomNavigationAction
              label='Positive'
              icon={<DragHandleIcon style={{ transform: 'rotate(90deg)' }} />}
            />
          </BottomNavigation>
          {/* <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
          >
            <MinimizeIcon
              style={{ transform: 'rotate(90deg)' }}
              className={
                props.positionX > -100 ? classes.normalIcon : classes.activeIcon
              }
            />
          </IconButton> */}
          {/* <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
          >
            <WarningIcon
              className={
                props.positionY > 49 &&
                props.positionX > -99 &&
                props.positionX < 99
                  ? classes.activeIcon
                  : classes.normalIcon
              }
            />
          </IconButton>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
          >
            <DragHandleIcon
              style={{ transform: 'rotate(90deg)' }}
              className={
                props.positionX < 100 ? classes.normalIcon : classes.activeIcon
              }
            />
          </IconButton> */}
        </CardActions>
      </Card>
    </Paper>
  )
}
