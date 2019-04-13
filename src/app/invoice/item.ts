export interface Item {
    id: string,
    name: string,
    quantity: number,
    total_price: {
        amount: string,
        currency: string
    }
}
