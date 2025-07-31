import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MovieDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View >
      <Text >Movie Detail Screen for ID: {id}</Text>
    </View>
  )
}

export default MovieDetail;
