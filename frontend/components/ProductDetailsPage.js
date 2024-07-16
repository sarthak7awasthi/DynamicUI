import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailsPage = ({ route }) => {
  const { product, newOrder } = route.params;
  console.log("new", newOrder)
  const [interactions, setInteractions] = useState([]);
  const [startTime, setStartTime] = useState(new Date());

  const trackInteraction = (component, interactionType) => {
    const currentTime = new Date().toISOString();
    const interactionDuration = (new Date() - startTime) / 1000;
    const interaction = {
      component,
      interactionType,
      timestamp: currentTime,
      interactionDuration: `${interactionDuration}s`
    };
    setInteractions(prevInteractions => [...prevInteractions, interaction]);
    setStartTime(new Date());
  };

  const originalOrder = [
    'Price',
    'Size/Color Options',
    'Add to Cart Button',
    'Product Rating',
    'Stock Indicator',
    'Specifications',
    'Shipping Info',
    'Discount Badge',
    'Reviews',
    'Recommended Products'
  ];

  const recommendedProducts = [
    { id: 1, name: 'Smartphone', price: '$299', category: 'Electronics', image: require('../assets/images/product1.jpg') },
    { id: 2, name: 'Headphones', price: '$99', category: 'Electronics', image: require('../assets/images/product2.jpg') },
    { id: 3, name: 'T-shirt', price: '$19', category: 'Fashion', image: require('../assets/images/product3.jpg') },
    { id: 4, name: 'Jeans', price: '$49', category: 'Fashion', image: require('../assets/images/product4.jpg') },
    { id: 5, name: 'Microwave', price: '$149', category: 'Home Appliances', image: require('../assets/images/product5.jpg') },
    { id: 6, name: 'Novel', price: '$9', category: 'Books', image: require('../assets/images/product6.jpg') },
  ];

  const dynamicComponents = [
    { id: 1, component: 'Price', value: product.price },
    {
      id: 2, component: 'Size/Color Options', value: (
        <View>
          <Text style={styles.option}>Size: S, M, L, XL</Text>
          <Text style={styles.option}>Color: Red, Blue, Green, Black</Text>
        </View>
      )
    },
    {
      id: 3, component: 'Add to Cart Button', value: (
        <Button title="Add to Cart" onPress={() => {
          trackInteraction('Add to Cart Button', 'tap');
          alert('Added to cart');
        }} />
      )
    },
    {
      id: 4, component: 'Product Rating', value: (
        <View style={styles.rating}>
          <Text style={styles.ratingText}>4.5 stars</Text>
          <View style={styles.stars}>
            {/* <Image source={require('../assets/images/star.png')} style={styles.star} />
            <Image source={require('../assets/images/star.png')} style={styles.star} />
            <Image source={require('../assets/images/star.png')} style={styles.star} />
            <Image source={require('../assets/images/star.png')} style={styles.star} />
            <Image source={require('../assets/images/half-star.png')} style={styles.star} /> */}
          </View>
        </View>
      )
    },
    { id: 5, component: 'Stock Indicator', value: 'In Stock' },
    { id: 6, component: 'Specifications', value: 'Specifications details here' },
    { id: 7, component: 'Shipping Info', value: 'Free shipping on orders over $50' },
    { id: 8, component: 'Discount Badge', value: '10% off' },
    {
      id: 9, component: 'Reviews', value: (
        <View>
          <Text style={styles.review}>John Doe: Great product, highly recommend!</Text>
          <Text style={styles.review}>Jane Smith: Satisfied with the quality and price.</Text>
          <Text style={styles.review}>Mike Johnson: Will buy again. Fast shipping!</Text>
        </View>
      )
    },
    {
      id: 10, component: 'Recommended Products', value: (
        <View>
          <Text style={styles.sectionTitle}>Recommended Products</Text>
          <ScrollView horizontal>
            {recommendedProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )
    },
  ];

  useEffect(() => {
    return () => {
      AsyncStorage.setItem('interactions', JSON.stringify(interactions));
    };
  }, [interactions]);
  var renderOrder=[];
  if (newOrder.length == 0){
    renderOrder=originalOrder;
  }
  else{
    renderOrder=newOrder;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageGallery}>
        <Image source={product.image} style={styles.productImageLarge} />
      </View>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>
        This is a brief description of the {product.name}. It is a high-quality product in the {product.category} category.
      </Text>
      {renderOrder.map((key) => {
        const item = dynamicComponents.find(component => component.component === key);
        return (
          <TouchableOpacity key={item.id} onPress={() => trackInteraction(item.component, 'tap')}>
            <View style={styles.dynamicComponent}>
              <Text style={styles.dynamicComponentTitle}>{item.component}</Text>
              {typeof item.value === 'string' ? (
                <Text style={styles.dynamicComponentValue}>{item.value}</Text>
              ) : (
                item.value
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  imageGallery: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImageLarge: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
  dynamicComponent: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dynamicComponentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  dynamicComponentValue: {
    fontSize: 18,
    color: '#444',
  },
  option: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    color: '#444',
    marginRight: 10,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    width: 20,
    height: 20,
  },
  review: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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

export default ProductDetailsPage;
