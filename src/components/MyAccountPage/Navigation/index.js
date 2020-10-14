import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

const CenteredTabs = props => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const location = useLocation()
  useEffect(() => {
    const currentPath = location.pathname

    switch (currentPath) {
      case '/Me/stats':
        setValue(0)
        break
      case '/Me/uploads':
        setValue(1)
        break
      case '/Me/activity':
        setValue(2)
        break
      case '/Me/settings':
        setValue(3)
        break
      default:
        break
    }
  }, [location])

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        props.history.push('/Me/stats')
        break
      case 1:
        props.history.push('/Me/uploads')
        break
      case 2:
        props.history.push('/Me/activity')
        break
      case 3:
        props.history.push('/Me/settings')
        break
      default:
        break
    }
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Stats' />
        <Tab label='Uploads' />
        <Tab label='Activity Feed' />
        <Tab label='Settings' />
      </Tabs>
    </Paper>
  )
}

export default withRouter(CenteredTabs)
