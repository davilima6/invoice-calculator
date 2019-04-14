import { Order } from '../invoice/order';

export interface Invoice {
    customer_id: string,
    customer_name: string,
    start_date: string,
    end_date: string,
    daysNumber: number,
    amount: number,
    orders: Order[],
    ordersNumber: number
}
