import { Product } from '../../db/models/Product.model';
import { OrderItem } from '../../db/models/OrderItem.model';
import { User } from '../../db/models/User.model';
import { Order } from '../../db/models/Order.model';
import { NotFoundData } from '../../common/errors/notFoundData';
import { normalize, delExtra } from '../../common/helpers/dataNormalization';
import { Manufacture } from '../../db/models/Manufacture.model';
import { Unit } from '../../db/models/Unit.model';
import { Category } from '../../db/models/Category.model';
import sequelize from '../../db/config/db';
import { NotFound } from '../../common/errors/notFound';

export enum OrderStatus {
	New = 'new',
	InProgress = 'in progress',
	Done = 'done',
}

export class OrdersService {
	async getAllOrders() {
		const orders: Array<Order> = await Order.findAll();
		if (orders.length > 0) return orders;
		throw new NotFoundData([], 'Orders are not found');
	}

	async getOrderDetailsById(orderId: number) {
		const user: Order | null = await Order.findOne({
			attributes: [],
			where: { id: orderId },
			include: [
				{
					model: User,
					as: 'buyer',
					attributes: ['login', 'name', 'phone', 'email'],
				},
			],
		});
		const orderInfo: Array<OrderItem> = await OrderItem.findAll({
			attributes: ['order_id', 'product_id', 'quantity'],
			where: { order_id: orderId },
			include: [
				{
					model: Product,
					as: 'product',
					attributes: ['product_name', 'price', 'img'],
					include: [
						{ model: Unit, as: 'unit', attributes: ['unit'] },
						{ model: Category, as: 'category', attributes: ['category'] },
						{
							model: Manufacture,
							as: 'manufacture',
							attributes: ['manufacture'],
						},
					],
				},
			],
		});
		if (user && orderInfo.length > 0) {
			let order = normalize(orderInfo, [
				{
					product: [
						'product_name',
						'price',
						{ unit: ['unit'] },
						{ category: ['category'] },
						{ manufacture: ['manufacture'] },
						'img',
					],
				},
			]);
			order = delExtra(order, ['product']);
			return [{ user: user.buyer, products: order }];
		}
		throw new NotFound('Order is not found');
	}

	async changeOrderStatus(orderId: number, status: OrderStatus) {
		await Order.update({ status }, { where: { id: orderId } });
		return [{ id: orderId, status }];
	}

	async completeOrder(userId: number, products) {
		const order = await this.insertItems(products, userId);
		const total_price = order[0].products.reduce(
			(ac, el) => ac + el.price * el.quantity,
			0,
		);
		await this.updateTotalPrice(order[0].products[0].order_id, total_price);
		return [{ ...order[0], total_price }];
	}

	async insertItems(products, buyerId: number) {
		/// //!!!!!!
		let salesmanId = 1;
		//
		const orderId = await sequelize.transaction(async (t) => {
			const orderInfo = await Order.create(
				{ buyer_id: buyerId, salesman_id: salesmanId, total_sum: 1 },
				{ transaction: t },
			);
			const { id } = orderInfo;
			const values = products.reduce(
				(ac, el) => [
					...ac,
					{ order_id: id, product_id: el.id, quantity: el.count },
				],
				[],
			);
			await OrderItem.bulkCreate(values, { transaction: t });
			return id;
		});
		const order = await this.getOrderDetailsById(orderId);
		return order;
	}

	async updateTotalPrice(orderId: number, total_price: number) {
		await Order.update({ total_sum: total_price }, { where: { id: orderId } });
	}
}

export const ordersService = new OrdersService();
