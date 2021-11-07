import React, { useRef, useEffect, useState } from "react";
import { Animated, Text, View, Image, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome5";
// You can then use your `FadeInView` in place of a `View` in your components:
export default ({ navigation }) => {
  const [task, setTask] = useState(0);
  const [area, setArea] = useState(0);
  const [processing, setProcessing] = useState(false);
  const locations = [
    {lat:33.6518307, long:73.1544046},
    {lat:33.6610683, long:73.0749355},
    {lat:33.5953144, long:73.0427652},
    {lat:33.7317828, long:73.0957196},
    {lat:33.9774984, long:71.4253829}, //Peshawar
    {lat:31.4832209, long:74.05419}, //Lahore

  ];

  const addTask = async (key, value) => {
    try {
      setProcessing(true);

        var res = await fetch("https://crowdsensing-middleware.herokuapp.com/addRequest", {
          method: "POST",
          body: JSON.stringify({
            type: task,
            long: locations[area-1].long,
            lat: locations[area-1].lat,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("result = ", res)
      setProcessing(false);
      alert("Task Added");
    } catch (e) {
      setProcessing(false);
      console.log("Error API ", e);
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1 }}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
          <View style={{ alignItems: "center" }}>
            <Spinner
              visible={processing}
              textStyle={[styles.text, { color: "white" }]}
              textContent={"Loading....."}
            />
            <Text style={[styles.text, { fontSize: 20 }]}>
              Please Select The Area
            </Text>

            <View style={[styles.btnContainer, { marginBottom: 0 }]}>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginRight: 5,
                    backgroundColor: (area == 1)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 1"
                titleStyle={{
                  
                  color: 'black',
                }}
                onPress={() => setArea(1)}
              ></Button>

              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (area == 2)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 2"
                titleStyle={{color:'black' }}
                onPress={() => setArea(2)}
              ></Button>

              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginRight: 5,
                    backgroundColor: (area == 3)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 3"
                titleStyle={{

                  color: 'black',
                }}
                onPress={() => setArea(3)}
              ></Button>
            </View>
            <View style={[styles.btnContainer, { marginTop: 0 }]}>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (area == 4)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 4"
                titleStyle={{color:'black' }}
                onPress={() => setArea(4)}
              ></Button>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (area == 5)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 5"
                titleStyle={{color:'black' }}
                onPress={() => setArea(5)}
              ></Button>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (area == 6)? '#ABEBC6':'white'
                  },
                ]}
                title="Area 6"
                titleStyle={{color:'black' }}
                onPress={() => setArea(6)}
              ></Button>
            </View>

            <Text style={[styles.text, { fontSize: 20 }]}>
              Please Select The Task
            </Text>

            <View style={[styles.btnContainer, { marginBottom: 0 }]}>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginRight: 5,
                    backgroundColor: (task == 1)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 1"
                titleStyle={{
                  
                  color: 'black',
                }}
                onPress={() => setTask(1)}
              ></Button>

              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (task == 2)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 2"
                titleStyle={{color:'black' }}
                onPress={() => setTask(2)}
              ></Button>

              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginRight: 5,
                    backgroundColor: (task == 3)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 3"
                titleStyle={{
                  
                  color: 'black',
                }}
                onPress={() => setTask(3)}
              ></Button>
            </View>
            <View style={[styles.btnContainer, { marginTop: 0 }]}>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (task == 4)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 4"
                titleStyle={{color:'black' }}
                onPress={() => setTask(4)}
              ></Button>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (task == 5)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 5"
                titleStyle={{color:'black' }}
                onPress={() => setTask(5)}
              ></Button>
              <Button
                buttonStyle={[
                  styles.button,
                  {
                    width: 100,
                    marginLeft: 5,
                    backgroundColor: (task == 6)? '#ABEBC6':'white'
                  },
                ]}
                title="Task 6"
                titleStyle={{color:'black' }}
                onPress={() => setTask(6)}
              ></Button>
            </View>

            <Button
              buttonStyle={[styles.button, { width: 250 }]}
              title="Add Task"
              icon={
                <Icon
                  name="plus-circle"
                  size={20}
                  color="white"
                  solid
                  style={{ position: "absolute", right: 20 }}
                />
              }
              iconRight
              onPress={async () => {await addTask();}}
            ></Button>
            <View>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    paddingTop: 50,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: "#273157",
    zIndex: 2,
  },
  button: {
    backgroundColor: "#196F3D",
    color: "white",
    width: 150,
    height: 40,
    margin: 5,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#52BE80",
  },
  btnText: {
    position: "absolute",
    left: 20,
  },
  text: {
    // fontFamily: "Varela",
    color: "#F0F3F4",
    textAlign: "center",
    fontSize: 20,
  },

  image: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex: 0,
  },

  btnContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#154360",
    borderRadius: 90,
  },
  input: {
    borderRadius: 90,
    borderColor: "#D3D4D5",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
