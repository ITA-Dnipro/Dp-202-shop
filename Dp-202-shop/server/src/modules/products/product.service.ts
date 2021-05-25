import { Manufacture } from '../../db/models/Manufacture.model';
import { Category } from '../../db/models/Category.model';
import { normalize, normalizeOne, delExtra, deleteKeys } from '../../common/helpers/dataNormalization';
import { Unit } from '../../db/models/Unit.model';
import { User } from '../../db/models/User.model';
import { Op } from 'sequelize';
import { Product, ProductAttributes } from '../../db/models/Product.model';
import { userService } from '../users/user.service';
import { NotFoundData } from '../../common/errors/notFoundData';

import { NotFound } from '../../common/errors/notFound';
import { IProduct as IProductFromBody } from '../../common/dtos/new.product.dto'
import { IProductsArray } from '../../common/dtos/orders.dto';

interface IBasicProduct extends ProductAttributes {
  category_id: number;
  manufacture_id: number;
  unit_id: number;
  user_id: number | void;
}


type allowedTables = 'categories' | 'manufactures' | 'units'

export interface IProduct extends IProductFromBody {
  id: number;
}

export type IFoundProductsArray = Array<{
  id: number,
  amount: number
}>


export interface IDbData {
  id: number;
  category?: string;
  manufacture?: string;
  units?: string;
}


export class ProductsService {

  async retrieveIdAmount(products: IProductsArray): Promise<IFoundProductsArray> {
    const ids: number[] = products.map(el => el.id);
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

  async checkIdExists(products: IProductsArray, foundProducts: IFoundProductsArray): Promise<Array<{ id: number }>> {
    const foundIds: number[] = foundProducts.map(product => product.id);
    const idNotExist = products.filter(product => {
      return !foundIds.includes(product.id)
    }).map(el => {
      return { 'id': el.id }
    });
    return idNotExist
  }

  async checkAvailability(products: IProductsArray, foundProducts: IFoundProductsArray): Promise<any> {
    return foundProducts.filter(el => {
      const item = products.find(val => { return val.id === el.id; });
      if (item.count > el.amount) { return el }
    });
  }


  async getTableData(tableName: allowedTables): Promise<void | Array<IDbData>> {

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
    if (rawTableData.length === 0) throw new NotFound(`${tableName} are not found`)
    const tableData = normalize(rawTableData);
    return tableData;
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
      where: {[columnName]: {[Op.iLike]: `%${rowName}%`}}
    });

