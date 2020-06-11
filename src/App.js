import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transactions'
import './App.css';
import Operations from './components/Operations';
import Breakdown from './components/Breakdown';
import ReactTooltip from "react-tooltip";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// import axios from 'axios'
const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      data:
        [
          // { amount: 3200, vendor: "Elevation", category: "Salary" },
          // { amount: -7, vendor: "Runescape", category: "Entertainment" },
          // { amount: -20, vendor: "Subway", category: "Food" },
          // { amount: -98, vendor: "La Baguetterie", category: "Food" }
        ]
    }
  }
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:8080/transactions")
    this.setState({
      data: response.data
    })
  }
  getBalance = () => {
    let balance = 0
    const data = this.state.data
    data.forEach(tr => balance += parseInt(tr.amount))
    return balance
  }

  deposit = async (tr) => {
    const response = await axios.post("http://localhost:8080/transaction", tr)
    const data = [...this.state.data] //deep copy
    data.push(response.data)
    this.setState({ data })
  }

  withdraw = async (tr) => {
    const response = await axios.post("http://localhost:8080/transaction", tr)
    const data = [...this.state.data] 
    data.push(response.data)
    this.setState({ data })
  }

  deleteTr = async (trID) => {
   const id=trID._id
    const response = await axios.delete(`http://localhost:8080/transaction/${id}`)
    const data = [...this.state.data] 
    const index = data.findIndex(t => t._id === id)
    data.splice(index, 1)
    await this.setState({ data })
    // this.componentDidMount()
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className='allLinks'>
            <Link to='/'>Transactions</Link>
            <Link to="/operations">Operations</Link>
            <Link to="/breakdown">Breakdown</Link>
          </div>
          <div className='balance' style={{color: this.getBalance()>500? "green" : 'red'}}>Balance: ${this.getBalance()}</div>
          <Route path="/" exact render={() => <Transactions transactions={this.state.data} deleteTr={this.deleteTr} />} />
          <Route path="/operations" exact render={() => <Operations deposit={this.deposit} withdraw={this.withdraw} />} />
          <Route path="/breakdown" exact render={() => <Breakdown data={this.state.data} />}></Route>
          <footer>Made by Nika Pika corp</footer>
        </div >

      </Router>
    );
  }

}

export default App;
