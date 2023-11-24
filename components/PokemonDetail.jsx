import React from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PokemonDetail = ({nvaigation, route}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <LinearGradient
          colors={['lightgreen', 'lightblue']}
          style={styles.headingGradient}> */}
        <Text style={styles.heading}>{item.name}</Text>
        {/* </LinearGradient> */}
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image_uri}} style={styles.image} />
        </View>
        <Text style={styles.descriptionText}>Features</Text>

        <View style={styles.featureContainer}>
          <LinearGradient
            colors={['#ff6b6b', '#7873f5']} // Gradient colors
            style={styles.featureTextContainer}>
            <Text style={styles.featureText}>{item.features1}</Text>
          </LinearGradient>
          {item.features2 && (
            <LinearGradient
              colors={['#ff6b6b', '#7873f5']} // Gradient colors
              style={styles.featureTextContainer}>
              <Text style={styles.featureText}>{item.features2}</Text>
            </LinearGradient>
          )}
        </View>

        <View style={styles.measureContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>WT</Text>
            <Text style={styles.value}>{item.width} (kg)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>HT</Text>
            <Text style={styles.value}>{item.height} (m)</Text>
          </View>
        </View>

        <Text style={styles.descriptionText}>Description</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description.trim()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    // margin: 20,
    padding: 10,
    marginBottom: 10,
    // backgroundColor: '#87f1c0',
    // borderRadius: 10,
    // borderColor: '#0a343e',
    // borderWidth: 1,
  },
  //   headingGradient: {
  //     padding: 10, // Adjust padding as needed
  //     borderRadius: 10,
  //     margin: 20,
  //     width: '50%',
  //   },
  //   heading: {
  //     fontSize: 25,
  //     fontWeight: 'bold',
  //     color: 'black', // Text color
  //     textAlign: 'center', // Center the text horizontally
  //   },
  image: {
    width: '100%',
    height: 350,
    // marginRight: 12,
    borderRadius: 5, // Circular images
    borderWidth: 1,
    borderColor: '#ddd', // Slight border around the image
  },
  featureContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    // marginTop: 20,
    marginBottom: 20,
  },
  featureTextContainer: {
    // flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    width: '40%',
  },
  featureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Text color on gradient background
    textAlign: 'center', // Center the text within the container
  },
  measureContainer: {
    // backgroundColor: '#3498db', // Blue background color
    backgroundColor: 'lightblue', // Blue background color
    borderRadius: 8, // Slightly rounded corners
    padding: 16, // Padding around the text
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    borderWidth: 2, // Border width
    // borderColor: '#2980b9', // Border color
    borderColor: '#2980b9', // Border color
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadow
  },
  text: {
    fontSize: 20, // Larger font size
    fontWeight: 'bold', // Bold text
    color: '#000', // White text color
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to the ends
    alignItems: 'center',
    marginBottom: 8, // Spacing between rows
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 16,
    // marginTop: 10,
    marginBottom: 10,
    borderColor: 'green',
    borderWidth: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  descriptionText: {
    fontSize: 18, // Larger font size
    fontWeight: 'bold', // Bold text
    color: '#000', // White text color
    marginTop: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
    // textAlign: 'center',
  },
});

export default PokemonDetail;
