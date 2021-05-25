import { CustomError } from '../errors/customError';

export interface IErrorObject {
	reason: string;
}

export type ValidationObject = IErrorObject | null;

export class Validator {
	public static isNumber(data): ValidationObject {
		if (!data) {
			throw new CustomError([], 'Data is absent');
		}

		if (/\D/.test(data)) {
			throw new CustomError([], 'Data is not valid integer');
		}

		return null;
	}

	public static validateQuery(categories): ValidationObject {
		const regexp = /\D/;

		if (categories.split(',').some((id) => regexp.test(id))) {
			throw new CustomError(
				[],
				`Category ID's should be numbers. Error in ${categories}`,
			);
		}

		return null;
	}

	public static validateOrder(products): ValidationObject {
		if (!products) {
			throw new CustomError([], 'Incorrect data');
		}

		if (!products.length) {
			throw new CustomError([], 'Products are empty');
		}

		const productsHasError = products.some((product) => {
			if (!product.hasOwnProperty('id') || !product.hasOwnProperty('count')) {
				return true;
			}

			if (!product.id || !product.count) {
				return true;
			}
		});

		if (productsHasError) {
			throw new CustomError([], 'Products contains invalid data');
			// return {reason: 'Products contains invalid data'};
		}

		// if (!user.hasOwnProperty('name') || !user.hasOwnProperty('phone')) {
		//   return {reason: 'User contains invalid data'};
		// }
		//
		// if (!user.name || !user.phone) {
		//   return {reason: 'User contains invalid data'};
		// }
		//
		// if (/\D/.test(user.phone)) {
		//   return {reason: 'User phone contains invalid data'};
		// }

		return null;
	}

	public static validateProductsCount(
		userProducts,
		resultProducts,
	): ValidationObject {
		let reason = '';
		userProducts.forEach((product) => {
			const { amount } = resultProducts.find((prod) => prod.id === product.id);
			if (product.count > amount) {
				reason = `${reason}\n Not enough products for product ${product.id}. There are: ${amount}.`;
			}
		});

		return reason ? { reason } : null;
	}
}
