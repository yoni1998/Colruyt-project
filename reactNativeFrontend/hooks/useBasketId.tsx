import {useQuery} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {GET_BASKET_ON_ID} from '../queries/basketQueries';
import {graphqlUri} from '../constants/GraphqlAccess';
const useBasketId = ({basketId}: any) => {
  const {data, isLoading, error} = useQuery(['basket', basketId], async () => {
    const basket: any = await request(graphqlUri, GET_BASKET_ON_ID, {
      getBasketId: basketId,
    });
    return basket;
  });

  return {data, isLoading, error};
};

export default useBasketId;
