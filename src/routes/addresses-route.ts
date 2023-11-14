import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";



export const addressesRouter =Router()

addressesRouter.get('/', (req: Request, res: Response) => {
let addresses= addressesRepository.getAddresses()
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addressesRepository.findProductById(+req.params.id)
    if (!address) {
        res.send(404)
        return
    }
    res.send(address)
})
