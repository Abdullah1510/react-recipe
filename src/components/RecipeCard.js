import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
} from "react-native";
import React from "react";
import { colors } from "../Constant";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

const RecipeCard = ({ meals, categories }) => {
	const navigation = useNavigation();
	return (
		<View>
			{categories.length == 0 || meals.length == 0 ? (
				<Loading size="large" className="mt-20" />
			) : (
				<FlatList
					data={meals}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => navigation.navigate("RecipeDetail", { item: item })}
							style={styles.pressableContainer}
						>
							<Image
								source={{ uri: item.strMealThumb }}
								style={styles.image}
							/>
							<Text>{item.strMeal.slice(0, 20)}</Text>
						</Pressable>
					)}
					numColumns={2}
					columnWrapperStyle={{
						justifyContent: "space-between",
					}}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	pressableContainer: {
		backgroundColor: colors.COLOR_LIGHT,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 7,
		borderRadius: 8,
		marginVertical: 8,
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
	image: {
		width: 160,
		height: 160,
		resizeMode: "center",
		borderRadius:10
	},
});

export default RecipeCard;
