import React, { Component } from 'react'
import { PieChart } from 'react-minimal-pie-chart'

class Breakdown extends Component {

  persentage = () => {
    let sum = 0
    let sumNegative = 0
    let sumPositive = 0
    const allData = [...this.props.data]
    allData.forEach(e => {
      sum += Math.abs(e.amount)
      if (e.amount < 0) sumNegative += Math.abs(e.amount)
      if (e.amount > 0) sumPositive += e.amount
    })
    sum = sumNegative + sumPositive


    const relativePlus = Math.floor((100 * sumPositive) / sum)
    const relativeMinus = 100 - relativePlus

    const degPlus = Math.floor((360 * relativePlus) / 100)
    const degMinus = 360 - degPlus

    return [sumPositive, relativePlus, sumNegative, relativeMinus, degPlus, degMinus]
  }


  oneCategory = () => {
    const allData = this.props.data
    const negativAmount = []
    const positiveAmount = []
    const categoryAmount = {} //{cat:45646, hgashbd:58468}
    allData.forEach(e => {
      categoryAmount[e.category]
        ? categoryAmount[e.category] += e.amount
        : categoryAmount[e.category] = e.amount
    })
    const arrOfCategories = Object.entries(categoryAmount)// [[cat,45646 ], [hgashbd, 58468]]


    const arrofColors = ['#1abc9c', '#f1c40f', '#d35400', '#27ae60', '#2980b9', '#e74c3c', '#8e44ad', '#2c3e50', '#7f8c8d','#EEAFC9','#05c46b']
    arrOfCategories.forEach(element => {
      const randColor = Math.floor(Math.random() * (arrofColors.length - 1))
      element[1] < 0
        ? negativAmount.push({ title: element[0], value: element[1], color: arrofColors[randColor] })
        : positiveAmount.push({ title: element[0], value: element[1], color: arrofColors[randColor] })
    })

    return [arrOfCategories, negativAmount, positiveAmount]
  }


  render() {
    const arrOfCategories = this.oneCategory()[0]
    const negativAmount = this.oneCategory()[1]
    const positiveAmount = this.oneCategory()[2]
    // negativeData[negativAmount]
    console.log(negativAmount)

    return (
      <div className='breakdown'>
        {arrOfCategories.map(e =>
          <div className='categoryAmount' key={e[0]} >
            <span> {e[0]}</span>
            <span> {e[1]} </span>
          </div>)}
        <div className='totalPersents'>
          <div>Income: {this.persentage()[0]} </div>
          <div>Expenses: {this.persentage()[2]}</div>
          <div className='diagramsContainer'>
            <div className='diagram' >
              <PieChart
                data={[
                  { title: 'Income', value: this.persentage()[0], color: 'seagreen' },
                  { title: 'Expenses', value: this.persentage()[2], color: 'rgba(207, 69, 69, 0.849)' }
                ]}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  fill: "white",
                  fontSize: '5px'
                }}
              />
              <div>Income and Expenses </div>
            </div>
            <div className='diagram'>
              <PieChart
                data={negativAmount}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  fill: "white",
                  fontSize: '5px'
                }}
              />
              <div> Expenses </div>
            </div>
            <div className='diagram'>
              <PieChart
                data={positiveAmount}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  fill: "white",
                  fontSize: '5px'
                }}
              />
              <div>Income</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Breakdown