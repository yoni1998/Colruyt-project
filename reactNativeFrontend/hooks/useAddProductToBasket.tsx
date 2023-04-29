import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {ADD_PRODUCT_TO_BASKET} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useAddProductToBasket = () => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, ADD_PRODUCT_TO_BASKET, {
        addProductToBasketId: data.basketId,
        input: {
          productId: data.productId,
          amount: data.amount,
        },
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useAddProductToBasket;
