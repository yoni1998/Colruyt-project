import {useQuery} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {GET_ALL_BASKETS} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';
import Basket from '../interfaces/Basket.interface';
const useBaskets = () => {
  const {data, isLoading, error} = useQuery('baskets', async () => {
    const baskets: Basket = await request(graphqlUri, GET_ALL_BASKETS);
    return baskets;
  });

  return {data, isLoading, error};
};

export default useBaskets;
