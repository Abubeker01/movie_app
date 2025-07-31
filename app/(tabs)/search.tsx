import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import {isLoading} from "expo-font";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();

    const {
        data: movies,
        Loading,
        error,
        refetch: loadMovies,
        reset

    }
        = useFetch(() => fetchMovies({ query: searchQuery }),false)

    useEffect(()=>{
        const timeoutid = setTimeout( async ()=>{
            if (searchQuery.trim()){
                await loadMovies();
            }
            else{
                reset()
            }
        },500)
        return () => clearTimeout(timeoutid)
    },[searchQuery])

    return (
        <View className="bg-primary flex-1">
            <Image source={images.bg} className="absolute w-full z-0 " resizeMode="cover" />
            <FlatList data={movies?.results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="flex-row justify-center items-center mt-20 w-full">
                            <Image source={icons.logo} className="w-12 h-12" />
                        </View>

                        <View className="my-5">
                            <SearchBar placeHolder="Search Movies..." 
                            value={searchQuery} 
                            onChangeText={(text)=>setSearchQuery(text)} />
                        </View>
                        {Loading && (
                            <ActivityIndicator size='large' color="0000ff" className="my-3" />
                        )}
                        {error && (
                            <Text>error: {error?.message}</Text>
                        )}
                        {!Loading && !error && searchQuery.trim() && true && (
                            <Text className="text-xl text-white font-bold">Search Result for{''}
                                <Text className="text-accent"> {searchQuery}</Text>
                            </Text>
                        )}

                    </>
                }
                ListEmptyComponent ={
                    !Loading && !error ?(
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>
                                {searchQuery.trim()? 'NO Movies found!': 'Search for Movies'}
                            </Text>
                        </View>
                    ):null
                }

            />

        </View>
    )
}

export default Search