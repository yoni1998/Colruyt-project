import {View, FlatList, Text, StyleSheet} from 'react-native';
import React from 'react';
import BasketCard from '../components/BasketCard';
import {useDarkModeStore} from '../hooks/useDarkModeStore';
import {themeStyle} from '../constants/Theme';
import Loading from '../shared/Loading';
import useBaskets from '../hooks/useBaskets';
import Error from '../shared/Error';
const BasketListScreen = () => {
  const {isLoading, error, data} = useBaskets();
  const {isDarkMode}: any | boolean = useDarkModeStore();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
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
      {!data?.baskets.length && (
        <View style={styles.container}>
          <Text style={styles.emptyText}>No Baskets found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default BasketListScreen;
