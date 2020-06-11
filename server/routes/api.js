const express = require('express')
const router = express.Router()
const Transaction = require('../modules/TransactionScema')

router.get('/transactions', async function (req, res) {
  const allTransaction = await Transaction.find()
  res.send(allTransaction)
})

router.post('/transaction', async function (req, res) {
  const transaction = new Transaction(req.body)
  await transaction.save()
  res.send(transaction)
})

router.delete('/transaction/:id', async function (req, res) {
  const id = req.params.id
  const transaction = await Transaction.findOneAndDelete({ "_id": id })
  res.send(transaction)
})

// router.put('/transaction/:id', async function (req, res) {
//   const id = req.params.id
//   const transaction = await Transaction.findOneAndDelete({ "_id": id })
//   res.send(transaction)
// })


module.exports = router