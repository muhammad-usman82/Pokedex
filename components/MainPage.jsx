import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PokemonImage from '../assets/pokemonimage.png';

const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={PokemonImage} style={styles.image} />
      </View>

      <View>
        <Text style={styles.heading}>Pokédex</Text>
      </View>

      <View style={styles.uploadButton}>
        <TouchableOpacity onPress={() => navigation.navigate('UploadPokemon')}>
          <Text style={styles.buttonText}>Add Pokémon</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.saveButton}>
        <TouchableOpacity onPress={() => navigation.navigate('PokemonsList')}>
          <Text style={styles.buttonText}>View Pokémons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // This will make the container fill the entire screen
    justifyContent: 'center', // This centers children vertically in the container
    alignItems: 'center', // This centers children horizontally in the container
    padding: 25,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
    margin: 30,
  },
  saveButton: {
    width: '100%', // Full width
    marginBottom: 20,
    borderRadius: 15,
    padding: 13,
    backgroundColor: 'aqua', // Or any vibrant color you prefer
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  uploadButton: {
    width: '100%', // Full width
    marginBottom: 20,
    borderRadius: 15,
    padding: 13,
    backgroundColor: 'lightgreen', // Or any vibrant color you prefer
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Elevation for Android
    // height: 60
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
