import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon library
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import { Alert } from 'react-native'; // Import Alert


const JobOffersScreen = () => {


 const [isEditing, setIsEditing] = useState(false); // Track if editing
 const [editingIndex, setEditingIndex] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [accommodations, setAccommodations] = useState('');
  const [jobType, setJobType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
 
 
  const [isModalOFFVisible, setModalOFFVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // Default to "Description"
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  const addJobOffer = () => {
    setJobOffers([...jobOffers, { jobTitle, description, jobRequirements, accommodations, jobType, largePhoto: selectedImage }]);
    closeModal();
  };
  
///////////////////////////////////////////////////////////////////
const addOrUpdateJobOffer = () => {
    if (isEditing && editingIndex !== null) {
      // Update the existing job offer in place
      const updatedOffers = jobOffers.map((offer, index) =>
        index === editingIndex
          ? { jobTitle, description, jobRequirements, accommodations, jobType, largePhoto: selectedImage }
          : offer
      );
      setJobOffers(updatedOffers);
    } else {
      // Add new job offer
      setJobOffers([...jobOffers, { jobTitle, description, jobRequirements, accommodations, jobType, largePhoto: selectedImage }]);
    }
  
    // Reset modal and states after saving
    closeModal();
    resetJobForm();
  };
  
  // Function to reset the form after saving or closing modal
  const resetJobForm = () => {
    setJobTitle('');
    setDescription('');
    setJobRequirements('');
    setAccommodations('');
    setJobType('');
    setSelectedImage(null);
    setIsEditing(false);
    setEditingIndex(null);
  };
  
  // Function to handle editing a job offer
  const handleEdit = (job, index) => {
    // Pre-fill the modal with the job details to be edited
    setJobTitle(job.jobTitle);
    setDescription(job.description);
    setJobRequirements(job.jobRequirements);
    setAccommodations(job.accommodations);
    setJobType(job.jobType);
    setSelectedImage(job.largePhoto);
  
    // Set editing state and index
    setIsEditing(true);
    setEditingIndex(index);
  
    // Open the modal for editing
    setModalVisible(true);
  };
  
  // Function to handle deletion with confirmation
  const handleDelete = (index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this job offer?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Remove the job offer from the list
            const updatedOffers = jobOffers.filter((_, i) => i !== index);
            setJobOffers(updatedOffers);
          }
        }
      ]
    );
  };
  
  const renderJobOffer = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.jobCardContainer}
        onPress={() => {
          setSelectedJob(item);
          setModalOFFVisible(true);
        }}
      >
        <View style={styles.jobCard}>
          <View style={styles.imageContainer}>
            {item.largePhoto && <Image source={{ uri: item.largePhoto.uri }} style={styles.largePhoto} />}
          </View>
  
          <View style={styles.jobInfoContainer}>
            <Image source={require('../assets/images/logo1.jpg')} style={styles.companyLogoSmall} />
            <View style={styles.jobDetails}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.jobCompany}>COMPANY</Text>
              <Text style={styles.jobLocation}>CASA, MOROCCO</Text>
            </View>
  
            {/* Edit and Delete Icons */}
            <View style={styles.actionIcons}>
              <TouchableOpacity onPress={() => handleEdit(item, index)}>
                <Icon name="pencil-outline" size={24} color="blue" />
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Icon name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
 ////////////////////////////////////////////////////////// //////////////////////

  const renderJobModal = () => {
    if (!selectedJob) return null;
  
    return (
      <Modal
        visible={isModalOFFVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOFFVisible(false)}
      >
        <View style={styles.modalOFFContainer}>
          <View style={styles.modalOFFHeader}>
            {/* Show job image if available */}
      
              <Image source={require('../assets/images/logo1.jpg')} style={styles.modalCompanyLogo} />
          
            
            <View style={styles.modalOFFHeaderText}>
              <Text style={styles.modalOFFTitle}>{selectedJob.jobTitle || "Job Title"}</Text>
              <Text style={styles.modalLocation}>Remote / {selectedJob.location || "Location"}</Text>
            </View>
            <TouchableOpacity style={styles.closeOFFButton} onPress={() => setModalOFFVisible(false)}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
  
          <View style={styles.modalOFFBody}>
            {/* Tabs Section */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'description' && styles.activeTab]}
                onPress={() => setActiveTab('description')}
              >
                <Text style={styles.tabText}>Description</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[styles.tab, activeTab === 'requirements' && styles.activeTab]}
                onPress={() => setActiveTab('requirements')}
              >
                <Text style={styles.tabText}>Requirements</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[styles.tab, activeTab === 'accommodations' && styles.activeTab]}
                onPress={() => setActiveTab('accommodations')}
              >
                <Text style={styles.tabText}>Accommodations</Text>
              </TouchableOpacity>
            </View>
  
            {/* Content Section */}
            <ScrollView style={styles.modalContent}>
              {activeTab === 'description' && (
                <Text style={styles.jobDescription}>
                  {selectedJob.description || "No description available"}
                </Text>
              )}
              {activeTab === 'requirements' && (
                <Text style={styles.jobDescription}>
                  {selectedJob.jobRequirements || "No requirements available"}
                </Text>
              )}
              {activeTab === 'accommodations' && (
                <Text style={styles.jobDescription}>
                  {selectedJob.accommodations || "No accommodations available"}
                </Text>
              )}
            </ScrollView>
  
            {/* Apply Button */}
        
          </View>
        </View>
      </Modal>
    );
  };
  
  
  
  
  return (
    <View style={styles.container}>

           {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search job offers"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {jobOffers.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Text>You haven't added any offers yet.</Text>
        </View>
      ) : (
        <FlatList
          data={jobOffers}
          renderItem={renderJobOffer}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      {renderJobModal()}
      <TouchableOpacity onPress={openModal} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for adding job offers */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Header with Close and Publish */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Job Offer</Text>
 
         
         
          <TouchableOpacity onPress={addOrUpdateJobOffer} style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <TextInput
            placeholder="Job Title"
            value={jobTitle}
            onChangeText={setJobTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
          />

          <TextInput
            placeholder="Job Requirements"
            value={jobRequirements}
            onChangeText={setJobRequirements}
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
          />

          <TextInput
            placeholder="Accommodations"
            value={accommodations}
            onChangeText={setAccommodations}
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
          />

          <View style={styles.picker}>
            <Picker
              selectedValue={jobType}
              onValueChange={(itemValue) => setJobType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Full-time" value="full-time" />
              <Picker.Item label="Part-time" value="part-time" />
              <Picker.Item label="Contract" value="contract" />
              <Picker.Item label="Internship" value="internship" />
              <Picker.Item label="Temporary" value="temporary" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Icon name="image-outline" size={20} color="white" style={styles.icon} />
            <Text style={styles.uploadButtonText}>Add Job Descriptif Image</Text>
          </TouchableOpacity>

          {selectedImage && (
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
          )}
        </View>

      </ScrollView>
    </View>
  </View>
      </Modal>




    </View>
  );
};


const styles = StyleSheet.create({
    actionIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60, // Adjust size as needed
        marginTop: 10,
      },
      
    ///////////////////////////
    jobDescription: {
        fontSize: 16,
        color: '#000', // Make sure the text color is visible
        lineHeight: 24,
      },
      
      modalOFFContainer: {
        flex: 1, // Allow the modal to take full height responsively
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      
      modalOFFHeader: {
        backgroundColor: '#1E3A8A',
        paddingHorizontal: 20,
        paddingTop: -40,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height:200,
      },
      
      modalCompanyLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
       
      },
      
      modalOFFHeaderText: {
        marginLeft: 10,
      },
      
      modalOFFTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      
      modalLocation: {
        fontSize: 14,
        color: 'white',
      },
      
      closeOFFButton: {
        marginLeft: 'auto',
        padding: 10,
      },
      
      modalOFFBody: {
        backgroundColor: 'white',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop:-50,
        padding:20,
        flex: 1, // This allows the body to take up available space
      },
      
      tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
      },
      
      tab: {
        paddingBottom: 10, // Increased padding for better touch target
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
      },
      
      activeTab: {
        borderBottomColor: '#1E3A8A', // Active tab color
      },
      
      tabText: {
        fontSize: 16,
        color: '#1E3A8A', // Dim inactive tabs, if needed
      },
      
      modalContent: {
        flex: 1, // Ensures content takes full space
        paddingBottom: 20, // Padding to prevent content cutoff
      },
      
      applyButton: {
        backgroundColor: '#44A0D8',
        paddingVertical: 10,
        paddingHorizontal:50,
        borderRadius: 15,
      
        alignItems: 'center',
        marginTop: 20,
      },
      
      applyButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    ////////////////////////////
    searchContainer: {
        marginTop:35,
        height:60,
        marginLeft:10,
      
        width:366,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        
        borderRadius:25,
      },
      searchIcon: {
        marginRight: 10,
      },
      searchInput: {
     
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
      },
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    emptyMessageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    jobCardContainer: {
      marginVertical: 7, // Space between cards vertically
      marginHorizontal: 3, // Space on both sides of each card
    },
    jobCard: {
      width: width - 20, // Adjust width to center the cards with margin
      marginLeft:7,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      alignItems: 'center',
      height: 260,
    },
    largePhoto: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginBottom: 20,
    },
    imageContainer: {
      width: '100%',
    },
    jobInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    companyLogoSmall: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    jobDetails: {
      flex: 1,
    },
    jobTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#333',
    },
    jobCompany: {
      fontSize: 16,
      color: '#666',
    },
    jobLocation: {
      fontSize: 14,
      color: '#999',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#1e90ff',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    addButtonText: {
      color: 'white',
      fontSize: 30,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '90%',
        maxHeight: '90%', // Ensure modal doesn't exceed the screen height
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
      },
      scrollViewContent: {
        flexGrow: 1, // Allow ScrollView content to grow and scroll
      },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    closeButton: {
      padding: 10,
    },
    closeButtonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    publishButton: {
      backgroundColor: '#1e90ff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    publishButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    form: {
      marginVertical: 10,
    },
    input: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E2E2E2',
      marginBottom: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      fontSize: 16,
    },
    textArea: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E2E2E2',
      borderRadius: 10,
      marginBottom: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      textAlignVertical: 'top',
    },
    picker: {
      marginVertical: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E2E2E2',
    },
    uploadButton: {
      backgroundColor: '#005f99',
      padding: 12,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
    uploadButtonText: {
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 10,
    },
    previewImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginTop: 15,
    },
  });
  

export default JobOffersScreen;



