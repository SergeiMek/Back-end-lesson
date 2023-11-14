import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-route";
import {addressesRouter} from "./routes/addresses-route";




export const app = express()
const port =process.env.PORT ||  100





const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})