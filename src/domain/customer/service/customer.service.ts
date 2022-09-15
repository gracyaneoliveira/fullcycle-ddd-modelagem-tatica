
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";


export default class CustomerService {
    
    static sendEventCreated(event: CustomerCreatedEvent, eventDispatcher: EventDispatcher) : void {
        eventDispatcher.notify(event);
    }

    static sendEventAddressChanged(event: CustomerCreatedEvent, eventDispatcher: EventDispatcher) : void {
        eventDispatcher.notify(event);
    }
}
