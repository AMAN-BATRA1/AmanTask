import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, StyleSheet, View, ActivityIndicator, TextInput, TouchableOpacity, Alert } from "react-native"
import Header from "../common/header";

const MpgsVardViewNew = () => {

    const [Sessionid, SetSessionid] = useState("")
    const [Cardnumber, SetCardNumber] = useState("5123450000000008")
    const [ExpMonth, SetExpMonth] = useState("05")
    const [ExpYear, SetExpYear] = useState("27")
    const [CardHoldername, SetCardHoldername] = useState("Aman")
    const [Loder, SetLoder] = useState(false)
    const [orderid, setorderid] = useState("order_" + Math.random())
    const [transid, settransid] = useState("trans_" + Math.random())
    const [amount, setamount] = useState("10.00")
    const [Token, setToken] = useState("")


    useEffect(() => {
        console.log("orderid", orderid)
        console.log("transid", transid)
        // CreateSession()
    }, [])

    const CreateSession = async () => {
        // SetLoder(true)
        var data = {
            "apiOperation": "INITIATE_CHECKOUT",
            "interaction": {
                "operation": "PURCHASE",
                "merchant": {
                    "name": " TESTcbq_Booket",
                    "url": "https://www.abc.net"
                }
            },
            "order": {
                "currency": "QAR",
                "amount": amount,
                "id": orderid,
                "description": "payment link Test Order"
            },

        }
        var config = {
            method: 'POST',
            url: 'https://test-cbq.mtf.gateway.mastercard.com/api/rest/version/65/merchant/TESTcbq_Booket/session',
            headers: {
                'Authorization': 'Basic bWVyY2hhbnQuVEVTVGNicV9Cb29rZXQ6Zjc1OTgwYjU3NzllZjc4NGM0MDA5YWZmM2FhNzdiZTk=',
                'Content-Type': 'text/plain'
            },
            body: data,
        };
        console.log("config", config)
        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.session.id));
                SetSessionid(response.data.session.id)
                INITIATE_AUTHENTICATION(response.data.session.id)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const Gen_token = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic bWVyY2hhbnQuVEVTVGNicV9Cb29rZXQ6Zjc1OTgwYjU3NzllZjc4NGM0MDA5YWZmM2FhNzdiZTk=");
        myHeaders.append("Content-Type", "text/plain");
        var config = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "session": {
                    "id": Sessionid
                },
                "sourceOfFunds": {
                    "provided": {
                        "card": {
                            "expiry": {
                                "month": ExpMonth,
                                "year": ExpYear
                            },
                            "number": Cardnumber,
                            "nameOnCard": "aman",
                            "securityCode": "818"
                        }

                    },
                    "type": "CARD",
                },
            }),
        };
        console.log(config)
        await fetch("https://test-cbq.mtf.gateway.mastercard.com/api/rest/version/51/merchant/TESTcbq_Booket/order/Orederbokket119/transaction/testBooket26", config)
            .then(response => response.text())
            .then(result => console.log("result--", result))
            .catch(error => console.log('error----', error));
    }

    const INITIATE_AUTHENTICATION = async (id) => {

        let data = JSON.stringify({
            "apiOperation": "INITIATE_AUTHENTICATION",
            "session": {
                "id": id
            },
            "authentication": {
                "acceptVersions": "3DS1,3DS2",
                "channel": "PAYER_BROWSER",
                "purpose": "PAYMENT_TRANSACTION"
            },
            "sourceOfFunds": {
                "provided": {
                    "card": {
                        "number": "5123450000000008",
                    }
                },
                "token": "5123454636110008",
                "type": "CARD"
            },
            "order": {
                "currency": "QAR"
            },

        })
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic bWVyY2hhbnQuVEVTVGNicV9Cb29rZXQ6Zjc1OTgwYjU3NzllZjc4NGM0MDA5YWZmM2FhNzdiZTk=");
        myHeaders.append("Content-Type", "text/plain");
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };
        let url = "https://test-cbq.mtf.gateway.mastercard.com/api/rest/version/65/merchant/TESTcbq_Booket/order/" + orderid + "/transaction/" + transid
        console.log("INITIATE_AUTHENTICATION url", url)
        console.log(" INITIATE_AUTHENTICATION requestOptions", requestOptions)
        await fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(JSON.stringify(result)))
            .catch(error => console.log('error', error));

    }

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={"Qpay"} />
                <TouchableOpacity disabled={Loder} style={{ width: "70%", backgroundColor: "grey", alignItems: "center", justifyContent: "center", alignSelf: "center", paddingVertical: 10, borderRadius: 10, marginBottom: 10, flexDirection: "row" }}
                    onPress={() => { CreateSession() }}
                >
                    <Text style={{}}>Create session  </Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", marginBottom: 10 }}>{Sessionid}</Text>
                <View style={{
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
                    onPress={() => { Gen_token() }}
                >

                    <Text style={{}}>Pay  </Text>
                    {Loder ? <ActivityIndicator size={"small"} color={"white"}></ActivityIndicator> : null}
                </TouchableOpacity>

                <Text>{Token}</Text>
            </View>
        </SafeAreaView >

    )


}
export default MpgsVardViewNew;
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