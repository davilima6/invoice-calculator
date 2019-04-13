import { Item } from './item';

export interface Order {
    recipient: {
        name: string,
        email: string
    },
    total_price: number,
    created_at: string,
    items: Item[],
    delivery: string
}
