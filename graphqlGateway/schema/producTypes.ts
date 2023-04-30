import { objectType } from "nexus";

export const Products = objectType({
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

export const Product = objectType({
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

export const ProductIds = objectType({
  name: "ProductId",
  definition(t) {
    t.string("_id"),
      t.string("quantity"),
      t.field("productId", { type: "Product" });
  },
});
