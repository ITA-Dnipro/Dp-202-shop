import { Model } from 'sequelize';
import {Product} from '../../db/models/Product.model';
import { OrderItem } from '../../db/models/OrderItem.model';
import { User} from '../../db/models/User.model';
import {Order} from '../../db/models/Order.model';
import {NotFoundData} from "../../common/errors/notFoundData";
import {normalize, delExtra} from "../../common/helpers/dataNormalization";
import {Manufacture} from "../../db/models/Manufacture.model";
import {Unit} from "../../db/models/Unit.model";
import {Category} from "../../db/models/Category.model";

export enum OrderStatus {
  New = 'new',
  InProgress = 'in progress',
  Done = 'done'
}

export class OrdersService {
  async getAllOrders() {
    const orders: Array<Order> = await Order.findAll();
    if (orders.length > 0) return orders;
    throw new NotFoundData([], 'Orders are not found');
  }
  async getOrderDetailsById(orderId: number) {
    const user: Order | null = await Order.findOne({
      attributes:[],
      where: { id: orderId },
      include: [
        { model: User, as: 'buyer', attributes: ['login','name', 'phone', 'email'] }]
    });
    const orderInfo: Array<OrderItem> = await OrderItem.findAll({
      attributes: [ 'order_id', 'product_id', 'quantity' ],
      where: { order_id: orderId },
      include: [
        { model: Product, as: 'product', attributes: ['product_name', 'price', 'img'],
          include: [
            { model: Unit, as: 'unit', attributes: ['unit'] },
            { model: Category, as: 'category', attributes: ['category'] },
            { model: Manufacture, as: 'manufacture', attributes: ['manufacture'] }]
        }]
    });
    let order = normalize(orderInfo, [{ product: ['product_name', 'price', { unit: ['unit'] },
        { category: ['category'] },{ manufacture: ['manufacture'] }, 'img'] }]);
    order = delExtra(order, ['product']);
    if(user && order.length > 0) return [{user: user.buyer, products:order}];
    throw new NotFoundData([], 'Order is not found');
  }

  async changeOrderStatus(orderId: number, status: OrderStatus) {
    await Order.update(
      {status: status},
      {where: {id:orderId}});
    return [{id: orderId, status:status}];
  }

    async inserOrderItems(products, id, t) {
        // const queryArr = products.reduce((acc, product) => {
        //     acc.push({ order_id: id, product_id: product.id, amount: product.count })
        //     return acc;
        // }, []);
        // await Order_item.bulkCreate(queryArr, { transaction: t });
    }

    async insertOrder(user, products, t) {
        // const { id } = user;
        // const order = await Order.create({
        //     user_id: id
        // }, { transaction: t });
        // const orderID = order.dataValues.id
        // await this.inserOrderItems(products, orderID, t);
        // return orderID;

    }

    async selectOrderInfo(orderID) {

        // const rawUser = await Order.findOne({
        //     attributes: [
        //         'time'
        //     ],
        //     where: { id: orderID },
        //     include: [
        //         {
        //             model: User,
        //             as: 'user',
        //             attributes: ['user_name', 'phone', 'email']
        //         }
        //     ]
        // });

        // let user = normalizeOne(rawUser, [{ user: ['user_name', 'phone', 'email'] }]);
        // user = deleteKeys(user, ['user'])

        // const rawOrder = await Order_item.findAll({
        //     attributes: [
        //         'order_id',
        //         'product_id',
        //         'amount',
        //     ],
        //     where: { order_id: orderID },
        //     include: [
        //         {
        //             model: Product,
        //             as: 'product',
        //             attributes: ['name', 'price'],
        //             include: [
        //                 {
        //                     model: Unit,
        //                     as: 'unit',
        //                     attributes: ['unit']
        //                 }
        //             ]
        //         }
        //     ]
        // });

        // let order = normalize(rawOrder, [{ product: ['name', 'price', { unit: ['unit'] }] }]);
        // order = delExtra(order, ['product'])
        // order = pricePerItem(order);

        // const orderInfo = {
        //     'user': user,
        //     'order': order,
        //     'total': totalPrice(order)
        // };
        // return orderInfo
    }

    async completeOrder(user, products) {
        // let orderID;
        // const result = await sequelize.transaction(async (t) => {
        //     orderID = await this.insertOrder(user, products, t)
        // });
        // const orderInfo = await this.selectOrderInfo(orderID);
        // return orderInfo;
    }

}

export const ordersService  = new OrdersService ();
