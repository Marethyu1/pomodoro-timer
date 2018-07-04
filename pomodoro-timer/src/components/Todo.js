import React, {Component} from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {connect} from "react-redux"
import {addTodo} from "../actions/todo-actions"
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: "",
            description: "",
        }
    }

    resetState = () => {
        this.setState({
                category: "",
                description: "",
            })
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitOnEnter = (ev) => {
        if (ev.key === "Enter"){
            this.props.addTodo(this.state)
            this.resetState()
        }
    }

    render() {
        return (
            <div style={{"text-align": "left"}}>
                <br/>

                <Paper className={{}}>
                    <Table className={{}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="title" id="tableTitle">
                                        Category
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="title" id="tableTitle">
                                        Description
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="title" id="tableTitle">
                                        Add / Remove
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        id="name"
                                        label="Category"
                                        placeholder="Category"
                                        value={this.state.category}
                                        onChange={this.handleChange('category')}
                                        margin="normal"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="name"
                                        label="Description"
                                        placeholder="Description"
                                        value={this.state.description}
                                        onChange={this.handleChange('description')}
                                        margin="normal"
                                        onKeyPress={(ev) => this.submitOnEnter(ev)}

                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => this.props.addTodo(this.state)}
                                    >+</Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.todos.map((n, i) => {
                                return (
                                    <TableRow key={i} hover>
                                        <TableCell>
                                            {n.category}
                                        </TableCell>
                                        <TableCell >{n.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant={"contained"}
                                                onClick={() => this.props.removeTodo(n)}
                                            >-</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: (todo) => dispatch(addTodo(todo))
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Todo))
