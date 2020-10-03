import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import PregnancyTest from '../../assets/pregnancy-test.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

export default function ImgMediaCard() {
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
      <CardActions style={{display:'flex', justifyContent:'space-between'}}>
      <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                
                color="inherit"
              >
                <IndeterminateCheckBoxIcon />
              </IconButton>
              <IconButton
                style={{color: "#000"}}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <ControlPointIcon />
              </IconButton>
      </CardActions>
    </Card>
    </>
  );
}
