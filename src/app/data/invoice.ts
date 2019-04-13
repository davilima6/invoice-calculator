import { Order } from '../invoice/order';

export interface Invoice {
    customer_id: string,
    start_date: string,
    end_date: string,
    amount: number,
    orders: Order[],
    ordersNumber: number
}
