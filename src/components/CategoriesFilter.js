import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../Constant";

const CategoriesFilter = ({ activeCategory, categories, handleChangeCategory }) => {
	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{categories.map((cat, index) => {
					let isActive = cat.strCategory == activeCategory;
					let backgroundColor = isActive ? 'red' : 'white';
					return (
						<TouchableOpacity
							onPress={() => handleChangeCategory(cat.strCategory)}
							key={index}
							style={[styles.categoryContainer, { backgroundColor }]}
						>
							<Text
								style={{
									color: index === 0 ? colors.COLOR_LIGHT : 'black',
									fontSize: 18,
								}}
							>
								{cat.strCategory}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	categoryContainer: {
		marginRight: 36,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 7,
		marginVertical: 16,
	},
});

export default CategoriesFilter;
