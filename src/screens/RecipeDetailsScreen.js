import React, { useEffect, useState } from "react";
import { Image, View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { TouchableOpacity } from "react-native";

const RecipeDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const getMealData = async () => {
      try {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
        const data = await response.json();
        if (data && data.meals) {
          setMeal(data.meals[0]);
        }
      } catch (err) {
        console.log('Error: ', err.message);
      }
    };

    getMealData();
  }, [item.idMeal]);

  const saveProduct = async () => {
    try {
      const existingProducts = await AsyncStorage.getItem('savedProducts');
      const parsedExistingProducts = existingProducts ? JSON.parse(existingProducts) : [];

      const existingProductIndex = parsedExistingProducts.findIndex(
        (savedProduct) => savedProduct.idMeal === item.idMeal
      );

      if (existingProductIndex === -1) {
        parsedExistingProducts.push(item);
        await AsyncStorage.setItem('savedProducts', JSON.stringify(parsedExistingProducts));
        alert('Product saved successfully!');
      } else {
        alert('Product already saved!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const renderIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal?.[`strIngredient${i}`];
      const measure = meal?.[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ height: 15, width: 15, backgroundColor: '#F59E0B', borderRadius: 8 }} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#374151', marginLeft: 8 }}>
              {measure}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'normal', color: '#4B5563', marginLeft: 4 }}>
              {ingredient}
            </Text>
          </View>
        );
      }
    }

    return ingredients;
  };

  return (<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.image}
      />
    </View>

    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {item.strMeal}
        </Text>
        <TouchableOpacity onPress={saveProduct}>
          <FontAwesome name={'heart-o'} size={28} color={'#000'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>
        {meal?.strCategory}
      </Text>

      <Text style={styles.subHeader}>
        Description:
      </Text>
      <ScrollView style={styles.description} showsVerticalScrollIndicator={false}>
        <Text style={styles.descriptionText}>
          {meal?.strInstructions}
        </Text>
      </ScrollView>

      <Text style={styles.subHeader}>
        Ingredients:
      </Text>
      <ScrollView style={styles.ingredients} showsVerticalScrollIndicator={false}>
        <View style={styles.ingredientsContainer}>
          {renderIngredients()}
        </View>
      </ScrollView>
    </View>
  </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 12,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    maxHeight: 400,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
  },
  ingredients: {
    maxHeight: 400,
  },
  ingredientsContainer: {
    marginTop: 8,
    marginLeft: 12,
  },
});

export default RecipeDetailsScreen;
