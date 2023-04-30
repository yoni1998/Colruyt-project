import Product from './Product.interface';

interface Products {
  _id?: string;
  productId: [Product];
  quantity: string;
}

export default Products;
