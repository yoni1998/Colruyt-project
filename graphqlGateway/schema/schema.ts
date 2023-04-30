import {
  intArg,
  makeSchema,
  nonNull,
  nullable,
  queryType,
  stringArg,
} from "nexus";
import { Product, Products, ProductIds } from "./producTypes";
import { Basket, Baskets } from "./basketTypes";
import {
  removeBasket,
  createBasket,
  updateBasket,
  removeProductFromBasket,
  addProductToBasket,
  updateProductToBasket,
} from "./basketMutations";

const Query = queryType({
  definition(t) {
    t.list.field("products", {
      type: "Products",
      args: {
        search: nonNull(stringArg()),
        minPrice: nullable(intArg()),
        maxPrice: nullable(intArg()),
      },
      resolve: async (
        root: any,
        _args: any,
        { dataSources }: any,
        info: any
      ) => {
        try {
          const result = await dataSources.productDatasource.getAllProducts(
            _args.search,
            _args.minPrice,
            _args.maxPrice
          );
          return result.DATA;
        } catch (error) {
          throw error;
        }
      },
    });
    t.list.field("baskets", {
      type: "Baskets",
      resolve: async (
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
    });
    t.field("basket", {
      type: "Basket",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (
        root: any,
        { id }: any,
        { dataSources }: any,
        info: any
      ) => {
        try {
          const result = await dataSources.basketDatasource.getBasket(id);
          return result.DATA;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Products,
    Product,
    Basket,
    Baskets,
    ProductIds,
    removeBasket,
    createBasket,
    updateBasket,
    removeProductFromBasket,
    addProductToBasket,
    updateProductToBasket,
  ],
});
