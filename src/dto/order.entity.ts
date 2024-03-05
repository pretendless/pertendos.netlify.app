
import {User} from './user.entity'
import {Product} from './product.entity'


export class Order {
  id: number ;
customer?: User  | null;
customerId: string  | null;
customerFirstName: string  | null;
customerLastName: string  | null;
productId: string  | null;
products?: Product[] ;
productsPrice: string  | null;
productsQuantity: string  | null;
orderCountry: string  | null;
orderCity: string  | null;
orderAddress: string  | null;
orderZipCode: string  | null;
orderPayment: string  | null;
orderEmail: string  | null;
createdAt: Date  | null;
orderStatus: string  | null;
}
