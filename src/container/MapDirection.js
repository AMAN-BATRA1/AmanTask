import { useNavigation } from "@react-navigation/native"
import React, { FC, useLayoutEffect, useState } from "react"
import { FlatList, SafeAreaView, TouchableOpacity, Dimensions, Animated, View, StyleSheet } from "react-native"
import Header from "../common/header"
import Colors from "../utils/Colors"
import FontSize from "../utils/Fontsize"
import Images from "../utils/Images"
import Restcard from "../common/Restcard"
import MapView, { Callout, AnimatedRegion, Marker } from 'react-native-maps';
import Config from "../utils/config"
import MapViewDirections from "react-native-maps-directions"
const MapDirection = (props) => {
    console.log("MapDirection", JSON.stringify(props.route.params.item))
    const navigation = useNavigation()
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const [cur_latitude, Set_cur_latitude] = useState(props.route.params.cur_latitude)
    const [cur_longitude, Set_cur_longitude] = useState(props.route.params.cur_longitude)
    const [Des_lat, Set_Des_lat] = useState(props.route.params.item.geometry.location.lat)
    const [Des_long, Set_Des_long] = useState(props.route.params.item.geometry.location.lng)
    const [item, Set_item] = useState(props.route.params.item)
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
    // console.log("My_Lat_Long", My_Lat_Long, "des_lat_lon", des_lat_lon)
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={item.name} isback onpressback={() => { navigation.goBack() }} />
                <View style={{ flex: 1 }}>
                    <MapView
                        zoomEnabled={true}
                        style={styles.mapView}
                        onMapReady={() => mapRef.fitToCoordinates(coords, { edgePadding: { top: -10, right: -10, bottom: -10, left: -10 }, animated: true })}
                        region={{
                            latitude: cur_latitude,
                            longitude: cur_longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}>
                        {Des_lat || Des_long ? (
                            <Marker
                                coordinate={des_lat_lon}
                            >
                                <Animated.Image
                                    source={Images.destination_ic}
                                    style={styles.MakerImageSize}
                                />
                            </Marker>
                        ) : null}
                        {cur_latitude || cur_longitude ? (
                            <Marker

                                flat={false}
                                coordinate={My_Lat_Long}>
                                <Animated.Image
                                    source={Images.traack}
                                    style={styles.MakerImageSize}
                                />
                            </Marker>
                        ) : null}
                        {cur_latitude || cur_longitude || Des_lat || Des_long ? (
                            <MapViewDirections
                                origin={My_Lat_Long ? My_Lat_Long : demo_cur_lat_long}
                                destination={des_lat_lon ? des_lat_lon : demo_des_lat_long}
                                apikey={Config.GOOGLE_MAPS_APIKEY}
                                strokeWidth={3}
                                strokeColor="black"
                            />
                        ) : null}
                    </MapView>
                    <Restcard isDir_Show={false}
                        icon={item.icon}
                        // icon={item.photos[0].photo_reference}
                        iconBackColor={item.icon_background_color}
                        name={item.name}
                        rating={item.rating}
                        open_now={item?.opening_hours?.open_now}
                        Address={item.vicinity}
                    // onpressDirection={() => { navigation.navigate("MapViewScreen") }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default MapDirection;
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
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
})