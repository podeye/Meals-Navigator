import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';


const FilterSwitch = props => {

  return(    
  <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch value={props.state}
     trackColor={{false:'#ccc',true:Colors.accentColor}}
     thumbColor={Colors.primaryColor}
     onValueChange={props.onChange}/>
  </View>)
}

const FilterScreen = (props) => {

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setisLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() =>{
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian,
    }
    dispatch(setFilters(appliedFilters));
  },[isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    props.navigation.setParams({save: saveFilters});}, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch label='Gluten-free' 
      state={isGlutenFree} 
      onChange={newValue=>setIsGlutenFree(newValue)}/>
      <FilterSwitch label='Lactose-free' 
      state={isLactoseFree} 
      onChange={newValue=>setisLactoseFree(newValue)}/>
      <FilterSwitch label='Vegan' 
      state={isVegan} 
      onChange={newValue=>setIsVegan(newValue)}/>
      <FilterSwitch label='Vegitarian' 
      state={isVegetarian} 
      onChange={newValue=>setIsVegetarian(newValue)}/>
    </View>
  );
}

FilterScreen.navigationOptions = (navData) => {
  return{
  headerTitle:'Your Filters',
  headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName="ios-menu" onPress={()=>{
      navData.navigation.toggleDrawer();
    }}/>
  </HeaderButtons>),
  headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')}/>
  </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1, 
    alignItems:'center',
  },
   title:{
    fontFamily:'b',
    fontSize:22,
    margin:20,
    textAlign:'center'
   },
   filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width:'80%',
    marginVertical:15,
   }
})

export default FilterScreen;