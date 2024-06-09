import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import ItemSeparator from "@/components/ItemSeparator";
import MovieCard from "@/components/MovieCard";
import { getNowPlayingMovies, api } from "@/services/MovieService";
import { Ionicons } from "@expo/vector-icons";

const PaginaInicial = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [searchResultMovies, setSearchResultMovies] = useState ({})
    const [nowPlayingMovies, setNowPlayingMovies] = useState({});
    const [noResult, setNoResult] = useState(false)

    useEffect(() => {
        getNowPlayingMovies().then((movieResponse) =>
        setNowPlayingMovies(movieResponse.data)
        )
    },[])

    const searchMovies = async (query: string) => {
        const response = await api.get("/search/movie", {
            params: {
                query,
            }
        })

        if(response.data.results.length === 0){
            setNoResult(true)
        } else {
            setSearchResultMovies(response.data.results)
        }
    }

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
            searchMovies(text)
        } else {
            setSearchResultMovies([])
        }
    }

    const movieData = search.length > 2 ? (searchResultMovies || []) : (nowPlayingMovies.results || []);


    return (
    <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" 
        translucent={false} 
        backgroundColor="#222222"
        />
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> LucasFlix </Text>
        </View>

        <View style={styles.containerInput}>
            <Ionicons name="search" size={24} color="white" style={{marginRight: 10}} />
            <TextInput 
            placeholder="Encontre um filme..."
            placeholderTextColor="#b1b1b1"
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
            />
        </View>

        <View>
            <FlatList 
                data={movieData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()} 
                ItemSeparatorComponent={() => <ItemSeparator width ={20}/>}
                ListHeaderComponent={() => <ItemSeparator width ={20}/>}
                ListFooterComponent={ () => <ItemSeparator width={20} />}
                renderItem={({item}) => 
                <MovieCard 
                title={item.title} 
                voteAverage={item.vote_average} 
                poster={item.poster_path}
                onPress = {() => navigation.navigate("Details", {movieId: item.id})}
                />}
            />
        </View>


        
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
    },
    headerContainer: {
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 28,
        color: "#ff0000",
        fontWeight: "bold",
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6e6e6e",
        height: 42,
        padding:10,
        borderRadius: 16,
        marginBottom:18,
        marginHorizontal: 20,
    },
    input: {
        color: "#fff",
    }
    
});

export default PaginaInicial