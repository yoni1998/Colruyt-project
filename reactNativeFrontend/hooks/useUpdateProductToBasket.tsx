import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {UPDATE_PRODUCT_IN_BASKET} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useUpdateProductToBasket = () => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, UPDATE_PRODUCT_IN_BASKET, {
        productId: data.productId,
        basketId: data.basketId,
        input: {
          amount: data.input,
        },
      });
    },
  );
  return {mutate, isLoading, isSuccess, isError};
};

export default useUpdateProductToBasket;
