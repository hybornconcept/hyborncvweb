// First define the types
export interface Order {
    id: string;
    careerlevel: string;
    interest: string;
    others?: string;
    package: 'basic' | 'regular' | 'premium';
    services: Record<string, boolean>;
    deadline: string;
    fullname: string;
    phone: string;
    comments?: string;
    documents: File[]; // Store actual File objects
    created: string;
    updated: string;
} 