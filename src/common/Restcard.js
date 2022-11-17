
import { useNavigation } from "@react-navigation/native"
import React, { FC, useLayoutEffect, useState } from "react"
import { SafeAreaView, TouchableOpacity } from "react-native"
import { TextStyle, View, ViewStyle, StyleSheet, Text, Image } from "react-native"
import Header from "../common/header"
import Colors from "../utils/Colors"
import FontSize from "../utils/Fontsize"
import Images from "../utils/Images"
import { Rating, AirbnbRating } from 'react-native-ratings';
const Restcard = (props) => {
    const [DarkHeart, setDarkHeart] = useState(false)
    // console.log("props.icon", "data:image/png;base64," + props.icon)
    return (
        <View style={styles.MainContainer}>
            <View style={styles.Container}>
                {/* <Image source={Images.signuplogo} style={styles.RestimageStyle}></Image> */}
                <Image source={{ uri: props.icon }} style={[styles.RestimageStyle, { backgroundColor: props.iconBackColor }]}></Image>
                <View style={styles.SpliteView}>
                    <View style={styles.TextView}>
                        <Text style={styles.NameView}>
                            {props?.name}
                        </Text>
                        <Text>Rating</Text>
                        <Rating
                            readonly="true"
                            type='custom'
                            imageSize={15}
                            ratingColor='#2E3563'
                            // ratingBackgroundColor="#2E3563"
                            ratingCount={props?.rating}
                            ratingContainerStyle={styles.ratingView}
                            style={styles.ratingStyle}
                        />
                        <Text>5.1 Miles</Text>
                    </View>
                    <View style={styles.IconView}>
                        <TouchableOpacity style={styles.DirectionTouch}
                            onPress={() => { props.onpressDirection() }}>
                            {props?.isDir_Show && <Image source={Images.Dir} style={styles.Dir_Image}></Image>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.DirectionTouch}
                            onPress={() => { setDarkHeart(!DarkHeart) }}
                        >
                            {DarkHeart ? <Image source={Images.Filledheart} style={styles.HeartIconStyle}></Image> : <Image source={Images.Emptyheart} style={styles.HeartIconStyle}></Image>}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={styles.AddressView}>
                <Text>{props.Address}</Text>
                <Text style={styles.openNow}>{props?.open_now ? "Open Now" : "Closed"}</Text>
            </View>
        </View>
    )
}
export default Restcard;
const styles = StyleSheet.create({
    MainContainer: {
        width: "100%",
        alignSelf: "center",
        borderTopWidth: 1,
        borderColor: "black",
        paddingVertical: 15
    },
    Container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    RestimageStyle: {
        borderRadius: 50,
        height: 80,
        width: 80,
        resizeMode: "contain",
        borderWidth: .5,
        borderColor: "black"
    },
    SpliteView: {
        width: "75%",
        flexDirection: "row"
    },
    TextView: {
        width: "75%",
        backgroundColor: "white",
        justifyContent: "space-around"
    },
    NameView: {
        color: Colors.Black,
        fontSize: FontSize.mid,
        fontWeight: "bold"
    },
    ratingView: {
        color: "#2E3563",
        backgroundColor: "#2E3563"
    },
    ratingStyle: {
        alignItems: "flex-start",
        color: "#2E3563",
        paddingVertical: 5
    },
    IconView: {
        width: "25%",
        justifyContent: "space-between"
    },
    DirectionTouch: {
        width: "100%",
        alignItems: "flex-end"
    },
    Dir_Image: {
        borderRadius: 50,
        height: 30,
        width: 30,
        resizeMode: "contain",
        borderWidth: .5,
        borderColor: "black",
        backgroundColor: "#30356B",
        tintColor: "white",
        transform: [{ rotateY: "180deg" }]
    },
    HeartIconStyle: {
        height: 25,
        width: 25,
        resizeMode: "contain",
        end: 4
    },
    AddressView: {
        width: "70%",
        paddingStart: 15,
        paddingVertical: 10
    },
    openNow: {
        color: "#30356B",
        fontSize: 15
    }
})