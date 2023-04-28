import Product from './Product.interface';

interface Products {
  _id?: string;
  productId: [Product];
  amount: string;
}

export default Products;
