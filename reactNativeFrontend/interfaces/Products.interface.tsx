import Product from './Product.interface';

interface Products {
  _id?: string;
  productId: [Product];
  aantal: string;
}

export default Products;
