import { RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";
dotenv.config();
export class BasketDatasource extends RESTDataSource {
  ROOTPATH: string = process.env.ROOTPATH as string;
  SUBPATH: string = process.env.SUBPATH as string;
  constructor() {
    super();
  }
  async getAllBaskets() {
    return await this.get("http://localhost:7000/api/basket");
  }
  async getBasket(id: any) {
    return await this.get("http://localhost:7000/api/basket/" + id);
  }
  async deleteBasket(id: any) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete("http://localhost:7000/api/basket/" + id, options);
  }
  async addBasket(basket: any) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post("http://localhost:7000/api/basket/", basket, options);
  }
  async updateBasket(id: any, basket: any) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put("http://localhost:7000/api/basket/" + id, basket, options);
  }
}
