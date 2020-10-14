import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chips from './Chips'
import Typography from '@material-ui/core/Typography'
import PregnancyTest from '../../assets/pregnancy-test.png'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import MinimizeIcon from '@material-ui/icons/Minimize'
import WarningIcon from '@material-ui/icons/Warning'
import Fade from '@material-ui/core/Fade'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles({
  root: {
    maxWidth: 500
  }
})

export default function ImgMediaCard () {
  const classes = useStyles()

  return (
    <section
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}
    >
      <Fade in={true} {...{ timeout: 1000 }}>
        <Card className={classes.root}>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            height='140'
            image={PregnancyTest}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              User Name 10/12/2020
            </Typography>
            <Chips />
          </CardContent>
          <CardActions
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Badge color='secondary' badgeContent={1} invisible={false}>
              <MinimizeIcon style={{ transform: 'rotate(90deg)' }} />
            </Badge>

            <Badge color='secondary' badgeContent={1} invisible={false}>
              <WarningIcon />
            </Badge>

            <Badge color='secondary' badgeContent={1} invisible={false}>
              <DragHandleIcon style={{ transform: 'rotate(90deg)' }} />
            </Badge>
          </CardActions>
        </Card>
      </Fade>
    </section>
  )
}
