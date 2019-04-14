import { Item } from './item';

export interface Order {
    recipient: {
        name: string,
        email: string
    },
    total_price: number,
    charge_customer: {
        amount: string,
        currency: string
    },
    created_at: string,
    items: Item[],
    delivery: {
        courier: string,
        method: string
    }
}
