import React from 'react'; 
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const CategoryGridTile = (props) =>{

  return (
    <TouchableOpacity  style={styles.gridItem} onPress={props.onSelect}>
      <View style={{...styles.contianer,...{backgroundColor:props.color}}}>
        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem:{
    flex:1,
    margin: 15,
    height:150,
  },
  contianer: {
    flex:1,
    borderRadius: 10,
    elevation:5,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems:'flex-end',
  },
  title:{
    fontFamily: 'b',
    fontSize:16,
  }
})

export default CategoryGridTile;