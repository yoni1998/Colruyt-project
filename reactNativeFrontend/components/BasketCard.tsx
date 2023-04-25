import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {GET_ALL_BASKETS, REMOVE_BASKET_ON_ID} from '../queries/basketQueries';
import {useMutation} from '@apollo/client';
import {showToastWithGravity} from '../shared/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';

const BasketCard = ({basketData, basketKey}: any) => {
  const navigation = useNavigation() as any;
  const [basketId, setBasketId] = useState('');

  const [deleteBasket] = useMutation(REMOVE_BASKET_ON_ID, {
    variables: {
      removeBasketId: basketId,
    },
    refetchQueries: () => [
      {
        query: GET_ALL_BASKETS,
      },
    ],
  });

  useEffect(() => {
    if (basketId) {
      deleteBasket()
        .then(() => {
          showToastWithGravity('het winkelmandje is verwijderd');
        })
        .catch(err => console.error(err));
    }
  }, [basketId, deleteBasket]);

  const deleteBasketOnId = (id: any) => {
    setBasketId(id);
  };

  const renderRightActions = (id: any) => {
    return (
      <RectButton
        style={styles.rightAction}
        onActiveStateChange={() => deleteBasketOnId(id)}
        shouldActivateOnStart={true}>
        <Icon name="trash" color="white" size={35} />
      </RectButton>
    );
  };

  const renderLeftActions = (item: any) => {
    return (
      <RectButton
        style={styles.leftAction}
        onActiveStateChange={() =>
          navigation.navigate('Basket factory', {basketData: item})
        }
        shouldActivateOnStart={true}>
        <Icon name="edit" color="white" size={35} />
      </RectButton>
    );
  };

  return (
    <View key={basketKey} accessible={true}>
      <Swipeable
        renderRightActions={() => renderRightActions(basketData?._id)}
        renderLeftActions={() => renderLeftActions(basketData)}>
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
                {basketData?.naam}
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
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ee0303',
  },
  leftAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3b3bf6',
  },
});

export default BasketCard;
