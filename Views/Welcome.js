import React, { useRef, useEffect, useState } from "react";
import { Animated, Text, View, Image, StyleSheet, Alert } from "react-native";
import { SimpleAnimation } from 'react-native-simple-animations';
import Spinner from "react-native-loading-spinner-overlay";

import {
  Card,
  ListItem,
  Button,
  // Icon,
  Overlay,
  Divider,
  Avatar,
} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { QRCode } from "react-native-custom-qr-codes-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default ({ navigation }) => {
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [idnum, setIDnum] = useState("");
  const [placeofbirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [residence, setResidence] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const [hash, setHash] = useState("");
  const [hasData, setHasData] = useState(false);
  const [processing, setProcessing] = useState(false);
  var profile = {
    FirstName: fname,
    LastName: sname,
    Email: email,
    DateOfBirth: dob,
    GovernmentID: idnum,
    PlaceOfBirth: placeofbirth,
    Nationality: nationality,
    CountryOfResidence: residence,
    ResidentialAddress: address,
    ContactNumber: phone,
  };

  useEffect(() => {
    (async () => {
      try {
        setProcessing(true);
        await AsyncStorage.setItem("seed", "LWONP9BDM9GMV9TWQHAKCOMHLHDBORAARJMXIWIQAFMPNARA9PONMARQSOU9SVLRZWBAFXPHVXHKOSTED");
        setProcessing(false);
      } catch (e) {
        setProcessing(false)
        console.log(e);
      }
    })();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // let [fontsLoaded] = useFonts({
  //   Varela: require("./../assets/fonts/VarelaRound-Regular.ttf"),
  //   Nunito: require("./../assets/fonts/Nunito-Black.ttf"),
  // });

  {
    return (
      <View style={styles.container}>
        <Spinner
              visible={processing}
              textStyle={[styles.text, { color: "white" }]}
              textContent={"Loading....."}
            />
        <View style={{zIndex:1}}>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <QRCode content={JSON.stringify(profile)} />
        </Overlay>

        <Text style={[styles.text, { fontSize: 30, fontWeight: "400", color:"#2893C1", marginBottom:20 }]}>
            Welcome
          </Text>

          <Text style={[styles.text, { fontSize: 50, fontWeight: "500", marginBottom:30 }]}>
            Crowd Sensing PoC
          </Text>

        <Text style={[styles.text, { fontSize: 20, fontWeight: "400",  }]}>
          For User
        </Text>

          <View style={styles.btnContainer}>
            <Button
            icon={
              <Icon
                name="sign-in-alt"
                size={20}
                color="white"
                solid
                style={{position:'absolute', right:20}}
              />
            }
            iconRight
              buttonStyle={styles.button}
              title="Login"
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate("Login")}
            ></Button>

            <Button
            icon={
              <Icon
                name="user-plus"
                size={20}
                color="white"
                solid
                style={{position:'absolute', right:20}}
              />
            }
            iconRight
              buttonStyle={styles.button}
              title="Sign Up"
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate("SignUp")}
            ></Button>

            {/* <Button
              buttonStyle={[styles.button, { width: 50 }]}
              title="QR"
              titleStyle={{ fontFamily: "MetropolisBold" }}
              onPress={toggleOverlay}
              disabled={!hasData}
            ></Button> */}
          </View>
          <Divider style={styles.mainDivider} />
          <Text style={[styles.text, { fontSize: 20, fontWeight: "400", marginTop:20 }]}>
          For Requester
        </Text>
          <View style={styles.btnContainer}>
            <Button
            icon={
              <Icon
                name="qrcode"
                size={20}
                color="white"
                solid
                style={{position:'absolute', right:20}}
              />
            }
            iconRight
              buttonStyle={[styles.button, { }]}
              title="Responses"
              titleStyle={styles.btnText}
              onPress={async () => {
                setProcessing(true)
                var requestResult = await fetch(`https://crowdsensing-middleware.herokuapp.com/getRequests`);
        requestResult = await requestResult.json();
        setProcessing(false)
        navigation.navigate("Profile", {requests: requestResult});

              }}
            ></Button>
            <Button
            icon={
              <Icon
                name="plus-circle"
                size={20}
                color="white"
                solid
                style={{position:'absolute', right:20}}
              />
            }
            iconRight
              buttonStyle={[styles.button, {}]}
              title="Add Task"
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate("AddRecord")}
            ></Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    margin:'auto',
    paddingTop: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: "#273157",
    zIndex:2
  },

  button: {
    backgroundColor: "#196F3D",
    color: "white",
    width: 150,
    height:40,
    margin: 5,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#52BE80",
  },
  btnText:{
    position:'absolute',
    left:20
  },
  text: {
    // fontFamily: "Varela",
    color: "#F0F3F4",
    textAlign: "center",
    fontSize: 20,
  },

  image: {
    position:'absolute',
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex:1
  },

  btnContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  mainDivider: {
    backgroundColor: "gray",
    marginVertical: 10,
    height: 2,
    width: 300,
    alignSelf: "center",
  },
});
