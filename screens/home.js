import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('bestSellers');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      image: require('../images/product1.jpg'),
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$20',
      image: require('../images/product2.jpg'),
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$30',
      image: require('../images/product3.jpg'),
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$40',
      image: require('../images/product4.jpg'),
    },
    {
      id: 5,
      name: 'Product 5',
      price: '$50',
      image: require('../images/product5.jpg'),
    },
    {
        id: 6,
        name: 'Product 6',
        price: '$60',
        image: require('../images/product6.jpg'),
      }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bestSellers' && styles.activeTab]}
          onPress={() => handleTabPress('bestSellers')}
        >
          <Text style={styles.tabText}>Best Sellers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'fashion' && styles.activeTab]}
          onPress={() => handleTabPress('fashion')}
        >
          <Text style={styles.tabText}>Fashion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pharmacy' && styles.activeTab]}
          onPress={() => handleTabPress('pharmacy')}
        >
          <Text style={styles.tabText}>Pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groceries' && styles.activeTab]}
          onPress={() => handleTabPress('groceries')}
        >
          <Text style={styles.tabText}>Groceries</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.productsContainer}>
      
        {products.map((product) => (
            <TouchableOpacity 
            key={product.id} 
            style={styles.productCard} 
            onPress={() => navigation.navigate('Product', {productId: product.id})}
            >
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            </TouchableOpacity>
        ))}


      </ScrollView>
      <View style={styles.bottomTabBarContainer}>
        <TouchableOpacity style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 50, 
    },
    searchBarContainer: {
      width: '100%',
      height: 50,
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    searchBar: {
      height: 40,
      width: 400,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    tabBarContainer: {
      flexDirection: 'row',
      height: 50,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: '#fff',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#007aff',
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    productsContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap', // wrap the products to the next row when there's not enough space
        justifyContent: 'space-between',
      },
      productCard: {
        width: '48%', // adjust the width of the product card to fit two cards per row with some space in between
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden', // add overflow property and set it to 'hidden'
      },
      productImage: {
        height: 150,
        width: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'contain',
      },
      productDetails: {
        padding: 10,
      },
      productName: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      productPrice: {
        color: 'gray',
      },
    bottomTabBarContainer:  {
      flexDirection: 'row',
      height: 50,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      backgroundColor: '#fff',
    },
    bottomTab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomTabText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
  });

  export default HomeScreen;
  