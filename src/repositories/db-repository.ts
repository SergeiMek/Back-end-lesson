import {client, productCollection} from "../db/db";

let products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export type ProductType = {
    id: number
    title: string
}



export const productsRepository = {
    async findProduct(title: string | null | undefined): Promise<Array<ProductType>> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }
        return productCollection.find(filter).toArray()
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const result = await productCollection.insertOne(newProduct)
        return newProduct

    },
    async findProductById(id: number): Promise<ProductType | null> {
        let product = await productCollection.findOne({id: id})
        if (product) {
            return product
        } else {
            return null
        }
    },
    async updateProduct(id: number, title: string) {
        const result = await productCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        /* for (let i = 0; products.length > 0; i++) {
             if (products[i].id === id) {
                 products.splice(i, 1)
                 return true
             }
         }
         return false*/
        const result = await productCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async test() {
        products = []
    }
}