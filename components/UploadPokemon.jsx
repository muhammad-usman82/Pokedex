import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TextInput,
  ScrollView,
  TouchableOpacity, // Import TouchableOpacity for the "Save" button
  Text, // Import Text for the "Save" button text
  Alert,
} from 'react-native';
import PokemonImage from '../assets/pokemonimage.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from './Database';

const UploadPokemon = ({navigation}) => {
  const features = [
    {id: '1', label: 'BUG'},
    {id: '2', label: 'DARK'},
    {id: '3', label: 'DRAGON'},
    {id: '4', label: 'ELECTRIC'},
    {id: '5', label: 'FAIRY'},
    {id: '6', label: 'FIGHTING'},
    {id: '7', label: 'FIRE'},
    {id: '8', label: 'FLYING'},
    {id: '9', label: 'GHOST'},
    {id: '10', label: 'GRASS'},
    {id: '11', label: 'GROUND'},
    {id: '12', label: 'ICE'},
    {id: '13', label: 'NORMAL'},
    {id: '14', label: 'POISON'},
    {id: '15', label: 'PSYCHIC'},
    {id: '16', label: 'ROCK'},
    {id: '17', label: 'STEEL'},
    {id: '18', label: 'WATER'},
  ];

  const [imageUri, setImageUri] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  useEffect(() => {
    const fetchImageUri = async () => {
      const savedImageUri = await AsyncStorage.getItem('savedImageUri');
      if (savedImageUri) {
        setImageUri(savedImageUri);
      }
    };

    fetchImageUri();
  }, []);

  const saveImageUri = async uri => {
    await AsyncStorage.setItem('savedImageUri', uri);
  };
  const deleteImageUri = async uri => {
    await AsyncStorage.removeItem('savedImageUri', uri);
  };
  const requestPermissions = async type => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const permission =
        type === 'camera'
          ? PermissionsAndroid.PERMISSIONS.CAMERA
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleCamera = async () => {
    const hasPermission = await requestPermissions('camera');
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // maxHeight: 200,
        // maxWidth: 200,
      },
      response => {
        processImageResponse(response);
      },
    );
  };

  const handleGallery = async () => {
    const hasPermission = await requestPermissions('gallery');
    if (!hasPermission) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        // maxHeight: 200,
        // maxWidth: 200,
      },
      response => {
        processImageResponse(response);
      },
    );
  };

  const processImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const uri = response.assets[0].uri;
      setImageUri(uri);
      saveImageUri(uri);
    }
  };

  const toggleFeature = feature => {
    // console.log(feature)
    if (selectedFeatures.includes(feature)) {
      // Remove the feature if it's already selected
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      // Add the feature if less than two features are selected
      if (selectedFeatures.length < 2) {
        setSelectedFeatures(prevFeatures => [...prevFeatures, feature]);
      } else {
        Alert.alert(
          'Selection Limit Reached',
          'You have selected two types already.',
        );
      }
    }
  };

  const handleSave = () => {
    // console.log(selectedFeatures)
    // Insert data into the database
    if (!imageName) {
      Alert.alert('Name should not be empty');
      return;
    } else if (!imageUri) {
      Alert.alert('Upload the picture');
      return;
    } else if (!width) {
      Alert.alert('Enter WT');
      return;
    } else if (!height) {
      Alert.alert('Enter HT');
      return;
    } else if (selectedFeatures.length === 0) {
      Alert.alert('Select atleast 1 feature');
      return;
    } else if (!imageDescription) {
      Alert.alert('Description should not be empty');
      return;
    }

    console.log(height, width);
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pokemons (image_uri, name, description, features1, features2, width, height) VALUES (?, ?, ?, ?,?,?,?)',
        [
          imageUri,
          imageName,
          imageDescription,
          selectedFeatures[0],
          selectedFeatures[1] ? selectedFeatures[1] : '',
          width,
          height,
        ],
        (_, results) => {
          if (results.rowsAffected > 0) {
            setImageUri(null);
            setSelectedFeatures([]);
            setImageName('');
            setImageDescription('');
            setWidth('');
            setHeight('');
            deleteImageUri();
            console.log('Data saved successfully');
            Alert.alert('Pokémon saved successfully!', '', [
              {text: 'OK', onPress: () => navigation.goBack()},
            ]);
          } else {
            console.warn('Data not saved');
          }
        },
        (_, error) => {
          console.error('Error saving data', error);
          //   Alert.alert('Error saving data', error.message);
        },
      );
    });
  };

  const pairFeatures = features => {
    let paired = [];
    for (let i = 0; i < features.length; i += 2) {
      paired.push(features.slice(i, i + 2));
    }
    return paired;
  };

  const pairedFeatures = pairFeatures(features);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}> Add a new Pokémon</Text>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of Pokémon"
            value={imageName}
            onChangeText={text => setImageName(text)}
          />
        </View>

        {imageUri && (
          <>
            <Text style={styles.label}>Image</Text>
            <View style={styles.imageContianer}>
              <Image
                source={{uri: imageUri}}
                style={{width: '100%', height: 300}}
              />
            </View>
          </>
        )}

        <View style={styles.uploadOptions}>
          <View style={styles.cameraButton}>
            <TouchableOpacity onPress={handleCamera}>
              <Text style={styles.buttonText}>Take a Picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.galleryButton}>
            <TouchableOpacity onPress={handleGallery}>
              <Text style={styles.buttonText}>Upload from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.label}>WT (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="WT of Pokémon"
            value={width}
            keyboardType="numeric"
            onChangeText={text => setWidth(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>HT (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="HT of Pokémon"
            value={height}
            onChangeText={text => setHeight(text)}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>Types</Text>
        <View style={styles.typesContainer}>
          {pairedFeatures.map((pair, index) => (
            <View key={index} style={styles.featureRow}>
              {pair.map(feature => (
                <FeatureButton
                  key={feature.id}
                  feature={feature.label}
                  selected={selectedFeatures.includes(feature.label)}
                  onPress={() => toggleFeature(feature.label)}
                />
              ))}
            </View>
          ))}
        </View>

        <Text style={[styles.label, {marginTop: 10}]}>Description</Text>
        <TextInput
          style={styles.multilineInput}
          placeholder="Description of Pokémon"
          value={imageDescription}
          onChangeText={text => setImageDescription(text)}
          multiline={true}
          numberOfLines={4}
        />

        <View style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
          <View style={styles.saveButton}>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.buttonText}>Save Pokémon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadPokemon;

const FeatureButton = ({feature, selected, onPress}) => (
  <TouchableOpacity
    style={[styles.featureButton, selected && styles.selectedFeature]}
    onPress={onPress}>
    <Text
      style={{
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
      }}>
      {feature}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 25,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    // textAlign: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    margin: 30,
  },
  galleryButton: {
    width: '70%', // Full width
    marginBottom: 20,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'aqua', // Or any vibrant color you prefer
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  uploadOptions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  cameraButton: {
    width: '70%', // Full width
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'lightgreen', // Or any vibrant color you prefer
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Elevation for Android
    // height: 60
  },
  featureRow: {
    flexDirection: 'row', // This is crucial for horizontal layout
    justifyContent: 'space-between', // Adjusts space between the buttons
    alignItems: 'center', // Align items vertically in center
    // ... Additional styling as needed ...
  },
  imageContianer: {
    width: '100%',
    height: '300',
    borderColor: '#aaa', // Set the border color to black
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    margin: 30,
  },
  button: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  // featuresContainer: {
  //     marginTop: 20,
  // },
  // features: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  // },
  featureButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 50,
    width: '40%',
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  selectedFeature: {
    backgroundColor: 'lightblue',
  },
  label: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 3,
    marginBottom: 0,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
  },
  multilineInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  saveButton: {
    width: '70%', // Full width
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'lightgreen', // Or any vibrant color you prefer
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Elevation for Android
    // height: 60
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
