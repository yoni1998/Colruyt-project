import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {UPDATE_BASKET_ON_ID} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useUpdateNewBasket = ({basketId}: any) => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, UPDATE_BASKET_ON_ID, {
        updateBasketId: basketId,
        input: data,
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useUpdateNewBasket;
