import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
class Transaction extends Component {
  deleteTr = () => {
    this.props.deleteTr(this.props.data)
  }
  render() {
    const { data } = this.props

    return (
      <div className='trans' style={{backgroundColor: data.amount>0? "seagreen": "rgba(207, 69, 69, 0.849"}} >
      <span>{data.vendor}</span>
      <span>{data.amount}</span>
      {/* <span>{data.category}</span> */}
      <span><button onClick={this.deleteTr}><FontAwesomeIcon icon={faTrash} /></button></span>
      </div >
    )
  }
}
export default Transaction