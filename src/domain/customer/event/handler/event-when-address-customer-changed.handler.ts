
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";


export default class EvenWhenAddressCustomerChangedHandler
    implements EventHandlerInterface<AddressChangedEvent>
{
    handler(event: AddressChangedEvent): void {
        console.log(event.eventData.info);
    }
}
