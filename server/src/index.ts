// Index.ts
import { map, find, isNil, findIndex } from 'lodash'
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'

const app = express()

app.use(cors())
app.use(json())

interface IProduct {
  productId: number
  name: string
  price: number
}

const products: IProduct[] = [
  {
    productId: 1,
    name: 'A',
    price: 100,
  },
  {
    productId: 2,
    name: 'B',
    price: 200,
  },
  {
    productId: 3,
    name: 'C',
    price: 150,
  },
  {
    productId: 4,
    name: 'D',
    price: 300,
  },
]

app.get('/product', (req, res) => res.send({ success: true, result: products }))

app.get('/product/:productId', (req, res) => {
  const product = find(products, { productId: Number(req.params.productId) })
  if (isNil(product)) return res.status(404).send({ success: false, message: 'CANNOT_FIND_PRODUCT' })
  res.send({ success: true, result: product })
})

app.post('/product', (req, res) => {
  const productId = Math.max(...map(products, 'productId')) + 1
  const newproduct = {
    productId,
    ...req.body,
  }
  products.push(newproduct)
  res.send({ success: true, result: newproduct })
})

app.put('/product/:productId', (req, res) => {
  const updatedProduct = find(products, { productId: Number(req.params.productId) })
  if (isNil(updatedProduct)) return res.status(404).send({ success: false, message: 'CANNOT_FIND_PRODUCT' })

  updatedProduct.name = req.body.name
  updatedProduct.price = req.body.price
  res.send({ success: true, result: updatedProduct })
})

app.delete('/product/:productId', (req, res) => {
  const index = findIndex(products, { productId: Number(req.params.productId) })
  if (index === -1) return res.status(404).send({ success: false, message: 'CANNOT_FIND_PRODUCT' })
  const deletedProduct = products.splice(index, 1)
  res.send({ success: true, result: deletedProduct })
})

app.listen(3000, () => console.log('Server started.'))
