import React, {Component} from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
};




class MenuBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Pomodoro Timer
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withStyles(styles)(MenuBar);
