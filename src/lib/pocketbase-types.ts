export interface OrdersResponse {
    id: string;
    service: string;
    email: string;
    message: string;
    status: 'pending' | 'in-review' | 'completed';
    created: string;
    updated: string;
} 