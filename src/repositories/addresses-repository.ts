
let addresses = [{id: 1, value: 'Varvasheni 6'}, {id: 2, value: "Angarskaia 11"}]

export const addressesRepository ={
    getAddresses(){
        return addresses
    },
    findProductById(id: number) {
        let address = addresses.find(p => p.id === id)
        return address
    }

}
