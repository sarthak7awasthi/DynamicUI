import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomBar from './BottomBar';

const ProductScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>

      {/* Product title */}
      <Text style={styles.title}>Product Name</Text>

      {/* Product image */}
      <Image source={{ uri: 'https://picsum.photos/id/1015/200/300' }} style={styles.image} />

      {/* Add to cart/buy button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Product description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Description</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo odio et vestibulum pharetra. Nulla facilisi. Vestibulum vehicula ligula et odio bibendum aliquam. Morbi vel lacus dolor. Mauris interdum, nibh vel rhoncus tincidunt, turpis felis laoreet lectus, ut eleifend ex ipsum at purus.</Text>
      </View>

      {/* Product details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.sectionText}>Size: L</Text>
        <Text style={styles.sectionText}>Color: Red</Text>
        <Text style={styles.sectionText}>Material: Cotton</Text>
      </View>

      {/* Product rating/reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Rating/Reviews</Text>
        {/* Add your rating/reviews component here */}
      </View>

      {/* Recommended products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        {/* Add your recommended products component here */}
      </View>

      {/* Bottom bar */}
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    // Add your search bar styles here
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ProductScreen;
