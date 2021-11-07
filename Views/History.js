import React, { useRef, useEffect, useState } from "react";
import { FlatList, Text, View, Image, StyleSheet } from "react-native";
import {
  Card,
  ListItem,
  Button,
  // Icon,
  Tile,
  Overlay,
  Avatar,
  Divider,
  Input
} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { sha256 } from "react-native-sha256";
import Icon from "react-native-vector-icons/FontAwesome5";
// import RNLocation from 'react-native-location';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

export default ({ navigation, route }) => {
  var responseResult = route.params.responses;
  var nearest = []
  const [seed, setSeed] = useState("");
  const [selected, setSelected] = useState(0);
  const [tokenInfo, setTokenInfo] = useState("");
  const [processing, setProcessing] = useState(false);

  var counter = 0;
  const handleComplete = async (e) => {
    try {

      setProcessing(true);
      var local_seed = await AsyncStorage.getItem("seed");
      var res = await fetch("https://crowdsensing-middleware.herokuapp.com/sendTx", {
          method: "POST",
          body: JSON.stringify({
            seed: local_seed,
            address: responseResult[selected-1].address,
            Data: tokenInfo,
            txType: ("token "+responseResult[selected-1]._id)
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        res=await res.json();
        if(res==true)
{      alert("Token Issued");
        console.log("Task Completed")}
        else{
          alert("Token Already Issued");
        console.log("Res = ", res)
        }
        setProcessing(false)
    } catch (e) {
      setProcessing(false)
      alert("Error While Completing Task = ",e);
      console.log("Error in Logging In ", e);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
      <Spinner
              visible={processing}
              textStyle={[styles.text, { color: "white" }]}
              textContent={"Loading....."}
            />
        {/* <Text style={[styles.text, {fontSize:30}]}>Hello {fname} !</Text> */}
        {/* {!processing && <Text style={styles.text}>Your Location = {location[1]},{location[0]}
            </Text>} */}
        <Text style={[styles.text, {fontSize:30}]}>Responses</Text>

        <FlatList
        data={responseResult}
        renderItem={({item}) => <View style={[styles.container, {paddingTop:10, backgroundColor:'#2980B9', borderRadius:20, marginVertical:5}]}>
          <Text style={styles.text}>Response No = {++counter}</Text>
          <Text style={styles.text}>{'\n'}</Text>

          <Text style={styles.text}>Response Hash {item.respHash}</Text>
          <Text style={styles.text}>{'\n'}</Text>

          <Text style={styles.text}>By {item.address}</Text>
          <Text style={styles.text}>{'\n'}</Text>

          <Text style={styles.text}>Response Value = {item.score}</Text>
          <Text style={styles.text}>{'\n'}</Text>
          </View>}

      />
  <View style = {[styles.container, {flexDirection:'column'}]}>
  <Input
                style={{width:100}}
                label="Enter Response No. To Issue Token"
                labelStyle={{color:'yellow'}}
                inputStyle={{color:'white'}}
                keyboardType='number-pad'
                onChangeText={(value) => setSelected(Number(value))}
              />
              <Input
                style={{width:100}}
                label="Enter Token Description"
                labelStyle={{color:'yellow'}}
                inputStyle={{color:'white'}}
                // keyboardType='number-pad'
                onChangeText={(value) => setTokenInfo(value)}
              />
  <Button
              buttonStyle={styles.button}
              icon={
                <Icon
                  name="check-circle"
                  size={20}
                  color="white"
                  solid
                  style={{ position: "absolute", right: 20 }}
                />
              }
              iconRight
              title="Issue"
              onPress={async (e) => {await handleComplete()}}
            ></Button>
  </View>

  {/* <Button
              buttonStyle={styles.button}
              icon={
                <Icon
                  name="check-circle"
                  size={20}
                  color="white"
                  solid
                  style={{ position: "absolute", right: 20 }}
                />
              }
              iconRight
              title="Logout"
              onPress={() => navigation.navigate("Welcome")}
            ></Button> */}
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    margin:'auto',
    paddingTop: 50,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: "#273157",
  },
  btnContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2980B9",
    color: "white",
    width: 250,
    height:40,
    margin: 5,
    alignSelf:'center',
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "white",
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

  subtext: {
    // fontFamily: "Metropolis",
    color: "gray",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },



  image: {
    position:'absolute',
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex:0
    // alignSelf: "center",
    // marginBottom: 50,
  },

  subDivider: {
    backgroundColor: "gray",
    marginVertical: 10,
    height: 2,
    width: 200,
    alignSelf: "center",
    opacity: 0.1,
  },

  mainDivider: {
    backgroundColor: "gray",
    marginTop: 10,
    height: 2,
    width: "90%",
    alignSelf: "center",
  },
  infoContainer: {
    // marginHorizontal: 0,
            borderWidth: 2,
            borderColor: "#27AE60",
            borderRadius: 20,
            marginTop:20,
            marginHorizontal:20,
            width:'90%',
            paddingHorizontal:20,
            paddingBottom:20,
            // flexDirection: "column",
  }
});
