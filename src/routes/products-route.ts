import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";


export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('Incorrect length')

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProduct(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/', titleValidation,inputValidationMiddleware, (req: Request, res: Response) => {


    return res.status(201).send(productsRepository.createProduct(req.body.title))


})

productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductById(+req.params.id)
    if (!product) {
        res.send(404)
        return
    }
    res.send(product)
})

productsRouter.delete('/:id', (req: Request, res: Response) => {

    productsRepository.deleteProduct(+req.params.id) ? res.send(204) : res.send(404)

})

productsRouter.put('/:id', titleValidation,inputValidationMiddleware,(req: Request, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }


    let isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productsRepository.findProductById(+req.params.id)
        res.status(201).send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/__test__/data', (req: Request, res: Response) => {
    productsRepository.test()
})