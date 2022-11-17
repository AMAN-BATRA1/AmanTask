import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, StyleSheet, View, ActivityIndicator, TextInput, TouchableOpacity, Alert } from "react-native"

import WebView from "react-native-webview";
import Header from "../common/header";

const MpgsVardView = () => {

    const [Sessionid, SetSessionid] = useState("")
    const [Cardnumber, SetCardNumber] = useState("5123450000000008")
    const [ExpMonth, SetExpMonth] = useState("05")
    const [ExpYear, SetExpYear] = useState("27")
    const [CardHoldername, SetCardHoldername] = useState("Aman")
    const [Loder, SetLoder] = useState(false)


    useEffect(() => {
        // CreateSession()
        // checkdata()
        checkView()
    }, [])

    const checkdata = () => {
        let emptyarr = []
        let mydata = data.questions
        console.log("mydata", mydata)
        let check = mydata.filter((item) => item.answers.selected == true ? item : "")
        console.log("check", check)
    }

    const CreateSession = async () => {
        SetLoder(true)
        var data = JSON.stringify({
            "source": {
                "type": "card",
                "number": Cardnumber,
                "expiry_month": ExpMonth,
                "expiry_year": ExpYear
            },
            "amount": 100,
            "currency": "QAR",
            "reference": "ORD-175-7523"
        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer sk_sbox_ssxomdijbsup2agli3fns77enaj");
        var config = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk_sbox_ssxomdijbsup2agli3fns77enaj',
                'Content-Type': 'application/json'
            },
            body: data,
            redirect: 'follow'
        };

        // {
        //     method: 'post',
        //     url: 'https://api.sandbox.checkout.com/payments',
        //     headers: {
        //         'Authorization': 'Bearer sk_sbox_ssxomdijbsup2agli3fns77enaj',
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // };
        console.log("config", config)
        await fetch("https://api.sandbox.checkout.com/payments", config)
            .then(response => response.json())
            .then((response) => {
                console.log("response", response);
                if (response?.response_summary == "Approved") {
                    Alert.alert("Payment Successful and transaction id -", response?.processing?.acquirer_transaction_id)
                    SetLoder(false)
                } else {
                    alert(response.error_codes[0])
                    console.log("response", response)
                    SetLoder(false)
                }
            }).catch((error) => {
                console.log("error", error);
                Alert.alert("Something went wrong")
                SetLoder(false)
            });
    }

    const checkView = async () => {
        var config = {
            method: 'POST',
            headers: {

            },
        };
        for (i = 0; i < 1000000000; i++) {
            console.log("i", i)
            const url =
                'https://insproplus.com/erpv2api/api/usermanagment/MultiUserLoginNew/9577530007';
            console.log(url);
            await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + this.state.Token
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("MultiUserLoginNew = ", responseJson);
                })

        }
    }


    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={"Qpay"} />

                {/* <View style={{
                    height: "32%", width: "95%", backgroundColor: "white", alignSelf: "center", borderColor: "black", borderWidth: .5, borderRadius: 5,
                    justifyContent: "center", shadowColor: "grey", shadowOffset: { height: 2, width: 0 }, shadowOpacity: .5
                }}>
                    <Text style={{ paddingStart: 10, marginBottom: 5, }}>Card Number</Text>
                    <TextInput style={{
                        width: "95%", height: 50, color: "white",
                        alignSelf: "center", backgroundColor: "grey",
                        borderRadius: 10, padding: 10, fontSize: 18
                    }}
                        placeholderTextColor={"white"}
                        placeholder={"2222-2222-2222-2222"}
                        maxLength={16}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => { SetCardNumber(text) }}
                    ></TextInput>
                    <View style={{ height: "30%", width: "95%", alignSelf: "center", flexDirection: "row", alignItems: "center" }}>
                        <View style={{ alignItems: "center", width: "25%", }}>
                            <Text style={{ marginBottom: 2, marginTop: 5 }}>Month</Text>
                            <TextInput style={{
                                width: "70%", height: 50, color: "white",
                                alignSelf: "center", backgroundColor: "grey", textAlign: "center",
                                borderRadius: 10, fontSize: 18, alignItems: "center"
                            }}
                                placeholderTextColor={"white"}
                                placeholder={"MM"}
                                maxLength={2}
                                onChangeText={(text) => { SetExpMonth(text) }}
                                keyboardType={"number-pad"}></TextInput>
                        </View>
                        <View style={{ alignItems: "center", width: "25%", }}>
                            <Text style={{ marginBottom: 2, marginTop: 5 }}>Year</Text>
                            <TextInput style={{
                                width: "80%", height: 50, color: "white",
                                alignSelf: "center", backgroundColor: "grey",
                                borderRadius: 10, fontSize: 18, textAlign: "center",
                            }}
                                placeholderTextColor={"white"}
                                placeholder={"YYYY"}
                                maxLength={4}
                                onChangeText={(text) => { SetExpYear(text) }}
                                keyboardType={"number-pad"}></TextInput>
                        </View>
                    </View>
                    <Text style={{ paddingStart: 10, marginBottom: 2, marginTop: 5 }}>Card Holder Name</Text>
                    <TextInput style={{
                        width: "95%", height: 50, color: "white",
                        alignSelf: "center", backgroundColor: "grey",
                        borderRadius: 10, padding: 10, fontSize: 18
                    }}
                        placeholderTextColor={"white"}
                        placeholder={"Card Holder Name"}
                    // keyboardType={"number-pad"}
                    ></TextInput>
                    <View>

                    </View>
                </View>
            
                <TouchableOpacity disabled={Loder} style={{ width: "70%", backgroundColor: "grey", alignItems: "center", justifyContent: "center", alignSelf: "center", paddingVertical: 20, borderRadius: 10, marginTop: 10, flexDirection: "row" }}
                    onPress={() => { CreateSession() }}
                >

                    <Text style={{}}>Pay  </Text>
                    {Loder ? <ActivityIndicator size={"small"} color={"white"}></ActivityIndicator> : null}
                </TouchableOpacity> */}
                {checkView()}

            </View>
        </SafeAreaView>
    )
}
export default MpgsVardView;
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    Container: {
        flex: 1,
        backgroundColor: "white",
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