import React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount(){
    this.setState({
      values:[{Id: 1, name: "Value 001"}, {Id: 2, name: "Value 606"}]
    })
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {this.state.values.map((value: any) => (
            <li>{value.name}</li>
          ))}
        </ul>
      </header>
    </div>
    );
  };
}

export default App;
