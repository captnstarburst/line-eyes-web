import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import MinimizeIcon from "@material-ui/icons/Minimize";
import WarningIcon from "@material-ui/icons/Warning";
import Fade from "@material-ui/core/Fade";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TagDrawer from "../../UI/TagDrawer";
import Chips from "../../UI/Chips";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  navigation: {
    width: 500,
  },
}));

const Review = (props) => {
  const classes = useStyles();

  const [tagDrawerOpen, setTagDrawerOpen] = useState(true);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Pregnancy Test", viewing: false },
    { key: 1, label: "Ovulation Test", viewing: false },
    { key: 2, label: "Clear Blue", viewing: false },
    { key: 3, label: "First Response", viewing: false },
    { key: 4, label: "Clinical Guard", viewing: false },
    { key: 5, label: "Generic Brand", viewing: false },
    { key: 6, label: "3 DPO", viewing: false },
    { key: 7, label: "4 DPO", viewing: false },
    { key: 8, label: "5 DPO", viewing: false },
    { key: 9, label: "6 DPO", viewing: false },
    { key: 10, label: "7 DPO", viewing: false },
    { key: 11, label: "8 DPO", viewing: false },
    { key: 12, label: "9 DPO", viewing: false },
    { key: 13, label: "10 DPO", viewing: false },
    { key: 14, label: "11 DPO", viewing: false },
    { key: 15, label: "12 DPO", viewing: false },
    { key: 16, label: "13 DPO", viewing: false },
    { key: 17, label: "14 DPO", viewing: false },
    { key: 18, label: "15 DPO", viewing: false },
    { key: 19, label: "16 DPO", viewing: false },
    { key: 20, label: "17 DPO", viewing: false },
    { key: 21, label: "18 DPO", viewing: false },
    { key: 22, label: "19 DPO", viewing: false },
    { key: 23, label: "20 DPO", viewing: false },
    { key: 24, label: "1 DPT", viewing: false },
    { key: 25, label: "2 DPT", viewing: false },
    { key: 26, label: "3 DPT", viewing: false },
    { key: 27, label: "4 DPT", viewing: false },
    { key: 28, label: "5 DPT", viewing: false },
    { key: 29, label: "6 DPT", viewing: false },
    { key: 30, label: "7 DPT", viewing: false },
    { key: 31, label: "8 DPT", viewing: false },
    { key: 32, label: "10 DPT", viewing: false },
    { key: 33, label: "11 DPT", viewing: false },
    { key: 34, label: "12 DPT", viewing: false },
    { key: 35, label: "13 DPT", viewing: false },
    { key: 36, label: "14 DPT", viewing: false },
    { key: 37, label: "15 DPT", viewing: false },
    { key: 38, label: "16 DPT", viewing: false },
  ]);

  const handleChipChange = (chipToDelete) => {
    let copy = chipData.map((data) => {
      if (data.key === chipToDelete) {
        return { key: data.key, label: data.label, viewing: !data.viewing };
      } else {
        return data;
      }
    });

    if (!tagDrawerOpen) setTagDrawerOpen(true);
    setChipData(copy);
  };

  const toggleDrawer = React.useCallback(
    () => setTagDrawerOpen((state) => !state),
    []
  );

  return (
    <Container fixed>
      <TagDrawer
        chipData={chipData}
        propagateChipChange={handleChipChange}
        open={tagDrawerOpen}
        toggle={toggleDrawer}
      />
      <Typography
        component="main"
        style={{
          backgroundColor: "#cfe8fc",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Chips
          chipData={chipData}
          margin
          deletable
          propagateChipChange={handleChipChange}
        />

        <Fade in={true} {...{ timeout: 1000 }}>
          <Paper elevation={3} variant="outlined">
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={props.url}
                title="Contemplative Reptile"
              />

              <CardActions>
                <BottomNavigation
                  value={0}
                  showLabels
                  className={classes.navigation}
                >
                  <BottomNavigationAction
                    label="Negative"
                    icon={
                      <Badge
                        color="secondary"
                        badgeContent={0}
                        invisible={false}
                      >
                        <MinimizeIcon
                          style={{
                            transform: "rotate(90deg)",
                            marginLeft: "10%",
                          }}
                        />
                      </Badge>
                    }
                  />
                  <BottomNavigationAction
                    label="Invalid"
                    icon={
                      <Badge
                        color="secondary"
                        badgeContent={0}
                        invisible={false}
                      >
                        {" "}
                        <WarningIcon />
                      </Badge>
                    }
                  />
                  <BottomNavigationAction
                    label="Positive"
                    icon={
                      <Badge
                        color="secondary"
                        badgeContent={0}
                        invisible={false}
                      >
                        <DragHandleIcon
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </Badge>
                    }
                  />
                </BottomNavigation>
              </CardActions>
            </Card>
          </Paper>
        </Fade>

        <Zoom in={true} {...{ timeout: 500 }} unmountOnExit>
          <Fab aria-label={"fab.label"} className={classes.fab}>
            <CloudUploadIcon color={"primary"} />
          </Fab>
        </Zoom>
      </Typography>
    </Container>
  );
};

export default Review;
