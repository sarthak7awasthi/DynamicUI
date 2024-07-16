import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDynamicComponentOrder } from '../requests/api';
import axios from 'axios';

const HomePage = ({ navigation }) => {
  const [newOrder, setNewOrder] = useState([]);

  const productCategories = [
    { id: 1, name: 'Electronics', image: require('../assets/images/electronics.jpg') },
    { id: 2, name: 'Fashion', image: require('../assets/images/fashion.jpg') },
    { id: 3, name: 'Home Appliances', image: require('../assets/images/home.jpg') },
    { id: 4, name: 'Books', image: require('../assets/images/books.jpg') },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Smartphone', price: '$299', category: 'Electronics', image: require('../assets/images/product1.jpg') },
    { id: 2, name: 'Headphones', price: '$99', category: 'Electronics', image: require('../assets/images/product2.jpg') },
    { id: 3, name: 'T-shirt', price: '$19', category: 'Fashion', image: require('../assets/images/product3.jpg') },
    { id: 4, name: 'Jeans', price: '$49', category: 'Fashion', image: require('../assets/images/product4.jpg') },
    { id: 5, name: 'Microwave', price: '$149', category: 'Home Appliances', image: require('../assets/images/product5.jpg') },
    { id: 6, name: 'Novel', price: '$9', category: 'Books', image: require('../assets/images/product6.jpg') },
  ];
  useEffect(() => {
    const fetchDynamicComponentOrder = async () => {
      try {
        const interactions = await AsyncStorage.getItem('interactions');
        console.log("interaction", interactions);
        if (interactions) {
          const parsedInteractions = JSON.parse(interactions);
        
          const response = await axios.post('http://localhost:5000/predict_order', { interactions: parsedInteractions });
          if (response.data && response.data.cart_order) {
            setNewOrder(response.data.engagement_order);
          }
        }
      } catch (error) {
        console.error('Error fetching dynamic component order:', error);
      }
    };

    fetchDynamicComponentOrder();
  }, []);
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Shop</Text>
        <Text style={styles.navItem}>Categories</Text>
        <Text style={styles.navItem}>Cart</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
      <View style={styles.heroSection}>
        <Image source={require('../assets/images/banner.jpg')} style={styles.bannerImage} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Categories</Text>
        <ScrollView horizontal>
          {productCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        {recommendedProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('Details', { product, newOrder })}
          >
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heroSection: {
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryCard: {
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
  },
});

export default HomePage;
