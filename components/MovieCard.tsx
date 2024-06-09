import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { getPoster } from "@/services/MovieService";

const MovieCard = ({title, poster, voteAverage, onPress}) =>{

    return (
    <TouchableOpacity activeOpacity={0.8} onPress ={onPress}>
        <ImageBackground 
        style={styles.container} 
        imageStyle={ {borderRadius: 12} }
        source={{uri: getPoster(poster)}}>
        </ImageBackground>
        <View>
            <Text style={styles.movieTitle} numberOfLines={2}>{title}</Text>
            <View style={styles.movieSubTitleContainer}>
            <View style= {styles.rowAndCenter}>
                <Ionicons name="heart" size={17} color="red" style ={{ marginRight: 5}} />
                <Text style={styles.movieSubTitle}>{voteAverage.toFixed(1)}</Text>
        </View>
        </View>
        </View>

    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#057DFE",
        height: 500,
        width: 330,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2,
    },
    movieTitle:{
        paddingVertical: 2,
        marginTop: 5,
        color: "#fff",
        width: 290,
        fontSize: 18,
    },
    movieSubTitleContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    movieSubTitle: {
        fontSize: 14,
        color: "#969494",

    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    }
})

export default MovieCard