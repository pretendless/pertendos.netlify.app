
import {Role} from '@prisma/client'
import {Order} from './order.entity'


export class User {
  id: string ;
username: string ;
password: string ;
firstName: string  | null;
lastName: string  | null;
role: Role ;
createdAt: Date ;
updatedAt: Date ;
email: string  | null;
orders?: Order[] ;
}
