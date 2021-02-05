import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import mealsReducer from './store/reducers/meals';
import {Provider} from 'react-redux';

enableScreens()

const rootReducer = combineReducers({
  meals: mealsReducer,
  // this is create to combine multiple reducers
})

const store = createStore(rootReducer);

const fetchFonts = () => {  
  return Font.loadAsync({
   'a': require('./assets/Fonts/OpenSans-Regular.ttf'),
   'b': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    return <AppLoading
    startAsync = {fetchFonts}
    onFinish={()=>setFontLoaded(true)}
    onError={(err) => console.log(err)}
    />
  }

  return (
    <Provider store={store}>
     <MealsNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
