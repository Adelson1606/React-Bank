import React, { Component } from 'react'
class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      vendor: "",
      category: ""
    }
  }
  withdraw = () => {
    this.props.withdraw({amount: this.state.amount*(-1), vendor: this.state.vendor, category: this.state.category})
  }

  deposit = () => {
    this.props.deposit({amount: this.state.amount, vendor: this.state.vendor, category: this.state.category})
  }

  deleteTr = () => {
    this.props.deleteTr({amount: this.state.amount, vendor: this.state.vendor, category: this.state.category})
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    })
  }
  render() {
    return (
      <div className='operations'>
        <input id="amount-input" type="number"  name="amount" value={this.state.amount} placeholder="Amount" onChange={this.handleInput} />
        <input id="vendor-input" type="text"  name="vendor" value={this.state.vendor} placeholder="Vendor" onChange={this.handleInput} />
        <input id="category-input" type="text" name="category" value={this.state.category} placeholder="Category" onChange={this.handleInput} />
        <button id="deposit"onClick={this.deposit}>Deposit</button>
        <button id="withdraw" onClick={this.withdraw}>Withdraw</button>
      </div>
    )
  }
}

export default Operations