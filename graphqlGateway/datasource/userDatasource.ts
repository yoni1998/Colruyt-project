import { RESTDataSource } from "apollo-datasource-rest";

export class UserDatasource extends RESTDataSource {
  constructor() {
    super();
  }
  async getAllPersons() {
    return await this.get(`http://localhost:7000/api/users`);
  }
  async getPerson(id: any) {
    return await this.get(`http://localhost:7000/api/user/${id}`);
  }
  async deletePerson(id: any) {
    let options = {
      method: "delete",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };
    return await this.delete(`http://localhost:7000/api/user/${id}`, options);
  }
  async addPerson(person: any) {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    return this.post(`http://localhost:7000/api/user`, person, options);
  }
  async updatePerson(id: any, person: any) {
    const options = {
      method: "put",
      headers: { "Content-Type": "application/json" },
    };
    return this.put(`http://localhost:7000/api/user/${id}`, person, options);
  }
}
