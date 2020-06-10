import React, { Component } from 'react'

class Breakdown extends Component {

  showAll = async (category) => {
    const allData = [...this.props.data]
    const current = allData.filter(e => e.category === category)
   alert (current)
  }


  oneCategory = () => {
    const allData = this.props.data
    const categoryAmount = {} //{cat:45646, hgashbd:58468}
    allData.forEach(e => {
      categoryAmount[e.category]
        ? categoryAmount[e.category] += e.amount
        : categoryAmount[e.category] = e.amount
    })
    const arrOfCategories = Object.entries(categoryAmount)// [[cat,45646 ], [hgashbd, 58468]]
    return arrOfCategories
  }
  render() {
    const arrOfCategories = this.oneCategory()
    return (
      <div className='breakdown'>
        {arrOfCategories.map(e =>
          <div className='categoryAmount' key={e[0]} >
            <span> {e[0]}</span>
            <span> {e[1]}</span>
          </div>)}
      </div>
    )
  }
}
export default Breakdown