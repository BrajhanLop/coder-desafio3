# Nodejs-coder (Tercer Desafio)
Para iniciar escriba: 
- npm i
- npm run dev

## API Reference

#### Get all products

```http
  GET localhost:8080/products
```
#### Get all products as limit
| Query     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `limit`   | number | **Required** |

```http
  GET localhost:8080/products?limit=5
```

#### Get product by Id

```http
  GET localhost:8080/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
