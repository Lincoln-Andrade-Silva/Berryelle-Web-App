import {BaseEntity} from "./BaseEntity";

export interface ProductResponse extends BaseEntity {
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
}

export interface ProductRequest {
    id: any;
    name: string;
    description: string;
    image: File | null | undefined;
    quantity: number;
    price: number;
}
