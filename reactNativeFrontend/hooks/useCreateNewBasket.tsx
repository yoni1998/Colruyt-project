import {useMutation} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {ADD_NEW_BASKET} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';

const useCreateNewBasket = () => {
  const {mutate, isLoading, isSuccess, isError} = useMutation(
    async (data: any) => {
      return await request(graphqlUri, ADD_NEW_BASKET, {
        input: data,
      });
    },
  );

  return {mutate, isLoading, isSuccess, isError};
};

export default useCreateNewBasket;
