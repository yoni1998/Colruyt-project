import { objectType, list, inputObjectType } from "nexus";

export const Baskets = objectType({
  name: "Baskets",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.string("imageBackground"),
      t.field("products", { type: list("ProductId") });
  },
});

export const Basket = objectType({
  name: "Basket",
  definition(t) {
    t.id("_id"),
      t.string("name"),
      t.string("imageBackground"),
      t.field("products", { type: list("ProductId") });
  },
});

export const BasketInput = inputObjectType({
  name: "NewBasketInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("imageBackground");
  },
});

export const BasketProductInput = inputObjectType({
  name: "BasketProductInput",
  definition(t) {
    t.nullable.string("productId");
    t.nonNull.int("quantity");
  },
});
