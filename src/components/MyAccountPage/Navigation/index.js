import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

export default function CenteredTabs (props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        props.selection('stats')
        break
      case 1:
        props.selection('uploads')
        break
      case 2:
        props.selection('activity')
        break
      case 3:
        props.selection('settings')
        break
      default:
        break
    }
    setValue(newValue)
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
