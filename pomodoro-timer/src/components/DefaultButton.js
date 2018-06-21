import React from "react"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: "white",
        border: "1px solid white",
        width: "200px",
        "letter-spacing": ".1em"

    },
});

const DefaultButton = (props) => {
    return (
        <Button
            {...props.extra}
            variant="outlined"
            className={props.classes.button}
            onClick={() => props.onClick()}>
            {props.children}
        </Button>
    )
}

export default withStyles(styles)(DefaultButton)
