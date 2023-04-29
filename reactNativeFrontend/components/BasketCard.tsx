import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {showToastWithGravity} from '../shared/Toast';
import useRemoveBasket from '../hooks/useRemoveBasket';
import {queryClient} from '../constants/GraphqlAccess';
import Basket from '../interfaces/Basket.interface';
import {renderLeftActions, renderRightActions} from '../shared/Swipeable';

interface BasketProps {
  basketData: Basket;
  basketKey: string;
}

const BasketCard = ({basketData, basketKey}: BasketProps) => {
  const navigation = useNavigation() as any;
  const removeBasket = useRemoveBasket();

  const deleteBasketOnId = (id: any) => {
    removeBasket.mutate(id);
    showToastWithGravity('The basket is deleted successfully');
  };

  if (removeBasket.isSuccess) {
    queryClient.refetchQueries('baskets');
  }

  return (
    <View key={basketKey} accessible={true}>
      <Swipeable
        renderRightActions={() => renderRightActions()}
        renderLeftActions={() => renderLeftActions()}
        onSwipeableRightOpen={() => deleteBasketOnId(basketData?._id)}
        onSwipeableLeftOpen={() =>
          navigation.navigate('Basket factory', {basketData: basketData})
        }>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Basket', {basketId: basketData?._id})
          }>
          <ImageBackground
            source={{
              uri:
                basketData.imageBackground ||
                'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg',
            }}
            style={styles.catoImage}>
            <View style={styles.gridContainer}>
              <Text style={styles.textStyle} numberOfLines={2}>
                {basketData?.name}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  catoImage: {
    width: '100%',
    justifyContent: 'flex-end',
    height: 120,
  },
  gridContainer: {},
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },

  textStyle: {
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#1c1c1c',
    backgroundColor: '#ffffff80',
  },
});

export default BasketCard;
