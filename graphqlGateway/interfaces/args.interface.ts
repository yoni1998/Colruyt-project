export interface RemoveBasketArgs {
  id: string;
}

export interface createBasketArgs {
  input: {
    name: string;
    imageBackground: string;
  };
}
export interface updateBasketArgs {
  id: string;
  input: {
    name: string;
    imageBackground: string;
  };
}
export interface removeProductFromBasketArgs {
  productId: string;
  basketId: string;
}

export interface addProductToBasketArgs {
  basketId: string;
  input: {
    productId: string;
    quantity: number;
  };
}

export interface updateProductToBasketArgs {
  productId: string;
  basketId: string;
  input: {
    productId: string;
    quantity: number;
  };
}
