import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '50px'
  },
  list: {
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    marginTop: theme.spacing(4),
    color: theme.palette.text.secondary
  }
}))

export default function SwitchListSecondary () {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(['wifi'])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <div className={classes.root}>
      <List
        subheader={<ListSubheader disableSticky>Personal Info</ListSubheader>}
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemIcon>
            <Avatar>CH</Avatar>
          </ListItemIcon>
          <ListItemText id='switch-list-label-wifi' primary='Profile Picture' />
          <ListItemSecondaryAction>
            <Button variant='contained' color='primary'>
              Upload
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id='switch-list-label-bluetooth' primary='First Name' />
          <ListItemSecondaryAction>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id='switch-list-label-bluetooth' primary='Last Name' />
          <ListItemSecondaryAction>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText id='switch-list-label-bluetooth' primary='Birthday' />
          <ListItemSecondaryAction>
            <TextField
              variant='outlined'
              id='dateOfBirth'
              label='Date Of Birth'
              type='date'
              InputLabelProps={{
                shrink: true
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader disableSticky>Notification Settings</ListSubheader>
        }
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText
            id='switch-list-label-wifi'
            primary='Push Notifications'
          />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              color='primary'
              onChange={handleToggle('wifi')}
              checked={checked.indexOf('wifi') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader disableSticky>Account Settings</ListSubheader>
        }
        className={classes.list}
      >
        <ListItem className={classes.paper}>
          <ListItemText
            id='switch-list-label-bluetooth'
            primary='Email Address'
          />
          <ListItemSecondaryAction>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText
            id='switch-list-label-bluetooth'
            primary='Change Password'
          />
          <ListItemSecondaryAction>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <ListItemText
            id='switch-list-label-bluetooth'
            primary='Change User Name'
          />
          <ListItemSecondaryAction>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.paper}>
          <Button
            variant='contained'
            color='secondary'
            style={{ width: '100%' }}
          >
            Delete Account
          </Button>
        </ListItem>
      </List>
    </div>
  )
}
