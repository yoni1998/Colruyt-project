export const resolvers = {
  Query: {
    getAllProducts: async (
      root: any,
      _args: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.getAllProducts();
        return result.DATA;
      } catch (error) {
        throw error;
      }
    },
    getProduct: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.getProduct(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    getAllBaskets: async (
      root: any,
      _args: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.getAllBaskets();
        return result.DATA;
      } catch (error) {
        throw error;
      }
    },
    getBasket: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.getBasket(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    removeProduct: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.deleteProduct(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    createProduct: async (
      parent: any,
      { input }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.addProduct(input);
        return result;
      } catch (error) {
        throw error;
      }
    },
    updateProduct: async (
      parent: any,
      { input, id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.updateProduct(
          id,
          input
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    removeBasket: async (
      root: any,
      { id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.deleteBasket(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    createBasket: async (
      parent: any,
      { input }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.addBasket(input);
        return result;
      } catch (error) {
        throw error;
      }
    },
    updateBasket: async (
      parent: any,
      { input, id }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.updateBasket(
          id,
          input
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};
