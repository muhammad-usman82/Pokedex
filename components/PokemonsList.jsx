import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import database from './Database'; // Import the database module
import Icon from '../assets/fast-forward.png';
import PokemonImage from '../assets/pokemonimage.png';

const PokemonsList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pokemons',
        [],
        (_, {rows}) => {
          const newData = [];
          for (let i = 0; i < rows.length; i++) {
            newData.push(rows.item(i));
          }
          setData(newData);
        },
        (_, error) => {
          console.error('Error fetching data', error);
        },
      );
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const newData = data.filter(
      item =>
        item.features1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.features2 &&
          item.features2.toLowerCase().includes(searchQuery.toLowerCase())),
    );
    setFilteredData(newData);
  }, [searchQuery, data]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('PokemonDetail', {item})}>
        <Image source={{uri: item.image_uri}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {item.name.length > 7
              ? `${item.name.substring(0, 7)}...`
              : item.name}
          </Text>
        </View>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>{item.features1}</Text>
          {item.features2 && (
            <Text style={styles.featureText}>{item.features2}</Text>
          )}
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('PokemonDetail', {item})}> */}
        <Image source={Icon} style={styles.iconImage} />
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headingContainer}>
        <View style={{width: '20%'}}>
          <Image
            source={PokemonImage}
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderColor: 'aqua',
              textAlign: 'center',
              borderRadius: 50,
            }}
          />
        </View>
        <View style={{width: '80%'}}></View>
      </View> */}
      <Text style={styles.heading}>Pokémons</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by features..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    margin: 30,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  // itemContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginBottom: 12,
  //     padding: 10,
  //     backgroundColor: '#f9f9f9', // Light background for each item
  //     borderRadius: 10,
  //     shadowColor: '#000', // Shadow for a subtle depth effect
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 4,
  //     elevation: 3, // For Android shadow effect
  // },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 25, // Circular images
    borderWidth: 1,
    borderColor: '#ddd', // Slight border around the image
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold', // Bold font for names
    color: '#333', // Darker font color for better readability
  },
  featureText: {
    fontSize: 11,
    color: '#555', // Slightly lighter color for features
    marginLeft: 7, // Indent feature text for better structure
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 10,
    width: 60,
    textAlign: 'center',
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Distributes space between children
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 4,
  },
  textContainer: {
    flex: 1, // Takes up the remaining space
  },
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginRight: 5,
  },
});

export default PokemonsList;
