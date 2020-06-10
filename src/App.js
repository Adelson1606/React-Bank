import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transactions'
import './App.css';
import Operations from './components/Operations';
import Breakdown from './components/Breakdown';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data:
        [
          { amount: 3200, vendor: "Elevation", category: "Salary" },
          { amount: -7, vendor: "Runescape", category: "Entertainment" },
          { amount: -20, vendor: "Subway", category: "Food" },
          { amount: -98, vendor: "La Baguetterie", category: "Food" }
        ]
    }
  }
  getBalance = () => {
    let balance = 0
    const data = this.state.data
    data.forEach(tr=> balance += parseInt(tr.amount))
    return balance
  }

  deposit = (tr) => {
    const data = this.state.data
    data.push(tr)
    this.setState({ data })
  }

  withdraw = (tr) => {
    const data = this.state.data
    tr.amount = - tr.amount
    data.push(tr)
    this.setState({ data })
  }

  deleteTr = async (tr) => {
    const data = this.state.data
    const index = data.findIndex(t => t === tr)
    data.splice(index, 1)
    await this.setState({ data })
  }

  componentDidMount = async() => {
    // const response = await axios.get("http://localhost:3001/transactions")
    const response = await axios.get("/transactions")
    this.setState({
      data: response.data
    })
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
          <div className='balance'>Balance: ${this.getBalance()}</div>
          <Route path="/" exact render={() =>  <Transactions transactions={this.state.data} deleteTr={this.deleteTr} />} />
          <Route path="/operations" exact render={() => <Operations deposit={this.deposit} withdraw={this.withdraw} />} />
          <Route path="/breakdown" exact render={() => <Breakdown data={this.state.data}/>}></Route>
        </div >
      </Router>
    );
  }

}

export default App;
