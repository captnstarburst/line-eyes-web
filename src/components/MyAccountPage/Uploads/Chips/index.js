import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import TagFacesIcon from '@material-ui/icons/TagFaces'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}))

export default function ChipsArray () {
  const classes = useStyles()
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Pregnancy Test' },
    { key: 1, label: 'Second try' }
  ])

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key))
  }

  return (
    <Paper component='ul' elevation={0} className={classes.root}>
      {chipData.map(data => {
        return (
          <li key={data.key}>
            <Chip label={data.label} className={classes.chip} />
          </li>
        )
      })}
    </Paper>
  )
}