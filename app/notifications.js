import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
const notifications = [
  {
    id: '1',
    name: 'Sara El Idrissi',
    message: 'Liked your post',
    date: '31 July',
    avatar:  require('../assets/images/sara.png'), // Replace with actual avatar URL
    read: false,
  },
  {
    id: '2',
    name: 'Sara El Idrissi',
    message: 'Liked your post',
    date: '31 July',
    avatar:  require('../assets/images/sara.png'), // Replace with actual avatar URL
    read: false,
  },
  {
    id: '3',
    name: 'Saad Ait Idar',
    message: 'Liked your post',
    date: '31 July',
    avatar:  require('../assets/images/saad.png'), // Replace with actual avatar URL
    read: true,
  },
  {
    id: '3',
    name: 'Saad Ait Idar',
    message: 'Liked your post',
    date: '31 July',
    avatar:  require('../assets/images/saad.png'), // Replace with actual avatar URL
    read: true,
  },
  {
    id: '3',
    name: 'Saad Ait Idar',
    message: 'Liked your post',
    date: '31 July',
    avatar:  require('../assets/images/saad.png'), // Replace with actual avatar URL
    read: true,
  },
  // Add more notifications as needed
];

const NotificationScreen = () => {
  const [search, setSearch] = useState('');

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationContainer,
        !item.read && styles.unreadNotification,
      ]}
    >
      <Image source={  item.avatar } style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
     
 <Link href="/home" asChild>
      <TouchableOpacity  style={styles.miniheader}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Notifications</Text>
     </TouchableOpacity>
 </Link>  
     
      </View>
      <View style={styles.body}>
      <View style={styles.searchBarContainer}>
      <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
       </View>
      <FlatList
        data={notifications.filter(notification =>
          notification.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    miniheader: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20,
    },
    body: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: -23,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      backgroundColor: '#0C357A',
      height: 120,
      marginBottom: -20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 50,
        borderColor: '#f1f1f1',
        borderWidth: 1,
        elevation: 2,
        width:360,
        alignSelf:'center',
      },
    
      searchIcon: {
        marginHorizontal: 10,
        color: '#888',
      },
    
    searchBar: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 20,
        color: '#333',
      },
    
    notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#ffffff',
      marginBottom: 20,
    },
    unreadNotification: {
      backgroundColor: '#e6edf9',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333333',
    },
    message: {
      fontSize: 14,
      color: '#666666',
    },
    date: {
      fontSize: 12,
      color: '#999999',
    },
    separator: {
      height: 1,
      backgroundColor: '#f1f1f1',
      marginHorizontal: 15,
    },
  });
export default NotificationScreen;
