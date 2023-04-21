import { RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";
dotenv.config();
export class ProductDatasource extends RESTDataSource {
  ROOTPATH: string = process.env.ROOTPATH as string;
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
  async getProduct(id: any) {
    return await this.get("http://localhost:7000/api/product/" + id);
  }
  async deleteProduct(id: any) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete(
      "http://localhost:7000/api/product/" + id,
      options
    );
  }
  async addProduct(product: any) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post("http://localhost:7000/api/product/", product, options);
  }
  async updateProduct(id: any, product: any) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(
      "http://localhost:7000/api/product/" + id,
      product,
      options
    );
  }
}
