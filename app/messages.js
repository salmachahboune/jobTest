// app/index.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importing icons

const messages = [
  { id: '1', name: 'Sara El Idrissi', message: 'Hi how are you?', date: '31 July', image: require('../assets/images/sara.png') },
  { id: '2', name: 'Amina Berada', message: 'Hi how are you?', date: '31 July', image: require('../assets/images/amina.png') },
  { id: '3', name: 'Khalid Mansouri', message: 'Hi how are you?', date: '31 July', image: require('../assets/images/khalid.png') },
  { id: '4', name: 'Saad Ait Idar', message: 'Hi how are you?', date: '31 July', image: require('../assets/images/saad.png') },
  { id: '5', name: 'Mouna Khalil', message: 'Hi how are you?', date: '31 July', image: require('../assets/images/mouna.png') },
];

export default function MessageListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const router = useRouter();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageContainer} 
      onPress={() => router.push({
        pathname: `/chat/${item.name}`,
        params: { name: item.name, image: item.image },  // Added image parameter
      })}
      
    >
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.messageDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 50,
    backgroundColor: '#f8f8f8',
    marginTop:50,
    height:50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageDetails: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#888',
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
});
