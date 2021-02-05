import React from 'react';
import {useSelector} from 'react-redux';
import {CATEGORIES} from '../data/dummyData';
import Colors from '../constants/Colors'
import { FlatList } from 'react-native-gesture-handler';
import MealItem from '../components/MealItem'
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import {View, Text, StyleSheet} from 'react-native';

const CategorieMealScreen = (props) => {

  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.category.indexOf(catId) >= 0
    )
    
    if(displayedMeals.length===0){
      return ( 
      <View style={styles.content}>
        <DefaultText>Nothing to see. Check your filters!</DefaultText>
      </View>)
    }

  return (
    <MealList listData={displayedMeals} navigation={props.navigation}/>
  );
}

CategorieMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
    };
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }

})

export default CategorieMealScreen;