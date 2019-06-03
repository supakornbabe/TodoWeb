import React, { Component } from 'react';
import TodoList from './TodoList'
import './App.css';
import TodoItems from './TodoItems';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {
        "name": '',
        "isComplete": false
      }
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = e => {
    axios.get(`https://localhost:5001/api/Todo/`).then(res => {
      console.log(res)
      const items = res.data
      this.setState({ items: items })
    })
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { name: itemText, isComplete: false }
    this.setState({ currentItem })
  }
  
  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem
    if (newItem.name !== '') {
      console.log(newItem)
      axios.post('https://localhost:5001/api/Todo/', newItem).then(e => this.getItems())
      this.setState({
        currentItem: {
          "name": '',
          "isComplete": false
        }
      })
    }
  }

  deleteItem = id => {
    axios.delete('https://localhost:5001/api/Todo/' + id).then(this.getItems())
  }

  inputElement = React.createRef()
  render() {
    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems
          entries={this.state.items}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
