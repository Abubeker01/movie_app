import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {fetchMovies} from "@/services/api";
import useFetch from "@/services/useFetch";
import {useRouter} from "expo-router";
import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";


export default function Index() {
    const router = useRouter();

    const {data: movies, Loading: moviesLoading, error: moviesError}
        = useFetch(() => fetchMovies({query: ''}))
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0"/>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
                <Image source={icons.logo} className="mt-20 mx-auto w-12 h-10 mb-5"/>

                {moviesLoading ? (
                    <ActivityIndicator size="large" color="0000ff" className="mt-10 self-center"/>
                ) : moviesError ? (<Text className="text-white">{moviesError?.message}</Text>) :
                    (
                        <View>

                            <SearchBar
                                onpress={() => router.push('/search')}
                                placeHolder="Search a Movie" value={""} onChangeText={function (text: string): void {
                                throw new Error("Function not implemented.");
                            }}                            />

                            <>
                                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                                <FlatList data={movies?.results} renderItem
                                    ={({item}) => (
                                    <MovieCard {...item} />
                                )}
                                          keyExtractor={(item) => item.id.toString()}
                                          numColumns={3}
                                          columnWrapperStyle={{
                                              justifyContent: 'flex-start',
                                              gap: 20,
                                              paddingRight: 5,
                                              marginBottom: 10
                                          }}

                                          className="mt-2 pb-32"
                                          scrollEnabled={false}

                                />
                            </>
                        </View>


                    )
                }


            </ScrollView>
        </View>
    );
}
