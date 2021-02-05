import React, {useEffect, useCallback} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (<View style={styles.listItem}>
    <DefaultText>{props.children}</DefaultText>
  </View>)
}

const MealDetailsScreen = (props) => {

  const availableMeals = useSelector(state=> state.meals.meals);
  const mealId = props.navigation.getParam('mealId')
  const currentMealIsFavorite = useSelector(state=> state.meals.favoriteMeals.some(meal => meal.id===mealId));
  const selectedMeal = availableMeals.find(meal => meal.id === mealId)

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() =>{
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId])



  useEffect(() => {
    // props.navigation.setParams({
    //   mealTitle: selectedMeal.title,
    // })
    props.navigation.setParams({
      toggleFavorite: toggleFavoriteHandler,
    })
  }, [selectedMeal])

  useEffect(() => {
   props.navigation.setParams({isFav: currentMealIsFavorite})
  }, [currentMealIsFavorite])

  console.log(selectedMeal);
  return (
    <ScrollView>
      <Image source={{uri:selectedMeal.imgUrl}} style={styles.image}/>
      <View style={styles.details}>
            <DefaultText>{selectedMeal.duration}m</DefaultText>
            <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
          </View>
          <Text style={styles.title}>Ingrediants</Text>
          {selectedMeal.ingrediants.map((ingredient,index) => {
            return <ListItem key={index}>{ingredient}</ListItem>;
          })}
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map((step,index) => {
            return <ListItem key={index}>{step}</ListItem>;
          })}
      <View style={styles.screen}>
        <Text>{selectedMeal.title}</Text>
        <Button title="Go Back to Categories" onPress={()=>props.navigation.popToTop()}/>
      </View>
    </ScrollView>
  );
}

MealDetailsScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam('mealId');
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const toggleFavorite = navigationData.navigation.getParam('toggleFavorite');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const isFavorite = navigationData.navigation.getParam('isFav');


  return {
    headerTitle: mealTitle,
    headerRight: ()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Favorite' 
      iconName={isFavorite? 'ios-star' : 'ios-star-outline'}
      onPress={toggleFavorite}/>
    </HeaderButtons>)
  }
}

const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:200,
  },
  details:{
    flexDirection:'row',
    padding:15,
    justifyContent:'space-around',
  }, 
  title:{
    fontFamily:'b',
    fontSize:22,
    textAlign:'center',
  },
  listItem:{
    marginVertical:10,
    marginHorizontal:20,
    borderColor:'#ccc',
    borderWidth:1,
    padding:10,
  }
})

export default MealDetailsScreen;