import React, { Component } from 'react';
import './App.css';
import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer"
import Todo from "./components/Todo"
import { Provider } from 'react-redux'
import store from "./store"
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
    root: {
        flexGrow: 1,
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
                <div style={{"margin-top": "100px"}}>
                    <Grid container className={classes.root} justify="center" spacing={24}>
                        <Grid item xs={7} style={{backgroundColor: "#d9534f", color: "white", borderRadius: 5}}>
                            <Timer/>
                        </Grid>
                        <Grid item xs={7}>
                            <Todo/>
                        </Grid>

                    </Grid>
                </div>
          </div>
        </Provider>
    );
  }
}

export default withStyles(styles)(App);
