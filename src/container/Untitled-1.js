
//                 <WebView
//                     javaScriptEnabled={true}
//                     style={{ flex: 1 }}
//                     originWhitelist={['*']}
//                     injectedJavaScript={injectedJavaScript}
//                     source={{
//                         html: `<html>

// <head>

//   <script src="https://test-cbq.mtf.gateway.mastercard.com/static/checkout/checkout.min.js" data-error="errorCallback" data-cancel="cancelCallback"></script>

//   <script type="text/javascript">

//     function errorCallback(error) {

//        console.log(JSON.stringify(error));

//     }

//     function cancelCallback() {

//        console.log('Payment cancelled');

//     }

//     Checkout.configure({

//      session: {

//      id: ${Sessionid}

//    },

//      order: {

//         description: "Ordered goods",

//      },

//      interaction: {

//         merchant: {

//           name: 'TESTCBQ_BOOKET ',

//           address: {

//             line1: '200 Sample St',

//             line2: '1234 Example Town'

//           }

//         }

//       }

//     });

//   </script>

// </head>

// <body>

//   ...

//  <div id="embed-target"> </div>

//  <input type="button" value=${Sessionid} onclick="Checkout.showPaymentPage();" />

//  <input type="button" value="Pay with Embedded Page" onclick="Checkout.showEmbeddedPage('#embed-target');" />

//  <input type="button" value="Pay with Payment Page" onclick="Checkout.showPaymentPage();" />

//   ...

// </body>

// </html>` }} /> : null}
