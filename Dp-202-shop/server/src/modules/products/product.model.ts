import postgresPool from '../../db/db-adapter';

export interface IProduct {
  id: number;
  name: string;
  manufacture: string;
  category: string;
  units: string;
  price: number;
  img: string;
  ingredients? : string
}

class ProductModel {
  async getList(): Promise<Array<IProduct>> {
    const query = `SELECT products.id, products.name AS name, manufactures.name AS manufacture, categories.name AS category, units, price, img
                  FROM products
                  LEFT JOIN categories ON products.category_id = categories.id
                  LEFT JOIN manufactures ON products.manufacture_id = manufactures.id`;
    const request = await postgresPool.query(query);
    return request.rows;
  }

  async findOne(id: string): Promise<Array<IProduct>> {
    const query = `SELECT products.id, products.name AS name, manufactures.name AS manufacture, categories.name AS category, units, price, img
                  FROM products
                  LEFT JOIN categories ON products.category_id = categories.id
                  LEFT JOIN manufactures ON products.manufacture_id = manufactures.id
                  WHERE products.id = $1`;
    const request = await postgresPool.query(query, [id]);
    return request.rows;
  }

  async findByQuery(categories, products, manufactures): Promise<Array<IProduct>> {
    const query = this.buildQuery(categories, products, manufactures);
    const request = await postgresPool.query(query);
    return request.rows;
  }

  private buildQuery(categories: string, products: string, manufactures: string): string {
    const categoriesQuery = categories ? categories.split(',').map(c => `categories.id = ${c}`).join(' OR ') : true;
    return `SELECT products.id, products.name AS name, manufactures.name AS manufacture, categories.name AS category, units, price, img
            FROM products
            LEFT JOIN categories ON products.category_id = categories.id
            LEFT JOIN manufactures ON products.manufacture_id = manufactures.id
            WHERE (${categoriesQuery})
            AND (LOWER(manufactures.name) LIKE LOWER('%${manufactures || ''}%') AND LOWER(products.name) LIKE LOWER('%${products || ''}%'));`;
  }
}

export const productModel = new ProductModel();
