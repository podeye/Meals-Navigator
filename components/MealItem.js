import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import DefaultText from '../components/DefaultText';

const MealItem = (props) =>{

  const {item} = props;

  return(
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{...styles.mealRow,...styles.mealHeader}}>
            <ImageBackground source={{uri:item.imgUrl}} style={styles.bgImage}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
            <DefaultText>{item.duration}m</DefaultText>
            <DefaultText>{item.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{item.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mealItem:{
    height:200,
    width: '100%',
    backgroundColor:'#ccc',
    borderRadius:10,
    overflow:'hidden',
    marginVertical:5,
  },
  mealRow:{
    flexDirection:'row',
  },
  mealHeader:{
    height:'90%',
  },
  mealDetail:{
    paddingHorizontal:10,
    justifyContent:'space-between',
  },
  bgImage:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-end'
  },
  title:{
    fontFamily:'b',
    fontSize:18,
    color:'white',
    backgroundColor:'rgba(0,0,0,0.7)',
    paddingVertical:5,
    paddingHorizontal:12,
    textAlign:'center'
  }
})

export default MealItem;