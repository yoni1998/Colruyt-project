import { RESTDataSource } from "apollo-datasource-rest";

class UserDatasource extends RESTDataSource {
  constructor() {
    super();
  }
  async getAllPersons() {
    return this.get(`http://localhost:7000/api/users`);
  }
}
export default UserDatasource;
