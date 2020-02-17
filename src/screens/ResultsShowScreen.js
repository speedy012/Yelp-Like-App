import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const ResultsSchowScreen = ({ navigation }) => {
  const [result, setResult] = useState([])
  // getParam gets the id for you
  const id = navigation.getParam('id')

  console.log(result)

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }
  //so you won't constantly fetch use useEffect
  useEffect(() => {
    getResult(id)
  }, [])

  if(!result) {
    return null;
  }

  return (
    <View>
      <Text>{result.name} </Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({item}) => {
          return <Image style={styles.image} source={{uri: item }}/>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300
  }
})

export default ResultsSchowScreen
