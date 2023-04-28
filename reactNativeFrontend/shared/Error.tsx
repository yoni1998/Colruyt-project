import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const Error = ({error}: any) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <View>
      <Text>An Error has occurred</Text>
    </View>
  );
};

export default Error;
