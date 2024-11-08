import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Set the error message for display
      }
    };
  
    fetchData();
  }, []);

  // Render each item from the database
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.login ? item.login : 'No Login'}</Text>
      <Text>{item.nom ? item.nom : 'No Name'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error fetching data: {error}</Text> // Display error message in a <Text> component
      ) : items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
        />
      ) : (
        <Text>Loading...</Text> // Loading state before data is fetched
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
