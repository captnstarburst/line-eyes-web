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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <IconButton
          aria-label='settings'
          style={{ position: 'absolute', top: '5px', right: '10px' }}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Report Image</MenuItem>
        </Menu>
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
              icon={
                <MinimizeIcon
                  style={{ transform: 'rotate(90deg)', marginLeft: '10%' }}
                />
              }
              onClick={() => props.programmaticallyMoveCard('negative')}
            />
            <BottomNavigationAction
              label='Invalid'
              icon={<WarningIcon />}
              onClick={() => props.programmaticallyMoveCard('invalid')}
            />
            <BottomNavigationAction
              label='Positive'
              icon={<DragHandleIcon style={{ transform: 'rotate(90deg)' }} />}
              onClick={() => props.programmaticallyMoveCard('positive')}
            />
          </BottomNavigation>
        </CardActions>
      </Card>
    </Paper>
  )
}
