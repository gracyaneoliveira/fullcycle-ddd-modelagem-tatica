import Address from "../entity/address";
import Customer from "../entity/customer";
import EventDispatcher from "../event/@shared/event-dispatcher";
import AddressChangedEvent from "../event/customer/address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import EvenWhenAddressCustomerChangedHandler from "../event/customer/handler/event-when-address-customer-changed.handler";
import EvenWhenCustomerIsCreatedHandler from "../event/customer/handler/event-when-customer-is-created.handler";
import CustomerService from "./customer.service";

describe("Customer service unit tests", () => {

    it("should sent event when customer created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EvenWhenCustomerIsCreatedHandler('primeiro');        
        const eventHandler2 = new EvenWhenCustomerIsCreatedHandler('segundo');        
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handler");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);       
        
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;

        const customerCreatedEvent = new CustomerCreatedEvent({            
            description: `Customer ${customer.name} created`,            
        });

        CustomerService.sendEventCreated(customerCreatedEvent, eventDispatcher);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should sent event when address changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EvenWhenAddressCustomerChangedHandler();                
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register("AddressChangedEvent", eventHandler);            

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;

        const addressNew = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer.changeAddress(addressNew);

        const addressChangedEvent = new AddressChangedEvent({
            info: `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address}`,            
        });

        CustomerService.sendEventAddressChanged(addressChangedEvent, eventDispatcher);

        expect(spyEventHandler).toHaveBeenCalled();        
    });
});
