import React from "react"
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const MenuBar = () => {
  return (
    <div >
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Pomodoro Timer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles({})(MenuBar);
