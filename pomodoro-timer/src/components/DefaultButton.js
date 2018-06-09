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
        <Button
            color="primary"
            variant="contained"
            className={props.classes.button}
            onClick={() => props.onClick()}>
            {props.children}
        </Button>
    )
}

export default withStyles(styles)(DefaultButton)
