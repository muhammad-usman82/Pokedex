import React from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './components/MainPage';
import UploadPokemon from './components/UploadPokemon';
import database, {initDatabase} from './components/Database';
import PokemonsList from './components/PokemonsList';
import PokemonDetail from './components/PokemonDetail';
// Create a stack navigator
const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Initialize the database when the app starts
    initDatabase();
  }, []);

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Text>I am here</Text>
    //   </ScrollView>
    // </SafeAreaView>
    // <SafeAreaView style={backgroundStyle}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UploadPokemon"
          component={UploadPokemon}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PokemonsList"
          component={PokemonsList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
