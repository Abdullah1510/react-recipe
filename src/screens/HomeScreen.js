import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";

const HomeScreen = () => {
	const [activeCategory, setActiveCategory] = useState('Beef');
	const [categories, setCategories] = useState([]);
	const [meals, setMeals] = useState([]);
	const [query, setQuery] = useState('');
	const [originalMeals, setOriginalMeals] = useState([]);

	const getCategories = async () => {
		try {
			const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
			const data = await response.json();

			if (data && data.categories) {
				setCategories(data.categories);
			}
		} catch (err) {
			console.log('error: ', err.message);
		}
	}

	const getRecipes = async (category = "Beef") => {
		try {
			const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
			const data = await response.json();
			if (data && data.meals) {
				setMeals(data.meals);
				setOriginalMeals(data.meals); // Save original meals for filtering
			}
		} catch (err) {
			console.log('error: ', err.message);
		}
	}

	useEffect(() => {
		getCategories();
		getRecipes();
	}, []);

	const handleChangeCategory = (category) => {
		getRecipes(category);
		setActiveCategory(category);
		setMeals([]);
	}

	// search functionality
	


	const handleSearch = (text) => {
		setQuery(text);

		if (!text) {
			setMeals(originalMeals); // Reset to original meals when query is empty
			return;
		}

		const filtered = originalMeals.filter((item) =>
			item.strMeal.toLowerCase().includes(text.toLowerCase())
		);
		setMeals(filtered);
	}

	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
			<Header headerText={"Hi, Recipe "} headerIcon={"bell-o"} />
			<SearchFilter icon="search" placeholder={"Enter your favorite recipe"} query={query} handleSearch={handleSearch} />
			<View style={{ marginTop: 22 }}>
				<Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
				<CategoriesFilter categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
			</View>
			<View style={{ marginTop: 22, flex: 1 }}>
				<Text style={{ fontSize: 22, fontWeight: "bold" }}>Recipes</Text>
				<RecipeCard meals={meals} categories={categories} />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
