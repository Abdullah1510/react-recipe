import { StyleSheet} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: true }}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="HomeList" component={HomeScreen} />
				<Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;


