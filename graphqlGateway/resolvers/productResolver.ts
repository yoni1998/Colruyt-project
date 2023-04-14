export const resolvers = {
  Query: {
    // products
    getAllProducts: async (
      root: any,
      _args: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.productDatasource.getAllProducts(
          _args.search
        );
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
    // basket
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
    // products
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
    // basket
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
    removeProductFromBasket: async (
      root: any,
      { id, productId }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        console.log(productId);
        const result =
          await dataSources.basketDatasource.deleteProductFromBasket(
            id,
            productId
          );
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
    addProductToBasket: async (
      parent: any,
      { id, input }: any,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result = await dataSources.basketDatasource.addProductToBasket(
          id,
          input
        );
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
