// @flow
import React, { PureComponent } from "react";
import Loader from "components/loader/Loader"
import { connect } from "react-redux";
import { addTodo, editTodoStatus, filterTodos, deleteTodo, updateAll, clearCompleted } from "modules/Todo/action";

class HomePage extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      details: {
        id: "",
        description: "",
        completed: false
      },
      loading: true,
      checked: false
    }

    this.handleDetailFieldChange = this.handleDetailFieldChange.bind(this);
    this.handleDetailsCheckboxChange = this.handleDetailsCheckboxChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.handleToogleCheckboxChange = this.handleToogleCheckboxChange.bind(this);
    this.LoadingFunction = this.LoadingFunction.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this)
  }

  clearInputFields() {
    this.setState(
      {
        details: {
          id: "",
          description: "",
          completed: false
        }
      }
    )
  }

  componentDidMount() {
    this.props.filterTodos("all", this.LoadingFunction);

  }

  LoadingFunction() {
    this.setState({
      ...this.state,
      loading: false
    }
    )
  }

  handleDetailFieldChange(field) {
    this.setState(
      {
        details: {
          ...this.state.details,
          description: field
        }
      }
    )
  }

  handleDetailsCheckboxChange(id) {
    let todo = this.props.todoList.filter(params => {
      return params._id === id;
    });
    this.updateTodo(id, { description: todo[0].description, completed: !todo[0].completed });
  }

  handleToogleCheckboxChange(event) {
    this.setState(
      {
        ...this.state.details,
        loading: true,
        checked: !this.state.checked
      }
    )
    this.props.updateAll(event, this.LoadingFunction);
  }

  updateTodo(id, todo) {
    this.setState(
      {
        ...this.state.details,
        loading: true
      }
    )
    this.props.editTodoStatus(id,
      todo, this.LoadingFunction
    )
  }

  deleteTodo(param) {
    this.setState(
      {
        ...this.state.details,
        loading: true
      }
    )
    this.props.deleteTodo(
      param.id, this.LoadingFunction
    )
  }

  submitTodo() {
    this.setState(
      {
        ...this.state.details,
        loading: true
      }
    )
    this.props.addTodo(
      this.state.details, this.LoadingFunction
    );
    this.clearInputFields();
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.submitTodo()
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loader isLoading="true"></Loader>)
    }
    return (
      <section className="todo-app">
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              id="description"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={e => { this.handleDetailFieldChange(e.target.value) }}
              onKeyPress={this.keyPressed}
              value={this.state.details.description}
            />
          </header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" checked={this.state.checked}
              onChange={e => { this.handleToogleCheckboxChange(e.target.checked) }} />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">
              {this.props.todoList.map(todoItem => {
                return (

                  <li key={todoItem._id} className={
                    todoItem.completed ? 'completed' : ''
                  }>
                    <div className="view">
                      <input className="toggle" type="checkbox" checked={
                        todoItem.completed ? true : false} onChange={e => { this.handleDetailsCheckboxChange(todoItem._id) }
                        } />
                      <label key={todoItem._id}  >{todoItem.description}</label>
                      <button className="destroy" onClick={e => this.deleteTodo({ id: todoItem._id })}></button>
                    </div>
                    <input className="edit" />
                  </li>

                )
              })}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>{this.props.completeCount}</strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              <li>
                <a onClick={() => this.props.filterTodos("all")} className="selected">
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a onClick={() => this.props.filterTodos("incompleted")} className="">
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a onClick={() => this.props.filterTodos("completed")} className="">
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed" onClick={() => this.props.clearCompleted(this.LoadingFunction)}>Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => {
  return {
    addTodoState: state.todo.status,
    todoList: state.todo.todoList,
    completeCount: state.todo.completeCount
  };
};
const mapDispatchToProps = {
  addTodo,
  editTodoStatus,
  deleteTodo,
  filterTodos,
  updateAll,
  clearCompleted
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
