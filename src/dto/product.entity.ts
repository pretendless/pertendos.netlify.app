
import {Image} from './image.entity'
import {Order} from './order.entity'


export class Product {
  id: number ;
name: string  | null;
price: number  | null;
description: string  | null;
imageId: number  | null;
image?: Image  | null;
orderId: number  | null;
order?: Order  | null;
}