    if (data.length === 0) {
      const newData = await tableModel.create(
        {[columnName]: rowName}
      );
      return newData.dataValues.id
    }
    return data.dataValues.id;
  }

  async getOrCreateRow(field: string, tableName: string): Promise<number> {
    let tableModel: any;
    let columnName: string;
    switch (field) {
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
    const data: any[] = await tableModel.findAll({
      attributes: ['id', columnName],
      where: {[columnName]: {[Op.iLike]: `%${tableName.toLowerCase()}%`}}
    });


    if (data.length === 0) {
      const newData = await tableModel.create(
        {[columnName]: tableName}
      );
      return normalizeOne(newData).id
    }
    return normalize(data)[0].id;
  };


  async replaceDataWithForeignKeys(product: IProductFromBody): Promise<any> {
    let productObj: Partial<IBasicProduct> = {};
    const notForeignKeys = ['product_name', 'amount', 'deleted', 'price', 'ingredients', 'img', 'vendor_code'];
    notForeignKeys.forEach(key => productObj[`${key}`] = product[`${key}`] ? product[`${key}`]: null)
    const valuesToFind: Array<{ [key: string]: string }> = [
      { value: product.category, field: 'category_id' },
      { value: product.manufacture, field: 'manufacture_id' },
      { value: product.unit, field: 'unit_id' }

    ];
    for (let i = 0; i < valuesToFind.length; i++) {
      productObj[`${valuesToFind[i].field}`] = await this.getOrCreateRow(valuesToFind[i].field, valuesToFind[i].value);
    }
    productObj.user_id = await userService.getSalesmanIdByLogin(product.salesman_login);

    return productObj
  }

  async addNewProduct(product: IProductFromBody): Promise<Array<ProductAttributes>> {
    const productForDB = await this.replaceDataWithForeignKeys(product);
    const rawNewProduct = await Product.create(productForDB);
    return [normalizeOne(rawNewProduct)];
  }

  async checkIdExist(id: number): Promise<Boolean> {
    const foundProduct = await Product.findAll({ where: { id } })
    return Boolean(foundProduct.length)
  }

  async updateProduct(id: number, productData: IProductFromBody): Promise<Array<ProductAttributes> | void> {
    const idExist = this.idIsExist(id, true);
    if (!idExist) { throw new NotFoundData([{ id: id }], 'This doesnt exist') };
    const productForDB = await this.replaceDataWithForeignKeys(productData);
    const updatedProduct = await Product.update(
      productForDB,

      {
        returning: true,
        where: { id: id }
      }
    );
    return [normalizeOne(updatedProduct[1][0])];
  }



  async deleteProduct(id: number) {
    const idExist = this.idIsExist(id, true)
    if (!idExist) throw new NotFoundData([{ id: id }], 'This doesnt exist');
    const idIsNotDeleted = this.idIsExist(id, false)
    if (idIsNotDeleted) throw new NotFoundData([{ id: id }], 'This id is already deleted');
    const deletedProduct = await Product.update(
      { deleted: true },
      {
        where: { id: id },
        returning: true
      }
    );
    return [normalizeOne(deletedProduct[1][0])];
  }

  async getAllProducts(): Promise<Array<IProductFromBody>> {
    const dbRes = await Product.findAll({
      where: {
        deleted: "false"
      },
      attributes: [
        "id",
        "vendor_code",
        "product_name",
        "amount",
        "price",
        "img"
      ],
      include: [
        {
          model: Category,
          attributes: ["category"]
        },
        {
          model: Manufacture,
          attributes: ["manufacture"]
        },
        {
          model: Unit,
          attributes: ["unit"]
        },
        {
          model: User,
          attributes: ["login"]
        }
      ]
    });
    const rawProducts = normalize(dbRes, [{category: ["category"]}, {unit: ["unit"]}, {manufacture: ["manufacture"]}, {user: ["login"]}]);
    return delExtra(rawProducts, ["user"])
  }

  async getOneProductById(id: number, showDeleted: boolean): Promise<IProductFromBody> {
    let isExist = await this.idIsExist(id, showDeleted);
    if (!isExist) {
      throw new NotFoundData([{id: id}], 'Id doesn\'t exist')
    } else {
      const dbRes = await Product.findOne({
        where: {
          id: id,
          deleted: showDeleted ? {[Op.or]: [true, false]} : showDeleted
        },
        attributes: [
          "id",
          "vendor_code",
          "product_name",
          "amount",
          "price",
          "img",
          "ingredients",
        ],
        include: [
          {
            model: Category,
            attributes: ["category"]
          },
          {
            model: Manufacture,
            attributes: ["manufacture"]
          },
          {
            model: Unit,
            attributes: ["unit"]
          },
          {
            model: User,
            attributes: ["login"]
          }
        ]
      })

      const rawProduct = normalizeOne(dbRes, [{category: ["category"]}, {unit: ["unit"]}, {user: ["login"]}, {manufacture: ["manufacture"]}]);
      return deleteKeys(rawProduct, ["user"]);
    }
  }

  async getAllProductsExtended(): Promise<Array<IProductFromBody>> {
    const dbRes = await Product.findAll({
      attributes: {
        exclude: ["unit_id", "manufacture_id", "category_id", "user_id"]
      },
      include: [
        {
          model: Category,
          attributes: ["category"]
        },
        {
          model: Manufacture,
          attributes: ["manufacture"]
        },
        {
          model: Unit,
          attributes: ["unit"]
        },
        {
          model: User,
          attributes: ["login"]
        }
      ]
    });

    const rawProducts = normalize(dbRes, [{category: ["category"]}, {unit: ["unit"]}, {user: ["name"]}, {manufacture: ["manufacture"]}, {user: ["login"]}])
    return delExtra(rawProducts, ["user"]);
  }

  async idIsExist(id: number, showDeleted: boolean): Promise<boolean> {

    const dbRes = await Product.findAll({
      where: {
        id: id,
        deleted: showDeleted ? {[Op.or]: [true, false]} : showDeleted
      }
    })

    return dbRes.length !== 0
  }
}

export const productsService = new ProductsService();
