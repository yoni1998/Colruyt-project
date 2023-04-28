import { RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";
import { IProduct } from "../interfaces/product.interface";
dotenv.config();
export class ProductDatasource extends RESTDataSource {
  SUBPATH: string = process.env.SUBPATH as string;
  constructor() {
    super();
  }
  async getAllProducts(search: any, minPrice: any, maxPrice: any) {
    return await this.get(`http://localhost:7000?`, {
      search,
      minPrice,
      maxPrice,
    });
  }
  async getProduct(id: string) {
    return await this.get(this.SUBPATH + id);
  }
  async deleteProduct(id: string) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete(this.SUBPATH + id, options);
  }
  async addProduct(product: IProduct) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post(this.SUBPATH, product, options);
  }
  async updateProduct(id: string, product: IProduct) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(this.SUBPATH + id, product, options);
  }
}
