import { IBasket } from "../interfaces/basket.interface";
import { IProducts } from "../interfaces/products.interface";
import { RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";
dotenv.config();
export class BasketDatasource extends RESTDataSource {
  ROOTPATH: string = process.env.ROOTPATH as string;
  constructor() {
    super();
  }
  async getAllBaskets() {
    return await this.get(this.ROOTPATH);
  }
  async getBasket(id: string) {
    return await this.get(this.ROOTPATH + id);
  }
  async deleteBasket(id: string) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete(this.ROOTPATH + id, options);
  }
  async addBasket(basket: IBasket) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post(this.ROOTPATH, basket, options);
  }
  async updateBasket(id: string, basket: IBasket) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(this.ROOTPATH + id, basket, options);
  }
  async deleteProductFromBasket(basketId: string, productId: string) {
    const options = {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    };
    return this.delete(
      this.ROOTPATH + basketId + "/products/" + productId,
      options
    );
  }
  async addProductToBasket(basketId: string, product: IProducts) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post(this.ROOTPATH + basketId, product, options);
  }
  async updateProductToBasket(
    basketId: string,
    productId: string,
    product: IProducts
  ) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(
      this.ROOTPATH + basketId + "/products/" + productId,
      product,
      options
    );
  }
}
