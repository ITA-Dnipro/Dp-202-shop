import { Manufacture } from '../../db/models/Manufacture.model';
import { Category } from '../../db/models/Category.model';
import { normalize, normalizeOne } from '../../common/helpers/dataNormalization';
import { Unit } from '../../db/models/Unit.model';
import { User } from '../../db/models/User.model';
import { Op } from 'sequelize';
import { ProductAttributes } from '../../db/models/Product.model';
import { userService } from '../users/user.service';
import { Product } from '../../db/models/Product.model';
import { NotFoundData } from '../../common/errors/notFoundData';

interface IBasicProduct extends ProductAttributes {
  category_id: number;
  manufacture_id: number;
  unit_id: number;
  user_id: number
}

export interface IProduct {
  id: number;
  product_name: string;
  manufacture: string;
  category: string;
  unit: string;
  price: number;
  img: string;
  ingredients?: string
  user: string;
}

export interface IDbData {
  id: number;
  category?: string;
  manufacture?: string;
  units?: string;
  login?: string;
}

export class ProductsService {

  async retrieveIdAmount(products) {
    const ids = products.map(el => el.id);
    const rawProducts = await Product.findAll({
        attributes: ['id', 'amount'],
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });
   return normalize(rawProducts);
  };

  async checkIdExists(products, rows) {
    const foundIds = rows.map(product => product.id);
    return products.filter(product => {
        return !foundIds.includes(product.id)
    }).map(el => {
        return { 'id': el.id }
    });
  }

  async checkAvailability(products, rows) {
    return rows.filter(el => {
        const item = products.find(val => { return val.id === el.id; });
        if (item.count > el.amount) { return el }
    });
  }


  async getTableData(tableName: string): Promise<Array<IDbData>> {
    let tableColumn: string | string[];
    let tableModel: any;
    switch (tableName) {
      case 'categories':
        tableColumn = 'category';
        tableModel = Category;
        break;
      case 'manufactures':
        tableColumn = 'manufacture';
        tableModel = Manufacture;
        break;
      case 'units':
        tableColumn = 'unit';
        tableModel = Unit;
        break;
    }
    const rawTableData = await tableModel.findAll({
      attributes: ['id', tableColumn]
    });
    const tableData = normalize(rawTableData);
    return rawTableData;
  }

  async getDataId(rowName: string, tableName: string): Promise<IDbData> {
    let tableModel: any;
    let columnName: string;
    switch (tableName) {
      case 'category_id':
        tableModel = Category;
        columnName = 'category';
        break;
      case 'manufacture_id':
        tableModel = Manufacture;
        columnName = 'manufacture';
        break;
      case 'unit_id':
        tableModel = Unit;
        columnName = 'units';
        break;
      case 'user_id':
        tableModel = User;
        columnName = 'login';
        break;
      default:
        break;
    }
    const data = await tableModel.findAll({
      attributes: ['id', columnName],
      where: { [columnName]: { [Op.iLike]: `%${rowName}%` } }
    });

    if (data.length === 0) {
      const newData = await tableModel.create(
        { [columnName]: rowName }
      );
      return newData.dataValues.id
    }
    return data.dataValues.id;
  }

  async findOrCreateRow(rowName, tableName) {
    let tableModel: any;
    let columnName: any;
    switch (rowName) {
      case 'category_id':
        tableModel = Category;
        columnName = 'category';
        break;
      case 'manufacture_id':
        tableModel = Manufacture;
        columnName = 'manufacture';
        break;
      case 'unit_id':
        tableModel = Unit;
        columnName = 'unit';
        break;
      default:
        break;
    }
    const data = await tableModel.findAll({
      attributes: ['id', columnName],
      where: { [columnName]: { [Op.iLike]: `%${tableName.toLowerCase()}%` } }
    });
    console.log(data);

    if (data.length === 0) {
      const newData = await tableModel.create(
        { [columnName]: tableName }
      );
      return normalizeOne(newData).id
    }
    return normalizeOne(data).id;
  };


  async replaceStringsWithIds(product): Promise<IBasicProduct> {
    console.log(product);
    let productObj : any = {};
    const dataWithoutId = ['product_name', 'amount', 'deleted', 'price', 'ingridients', 'img', 'vendor_code']
    for (const [key, value] of Object.entries(product)) {
      if (dataWithoutId.includes(key)) {
        productObj[`${key}`] = value;
      }
    }
    const valuesToFind = [
      { value: product.category, field: 'category_id' },
      { value: product.manufacture, field: 'manufacture_id' },
      { value: product.unit, field: 'unit_id' }
    ];
    for (let i = 0; i < valuesToFind.length; i++) {
      productObj[`${valuesToFind[i].field}`] = await this.findOrCreateRow(valuesToFind[i].field, valuesToFind[i].value);
    }
    productObj.user_id = await userService.findOrCreateSalesman(product.user_id);
  return productObj
  }

  async addNewProduct(product) {
    const productForDB = await this.replaceStringsWithIds(product);
    console.log(productForDB);
    const rawNewProduct = await Product.create(productForDB);
    const newProduct = normalizeOne(rawNewProduct);
    return newProduct
  }

  async updateProduct(id, productData) {
    const productForDB = await this.replaceStringsWithIds(productData);
    const updatedProduct = Product.update(
      productForDB,
      { where: { id: id } }
    );
    return normalizeOne(updatedProduct);
  }
  async getOneProductById(id: number) {
    let result;
    if (result.length === 0) {
      throw new NotFoundData([{ id: id }], 'Id doesn\'t exist')
    }
  }
}


export const productsService = new ProductsService();
