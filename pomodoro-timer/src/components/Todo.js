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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitOnEnter = (ev) => {
        if (ev.key === "Enter"){
            this.props.addTodo(this.state)
        }
    }

    render() {
        return (
            <div style={{"text-align": "left"}}>
                <br/>
                <TextField
                    id="name"
                    label="Category"
                    placeholder="Category"
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    margin="normal"
                />
                <TextField
                    id="name"
                    label="Description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    onKeyPress={(ev) => this.submitOnEnter(ev)}

                />
                <Button
                    variant={"contained"}
                    onClick={() => this.props.addTodo(this.state)}
                >+</Button>

                <Paper className={{}}>
                    <Table className={{}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.todos.map((n, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {n.category}
                                        </TableCell>
                                        <TableCell >{n.description}</TableCell>
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
