import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerCreatedEvent from "../event/customer/customer-created.event";

export default class CustomerService {
    
    static sendEventCreated(event: CustomerCreatedEvent, eventDispatcher: EventDispatcher) : void {
        eventDispatcher.notify(event);
    }

    static sendEventAddressChanged(event: CustomerCreatedEvent, eventDispatcher: EventDispatcher) : void {
        eventDispatcher.notify(event);
    }
}
