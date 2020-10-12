import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import WarningIcon from '@material-ui/icons/Warning';
import PregnancyTest from '../../../assets/pregnancy-test.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    zIndex: 1,
  },
  normalIcon: {
    fontSize: "24px",
    color: "#000" 
  },
  activeIcon: {
    fontSize: "45px",
    color: "red" 
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();



  return (
    <>
    <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={PregnancyTest}
          title="Contemplative Reptile"
          draggable="false"
        />
        {props.positionX}
        {props.positionY}
      <CardActions style={{display:'flex', justifyContent:'space-between'}}>
      <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <IndeterminateCheckBoxIcon 
                  className = { props.positionX > -100 ? classes.normalIcon :classes.activeIcon }
                />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <WarningIcon
                  className = { props.positionY < 10 ? classes.normalIcon :classes.activeIcon }
                />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <ControlPointIcon 
                  className = { props.positionX < 100 ? classes.normalIcon :classes.activeIcon } 
                />
              </IconButton>
      </CardActions>
    </Card>
    </>
  );
}
