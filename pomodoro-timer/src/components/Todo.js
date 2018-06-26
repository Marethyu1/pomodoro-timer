import React, {Component} from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {connect} from "react-redux"
import {addTodo} from "../actions/todo-actions"


class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: "Category",
            description: "Description",
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                Category | Description
                <br/>
                <TextField
                    id="name"
                    label="Category"
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    margin="normal"
                />
                <TextField
                    id="name"
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <Button
                    variant={"contained"}
                    onClick={() => this.props.addTodo(this.state)}
                >+</Button>
                {this.props.todos.map(x => {
                    return (
                        <div>{x.category} {x.description}</div>
                    )
                })}
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
        // setTimerLength: (timeLeft) => dispatch(setTimerLength(timeLeft)),
        // startTimer: () => dispatch(startTimer()),
        // pauseTimer: () => dispatch(pauseTimer()),
        // resumeTimer: () => dispatch(resumeTimer()),
        // stopTimer: () => dispatch(stopTimer()),
        addTodo: (todo) => dispatch(addTodo(todo))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo)
