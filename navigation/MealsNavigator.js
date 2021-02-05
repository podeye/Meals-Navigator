import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import {Platform} from 'react-native'; 
import Colors from '../constants/Colors';
import FavoriteScreen from '../screens/FavoritesScreen';
import {Ionicons} from '@expo/vector-icons';
import {createDrawerNavigator} from 'react-navigation-drawer';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle:{
      fontFamily: 'a',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
  };

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen, 
  CategoryMeals: CategoryMealsScreen,
  MealDetails: MealDetailsScreen,
}, {
  defaultNavigationOptions: defaultStackNavOptions,
});

const FavNavigator = createStackNavigator({
  Favorites: FavoriteScreen, 
  MealDetail: MealDetailsScreen
},{
  defaultNavigationOptions: defaultStackNavOptions,
})

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {screen: MealsNavigator, navigationOptions:{
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
    }
  }},
  Favorites: {screen: FavNavigator, navigationOptions:{
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
    }
  }},
}, 
{
  tabBarOptions: {
    activeTintColor: Colors.accentColor,
  }
});

// We create this navigator to get the default header and no other reason
const FiltersNavigator = createStackNavigator({
  Filters:FiltersScreen,
}, 
{
  defaultNavigationOptions: defaultStackNavOptions,
})

const MainNavigator = createDrawerNavigator({
  MealsFavs:{screen:MealsFavTabNavigator, navigationOptions:{
    drawerLabel:'Meals',
  }},
  Filters: FiltersNavigator,
},
{
  contentOptions:{
    activeTintColor:Colors.accentColor,
    labelStyle:{
      fontFamily:'a',
    }
  }
});

export default createAppContainer(MainNavigator);
