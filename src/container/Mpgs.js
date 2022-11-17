import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, StyleSheet, View, PermissionsAndroid } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import Header from "../common/header";

const Mpgs = () => {

    const [Sessionid, SetSessionid] = useState("")
    useEffect(() => {
        // CreateSession()
    }, [])

    const CreateSession = async () => {
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
                "amount": "10.00",
                "id": "Oredertest1123",
                "description": "payment link Test Order"
            },
        }
        var config = {
            method: 'post',
            url: 'https://test-cbq.mtf.gateway.mastercard.com/api/rest/version/65/merchant/TESTCBQ_BOOKET/session',
            headers: {
                'Authorization': 'Basic bWVyY2hhbnQuVEVTVGNicV9Cb29rZXQ6Zjc1OTgwYjU3NzllZjc4NGM0MDA5YWZmM2FhNzdiZTk=',
                'Content-Type': 'text/plain'
            },
            data: data
        };
        const Response = await axios(config).then(function (response) {
            console.log(JSON.stringify(response.data.session.id));
            setTimeout(() => {
                SetSessionid(response.data.session.id)
            }, 1000);

        })
            .catch(function (error) {
                console.log("error", error);
            });
    }

    const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.Container}>
                <Header title={"MPGS"} />
                {/* {link} */}
                <TouchableOpacity style={{ width: "70%", backgroundColor: "grey", alignItems: "center", justifyContent: "center", alignSelf: "center" }}
                    onPress={() => { CreateSession() }}
                >
                    <Text>Get Sesion id</Text>
                </TouchableOpacity>
                {Sessionid ? <WebView
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    originWhitelist={['*']}
                    injectedJavaScript={injectedJavaScript}
                    source={{
                        html: `<html>

<head>

  <script src="https://test-cbq.mtf.gateway.mastercard.com/static/checkout/checkout.min.js" data-error="errorCallback" data-cancel="cancelCallback"></script>

  <script type="text/javascript">

    function errorCallback(error) {

       console.log(JSON.stringify(error));

    }

    function cancelCallback() {

       console.log('Payment cancelled');

    }

    Checkout.configure({

     session: { 

     id: "SESSION0002756421118N29237401G1"

   },

     order: {

        description: "Ordered goods",

     },

     interaction: {

        merchant: {

          name: 'TESTCBQ_BOOKET ',

          address: {

            line1: '200 Sample St',

            line2: '1234 Example Town'       

          }   

        }

      }

    });

  </script>

</head>

<body>

  ...

 <div id="embed-target"> </div> 

 <input type="button" value=${Sessionid} onclick="Checkout.showPaymentPage();" />

 <input type="button" value="Pay with Embedded Page" onclick="Checkout.showEmbeddedPage('#embed-target');" />

 <input type="button" value="Pay with Payment Page" onclick="Checkout.showPaymentPage();" />

  ...

</body>

</html>` }} /> : null}
            </View>
        </SafeAreaView>
    )
}
export default Mpgs;
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

