import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { getMovieById, getPoster } from "@/services/MovieService";
import ItemSeparator from "@/components/ItemSeparator";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "@/constants/Urls";


const Detalhes = ({route, navigation}) => {
    const {movieId} = route.params
    const [movie, setMovie] = useState({});

    useEffect(() => {
        getMovieById(movieId, `${AR.SIMILAR}`).then((response) => setMovie (response?.data))
    },[])
    return (
        <ScrollView style={styles.container}>
            <StatusBar style= "auto"/>
            <View style={styles.moviePosterImageContainer}>
                <Image style={styles.moviePosterImage} 
                resizeMode="cover" 
                source={{uri: getPoster(movie?.backdrop_path)}}/>
            </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="white"/>
                </TouchableOpacity>
            </View>
            <ItemSeparator height={430}/>
            <View style={styles.movieTitleContainer}>
                <Text style={styles.movieTitle} numberOfLines={2}>{movie?.title}</Text>
                <View style={styles.row}>
                    <Ionicons name="heart" size={22} color="red" />
                    <Text style={styles.ratingText}>{movie?.vote_average}</Text>
                </View>
            </View>
            <Text style={styles.genreText}>
                {movie?.genres?.map(genre => genre?.name)?.join(", ")} | {movie?.runtime} Min
            </Text>
            <Text style={styles.genreText}></Text>
            <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>Sinopse</Text>
                <Text style={styles.overviewText}>{movie?.overview}</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
    },
    moviePosterImageContainer: {
        height: 400,
        width: 400,
        alignItems: "center",
        elevation: 8,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        position: "absolute",
    },
    moviePosterImage: {
        height: 400,
        width: 500,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        position: "absolute",
        elevation: 20,
        right: 0,
        left: 0,
        top: 50,
    },
    movieTitleContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    movieTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        width: 250,
    },
    ratingText:{
        marginLeft: 5,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    genreText: {
        color: "#969494",
        paddingHorizontal: 20,
        paddingTop: 5,
        fontWeight: "bold",
        fontSize: 13,
    },
    overviewContainer: {
        backgroundColor: "#353535",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,

    },
    overviewTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff",
    },
    overviewText: {
        color: "#969494",
    },
    extraListTitle: {
        marginLeft: 20,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 8,
      },
});

export default Detalhes
