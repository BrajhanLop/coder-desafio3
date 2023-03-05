
import fs from 'fs/promises'
import { Product } from '../models/product.model.js'
export class ProductManager {
  constructor () {
    this.path = './static/products.txt'
    this.products = []
  }

  async getProducts () {
    const json = await fs.readFile(this.path, 'utf-8')
    if (!json) {
      this.products = []
      return this.products
    }
    this.products = JSON.parse(json)
    return this.products
  }

  async addProduct (title, description, price, thumbnail, code, stock) {
    const newProduct = new Product(title, description, price, thumbnail, code, stock)
    const findProductDuplicate = this.products.filter(prod => prod.code === newProduct.code)
    if (findProductDuplicate.length > 0) {
      console.log(`No se puede guardar, el codigo del producto ${newProduct.title} ya esta ingresado`)
      return
    }
    this.products.push(newProduct)
    const json = JSON.stringify(this.products)
    await fs.writeFile(this.path, json)
  }

  async getProductById (id) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const getProduct = this.products.find(prod => prod.id === Number(id))
    if (getProduct) {
      return getProduct
    }
    return ('Product Not Found')
  }

  async updateProduct (id, title, description, price, thumbnail, code, stock) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const index = this.products.findIndex(prod => prod.id === id)
    if (index === -1) {
      console.log('el producto que desea actualizar no existe')
      return
    }
    const productUpdate = {
      id: this.products[index].id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    this.products[index] = productUpdate
    const newjson = JSON.stringify(this.products)
    await fs.writeFile(this.path, newjson)
  }

  async deleteProduct (id) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const index = this.products.findIndex(prod => prod.id === id)
    if (index === -1) {
      console.log('el producto que desea eliminar no existe')
      return
    }
    this.products.splice(index, 1)
    const newjson = JSON.stringify(this.products)
    await fs.writeFile(this.path, newjson)
  }
}

// const adminProducts = new ProductManager()

// TRAER TODOS LOS PRODUCTOS AGREGADOS
/*
console.log('===TODOS LOS PRODUCTOS ===')
console.log(await adminProducts.getProducts())

console.log('=== AGREGAMOS PRODUCTO ===')
await adminProducts.addProduct('Galleta Casino', 'galletas dulces', 50, 'sin archivo', 'gl-111', 20)
await adminProducts.addProduct('Fideo Di Maria', 'fideos de Angel', 200, 'sin archivo', 'fd-323', 50)
await adminProducts.addProduct('Gaseosa Coca', 'gaseosa', 150, 'sin archivo', 'go-412', 20)
*/

// console.log('=== AGREGAMOS REPETIDO CASINO ===')
// await adminProducts.addProduct('Galleta Casino', 'galletas dulces', 50, 'sin archivo', 'gl-111', 20)

// console.log('===TODOS LOS PRODUCTOS ===')
// console.log(await adminProducts.getProducts())

// // FILTRAR PRODUCTOS POR ID
// console.log('=== FILTRANDO PRODUCTO ID = 2 ===')
// console.table(adminProducts.getProductById(2))

// ACTUALIZAR PRODUCTO
// console.log('=== ACTUALIZANDO PRODUCTO ===');
// await adminProducts.updateProduct(3, 'Gaseosa Pepsi', 'gaseosa', 200, 'sin archivo', 'gp-012', 30)

// ELIMINAR PRODUCTO
// await adminProducts.deleteProduct(1)
