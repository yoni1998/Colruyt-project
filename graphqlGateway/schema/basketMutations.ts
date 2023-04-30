import { mutationField, nonNull, idArg } from "nexus";
import { BasketInput, BasketProductInput } from "./basketTypes";
import {
  RemoveBasketArgs,
  addProductToBasketArgs,
  createBasketArgs,
  removeProductFromBasketArgs,
  updateBasketArgs,
  updateProductToBasketArgs,
} from "../interfaces/args.interface";

export const removeBasket = mutationField("removeBasket", {
  type: "Basket",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (
    _: any,
    { id }: RemoveBasketArgs,
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
});

export const createBasket = mutationField("createBasket", {
  type: "Basket",
  args: {
    input: BasketInput,
  },
  resolve: async (
    _: any,
    { input }: createBasketArgs,
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

export const updateBasket = mutationField("updateBasket", {
  type: "Basket",
  args: {
    id: nonNull(idArg()),
    input: BasketInput,
  },
  resolve: async (
    root: any,
    { input, id }: updateBasketArgs,
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

export const removeProductFromBasket = mutationField(
  "removeProductFromBasket",
  {
    type: "Baskets",
    args: {
      basketId: nonNull(idArg()),
      productId: nonNull(idArg()),
    },
    resolve: async (
      root: any,
      { productId, basketId }: removeProductFromBasketArgs,
      { dataSources }: any,
      info: any
    ) => {
      try {
        const result =
          await dataSources.basketDatasource.deleteProductFromBasket(
            basketId,
            productId
          );
        return result;
      } catch (error) {
        throw error;
      }
    },
  }
);

export const addProductToBasket = mutationField("addProductToBasket", {
  type: "Basket",
  args: {
    basketId: nonNull(idArg()),
    input: BasketProductInput,
  },
  resolve: async (
    root: any,
    { input, basketId }: addProductToBasketArgs,
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

export const updateProductToBasket = mutationField("updateProductToBasket", {
  type: "Baskets",
  args: {
    basketId: nonNull(idArg()),
    productId: nonNull(idArg()),
    input: BasketProductInput,
  },
  resolve: async (
    root: any,
    { input, basketId, productId }: updateProductToBasketArgs,
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
