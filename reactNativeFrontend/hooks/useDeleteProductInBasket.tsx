import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {DELETE_PRODUCT_IN_BASKET} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useDeleteProductInBasket = () => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, DELETE_PRODUCT_IN_BASKET, {
        basketId: data.basketId,
        productId: data.id,
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useDeleteProductInBasket;
