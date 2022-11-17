import { useFocusEffect, useNavigation } from "@react-navigation/native"
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, StyleSheet, View, PermissionsAndroid } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import Header from "../common/header"
import Restcard from "../common/Restcard"
import Config from "../utils/config";
const RestaurantsList = () => {
    const [DarkHeart, setDarkHeart] = useState(false)
    const [cur_latitude, Set_cur_latitude] = useState(30.9108)
    const [cur_longitude, Set_cur_longitude] = useState(75.8793)
    const [Restaurrentdata, SetRestaurrentdata] = useState([])

    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
            console.log("isfocused")
            getLocation();
        }, [cur_latitude])
    );

    useEffect(() => {
        getLocation();
    }, [])

    // useEffect(async () => {}, []);
    const getLocation = async () => {
        let granted = ""
        if (Platform.OS == 'ios') {
            granted = Geolocation.requestAuthorization('whenInUse');
        } else {
            granted =
                Platform.OS === 'android'
                    ? await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    )
                    : true;
        }
        if (granted) {
            Geolocation.getCurrentPosition(position => {
                const { coords } = position;
                console.log('position', position);
                Set_cur_latitude(coords?.latitude)
                Set_cur_longitude(coords?.longitude)
                GetRestaurrentList(coords?.latitude, coords?.longitude)
            },
                error => {
                    console.log(error);
                    // getLocation()

                },
                { enableHighAccuracy: true, timeout: 10000 },
            );
        } else {
            alert("Issue in fetching loction")
        }
    }

    const GetRestaurrentList = async (latitude, longitude) => {

        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + "," + longitude + '&radius=1500&type=restaurant&keyword=cruise&key=' + Config.GOOGLE_MAPS_APIKEY,
            headers: {}
        };
        console.log("config", config)
        await axios(config)
            .then(function (response) {
                console.log("response.data", JSON.stringify(response.data.results), "response.data");
                // if (response.data.status == "OK") {
                SetRestaurrentdata(response?.data?.results)
                // } else {
                // alert("Something went wrong")
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const renderdata = (item, index) => {
        // console.log("item.item", item)
        return (
            <Restcard
                icon={item?.icon}
                // icon={item.photos[0].photo_reference}
                iconBackColor={item?.icon_background_color}
                name={item?.name}
                rating={item?.rating}
                open_now={item?.opening_hours?.open_now}
                isDir_Show={true}
                Address={item?.vicinity}
                onpressDirection={() => { navigation.navigate("MapViewScreen", { item: item, cur_latitude: cur_latitude, cur_longitude: cur_longitude, Restaurrentdata: Restaurrentdata }) }}
            />
        )
    }
    const Emtylist = () => {
        return (
            <View style={styles.EmptyListMainView}>
                <Text style={styles.EmptyTextStyle}>No Data Found</Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={"Nearby Restaurants"} />
                <FlatList data={Restaurrentdata}
                    keyExtractor={(item, index) => { return index.toString() }}
                    renderItem={({ item, index }) => renderdata(item, index)}
                    ListEmptyComponent={() => Emtylist()}
                />

            </View>
        </SafeAreaView>
    )
}
export default RestaurantsList;
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    Container: {
        flex: 1,
        backgroundColor: "white"
    },
    EmptyTextStyle: {
        color: "black",
        fontSize: 16,
        paddingTop: 50,
    },
    EmptyListMainView: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
})