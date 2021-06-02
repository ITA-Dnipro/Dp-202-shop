const { DataType } = require('sequelize-typescript');
/**
 * Actions summary:
 * createTable "units", deps: []
 * createTable "manufactures", deps: []
 * createTable "categories", deps: []
 * createTable "users", deps: []
 * createTable "products", deps: [users, categories, manufactures, units]
 * createTable "orders", deps: [users as seller, users as buyer ]
 * createTable "order_items", deps: [orders, products]
 *
 * */

const info = {
	revision: 1,
	name: 'initial migration',
	created: '2021-05-19T15:49:58.814Z',
	comment: '',
};

const migrationCommands = [
	{
		fn: 'createTable', // Units
		params: [
			'units',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				unit: {
					type: DataType.STRING,
				},
				unit_name: {
					type: DataType.STRING,
				},
				measure: {
					type: DataType.FLOAT,
				},

				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // Categories
		params: [
			'categories',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				category: {
					type: DataType.STRING,
					allowNull: false,
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // Manufactures
		params: [
			'manufactures',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				manufacture: {
					type: DataType.STRING,
					allowNull: false,
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // User
		params: [
			'users',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},

				login: {
					type: DataType.STRING,
					allowNull: false,
				},
				password: {
					type: DataType.STRING,
					allowNull: false,
				},
				email: {
					type: DataType.STRING,
				},
				name: {
					type: DataType.STRING,
				},
				phone: {
					type: DataType.STRING,
				},
				balance: {
					type: DataType.REAL,
					allowNull: false,
				},
				role: {
					type: DataType.ENUM(['client', 'salesman', 'admin']),
					defaultValue: 'client',
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // Product
		params: [
			'products',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				vendor_code: {
					type: DataType.INTEGER,
				},
				product_name: {
					type: DataType.STRING,
					allowNull: false,
				},
				amount: {
					type: DataType.INTEGER,
					allowNull: false,
				},
				price: {
					type: DataType.REAL,
					allowNull: false,
				},
				ingredients: {
					type: DataType.TEXT,
					allowNull: true,
				},
				img: {
					type: DataType.TEXT,
				},
				deleted: {
					type: DataType.BOOLEAN,
				},
				unit_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'units',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				manufacture_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'manufactures',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				category_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'categories',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				user_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'users',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // Order
		params: [
			'orders',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				total_sum: {
					type: DataType.REAL,
					allowNull: false,
				},
				status: {
					type: DataType.ENUM('in progress', 'rejected', 'completed'),
					defaultValue: 'in progress',
				},
				buyer_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'users',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				salesman_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'users',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
	{
		fn: 'createTable', // OrderItem
		params: [
			'order_items',
			{
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: DataType.INTEGER,
				},
				quantity: {
					type: DataType.INTEGER,
					allowNull: false,
				},
				product_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'products',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				order_id: {
					onDelete: 'NO ACTION',
					onUpdate: 'CASCADE',
					references: {
						model: 'orders',
						key: 'id',
					},
					allowNull: false,
					type: DataType.INTEGER,
				},
				createdAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: DataType.DATE,
					defaultValue: new Date(),
				},
			},
			{},
		],
	},
];

const rollbackCommands = [
	{
		fn: 'dropTable',
		params: ['order_items'],
	},
	{
		fn: 'dropTable',
		params: ['products'],
	},
	{
		fn: 'dropTable',
		params: ['orders'],
	},
	{
		fn: 'dropTable',
		params: ['units'],
	},
	{
		fn: 'dropTable',
		params: ['categories'],
	},
	{
		fn: 'dropTable',
		params: ['manufactures'],
	},
	{
		fn: 'dropTable',
		params: ['users'],
	},
];

module.exports = {
	pos: 0,
	up(queryInterface) {
		let index = this.pos;
		return new Promise(function (resolve, reject) {
			function next() {
				if (index < migrationCommands.length) {
					const command = migrationCommands[index];
					console.log(`[#${index}] execute: ${command.fn}`);
					index++;
					queryInterface[command.fn]
						.apply(queryInterface, command.params)
						.then(next, reject);
				} else resolve();
			}
			next();
		});
	},
	down(queryInterface) {
		let index = this.pos;
		return new Promise(function (resolve, reject) {
			function next() {
				if (index < rollbackCommands.length) {
					const command = rollbackCommands[index];
					console.log(`[#${index}] execute: ${command.fn}`);
					index++;
					queryInterface[command.fn]
						.apply(queryInterface, command.params)
						.then(next, reject);
				} else resolve();
			}
			next();
		});
	},
	info,
};
