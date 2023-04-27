import {useQuery} from 'react-query';
import {request} from '../node_modules/graphql-request/build/esm/index';
import {graphqlUri} from '../constants/GraphqlAccess';
import {GET_PRODUCTS} from '../queries/productQueries';
import Product from '../interfaces/Product.interface';
const useProducts = ({search, minPrice, maxPrice}: any) => {
  const {data, isLoading, error} = useQuery(
    ['products', search, minPrice, maxPrice],
    async () => {
      const products: Product = await request(graphqlUri, GET_PRODUCTS, {
        search,
        minPrice,
        maxPrice,
      });
      return products;
    },
  );

  return {data, isLoading, error};
};

export default useProducts;
