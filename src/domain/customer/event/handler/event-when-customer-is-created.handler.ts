
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class EvenWhenCustomerIsCreatedHandler
    implements EventHandlerInterface<CustomerCreatedEvent>
{    
    private _eventNumber:string

    constructor(eventNumber: string) {
        this._eventNumber = eventNumber;
    }
    
    handler(event: CustomerCreatedEvent): void {
        console.log(`Esse é o ${this._eventNumber} console.log do evento: CustomerCreated.`);
    }
}
