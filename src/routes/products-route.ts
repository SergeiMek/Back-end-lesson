import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {productsRepository} from "../repositories/db-repository";



export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('Incorrect length')

productsRouter.get('/',async  (req: Request, res: Response) => {
    const foundProducts =await  productsRepository.findProduct(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/', titleValidation,inputValidationMiddleware, async (req: Request, res: Response) => {


    return res.status(201).send(await productsRepository.createProduct(req.body.title))


})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product =await productsRepository.findProductById(+req.params.id)
    if (!product) {
        res.send(404)
        return
    }
    res.send(product)
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {

    await productsRepository.deleteProduct(+req.params.id) ? res.send(204) : res.send(404)

})

productsRouter.put('/:id', titleValidation,inputValidationMiddleware,async (req: Request, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }


    let isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product =await productsRepository.findProductById(+req.params.id)
        res.status(201).send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/__test__/data', (req: Request, res: Response) => {
    productsRepository.test()
})