import React, { FC, useLayoutEffect } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import Colors from "../utils/Colors"
import FontSize from "../utils/Fontsize"


const Header = (props) => {
    return (
        <View style={styles.MainContainer}>
            <View style={{ width: "15%", }}>
                {props.isback &&
                    <TouchableOpacity disabled={!props.isback}
                        onPress={() => { props.onpressback() }}>
                        <Image
                            source={require("../Assets/BackArrow.png")}
                            style={styles.ImageStyle}
                        ></Image>
                    </TouchableOpacity>}
            </View>
            <View style={styles.TextView}>
                <Text style={styles.TextStyle}>{props.title}</Text>
            </View>
            <View style={{ width: "15%" }}></View>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    MainContainer: {
        height: "8%",
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    ImageStyle: {
        resizeMode: "contain",
        height: 30,
        width: 30,
        left: 5,
        tintColor: "black"
    },
    TextView: {
        width: "70%",
        alignItems: "center",
        justifyContent: "center"
    },
    TextStyle: {
        fontSize: FontSize.large,
        color: Colors.Black,
        fontWeight: "bold"
    }
})