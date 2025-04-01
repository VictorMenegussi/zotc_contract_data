using {contract.atm as db} from '../db/schema.cds';
 

service OrderService {
    entity OrderItemDetails as projection on db.OrderItemDetails;
}