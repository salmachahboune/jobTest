import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,ScrollView, TextInput,Image,Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
const { width, height } = Dimensions.get('window');
const activityFeedData = [
  // Sample data
];

export default function ActivityFeedScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState([]);
  const [documents, setDocuments] = useState([]);  // Add this line


  // Function to pick an image or video
const pickImageOrVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false, // Set to false for single file selection
      quality: 1,
    });
  
    if (!result.canceled) {
      setMedia([...media, result.assets[0].uri]);  // Store the selected media
    }
  };
  
  // Function to pick a document
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // All file types
      copyToCacheDirectory: true,
    });
  
    if (result.type !== 'cancel') {
      setDocuments([...documents, result.uri]);  // Store the selected document
    }
  };
 

 

const renderJobPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.profileSection}>
        <Ionicons name="person-circle-outline" size={60} color="#2c3e50" />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.job}>{item.job}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.offerButton}>
        <Text style={styles.offerButtonText}>View Offer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with search, filter, notifications, and messages */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#b0b3b8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#b0b3b8"
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="filter-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.offerButton}>
            <Ionicons name="notifications-outline" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerButton}>
            <Ionicons name="chatbubble-outline" size={26} color="#000" style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => setFilterVisible(false)}
            >
              <Ionicons name="close-outline" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter by:</Text>

            {/* Job Title/Role */}
            <Text style={styles.inputLabel}>Job Title/Role</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Job Title or Role"
              placeholderTextColor="#b0b3b8"
            />

            {/* Education */}
            <Text style={styles.inputLabel}>Education</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Education Level"
              placeholderTextColor="#b0b3b8"
            />

            {/* Skill Set and Qualifications */}
            <Text style={styles.inputLabel}>Skill Set and Qualifications</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Skills or Qualifications"
              placeholderTextColor="#b0b3b8"
            />

            {/* Industry */}
            <Text style={styles.inputLabel}>Industry</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Industry"
              placeholderTextColor="#b0b3b8"
            />

            {/* Disability Type */}
            <Text style={styles.inputLabel}>Disability Type</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Disability Type"
              placeholderTextColor="#b0b3b8"
            />

            {/* Search Button */}
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  {/* post modal */}   

      {/* Post Modal */}
      <Modal
  visible={postModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setPostModalVisible(false)}
>
  <View style={styles.modalPContainer}>
    <View style={styles.modalPContent}>
      <TouchableOpacity
        style={styles.modalCloseIcon}
        onPress={() => setPostModalVisible(false)}
      >
        <Ionicons name="close-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Create a Post</Text>

      {/* Preview selected media */}
  {/* Preview selected media */}
<ScrollView
  horizontal
  style={styles.mediaPreviewContainer}
  contentContainerStyle={{ alignItems: 'center' }} // Use contentContainerStyle here
>
  {media.map((item, index) => (
    <Image key={index} source={{ uri: item }} style={styles.mediaImage} />
  ))}
</ScrollView>


      {/* Post Content Input */}
      <TextInput
        style={styles.postInput}
        multiline
        placeholder="Write something..."
        placeholderTextColor="#b0b3b8"
        value={postContent}
        onChangeText={setPostContent}
      />

      {/* Media and File Input */}
      <View style={styles.mediaContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={pickImageOrVideo}>
          <Ionicons name="image-outline" size={20} color="#3498db" />
          <Text style={styles.mediaButtonText}>Photo/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={pickDocument}>
          <Ionicons name="document-attach-outline" size={20} color="#3498db" />
          <Text style={styles.mediaButtonText}>Attach File</Text>
        </TouchableOpacity>
      </View>

      {/* Post Button */}
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          setPostModalVisible(false);
          setPostContent('');
          setMedia([]);
          setDocuments([]);
        }}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      {/* Activity feed */}
      <FlatList
        data={activityFeedData}
        renderItem={renderJobPost}
        keyExtractor={(item) => item.id}
        style={styles.feed}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={30} color="#2c3e50" />
        <Ionicons name="bookmark-outline" size={30} color="#2c3e50" />
        <TouchableOpacity
            style={styles.addButton}
             onPress={() => setPostModalVisible(true)}
        >
              <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <Ionicons name="briefcase-outline" size={30} color="#2c3e50" />
        <Ionicons name="person-outline" size={30} color="#2c3e50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
      },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 70,
    elevation: 3,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 40,
    color: '#34495e',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  filterButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  iconsContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  feed: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: -2,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#dcdde1',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  ////// Modal styles ///////
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  modalInput: {
    height: 50,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f1f3f4',
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ////// Modal styles ///////
  modalPContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalPContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it's above other elements
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  postInput: {
    height: 80,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f1f3f4',
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  mediaButton: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  mediaButtonText: {
    fontSize: 10,
    color: '#3498db',
    marginTop: 2,
  },
  mediaPreviewContainer: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center', // Centering image preview
  },
  mediaImage: {
    width: '100%', // Full width for larger image preview
    height: 200, // Larger image height
    borderRadius: 12,
    marginBottom: 10, // Space below the image
  },
  postButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  documentPreview: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#f1f3f4',
    borderRadius: 10,
  },
  documentText: {
    fontSize: 10,
    color: '#34495e',
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
  },
  
});
