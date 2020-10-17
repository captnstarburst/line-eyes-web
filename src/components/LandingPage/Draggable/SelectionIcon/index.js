import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import MinimizeIcon from '@material-ui/icons/Minimize'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import WarningIcon from '@material-ui/icons/Warning'
import Grow from '@material-ui/core/Grow'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

export default function FloatingActionButtons (props) {
  const classes = useStyles()

  const [mountIcon, setIconMount] = useState(false)
  const [value, setValue] = useState()

  useEffect(() => {
    if (props.positionY > 49 && props.positionX > -99 && props.positionX < 99) {
      setValue(1)
      setIconMount(true)
    } else if (props.positionX < -100) {
      setValue(0)
      setIconMount(true)
    } else if (props.positionX > 100) {
      setValue(2)
      setIconMount(true)
    } else {
      setValue()
      setIconMount(false)
    }
  }, [props.positionX, props.positionY])

  console.log(mountIcon)

  return (
    <>
      {mountIcon ? (
        <div className={classes.root}>
          <Grow
            in={mountIcon}
            // style={{ transformOrigin: '0 0 0' }}
            // {...{ timeout: 2000 }}
          >
            <Fab
              aria-label='add'
              style={{ width: '100px', height: '100px', opacity: 0.7 }}
            >
              {value === 0 && (
                <MinimizeIcon
                  style={{ transform: 'rotate(90deg)', marginLeft: '15%' }}
                />
              )}
              {value === 1 && <WarningIcon />}
              {value === 2 && (
                <DragHandleIcon style={{ transform: 'rotate(90deg)' }} />
              )}
            </Fab>
          </Grow>
        </div>
      ) : null}
    </>
  )
}
