import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Animated, Dimensions, Image,Modal,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Make sure you have installed @react-native-picker/picker
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import{ useRef } from 'react';
import RNPickerSelect from 'react-native-picker-select';


const jobData = [
  {
    id: '1',
    title: 'Inclusive Graphic Designer',
    company: 'Creative Visions Studio',
    location: 'Casablanca, Morocco',
    logo: require('../assets/images/logo1.jpg'), // Use require for local images
    largePhoto: require('../assets/images/Job-Offer.png'),
    description: 'At Creative Visions Studio, we believe that creativity knows no bounds...',
    requirements: 'We are seeking a graphic designer with 3+ years of experience...',
    accommodations: 'Flexible work hours and remote work options available...',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Tech Innovators',
    location: 'Rabat, Morocco',
    logo: require('../assets/images/logo2.png'), // Use require for local images
    largePhoto: require('../assets/images/front.png'),
    description: 'At Creative Visions Studio, we believe that creativity knows no bounds...',
    requirements: 'We are seeking a graphic designer with 3+ years of experience...',
    accommodations: 'Flexible work hours and remote work options available...',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Design Hub',
    location: 'Marrakech, Morocco',
    logo: require('../assets/images/logo3.png'), // Use require for local images
    largePhoto: require('../assets/images/ui.png'),
    description: 'At Creative Visions Studio, we believe that creativity knows no bounds...',
    requirements: 'We are seeking a graphic designer with 3+ years of experience...',
    accommodations: 'Flexible work hours and remote work options available...',
  },
];


const { width, height } = Dimensions.get('window');




const HomeScreen = () => {

//save button animation
  
   
    const animationRef = useRef(null);
   
  ////////////////
  const [searchQuery, setSearchQuery] = useState('');
  const scrollX = useState(new Animated.Value(0))[0];
  const arrowAnimation = useState(new Animated.Value(0))[0];
  const [savedJobs, setSavedJobs] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    jobType: '',
    accessibility: '',
    industry: '',
    accommodation: '',
  });

  const [animationVisible, setAnimationVisible] = useState({});



  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [arrowAnimation]);



  


