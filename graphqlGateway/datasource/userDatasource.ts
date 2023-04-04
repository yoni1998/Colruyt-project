import { RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";
dotenv.config();
export class UserDatasource extends RESTDataSource {
  ROOTPATH: string = process.env.ROOTPATH as string;
  SUBPATH: string = process.env.SUBPATH as string;
  constructor() {
    super();
  }
  async getAllPersons() {
    return await this.get(this.ROOTPATH);
  }
  async getPerson(id: any) {
    return await this.get(this.SUBPATH + id);
  }
  async deletePerson(id: any) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete(this.SUBPATH + id, options);
  }
  async addPerson(person: any) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post(this.SUBPATH, person, options);
  }
  async updatePerson(id: any, person: any) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(this.SUBPATH + id, person, options);
  }
}
