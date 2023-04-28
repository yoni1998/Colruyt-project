import Products from './Products.interface';

interface Basket {
  _id?: string;
  name: string;
  imageBackground: string;
  products?: Products[];
}

export default Basket;
