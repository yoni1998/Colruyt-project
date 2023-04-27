import {View, FlatList} from 'react-native';
import React from 'react';
import BasketCard from '../components/BasketCard';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
import Loading from '../shared/Loading';
import useBaskets from '../hooks/useBasket';
const BasketListScreen = () => {
  const {isLoading, error, data} = useBaskets();
  const {isDarkMode}: any | boolean = useDarkModeStore();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
  }

  return (
    <View
      accessible={true}
      style={
        isDarkMode
          ? themeStyle.blackThemeBackground
          : themeStyle.lightThemeBackground
      }>
      {data && (
        <FlatList
          accessibilityLabel="list of all baskets"
          keyExtractor={(item: any) => item._id}
          data={data.baskets}
          renderItem={({item}: any) => (
            <BasketCard basketData={item} basketKey={item._key} />
          )}
        />
      )}
    </View>
  );
};

export default BasketListScreen;
