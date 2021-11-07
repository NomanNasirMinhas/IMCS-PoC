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
import Spinner from "react-native-loading-spinner-overlay";

export default ({ navigation, route }) => {
  var requestResult = route.params.requests;
  var tokenResult = route.params.token;

  var nearest = []
  const [seed, setSeed] = useState("");
  const [selected, setSelected] = useState(0);
  const [seedInfo, setSeedInfo] = useState("");
  const [iAddress, setIAddress] = useState("");
  const [location, setLocation] = useState([0,0]);
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [idnum, setIDnum] = useState("");
  const [processing, setProcessing] = useState(true);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [tasks, setTask] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  var profile = {
    address: iAddress
  }
  useEffect(() => {
    (async () => {
      try {
        setProcessing(true)
        let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

        var local_seed = await AsyncStorage.getItem("seed");
        var local_info = await AsyncStorage.getItem("addressInfo");
        var iadd = await AsyncStorage.getItem("address");
        setSeed(local_seed);
        setSeedInfo(local_info);
        setIAddress(iadd);
        var obj_info = JSON.parse(local_info);
        console.log("Local Info = ", obj_info);
        setEmail(obj_info.email);
        setFname(obj_info.fname);
        setSname(obj_info.sname);
        setDOB(obj_info.dob);
        // setPlaceOfBirth(await AsyncStorage.getItem("birth"));
        // setNationality(await AsyncStorage.getItem("nationality"));
        // setResidence(await AsyncStorage.getItem("residence"));
        setAddress(obj_info.address);
        setIDnum(obj_info.idnum);
        setPhone(obj_info.phone);
        // setHash(await sha256(idnum));
        // console.log("ID = ", ID);
        // var result = await fetch(`https://freighterapi.herokuapp.com/getMsgs/${ID}&''`)
        // result = await result.json();
        // console.log("Result = ", result);
        console.log("User Address = ", iadd);
        let requests = [];

        console.log("Request Result =", requestResult);

        if (requestResult != false) {
          setTask(requestResult)
        } else {
          console.log("No Tasks Found")
        }

        // cons
        let loc = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.BestForNavigation});
      console.log("Location = ", loc);
      let locArr = [loc.coords.longitude, loc.coords.latitude];
      setLocation(locArr);
        setProcessing(false);
      } catch (e) {
        setProcessing(false);
        console.log("Error in Final Catch = ", e);
      }
    })();
  }, []);
  var counter = 0;
  const handleComplete = async (e) => {
    try {

      setProcessing(true);
      if(selected <= requestResult.length){var seed = await AsyncStorage.getItem("seed");
      var data = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${selected}`
      );
      var data = await data.json();
        console.log("Rquested Data = ", data)
      var res = await fetch("https://crowdsensing-middleware.herokuapp.com/sendTx", {
          method: "POST",
          body: JSON.stringify({
            seed: seed,
            address: iAddress,
            Data: JSON.stringify(data),
            txType: requestResult[selected-1]._id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        res=await res.json();
        if(res==true)
{      alert("Task Completed");
        console.log("Task Completed")}
        else{
          alert("Task Already Completed");
        console.log("Res = ", res)
        }
      }
        else{
      alert("Invalid Request Number");
          console.log("Invalid Request")
        }
        setProcessing(false)
    } catch (e) {
      setProcessing(false);
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
        <Text style={[styles.text, {fontSize:30}]}>Hello {fname} !</Text>
        {/* {!processing && <Text style={styles.text}>Your Location = {location[1]},{location[0]}
            </Text>} */}
        <Text style={[styles.text, {fontSize:30}]}>Tasks</Text>

        <FlatList
        data={requestResult}
        renderItem={({item}) => <View style={[styles.container, {paddingTop:10, backgroundColor:'#EB984E', borderRadius:20, marginVertical:5}]}>
          <Text style={styles.text}>Task No = {++counter}</Text>
          <Text style={styles.text}>Task Type = {item.taskType}</Text>
          <Text style={styles.text}>Task Location = {item.location.lat},{item.location.long}</Text>
          {!processing && <Text style={styles.text}>Distance = {getDistance(
            { latitude: Number(location[1]), longitude: Number(location[0]) },
            { latitude: Number(item.location.lat), longitude: Number(item.location.long) })/1000} Km
            </Text>}

          </View>}

      />
  <View style = {[styles.container, {flexDirection:'column'}]}>
  <Input
                style={{width:100}}
                label="Enter Task Number To Complete"
                labelStyle={{color:'yellow'}}
                inputStyle={{color:'white'}}
                keyboardType='number-pad'
                onChangeText={(value) => setSelected(Number(value))}
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
              title="Complete"
              onPress={async (e) => {await handleComplete()}}
            ></Button>
  </View>

  <Text style={[styles.text, {fontSize:30}]}>Tokens</Text>

<FlatList
data={tokenResult}
renderItem={({item}) => <View style={[styles.container, {paddingTop:10, backgroundColor:'#48C9B0', borderRadius:20, marginVertical:5}]}>
  <Text style={styles.text}>Token Hash = {item.txHash}</Text>
  <Text style={styles.text}>Token ID = {item.txType}</Text>
  <Text style={styles.text}>Issued On = {item.timestamp}</Text>

  </View>}

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
              title="Logout"
              onPress={() => navigation.navigate("Welcome")}
            ></Button>
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
