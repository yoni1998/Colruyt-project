import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {REMOVE_BASKET_ON_ID} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';
import Basket from '../interfaces/Basket.interface';

const useRemoveBasket = () => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: Basket) => {
      return await request(graphqlUri, REMOVE_BASKET_ON_ID, {
        removeBasketId: data,
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useRemoveBasket;
