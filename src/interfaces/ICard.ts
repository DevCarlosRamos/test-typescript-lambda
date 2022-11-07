import {Document} from "mongoose";

export interface ICard extends Document {
    card_number:number;
    cvv:number;
    expiration_month:number;
    expiration_year:string;
    email:string;
    token:string;
    compareToken:(token: string)=>Promise<boolean>;
}
