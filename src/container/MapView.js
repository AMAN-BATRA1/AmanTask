import { useNavigation } from "@react-navigation/native"
import React, { FC, useLayoutEffect, useState } from "react"
import { FlatList, SafeAreaView, View, Dimensions, StyleSheet, Animated, TouchableHighlight, Text } from "react-native"
import Header from "../common/header"
import Colors from "../utils/Colors"
import FontSize from "../utils/Fontsize"
import Images from "../utils/Images"
import Restcard from "../common/Restcard"
import MapView, { Callout, AnimatedRegion, Marker, } from 'react-native-maps';
import { TouchableOpacity } from "react-native-gesture-handler"
const MapViewScreen = (props) => {
    console.log(props)
    const navigation = useNavigation()
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const [cur_latitude, Set_cur_latitude] = useState(props.route.params.cur_latitude)
    const [cur_longitude, Set_cur_longitude] = useState(props.route.params.cur_longitude)
    const [Des_lat, Set_Des_lat] = useState(props.route.params.item.geometry.location.lat)
    const [Des_long, Set_Des_long] = useState(props.route.params.item.geometry.location.lng)
    const [Restaurrentdata, SetRestaurrentdata] = useState(props.route.params.Restaurrentdata)
    const [item, Set_item] = useState(props.route.params.item)
    const [maker, Setmaker] = useState(false)
    const [coords, setCoords] = useState([
        { latitude: props.route.params.cur_latitude, longitude: props.route.params.cur_longitude },
        { latitude: props.route.params.item.geometry.location.lat, longitude: props.route.params.item.geometry.location.lng },
    ]);
    let des_lat_lon = {
        latitude: Des_lat ? Des_lat : 30.9086,
        longitude: Des_long ? Des_long : 75.8574,
    };
    let My_Lat_Long = {
        latitude: cur_latitude ? cur_latitude : 30.9108,
        longitude: cur_longitude ? cur_longitude : 75.8793,
    };
    let fit_cords = [My_Lat_Long, des_lat_lon]

    const markerFunction = () => {
        setTimeout(() => {
            // Setmaker(true)
            <FlatList data={Restaurrentdata}
                renderItem={({ item, index }) => {
                    console.log("data", item)
                    return <TouchableOpacity>
                        <Marker
                            flat={false}
                            coordinate={{
                                latitude: item.geometry.location.lat,
                                longitude: item.geometry.location.lng,
                            }}>
                            <Animated.Image
                                source={Images.destination_ic}
                                style={styles.MakerImageSize}
                            />
                        </Marker>
                    </TouchableOpacity>
                }}></FlatList>
        }, 2000);


    }
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={"Nearby Restaurants"} isback onpressback={() => { navigation.goBack() }} />
                <View style={{ flex: 1 }}>
                    <MapView
                        zoomEnabled={true}
                        style={styles.mapView}
                        ref={(ref) => { mapRef = ref }}
                        onMapReady={() => mapRef.fitToCoordinates(coords, { edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, animated: true })}
                        region={{
                            latitude: cur_latitude,
                            longitude: cur_longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}>
                        {Des_lat || Des_long ? (
                            <Marker
                                coordinate={{
                                    latitude: cur_latitude,
                                    longitude: cur_longitude,
                                }}
                            >
                                <Animated.Image
                                    source={Images.traack}
                                    style={styles.MakerImageSize}
                                />
                            </Marker>
                        ) : null}

                        {Restaurrentdata.map((item, index) => (
                            <TouchableOpacity key={index}>
                                <Marker
                                    flat={false}
                                    coordinate={{
                                        latitude: item.geometry.location.lat,
                                        longitude: item.geometry.location.lng,
                                    }}>
                                    <Animated.Image
                                        source={Images.destination_ic}
                                        style={styles.MakerImageSize}
                                    />
                                    <Callout tooltip>
                                        <TouchableHighlight underlayColor='grey'>
                                            <View style={styles.ToolTipView}>
                                                <Text style={styles.res_name_Text}>{item.name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </Callout>
                                </Marker>
                            </TouchableOpacity>))}

                    </MapView>
                    <Restcard
                        icon={item.icon}
                        // icon={item.photos[0].photo_reference}
                        iconBackColor={item.icon_background_color}
                        name={item.name}
                        rating={item.rating}
                        open_now={item?.opening_hours?.open_now}
                        isDir_Show={true}
                        Address={item.vicinity}
                        onpressDirection={() => { navigation.navigate("MapDirection", { item: item, cur_latitude: cur_latitude, cur_longitude: cur_longitude }) }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default MapViewScreen;
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    Container: {
        flex: 1,
        backgroundColor: "white"
    },
    mapView: {
        height: "70%",
        width: "100%"
    },
    MakerImageSize: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    ToolTipView: {
        width: 110,
        backgroundColor: "#2643AA",
        alignItems: "center"
    },
    res_name_Text: {
        textAlign: "center",
        color: "white"
    },
})