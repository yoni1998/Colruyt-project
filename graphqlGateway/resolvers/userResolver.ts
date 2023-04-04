export const resolvers = {
  Query: {
    getAllPersons: async (
      root: any,
      _args: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.userDatasource.getAllPersons();
        return result.DATA;
      } catch (error) {
        throw error;
      }
    },
    getPerson: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.userDatasource.getPerson(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    removeUser: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.userDatasource.deletePerson(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    createUser: async (
      parent: any,
      { input }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.userDatasource.addPerson(input);
        return result;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (
      parent: any,
      { input, id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.userDatasource.updatePerson(id, input);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};
