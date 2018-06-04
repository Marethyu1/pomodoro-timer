import React from "react"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const DefaultButton = (props) => {
    return (
        <Button variant="contained" className={props.classes.button }>
            {props.children}
        </Button>
    )
}

export default withStyles(styles)(DefaultButton)