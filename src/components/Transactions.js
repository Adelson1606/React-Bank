import React, { Component } from 'react'
import Transaction from './Transaction'

class Transactions extends Component {
  render() {
    return (
      <div className='trContainer'>
        <div className="transTitle"> All your Transactions</div>
        {this.props.transactions.map(tr =>
          <Transaction key={tr.vendor + tr.amount} data={tr} deleteTr={this.props.deleteTr} />)}
      </div>
    )
  }
}

export default Transactions