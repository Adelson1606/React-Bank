import React, { Component } from 'react'
class Transaction extends Component {
  deleteTr = () => {
    this.props.deleteTr(this.props.data)
  }
  render() {
    const { data } = this.props

    return (
      <div className='trans' >
      <span>{data.vendor}</span>
      <span>{data.amount}</span>
      <span>{data.category}</span>
      <span><button onClick={this.deleteTr}>delete</button></span>
      </div >
    )
  }
}
export default Transaction