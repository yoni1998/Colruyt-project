import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {ADD_PRODUCT_TO_BASKET} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useAddProductToBasket = ({basketId}: any) => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, ADD_PRODUCT_TO_BASKET, {
        addProductToBasketId: basketId,
        input: data,
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useAddProductToBasket;
