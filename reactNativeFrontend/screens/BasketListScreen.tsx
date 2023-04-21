import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {GET_ALL_BASKETS} from '../queries/basketQueries';
import {useQuery} from '@apollo/client';
import BasketCard from '../components/BasketCard';
import {useDarkModeStore} from '../components/Settings';
import {themeStyle} from '../constants/Theme';
const BasketListScreen = () => {
  const {loading, error, data} = useQuery(GET_ALL_BASKETS);
  const {isDarkMode}: any | boolean = useDarkModeStore();

  if (loading) {
    return <Text>loading...</Text>;
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
          data={data.getAllBaskets}
          renderItem={({item}: any) => (
            <BasketCard basketData={item} basketKey={item._key} />
          )}
        />
      )}
    </View>
  );
};

export default BasketListScreen;
