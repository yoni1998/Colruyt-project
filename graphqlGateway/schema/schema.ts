import {
  idArg,
  inputObjectType,
  intArg,
  list,
  makeSchema,
  mutationField,
  nonNull,
  nullable,
  objectType,
  queryType,
  stringArg,
} from "nexus";

const Products = objectType({
  name: "Products",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.int("price"),
      t.string("productImage"),
      t.string("kcal"),
      t.boolean("inStock");
  },
});

const Product = objectType({
  name: "Product",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.int("price"),
      t.string("productImage"),
      t.string("kcal"),
      t.boolean("inStock");
  },
});

const ProductIds = objectType({
  name: "ProductId",
  definition(t) {
    t.string("_id"),
      t.string("amount"),
      t.field("productId", { type: "Product" });
  },
});

const Baskets = objectType({
  name: "Baskets",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.string("imageBackground"),
      t.field("products", { type: list("ProductId") });
  },
});

const Basket = objectType({
  name: "Basket",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.string("imageBackground"),
      t.field("products", { type: list("ProductId") });
  },
});

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
    t.field("product", {
      type: "Product",
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
          const result = await dataSources.productDatasource.getProduct(id);
          return result.DATA;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

const removeBasket = mutationField("removeBasket", {
  type: "Basket",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (root: any, { id }: any, { dataSources }: any, info: any) => {
    try {
      const result = await dataSources.basketDatasource.deleteBasket(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
});

const BasketInput = inputObjectType({
  name: "NewBasketInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("imageBackground");
  },
});

const BasketProductInput = inputObjectType({
  name: "BasketProductInput",
  definition(t) {
    t.nullable.string("productId");
    t.nonNull.int("amount");
  },
});

const createBasket = mutationField("createBasket", {
  type: "Basket",
  args: {
    input: BasketInput,
  },
  resolve: async (
    root: any,
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
});

const updateBasket = mutationField("updateBasket", {
  type: "Basket",
  args: {
    id: nonNull(idArg()),
    input: BasketInput,
  },
  resolve: async (
    root: any,
    { input, id }: any,
    { dataSources }: any,
    info: any
  ) => {
    try {
      const result = await dataSources.basketDatasource.updateBasket(id, input);
      return result;
    } catch (error) {
      throw error;
    }
  },
});

const removeProductFromBasket = mutationField("removeProductFromBasket", {
  type: "Baskets",
  args: {
    basketId: nonNull(idArg()),
    productId: nonNull(idArg()),
  },
  resolve: async (
    root: any,
    { productId, basketId }: any,
    { dataSources }: any,
    info: any
  ) => {
    try {
      const result = await dataSources.basketDatasource.deleteProductFromBasket(
        basketId,
        productId
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
});

const addProductToBasket = mutationField("addProductToBasket", {
  type: "Basket",
  args: {
    basketId: nonNull(idArg()),
    input: BasketProductInput,
  },
  resolve: async (
    root: any,
    { input, basketId }: any,
    { dataSources }: any,
    info: any
  ) => {
    try {
      const result = await dataSources.basketDatasource.addProductToBasket(
        basketId,
        input
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
});

const updateProductToBasket = mutationField("updateProductToBasket", {
  type: "Baskets",
  args: {
    basketId: nonNull(idArg()),
    productId: nonNull(idArg()),
    input: BasketProductInput,
  },
  resolve: async (
    root: any,
    { input, basketId, productId }: any,
    { dataSources }: any,
    info: any
  ) => {
    try {
      const result = await dataSources.basketDatasource.updateProductToBasket(
        basketId,
        productId,
        input
      );
      return result;
    } catch (error) {
      throw error;
    }
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
