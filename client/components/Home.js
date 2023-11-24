import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

function Home() {
  // const[name, setName]= useState('Davenstar Limited')
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.50:5000/home", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const renderData = (item) => {
    return (
      <Card>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderData(item);
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      {/* <FAB style={StyleSheet.fab}/> */}
    </View>
  );
}

export default Home;
