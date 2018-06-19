import React, { Component } from 'react';
import './App.css';
import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer"
import { Provider } from 'react-redux'
import store from "./store"
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class App extends Component {
  render() {
      const { classes } = this.props
    return (
        <Provider store={store}>
            <div className="App">
              <MenuBar/>
                <Grid container className={classes.root} justify="center" spacing={16}>
                    <Grid item xs={5} style={{backgroundColor: "#d9534f", color: "white", borderRadius: 5}}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Timer/>
                    </Grid>
                </Grid>
          </div>
        </Provider>
    );
  }
}

export default withStyles(styles)(App);
