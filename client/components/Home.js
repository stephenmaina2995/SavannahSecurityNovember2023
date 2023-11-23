import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

function Home(props) {
  // const[name, setName]= useState('Davenstar Limited')
  const data = [
    { id: "1", title: "First Title", body: "First Body" },
    { id: "2", title: "Second Title", body: "Second Body" },
  ];

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
      <FAB style={StyleSheet.fab}/>
    </View>
  );
}

export default Home;
