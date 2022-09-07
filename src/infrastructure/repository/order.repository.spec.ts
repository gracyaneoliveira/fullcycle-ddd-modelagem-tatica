import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.respository";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
    
        const ordemItem = new OrderItem(
          "1",
          product.name,
          product.price,
          product.id,
          2
        );
    
        const order = new Order("123", "123", [ordemItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
    
        const orderModel = await OrderModel.findOne({
          where: { id: order.id },
          include: ["items"],
        });
    
        expect(orderModel.toJSON()).toStrictEqual({
          id: "123",
          customer_id: "123",
          total: order.total(),
          items: [
            {
              id: ordemItem.id,
              name: ordemItem.name,
              price: ordemItem.price,
              quantity: ordemItem.quantity,
              order_id: "123",
              product_id: "123",
            },
          ],
        });
      });

    it("should udpate a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
  
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
      
      const product2 = new Product("456", "Product 2", 55);
      await productRepository.create(product2);
  
      const ordemItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
  
      const order = new Order("123", "123", [ordemItem]);
  
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const ordemItem2 = new OrderItem(
          "2",
          product2.name,
          product2.price,
          product2.id,
          2
      );        
      
      order.changeItems([ordemItem, ordemItem2]);
              
      await orderRepository.update(order);
          
      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });        
          
      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            order_id: "123",
            product_id: "123",
          },
          {
              id: ordemItem2.id,
              name: ordemItem2.name,
              price: ordemItem2.price,
              quantity: ordemItem2.quantity,
              order_id: "123",
              product_id: "456",
          },
        ],
      });
    });

    it("should find a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
  
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);    
  
      const ordemItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
  
      const order = new Order("123", "123", [ordemItem]);
  
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
      
      const orderModel = await OrderModel.findOne({
          where: { id: order.id },
          include: ["items"],
      });        

      const foundOrder = await orderRepository.find(order.id);
      
      expect(foundOrder.items).toHaveLength(1);
      expect(orderModel.toJSON()).toStrictEqual({
          id: foundOrder.id,
          customer_id: foundOrder.customerId,
          total: order.total(),
          items: [
              {
                  id: foundOrder.items[0].id,
                  name: foundOrder.items[0].name,
                  price: foundOrder.items[0].price,
                  quantity: foundOrder.items[0].quantity,
                  order_id: "123",
                  product_id: foundOrder.items[0].productId,
              }
          ],
        });        

        // expect(order).toStrictEqual(foundOrder);
    });

    it("should findAll a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
  
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);    
  
      const ordemItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
  
      const order = new Order("123", "123", [ordemItem]);
  
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);      
        
      const ordemItem2 = new OrderItem(
        "2",
        product.name,
        product.price,
        product.id,
        2
      );
      const order2 = new Order("456", "123", [ordemItem2]);
      await orderRepository.create(order2);

      const foundOrder = await orderRepository.findAll();
      
      const orders = [order, order2];

      expect(orders).toStrictEqual(foundOrder);
  });
   
});