const toggleSaveJob = (id) => {
  setSavedJobs((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));

  // Show the animation when saving the job
  if (!savedJobs[id]) {
    setAnimationVisible((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  }
};

const handleAnimationFinish = (id) => {
  setAnimationVisible((prevState) => ({
    ...prevState,
    [id]: false,
  }));
};


  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // Default to "Description"
 
 
  const renderJobCard = ({ item, index }) => {
    const inputRange = [(index - 1) * width * 0.8, index * width * 0.8, (index + 1) * width * 0.8];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
  
    return (
      <TouchableOpacity
        style={styles.jobCardContainer}
        onPress={() => {
          setSelectedJob(item);  // Set the selected job
          setModalVisible(true); // Show the modal
        }}
      >
        <Animated.View style={[styles.jobCard, { transform: [{ scale }], opacity }]}>
          <View style={styles.imageContainer}>
            <Image source={item.largePhoto} style={styles.largePhoto} />
  
            {/* Save button and animation */}
            <TouchableOpacity
              style={styles.saveIcon}
              onPress={() => toggleSaveJob(item.id)} 
            >
              <Ionicons name="bookmark" size={24} color={savedJobs[item.id] ? "#FF5733" : "#6366F1"} />
            </TouchableOpacity>
  
            {animationVisible[item.id] && (
              <LottieView
                ref={animationRef}
                source={require('../assets/animations/fireworks.json')}
                style={styles.fireworks}
                loop={false}
                autoPlay={true}
                onAnimationFinish={() => handleAnimationFinish(item.id)}
              />
            )}
          </View>
  
          <View style={styles.jobInfoContainer}>
            <Image source={item.logo} style={styles.companyLogoSmall} />
            <View style={styles.jobDetails}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobCompany}>{item.company}</Text>
              <Text style={styles.jobLocation}>{item.location}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  



  const renderJobModal = () => {
    if (!selectedJob) return null;
  
    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Image source={selectedJob.logo} style={styles.modalCompanyLogo} />
            <View style={styles.modalHeaderText}>
              <Text style={styles.modalTitle}>{selectedJob.company || "Company Name"}</Text>
              <Text style={styles.modalLocation}>Remote / {selectedJob.location || "Location"}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
  
          <View style={styles.modalBody}>
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
                  {selectedJob.description && selectedJob.description.trim() !== ''
                    ? selectedJob.description
                    : "No description available"}
                </Text>
              )}
              {activeTab === 'requirements' && (
                <Text style={styles.jobDescription}>
                  {selectedJob.requirements && selectedJob.requirements.trim() !== ''
                    ? selectedJob.requirements
                    : "No requirements available"}
                </Text>
              )}
              {activeTab === 'accommodations' && (
                <Text style={styles.jobDescription}>
                  {selectedJob.accommodations && selectedJob.accommodations.trim() !== ''
                    ? selectedJob.accommodations
                    : "No accommodations available"}
                </Text>
              )}
            </ScrollView>
  
            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(selectedJob)}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  

  return (
    <View style={styles.container}>

   
   
      {/**Search container */}



<View style={styles.UpBar}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholderTextColor="#A0AEC0"
        />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
          <Ionicons name="filter-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
{/*filters*/}
{showFilters && (
          <View style={styles.filterContainer}>
           {/* Location Picker */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Location:</Text>
          <Picker
            selectedValue={selectedFilters.location}
            onValueChange={(itemValue) =>
              setSelectedFilters({ ...selectedFilters, location: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="All Locations" value="" />
            <Picker.Item label="Casablanca" value="Casablanca" />
            <Picker.Item label="Rabat" value="Rabat" />
            <Picker.Item label="Marrakech" value="Marrakech" />
          </Picker>
        </View>

        {/* Job Type Picker */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Job Type:</Text>
          <Picker
            selectedValue={selectedFilters.jobType}
            onValueChange={(itemValue) =>
              setSelectedFilters({ ...selectedFilters, jobType: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="All Types" value="" />
            <Picker.Item label="Full-time" value="Full-time" />
            <Picker.Item label="Part-time" value="Part-time" />
            <Picker.Item label="Remote" value="Remote" />
          </Picker>
        </View>

        {/* Accessibility TextInput */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Accessibility:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter accessibility features"
            value={selectedFilters.accessibility}
            onChangeText={(text) =>
              setSelectedFilters({ ...selectedFilters, accessibility: text })
            }
            placeholderTextColor="#A0AEC0"
          />
        </View>

        {/* Industry TextInput */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Industry:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter industry"
            value={selectedFilters.industry}
            onChangeText={(text) =>
              setSelectedFilters({ ...selectedFilters, industry: text })
            }
            placeholderTextColor="#A0AEC0"
          />
        </View>

        {/* Accommodation TextInput */}
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Accommodation:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter accommodation details"
            value={selectedFilters.accommodation}
            onChangeText={(text) =>
              setSelectedFilters({ ...selectedFilters, accommodation: text })
            }
            placeholderTextColor="#A0AEC0"
          />
        </View>

        {/* Apply Filters Button */}
        <TouchableOpacity style={styles.applyFiltersButton} onPress={toggleFilters}>
          <Text style={styles.applyFiltersText}>Apply Filters</Text>
        </TouchableOpacity>
          </View>
        )}
  
</View>

{/**Cards section */}
<View style={styles.Cardssection}>
      <Text style={styles.featuredTitle}>Job Offers</Text>
      <Animated.FlatList
        data={jobData}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
      />

{renderJobModal()}
</View>
      <View style={styles.bottomBar}>
      
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="home-outline" size={24}  color="#A0AEC0" />
          <Text style={styles.bottomBarText}>Home</Text>
        </TouchableOpacity>
       </Link>

       <Link href="/notifications" asChild>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="notifications-outline" size={24} color="#A0AEC0" />
          <Text style={styles.bottomBarText}>Notifications</Text>
        </TouchableOpacity>
        </Link>
        <Link href="/Professional_Info" asChild>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="bookmark-outline" size={24} color="#A0AEC0" />
          <Text style={styles.bottomBarText}>Saved</Text>
        </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="person-outline" size={24} color="#A0AEC0" />
          <Text style={styles.bottomBarText}>Profile</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};



// Update the styles object
const styles = StyleSheet.create({
 ///////////////
 jobDescription: {
  fontSize: 16,
  color: '#000', // Make sure the text color is visible
  lineHeight: 24,
},

modalContainer: {
  flex: 1, // Allow the modal to take full height responsively
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
},

modalHeader: {
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

modalHeaderText: {
  marginLeft: 10,
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
},

modalLocation: {
  fontSize: 14,
  color: 'white',
},

closeButton: {
  marginLeft: 'auto',
  padding: 10,
},

modalBody: {
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

 //////////////// 
 
  fireworks: {
    position: 'absolute',
    top: -15,
    left: 300,
    width: 64,
    height: 64,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  UpBar: {
    padding: 16,
    backgroundColor: '#F5F7F9',
  },
  Cardssection: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    padding: 10,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#2D3748',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#6366F1',
    borderRadius: 8,
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12, // Slightly more rounded corners for a softer look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Slightly deeper shadow
    shadowOpacity: 0.1,
    shadowRadius: 12, // Softer and more diffused shadow
    elevation: 3, // Slightly raised for a premium feel
  },
  filterItem: {
    marginBottom: 16, // Increased spacing for a cleaner layout
    zIndex: 10,
  },
  filterLabel: {
    marginBottom: 6, // Slightly more space for balance
    color: '#2C3E50', // A deeper, more sophisticated color
    fontSize: 15, // Slightly larger font size for better readability
    fontWeight: '600', // A semi-bold weight for a more professional look
  },
  picker: {
    height: 52, // Slightly taller for more prominence
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1DCE5', // A softer, more refined border color
    borderRadius: 10, // Slightly more rounded for a modern touch
    backgroundColor: '#F8FAFC', // A very light background for a clean look
    color: '#1F2937', // Darker text color for better contrast
  },
  input: {
    height: 42, // Slightly taller for consistency
    backgroundColor: '#F0F4F8', // A lighter, more refined background color
    color: '#1F2937', // Consistent text color for uniformity
    borderRadius: 10, // Rounded corners for a modern aesthetic
    paddingHorizontal: 14, // More padding for a balanced look
  },
  applyFiltersButton: {
    marginTop: 12, // More space for a better visual flow
    backgroundColor: '#4F46E5', // A deeper shade of blue for a more premium feel
    paddingVertical: 14, // Slightly more padding for a substantial feel
    borderRadius: 10, // Rounded corners to match the rest of the design
    alignItems: 'center',
  },
  applyFiltersText: {
    color: '#ffffff',
    fontSize: 17, // Slightly larger for emphasis
    fontWeight: 'bold',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginHorizontal: 16,
    marginTop: -10,
    marginBottom: 30,
    marginLeft: -210,
  },
  jobCard: {
    width: width * 0.9,           // 90% of the screen width
    marginHorizontal: width * 0.05,  // This will center the card horizontally
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    height: 455,
  },
  
  largePhoto: {
    width: '100%',
    height: 270,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
  },
  saveIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  jobInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'left',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  carouselContent: {
    paddingHorizontal: width * 0.1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  bottomBarText: {
    fontSize: 12,
    color: '#4A5568',
  },
});




export default HomeScreen;
