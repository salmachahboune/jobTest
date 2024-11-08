
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window');
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,Button, FlatList, Modal, Share ,StyleSheet,Alert,ImageBackground,  Dimensions,ScrollView,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
export default function ProfileScreen() {
    
  ////////section for treating posts///
 /////////hooks
 const [modalVisible, setModalVisible] = useState(false);
 const [postText, setPostText] = useState('');
 const [responseText, setresponseText ] = useState('');
 const [mediaUri, setMediaUri] = useState(null);
 const [mediaType, setMediaType] = useState(null);
 const [posts, setPosts] = useState([]);
 const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
 const [showAllPosts, setShowAllPosts] = useState(false);
 const [visibleComments, setVisibleComments] = useState({});
 const [visibleReplies, setVisibleReplies] = useState({});
 const [commentText, setCommentText] = useState(''); 
 const [editCommentIndex, setEditCommentIndex] = useState(null); // Index of the comment being edited
 const [editedText, setEditedText] = useState(''); // Text of the comment being edited
 const [editReplyIndex, setEditReplyIndex] = useState(null);
 const [editedReplyText, setEditedReplyText] = useState('');
 const openModal = () => setModalVisible(true);
 const closeModal = () => setModalVisible(false);
 const [isEditing, setIsEditing] = useState(false);
 const [editIndex, setEditIndex] = useState(null);

 const router = useRouter();

 //TOGGLECOMMENTLIKE
const toggleCommentLike = (postIndex, commentIndex) => {
  const updatedPosts = [...posts];
  const comment = updatedPosts[postIndex].comments[commentIndex];
  comment.likes = typeof comment.likes === 'number' ? comment.likes : 0;
  comment.liked = !comment.liked;
  comment.likes = comment.liked ? comment.likes + 1 : Math.max(comment.likes - 1, 0);
  setPosts(updatedPosts);
};
//TOGGLECOMMENTVISIBILITY
const toggleCommentVisibility = (postIndex) => {
  setVisibleComments((prevVisibleComments) => ({
    ...prevVisibleComments,
    [postIndex]: !prevVisibleComments[postIndex],
  }));
};
//ADD COMMENT TO POST
const addCommentToPost = (index, commentText) => {
  const updatedPosts = [...posts];
  updatedPosts[index].comments.push({
    text: commentText,
    likes: 0,
    liked: false,
    responses: [],
    userName: "Amina El Mensouri", // Replace with dynamic name
    userPhotoUri: '../assets/images/profilepic.png', // Replace with dynamic photo URI
    timestamp: new Date(), // Current date and time
  });
  setPosts(updatedPosts);
  setCommentText('');
};
//DELETE COMMENT
const deleteComment = (postIndex, commentIndex) => {
  Alert.alert(
    'Confirm Delete',
    'Are you sure you want to delete this comment?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Delete cancelled'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedPosts = [...posts];
          updatedPosts[postIndex].comments.splice(commentIndex, 1); // Remove the comment
          setPosts(updatedPosts); // Update the state with the new posts array
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

//EDIT COMMENT
const editComment = (postIndex, commentIndex) => {
  const updatedPosts = [...posts];
  updatedPosts[postIndex].comments[commentIndex].text = editedText;
  setPosts(updatedPosts);
  setEditCommentIndex(null); // Reset edit mode
  setEditedText(''); // Clear edited text
};
/////REPLIES//////////
//TOGGLE REPLY VISIBILITY
const toggleReplyVisibility = (postIndex, commentIndex) => {
  setVisibleReplies((prevVisibleReplies) => ({
    ...prevVisibleReplies,
    [`${postIndex}-${commentIndex}`]: !prevVisibleReplies[`${postIndex}-${commentIndex}`],
  }));
};
//ADD RESPONSE TO COMMENT
const addResponseToComment = (postIndex, commentIndex, responseText) => {
  const updatedPosts = [...posts];
  updatedPosts[postIndex].comments[commentIndex].responses.push({
    text: responseText,
    likes: 0,
    liked: false,
    userName: "Amina El Mansouri", // Replace with dynamic name
    userPhotoUri: '../assets/images/profilepic.png', // Replace with dynamic photo URI
    timestamp: new Date(), // Current date and time
  });
  setPosts(updatedPosts);
  setresponseText('');
};
//SAVE COMMENT EDIT
  const saveCommentEdit = (postIndex, commentIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments[commentIndex].text = editedText;
    setPosts(updatedPosts);
    setEditCommentIndex(null); // Reset edit mode
    setEditedText(''); // Clear the edited text
  };
//TOGGLE REPLY VISIBILITY INPUT
const [visibleRepliesinput, setVisibleRepliesinput] = useState({});
const toggleReplyVisibilityinput = (postIndex, commentIndex) => {
  setVisibleRepliesinput((prevVisibleRepliesinput) => ({
    ...prevVisibleRepliesinput,
    [`${postIndex}-${commentIndex}`]: !prevVisibleRepliesinput[`${postIndex}-${commentIndex}`],
  }));
};


// TOGGLE REPLY LIKE
const toggleReplyLike = (postIndex, commentIndex, replyIndex) => {
  const updatedPosts = [...posts];
  const reply = updatedPosts[postIndex].comments[commentIndex].responses[replyIndex];
  reply.likes = typeof reply.likes === 'number' ? reply.likes : 0;
  reply.liked = !reply.liked;
  reply.likes = reply.liked ? reply.likes + 1 : Math.max(reply.likes - 1, 0);
  setPosts(updatedPosts);
};

// EDIT REPLY
const editReply = (postIndex, commentIndex, replyIndex) => {
  const updatedPosts = [...posts];
  updatedPosts[postIndex].comments[commentIndex].responses[replyIndex].text = editedReplyText;
  setPosts(updatedPosts);
  setEditReplyIndex(null); // Reset edit mode
  setEditedReplyText(''); // Clear edited text
};

// DELETE REPLY
const deleteReply = (postIndex, commentIndex, replyIndex) => {
  // Show a confirmation dialog using Alert.alert
  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to delete this reply?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          const updatedPosts = [...posts];
          updatedPosts[postIndex].comments[commentIndex].responses.splice(replyIndex, 1); // Remove the reply
          setPosts(updatedPosts);
        },
        style: "destructive"
      }
    ],
    { cancelable: true }
  );
};


//RENDER REPLIES
const renderReplies = (replies, postIndex, commentIndex) => {
  return replies.map((reply, replyIndex) => (
    <View key={replyIndex} style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
      
      <Image  source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.userName}>{reply.userName}</Text>
        <Text style={styles.timestamp}>{formatTimestamp(reply.timestamp)}</Text>
        {editReplyIndex === `${postIndex}-${commentIndex}-${replyIndex}` ? (
          <TextInput
            value={editedReplyText}
            onChangeText={setEditedReplyText}
            onSubmitEditing={() => editReply(postIndex, commentIndex, replyIndex)}
            style={styles.editReplyInput}
            autoFocus={true}
          />
        ) : (
          <Text style={styles.replyText}>{reply.text}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => toggleReplyLike(postIndex, commentIndex, replyIndex)} style={styles.replyLikebutton}>
        <Ionicons name={reply.liked ? "heart" : "heart-outline"} size={20} color={reply.liked ? "#FF0000" : "#000"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setEditReplyIndex(`${postIndex}-${commentIndex}-${replyIndex}`);
          setEditedReplyText(reply.text);
        }}
        style={styles.editReplyButton}
      >
        <Ionicons name="create" size={20} color="#007BFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteReply(postIndex, commentIndex, replyIndex)} style={styles.deleteReplyButton}>
        <Ionicons name="trash-outline" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  ));
}

//RENDER COMMENTS
const renderComments = (comments, postIndex) => {
  return comments.map((comment, commentIndex) => (
    <View key={commentIndex} style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image  source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
 <View>
        <View style={styles.usernameblockcomment}>
          <Text style={styles.userName}>{comment.userName}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(comment.timestamp)}</Text>
        </View>
          {editCommentIndex === commentIndex ? (
            <TextInput
              value={editedText}
              onChangeText={setEditedText}
              onSubmitEditing={() => saveCommentEdit(postIndex, commentIndex)}
              style={styles.editCommentInput}
              autoFocus={true}
            />
          ) : (
            <Text style={styles.commentText}>{comment.text}</Text>
          )}
        
      </View>

    <View style={styles.commenticons} >
     
     {/**like comment icon */}
      <TouchableOpacity onPress={() => toggleCommentLike(postIndex, commentIndex)} style={styles.commentLikebutton}>
        <Ionicons name={comment.liked ? "heart" : "heart-outline"} size={20} color={comment.liked ? "#FF0000" : "#000"} style={{ marginRight: -6}}/>
      </TouchableOpacity>
     
     {/**edit comment icon */} 
      <TouchableOpacity
        onPress={() => {
          setEditCommentIndex(commentIndex);
          setEditedText(comment.text);
        }}
        style={styles.editCommentButton}
      >
        <Ionicons name="create" size={20} color="#007BFF"  style={{ marginRight: -20}}/>
      </TouchableOpacity>
   
     {/**delete comment icon */}
      <TouchableOpacity onPress={() => deleteComment(postIndex, commentIndex)} style={styles.deleteCommentButton}>
        <Ionicons name="trash-outline" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => toggleReplyVisibilityinput(postIndex, commentIndex)} >
        <Text  style={styles.replytButton} >Reply</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => toggleReplyVisibility(postIndex, commentIndex)} style={styles.hideViewRepliesbutton}>
        <Text style={{ color: '#007BFF', fontSize: 16 ,fontWeight:'bold'  }}>{visibleReplies[`${postIndex}-${commentIndex}`] ? 'Hide Replies' : 'View Replies'}</Text>
      </TouchableOpacity>
      </View>
      {visibleRepliesinput[`${postIndex}-${commentIndex}`] && (
        <TextInput
          placeholder="Add a reply..."
          value={responseText}
          onChangeText={setresponseText}
          onSubmitEditing={(e) => addResponseToComment(postIndex, commentIndex, e.nativeEvent.text)}
          style={styles.replyInput}
        />
      )}
      {visibleReplies[`${postIndex}-${commentIndex}`] && renderReplies(comment.responses, postIndex, commentIndex)}
    </View>
  ));
};

////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//RENDER POST
const renderPost = ({ item, index }) => (
  <View style={styles.postCard}>
    <View style={styles.userInfo}>
      {item.userPhotoUri ? (
        typeof item.userPhotoUri === 'string' && item.userPhotoUri.startsWith('http') ? (
          <Image source={{ uri: item.userPhotoUri }} style={styles.userPhoto} />
        ) : (
          <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
        )
      ) : (
        <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
      )}
      <View>
        <Text style={styles.userName}>
          {item.userName ? String(item.userName) : 'Unknown User'}
        </Text>
        <Text style={styles.timestamp}>
          {item.timestamp ? String(formatTimestamp(item.timestamp)) : 'Unknown Time'}
        </Text> 
      </View>
      {/**edit post */}
      <TouchableOpacity onPress={() => editPost(index)} style={styles.editButtonpost}>
         <Ionicons name="create" size={30} color="#007BFF" />
      </TouchableOpacity>
       {/**deletepost */}
     <TouchableOpacity onPress={() => deletePost(index)} style={styles.deleteButton}>
       <Ionicons name="trash-outline" size={25} color="#FF0000" />
     </TouchableOpacity>

    </View>

    {item.reposted && (
      <Text style={styles.repostInfo}>Reposted by you</Text>
    )}
    
    <Text style={styles.postText}>
      {item.text ? String(item.text) : ''}
    </Text>
    
    {item.mediaUri && (
      item.mediaType === 'image' ? (
        <Image source={{ uri: item.mediaUri }} style={styles.postImage} />
      ) : (
        <View style={styles.documentContainer}>
          <Ionicons name="document" size={40} color="#007BFF" />
          <Text style={styles.documentText}>Document Selected</Text>
        </View>
      )
    )}
    
    <View style={styles.likeContainer}>
      <TouchableOpacity onPress={() => toggleLike(index)} style={styles.likeButton}>
        <Ionicons 
          name={item.liked ? "heart" : "heart-outline"} 
          size={24} 
          color={item.liked ? "#FF0000" : "#000"} 
        />
        <Text style={styles.likeCount}>
          {item.likes !== undefined ? String(item.likes) : '0'}
        </Text>
      </TouchableOpacity>
      {/**comment icon (visibility) */}
      <TouchableOpacity onPress={() => toggleCommentVisibility(index)} style={styles.commentToggleButton}>
        <Ionicons 
          name={visibleComments[index] ? "chatbubble" : "chatbubble-outline"} 
          size={24}
          style={styles.commentIcon}
        />
        {/**comment COUNT */}
       <Text style={styles.commentCount}>
       {item.comments && item.comments.length !== undefined ? String(item.comments.length) : '0'}
      </Text>
      </TouchableOpacity>

       {/** share button */}
      <TouchableOpacity onPress={() => sharePost(item)} style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={24} color="#000" />
      </TouchableOpacity>

        {/** repost button */}
      <TouchableOpacity onPress={() => repostPost(index)} style={styles.repostButton}>
        <Ionicons name="repeat" size={24} color="#000F" />
      </TouchableOpacity>
    </View>
  {/**render if the comments are visibile */}
    {visibleComments[index] && (
      <View style={styles.commentSection}>
        {renderComments(item.comments, index)}
        {/**comment container */}
 <View style={styles.commentContainer}>
      <TextInput
        placeholder="Add a comment..."
        value={commentText} // Bind the input value to state
         onChangeText={setCommentText} // Update state on input change
        onSubmitEditing={(e) => addCommentToPost(0, e.nativeEvent.text)}
        style={styles.commentInput}
      /> 
      <TouchableOpacity  onPress={(e) => addCommentToPost(0, commentText)} >
        <Ionicons name="send" size={25} color="#022D74" style={styles.sendcommenticon} />
      </TouchableOpacity>
   </View>
      </View>
    )}
  </View>
);

////////////////////////////////////////////////////////////////////

  // Share post functionality
  const sharePost = async (item) => {
    try {
      const result = await Share.share({
        message: item.text,
        url: item.mediaUri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === 'granted');
    })();
  }, []);



  const pickMedia = async (type) => {
    if (hasGalleryPermission === false) {
      alert('Permission required to access your media library');
      return;
    }

    if (type === 'document') {
      let result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type !== 'cancel') {
        setMediaUri(result.uri);
        setMediaType('document');
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setMediaUri(result.assets[0].uri);
        setMediaType(type === ImagePicker.MediaTypeOptions.Images ? 'image' : 'video');
      }
    }
  };
//////////////////////////////////////////
  const handleSubmitPost = () => {
    if (isEditing) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = {
        ...updatedPosts[editIndex],
        text: postText,
        mediaUri,
        mediaType,
      };
      setPosts(updatedPosts);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newPost = {
      text: postText,
      mediaUri,
      mediaType,
      likes: 0,
      liked: false,
      comments: [],
      userName: 'Amina El Mansouri', // Simulated user name
      userPhotoUri: '../assets/images/bgProfile.png', // Simulated user photo URI
      timestamp: new Date().toISOString(), // Add timestamp here
    };
    setPosts([newPost, ...posts]);
  }
  setPostText('');
  setMediaUri(null);
  setMediaType(null);
  closeModal();
};
/////////////////////////////////////////////////////////////
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats the date as 'MM/DD/YYYY, HH:MM:SS AM/PM'
  };
////////////////////////////////////////////
///////////////////////////////////////////
//navigate to all posts
  const navigateToAllPosts = () => {
    router.push({
      pathname: '/AllPosts',
      params: { posts: JSON.stringify(posts) },
    });
  };
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
    post.likes = typeof post.likes === 'number' ? post.likes : 0;
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : Math.max(post.likes - 1, 0);
    setPosts(updatedPosts);
  };

//repost///////////////////////////////////
  const repostPost = (index) => {
    const postToRepost = posts[index];
    const repostedPost = {
      ...postToRepost,
      reposted: true,
      originalPoster: 'Original Poster Name', // You can include information about the original poster
    };
    setPosts([repostedPost, ...posts]);
  };
  /////////////////////////////////
  const editPost = (index) => {
  const postToEdit = posts[index];
  setPostText(postToEdit.text);
  setMediaUri(postToEdit.mediaUri);
  setMediaType(postToEdit.mediaType);
  setIsEditing(true);
  setEditIndex(index);
  openModal();
};
//function to handele delete 
const deletePost = (index) => {
 
  Alert.alert(
    'Confirm Delete',
    'Are you sure you want to delete this item?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Delete cancelled'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {const updatedPosts = posts.filter((_, i) => i !== index);
          setPosts(updatedPosts);},
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );

};





  /////////////////////////////////////
  
  //EDUCATION
  const [modalVisibleED, setModalVisibleED] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [educationList, setEducationList] = useState([]);

  const addEducation = () => {
    // Check if all fields are filled
    if (schoolName && degree && fieldOfStudy && startDate && endDate && description) {
      const newEducation = {
        id: Math.random().toString(),
        schoolName,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        description,
      };
  
      setEducationList([...educationList, newEducation]);
      clearForm();
      setModalVisibleED(false);
    } else {
      // Alert if any field is empty
      Alert.alert("Missing Fields", "Please fill out all fields.");
    }
  };

  const clearForm = () => {
      setSchoolName('');
      setDegree('');
      setFieldOfStudy('');
      setStartDate('');
      setEndDate('');
      setDescription('');
  };

  const editEducation = (id) => {
      const educationToEdit = educationList.find((edu) => edu.id === id);
      setSchoolName(educationToEdit.schoolName);
      setDegree(educationToEdit.degree);
      setFieldOfStudy(educationToEdit.fieldOfStudy);
      setStartDate(educationToEdit.startDate);
      setEndDate(educationToEdit.endDate);
      setDescription(educationToEdit.description);
      deleteEducation(id);
      setModalVisibleED(true);
  };


  const deleteEducation = (id) => {
    Alert.alert(
        "Delete Education",
        "Are you sure you want to delete this education entry?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => {
                    setEducationList((prevList) => prevList.filter((edu) => edu.id !== id));
                },
                style: "destructive"
            }
        ]
    );
};

  const [tempStartDate, setTempStartDate] = useState(new Date());
  const [tempEndDate, setTempEndDate] = useState(new Date());
  const [showTempStartDatePicker, setShowTempStartDatePicker] = useState(false);
  const [showTempEndDatePicker, setShowTempEndDatePicker] = useState(false);

  const onTempStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempStartDate;
    setShowTempStartDatePicker(false);
    setTempStartDate(currentDate);
    setStartDate(currentDate.toLocaleDateString()); // Update the existing startDate variable
  };

  const onTempEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempEndDate;
    setShowTempEndDatePicker(false);
    setTempEndDate(currentDate);
    setEndDate(currentDate.toLocaleDateString()); // Update the existing endDate variable
  };



  ////exeprience
const [experienceList, setExperienceList] = useState([]);
const [modalVisibleEXP, setModalVisibleEXP] = useState(false);
const [jobTitle, setJobTitle] = useState('');
const [companyName, setCompanyName] = useState('');

const [expDescription, setExpDescription] = useState('');
const [editingExperienceId, setEditingExperienceId] = useState(null);

const clearInputs = () => {
  setJobTitle('');
  setCompanyName('');
  setExpStartDate(''); 
  setExpEndDate('');   
  setExpDescription(''); // Corrected to reset expDescription
};


const deleteExperience = (id) => {
  Alert.alert(
      "Delete Experience",
      "Are you sure you want to delete this experience?",
      [
          {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
          },
          {
              text: "Delete",
              onPress: () => {
                  setExperienceList((prevList) => prevList.filter((exp) => exp.id !== id));
              },
              style: "destructive"
          }
      ]
  );
};
const editExperience = (id) => {
  const experienceToEdit = experienceList.find((exp) => exp.id === id);
  if (experienceToEdit) {
    setJobTitle(experienceToEdit.jobTitle);
    setCompanyName(experienceToEdit.companyName);
    setExpStartDate(experienceToEdit.startDate); // Use setExpStartDate
    setExpEndDate(experienceToEdit.endDate);     // Use setExpEndDate
    setExpDescription(experienceToEdit.description); // Updated to setExpDescription
    setEditingExperienceId(id);
    setModalVisibleEXP(true);
  }
};


const addExperience = () => {
  // Corrected validation check
  if (jobTitle && companyName && expStartDate && expEndDate && expDescription) {
    const newExperience = {
      id: editingExperienceId ? editingExperienceId : Date.now(),
      jobTitle,
      companyName,
      startDate: expStartDate, 
      endDate: expEndDate,
      description: expDescription, // Use expDescription instead of description
    };

    if (editingExperienceId) {
      setExperienceList((prevList) =>
        prevList.map((exp) =>
          exp.id === editingExperienceId ? newExperience : exp
        )
      );
      setEditingExperienceId(null);
    } else {
      setExperienceList((prevList) => [...prevList, newExperience]);
    }

    // Clear inputs and close modal
    clearInputs();
    setModalVisibleEXP(false);
  } else {
    Alert.alert("Missing Fields", "Please fill out all fields.");
  }
};


const [expStartDate, setExpStartDate] = useState(''); // State to store formatted start date
const [expEndDate, setExpEndDate] = useState(''); // State to store formatted end date

// State for managing the visibility of the date pickers
const [showTempExpStartDatePicker, setShowTempExpStartDatePicker] = useState(false);
const [showTempExpEndDatePicker, setShowTempExpEndDatePicker] = useState(false);

// State for managing the temporary start and end dates
const [tempExpStartDate, setTempExpStartDate] = useState(new Date());
const [tempExpEndDate, setTempExpEndDate] = useState(new Date());

// Function to handle the change of the start date
const onTempExpStartDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || tempExpStartDate;
  setShowTempExpStartDatePicker(false); // Close the date picker
  setTempExpStartDate(currentDate); // Set temporary state

  const formattedDate = formatDate(currentDate);
  setExpStartDate(formattedDate); // Set formatted date to display
};

// Function to handle the change of the end date
const onTempExpEndDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || tempExpEndDate;
  setShowTempExpEndDatePicker(false); // Close the date picker
  setTempExpEndDate(currentDate); // Set temporary state

  const formattedDate = formatDate(currentDate);
  setExpEndDate(formattedDate); // Set formatted date to display
};

const formatDate = (date) => {
  // Example: format as "MM/DD/YYYY"
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

  /////////////////
////////////////////////////////////////////////////
//skills/////////////
const [modalVisibleSkil, setModalVisibleSkil] = useState(false);
const [skillNameSkil, setSkillNameSkil] = useState('');
const [skillLevelSkil, setSkillLevelSkil] = useState('');
const [skillDescriptionSkil, setSkillDescriptionSkil] = useState('');
const [skillsListSkil, setSkillsListSkil] = useState([]);
const addSkillSkil = () => {
  if (skillNameSkil && skillLevelSkil) {
    const newSkill = {
      id: Date.now().toString(),
      name: skillNameSkil,
      level: skillLevelSkil,
      description: skillDescriptionSkil,
    };
    setSkillsListSkil([...skillsListSkil, newSkill]);
    setModalVisibleSkil(false);
    setSkillNameSkil('');
    setSkillLevelSkil('');
    setSkillDescriptionSkil('');
  } else {
    // Alert if any field is empty
    Alert.alert("Missing Fields", "Please fill out all fields.");
  }
};

const editSkillSkil = (id) => {
  const skillToEdit = skillsListSkil.find(skill => skill.id === id);
  setSkillNameSkil(skillToEdit.name);
  setSkillLevelSkil(skillToEdit.level);
  setSkillDescriptionSkil(skillToEdit.description);
  setModalVisibleSkil(true);
  deleteSkillSkil(id);
};



const deleteSkillSkil = (id) => {
    Alert.alert(
        "Delete Skill",
        "Are you sure you want to delete this skill?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => {
                    setSkillsListSkil(skillsListSkil.filter((skill) => skill.id !== id));
                },
                style: "destructive"
            }
        ]
    );
};


  ///////////////////accebility needs///////
  const [modalVisibleAN, setModalVisibleAN] = useState(false);
const [workEnvironmentAN, setWorkEnvironmentAN] = useState('');
const [interviewProcessAN, setInterviewProcessAN] = useState('');
const [communicationMethodsAN, setCommunicationMethodsAN] = useState('');
const [otherNeedsAN, setOtherNeedsAN] = useState('');
const [accessibilityListAN, setAccessibilityListAN] = useState([]);
const [editingIdAN, setEditingIdAN] = useState(null);

const addAccessibilityNeedAN = () => {
  // Check if any of the required fields are empty
  if (
    !workEnvironmentAN ||
    !interviewProcessAN ||
    !communicationMethodsAN ||
    !otherNeedsAN
  ) {
    Alert.alert('Missing Fields', 'Please fill out all required fields.');
    return; // Exit the function if fields are missing
  }

  if (editingIdAN !== null) {
    // Edit existing item
    const updatedListAN = accessibilityListAN.map((needAN) =>
      needAN.id === editingIdAN
        ? {
            ...needAN,
            workEnvironmentAN,
            interviewProcessAN,
            communicationMethodsAN,
            otherNeedsAN,
          }
        : needAN
    );
    setAccessibilityListAN(updatedListAN);
  } else {
    // Add new item
    const newNeedAN = {
      id: Date.now(),
      workEnvironmentAN,
      interviewProcessAN,
      communicationMethodsAN,
      otherNeedsAN,
    };
    setAccessibilityListAN([...accessibilityListAN, newNeedAN]);
  }

  // Reset and close the modal
  setModalVisibleAN(false);
  resetAccessibilityFieldsAN();
  setEditingIdAN(null);  // Clear editing state
};


const pickImageOrVideo = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false, // Set to false for single file selection
      quality: 1,
  });

  if (!result.canceled) {
      setMedia((prevMedia) => [...prevMedia, result.assets[0].uri]);  // Using functional setState
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


const editAccessibilityNeedAN = (id) => {
  const needToEditAN = accessibilityListAN.find((needAN) => needAN.id === id);
  if (needToEditAN) {
    setWorkEnvironmentAN(needToEditAN.workEnvironmentAN);
    setInterviewProcessAN(needToEditAN.interviewProcessAN);
    setCommunicationMethodsAN(needToEditAN.communicationMethodsAN);
    setOtherNeedsAN(needToEditAN.otherNeedsAN);
    setModalVisibleAN(true);
    setEditingIdAN(id);  // Set the editing ID
  }
};



const deleteAccessibilityNeedAN = (id) => {
  Alert.alert(
      "Delete Accessibility Need",
      "Are you sure you want to delete this accessibility need?",
      [
          {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
          },
          {
              text: "Delete",
              onPress: () => {
                  setAccessibilityListAN(accessibilityListAN.filter((needAN) => needAN.id !== id));
              },
              style: "destructive"
          }
      ]
  );
};

const resetAccessibilityFieldsAN = () => {
  setWorkEnvironmentAN('');
  setInterviewProcessAN('');
  setCommunicationMethodsAN('');
  setOtherNeedsAN('');
};

  ///////////////////////////////////////////
  ///language///////////
const [languageLang, setLanguageLang] = useState('');
const [proficiencyLang, setProficiencyLang] = useState('');
const [languageListLang, setLanguageListLang] = useState([]);
const [modalVisibleLang, setModalVisibleLang] = useState(false);

const addLanguageLang = () => {
    if (languageLang && proficiencyLang) {
        setLanguageListLang([...languageListLang, { id: Date.now(), languageLang, proficiencyLang }]);
        setLanguageLang('');
        setProficiencyLang('');
        setModalVisibleLang(false);
    }else {
      // Alert if any field is empty
      Alert.alert("Missing Fields", "Please fill out all fields.");
    }
};

const editLanguageLang = (id) => {
    const langToEditLang = languageListLang.find((lang) => lang.id === id);
    if (langToEditLang) {
        setLanguageLang(langToEditLang.languageLang);
        setProficiencyLang(langToEditLang.proficiencyLang);
        setModalVisibleLang(true);
    }
};


const deleteLanguageLang = (id) => {
  Alert.alert(
      "Delete Language",
      "Are you sure you want to delete this language?",
      [
          {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
          },
          {
              text: "Delete",
              onPress: () => {
                  setLanguageListLang(languageListLang.filter((lang) => lang.id !== id));
              },
              style: "destructive"
          }
      ]
  );
};

//////////////////////////////////////////////////////////  
  return (
    <ScrollView style={styles.container}>
   

   
      {/* Background with curve */}
      <View style={styles.headerBackgroundContainer}>
        <ImageBackground
          source={require('../assets/images/bgProfile.png')}  // Replace with your actual image URL
          style={styles.headerBackground}
        >
          <View style={styles.curve} />
        </ImageBackground>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/profilepic.png')} // Replace with actual image URI
          style={styles.profileImage}
        />
        <Text style={styles.name}>Amina El Mansouri</Text>
       {/* Profile Section */}
        <Link href="/edit" asChild>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        </Link>
        
        <Text style={styles.description}>Graphic Designer | Advocate for Inclusion</Text>
        <Text style={styles.bio}>
          Creative and dedicated graphic designer with 3 years of experience in crafting visually compelling designs. 
          Passionate about using art to communicate and advocate for inclusion and accessibility.
        </Text>
        <Text style={styles.location}>Casablanca, Morocco</Text>
      </View>

      {/* Posts Section ADD */}

 
      {posts.length === 0 ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posts</Text>
        
        <View style={styles.dashedBox}>
          <Text style={styles.placeholderText}>You haven't posted anything yet. Share your thoughts or showcase your work!</Text>
        
          <TouchableOpacity style={styles.addButton} onPress={openModal}>
            <Text style={styles.addButtonText}>Add Post</Text>
          </TouchableOpacity>
   
        </View>
      </View>
       ) : (
        <>
          <FlatList
            data={[posts[0]]} // Display the most recent post on the home screen
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPost}
            contentContainerStyle={{ padding: 20 }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonview} onPress={navigateToAllPosts}>
              <Text style={styles.buttonTextview}>View All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonaddpost} onPress={openModal}>
              <Text style={styles.buttonTextaddpost}>Add Post</Text>
            </TouchableOpacity>
          </View>
        </>
        )}
         


  
         {/**MODAL OF POSTS */}

<Modal visible={modalVisible} animationType="fade" onRequestClose={closeModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmitPost} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            value={postText}
            onChangeText={setPostText}
            multiline
          />
          {mediaUri && (
            <Image source={{ uri: mediaUri }} style={styles.previewImage} />
          )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity  onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images)}>
          <Ionicons name="image-outline" size={30} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity  onPress={pickDocument}>
          <Ionicons name="document-attach-outline" size={30} color="#3498db" />
          </TouchableOpacity>
      </View>
        </View>
      </Modal>



 {/* Degrees & Certifications Section */}
< View style={styles.section}>
  <Text style={styles.sectionTitle}>Degrees</Text>

  {educationList.length === 0 ? (
    <View style={styles.dashedBox}>
      <Text style={styles.placeholderText}>
        Click here to add your degrees. Be sure to include the institution name, degree title, and dates to highlight your academic background!
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibleED(true)}>
        <Text style={styles.addButtonText}>Add Degree</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <FlatList
      data={educationList}
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => (
        <View style={styles.educationItem}>
          <View style={styles.educationRow}>
          <View style={ { width: 200 }}>
              <Text style={styles.degreeText}>{item.degree} in {item.fieldOfStudy}</Text>
              <Text style={styles.schoolText}>{item.schoolName}</Text>
              <Text style={styles.dateText}>{item.startDate} - {item.endDate}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text> 
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => editEducation(item.id)} style={styles.iconED}>
                <Ionicons name="pencil" size={20} color="#007bff" /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteEducation(item.id)} style={styles.iconED}>
                <Ionicons name="trash" size={20} color="#ff4d4d" /> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )}

  {educationList.length > 0 && (
    <TouchableOpacity 
      style={styles.addButtonED}
      onPress={() => setModalVisibleED(true)}
    >
      <Text style={styles.addButtonText}>Add Degree</Text>
    </TouchableOpacity>
  )}
</View>

{/* Modal education */}

<Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleED}
      onRequestClose={() => setModalVisibleED(false)}
    >
      <View style={styles.modalContainerED}>
        <View style={styles.modalContentED}>
          
          {/* Header */}
          <View style={styles.headerED}>
            <TouchableOpacity onPress={() => setModalVisibleED(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitleED}>Add Education</Text>
            <TouchableOpacity onPress={addEducation} style={styles.publishButtonED}>
              <Text style={styles.publishButtonTextED}>Publish</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <TextInput
            placeholder="School/Institution Name"
            value={schoolName}
            onChangeText={setSchoolName}
            style={styles.inputMED}
          />

          {/* Dropdown for Degree */}
          <TextInput
  placeholder="Degree"
  value={degree}
  onChangeText={setDegree}
  style={styles.inputMED}
/>
         

          <TextInput
            placeholder="Field of Study"
            value={fieldOfStudy}
            onChangeText={setFieldOfStudy}
            style={styles.inputMED}
          />

       {/* Start Date Field with Calendar Icon */}
       <TouchableOpacity onPress={() => setShowTempStartDatePicker(true)} style={styles.dateContainerED}>
            <TextInput
              placeholder="Start Date"
              value={startDate} // Existing variable
              style={styles.inputDateED}
              editable={false} // Make the TextInput non-editable
            />
            <Ionicons name="calendar" size={24} color="gray" />
          </TouchableOpacity>
          {showTempStartDatePicker && (
            <DateTimePicker
              value={tempStartDate}
              mode="date"
              display="default"
              onChange={onTempStartDateChange}
            />
          )}

          {/* End Date Field with Calendar Icon */}
          <TouchableOpacity onPress={() => setShowTempEndDatePicker(true)} style={styles.dateContainerED}>
            <TextInput
              placeholder="End Date"
              value={endDate} // Existing variable
              style={styles.inputDateED}
              editable={false} // Make the TextInput non-editable
            />
            <Ionicons name="calendar" size={24} color="gray" />
          </TouchableOpacity>
          {showTempEndDatePicker && (
            <DateTimePicker
              value={tempEndDate}
              mode="date"
              display="default"
              onChange={onTempEndDateChange}
            />
          )}
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.inputDescriptionED}
            multiline
            numberOfLines={4}
          />

        </View>
      </View>
    </Modal>
  
      {/* Experience Section */}


      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Experience</Text>

  {experienceList.length === 0 ? (
    <View style={styles.dashedBox}>
      <Text style={styles.placeholderText}>
        Click here to add a new job experience. Be sure to include details about your responsibilities and achievements to make your profile stand out!
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibleEXP(true)}>
        <Text style={styles.addButtonText}>Add Experience</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <FlatList
      data={experienceList}
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => (
        <View style={styles.educationItem}>
          <View style={styles.educationRow}>
          <View style={ { width: 300 }}>
              <Text  style={styles.degreeText}>{item.jobTitle}</Text>
              <Text style={styles.schoolText}>{item.companyName}</Text>
              <Text style={styles.dateText}>{item.startDate} - {item.endDate}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => editExperience(item.id)} style={styles.iconEXP}>
                <Ionicons name="pencil" size={20} color="#007bff" /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteExperience(item.id)} style={styles.iconEXP}>
                <Ionicons name="trash" size={20} color="#ff4d4d" /> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )}

  {experienceList.length > 0 && (
    <TouchableOpacity 
      style={styles.addButtonEXP}
      onPress={() => setModalVisibleEXP(true)}
    >
      <Text style={styles.addButtonText}>Add Experience</Text>
    </TouchableOpacity>
  )}
</View>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisibleEXP}
  onRequestClose={() => setModalVisibleEXP(false)}
>
  <View style={styles.modalContainerEXP}>
    <View style={styles.modalContentEXP}>
      
      <View style={styles.headerEXP}>
        <TouchableOpacity onPress={() => setModalVisibleEXP(false)}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitleEXP}>Add Experience</Text>
        <TouchableOpacity onPress={addExperience} style={styles.publishButtonEXP}>
          <Text style={styles.publishButtonTextEXP}>Publish</Text>
        </TouchableOpacity>
      </View>

      {/* Job Title */}
      <TextInput
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
        style={styles.inputEXP}
      />
       <TextInput
         placeholder="Company Name"
         value={companyName}
        onChangeText={setCompanyName} // Correct state updater
        style={styles.inputEXP}
      />
      {/* Start Date Field with Calendar Icon */}
      <TouchableOpacity onPress={() => setShowTempExpStartDatePicker(true)} style={styles.dateContainerEXP}>
        <TextInput
          placeholder="Start Date"
          value={expStartDate} 
          style={styles.inputDateEXP}
          editable={false} 
        />
        <Ionicons name="calendar" size={24} color="gray" />
      </TouchableOpacity>
      {showTempExpStartDatePicker && (
        <DateTimePicker
          value={tempExpStartDate}
          mode="date"
          display="default"
          onChange={onTempExpStartDateChange}
        />
      )}

      {/* End Date Field with Calendar Icon */}
      <TouchableOpacity onPress={() => setShowTempExpEndDatePicker(true)} style={styles.dateContainerEXP}>
        <TextInput
          placeholder="End Date"
          value={expEndDate} 
          style={styles.inputDateEXP}
          editable={false} 
        />
        <Ionicons name="calendar" size={24} color="gray" />
      </TouchableOpacity>
      {showTempExpEndDatePicker && (
        <DateTimePicker
          value={tempExpEndDate}
          mode="date"
          display="default"
          onChange={onTempExpEndDateChange}
        />
      )}

      {/* Description */}
      <TextInput
        placeholder="Description"
        value={expDescription}
        onChangeText={setExpDescription}
        style={styles.inputDescriptionEXP}
        multiline
        numberOfLines={4}
      />

    </View>
  </View>
</Modal>




      {/* Skills Section */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Skills</Text>

  {skillsListSkil.length === 0 ? (
    <View style={styles.dashedBox}>
      <Text style={styles.placeholderText}>
        Click here to add your skills and competencies. Highlight the abilities that set you apart and are relevant to the job you're seeking!
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibleSkil(true)}>
        <Text style={styles.addButtonText}>Add Skills</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <FlatList
      data={skillsListSkil}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.educationItem}>
         <View style={styles.educationRow}>
         <View style={ { width: 300 }}>
              <Text style={styles.degreeText}>{item.name}</Text>
              <Text style={styles.schoolText}>{item.level}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => editSkillSkil(item.id)} style={styles.iconSkil}>
                <Ionicons name="pencil" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSkillSkil(item.id)} style={styles.iconSkil}>
                <Ionicons name="trash" size={20} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )}

  {skillsListSkil.length > 0 && (
    <TouchableOpacity 
    style={styles.addButtonEXP}
      onPress={() => setModalVisibleSkil(true)}
    >
      <Text style={styles.addButtonText}>Add Skills</Text>
    </TouchableOpacity>
  )}
</View>


<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisibleSkil}
  onRequestClose={() => setModalVisibleSkil(false)}
>
<View style={styles.modalContainerEXP}>
<View style={styles.modalContentEXP}>
      
      {/* Header */}
      
      <View style={styles.headerEXP}>
        <TouchableOpacity onPress={() => setModalVisibleSkil(false)}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitleEXP}>Add Skill</Text>
        <TouchableOpacity onPress={addSkillSkil}style={styles.publishButtonEXP}>
          <Text style={styles.publishButtonTextEXP}>Publish</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <TextInput
        placeholder="Skill Name"
        value={skillNameSkil}
        onChangeText={setSkillNameSkil}
        style={styles.inputEXP}
      />
<View  style={styles.inputEXP}r>
    <Picker
       selectedValue={skillLevelSkil}
        onValueChange={(itemValue) => setSkillLevelSkil(itemValue)}
       
     >
    <Picker.Item label="Select Skill Level" value=""  color="#aaa" />
    <Picker.Item label="Beginner" value="Beginner" />
    <Picker.Item label="Intermediate" value="Intermediate"/>
    <Picker.Item label="Advanced" value="Advanced"  />
    <Picker.Item label="Expert" value="Expert"  s/>
    </Picker>
 </View>

      <TextInput
        placeholder="Description"
        value={skillDescriptionSkil}
        onChangeText={setSkillDescriptionSkil}
        style={styles.inputDescriptionEXP}
        multiline
        numberOfLines={4}
      />
    </View>
  </View>
</Modal>



      {/* Accessibility Needs Section */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Accessibility Needs</Text>

  {accessibilityListAN.length === 0 ? (
    <View style={styles.dashedBox}>
      <Text style={styles.placeholderText}>
        Share your accessibility needs so we can tailor the platform to better support you.
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibleAN(true)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <FlatList
      data={accessibilityListAN}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
<View style={styles.educationItem}>
<View style={styles.educationRow}>
<View style={ { width: 300 }}>
  {item.workEnvironmentAN ? (
    <Text>
      <Text style={styles.titleTextAN}>Work Environment: </Text>
      <Text style={styles.infoTextAN}>{item.workEnvironmentAN}</Text>
    </Text>
  ) : null}
  
  {item.interviewProcessAN ? (
    <Text>
      <Text style={styles.titleTextAN}>Interview Process: </Text>
      <Text style={styles.infoTextAN}>{item.interviewProcessAN}</Text>
    </Text>
  ) : null}
  
  {item.communicationMethodsAN ? (
    <Text>
      <Text style={styles.titleTextAN}>Communication Methods: </Text>
      <Text style={styles.infoTextAN}>{item.communicationMethodsAN}</Text>
    </Text>
  ) : null}
  
  {item.otherNeedsAN ? (
    <Text>
      <Text style={styles.titleTextAN}>Other Needs: </Text>
      <Text style={styles.infoTextAN}>{item.otherNeedsAN}</Text>
    </Text>
  ) : null}
</View>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => editAccessibilityNeedAN(item.id)} style={styles.iconAN}>
                <Ionicons name="pencil" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccessibilityNeedAN(item.id)} style={styles.iconAN}>
                <Ionicons name="trash" size={20} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )}

</View>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisibleAN}
  onRequestClose={() => setModalVisibleAN(false)}
>
<View style={styles.modalContainerEXP}>
  <View style={styles.modalContentEXP}>
    {/* Header */}
    <View style={styles.headerEXP}>
      <TouchableOpacity onPress={() => setModalVisibleAN(false)}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.modalTitleEXP}>Accessibility Needs</Text>
      <TouchableOpacity onPress={addAccessibilityNeedAN} style={styles.publishButtonEXP}>
        <Text style={styles.publishButtonTextEXP}>Publish</Text>
      </TouchableOpacity>
    </View>

    {/* Scrollable Form Fields */}
    <ScrollView style={styles.scrollContainer}>
      <TextInput
        placeholder="Preferred Work Environment"
        value={workEnvironmentAN}
        onChangeText={setWorkEnvironmentAN}
        style={[styles.inputEXP, { textAlignVertical: 'top', maxHeight: 100 }]} // Set maxHeight
        multiline
        numberOfLines={2}
        scrollEnabled
      />

      <TextInput
        placeholder="Interview Process Preferences"
        value={interviewProcessAN}
        onChangeText={setInterviewProcessAN}
        style={[styles.inputEXP, { textAlignVertical: 'top', maxHeight: 100 }]} // Set maxHeight
        multiline
        numberOfLines={2}
        scrollEnabled
      />

      <TextInput
        placeholder="Preferred Communication Methods"
        value={communicationMethodsAN}
        onChangeText={setCommunicationMethodsAN}
        style={[styles.inputEXP, { textAlignVertical: 'top', maxHeight: 100 }]} // Set maxHeight
        multiline
        numberOfLines={2}
        scrollEnabled
      />

      <TextInput
        placeholder="Other Accessibility Needs"
        value={otherNeedsAN}
        onChangeText={setOtherNeedsAN}
        style={[styles.inputDescriptionEXP, { textAlignVertical: 'top', maxHeight: 150 }]} // Set maxHeight
        multiline
        numberOfLines={4}
        scrollEnabled
      />
    </ScrollView>
  </View>
</View>

</Modal>

      {/* Languages Section */}
      <View style={styles.section}>
    <Text style={styles.sectionTitle}>Languages</Text>

    {languageListLang.length === 0 ? (
        <View style={styles.dashedBox}>
            <Text style={styles.placeholderText}>
                List the languages you speak or understand, so we can better match you with opportunities and connections in your preferred languages.
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibleLang(true)}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <FlatList
            data={languageListLang}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.educationItem}>
                    <View style={styles.educationRow}>
                        <Text style={styles.degreeText}>{item.languageLang}</Text>
                        <Text style={styles.schoolText}>Proficiency: {item.proficiencyLang}</Text>
                        <View style={styles.iconRow}>
                            <TouchableOpacity onPress={() => editLanguageLang(item.id)} style={styles.iconLang}>
                                <Ionicons name="pencil" size={20} color="#007bff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteLanguageLang(item.id)} style={styles.iconLang}>
                                <Ionicons name="trash" size={20} color="#ff4d4d" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        />
    )}

    {languageListLang.length > 0 && (
        <TouchableOpacity 
            style={styles.addButtonEXP}
            onPress={() => setModalVisibleLang(true)}
        >
            <Text style={styles.addButtonText}>Add Language</Text>
        </TouchableOpacity>
    )}
</View>

<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisibleLang}
    onRequestClose={() => setModalVisibleLang(false)}
><View style={styles.modalContainerEXP}>
<View style={styles.modalContentEXP}>
<View style={styles.headerEXP}>
                <TouchableOpacity onPress={() => setModalVisibleLang(false)}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalTitleEXP}>Add Language</Text>
                <TouchableOpacity onPress={addLanguageLang} style={styles.publishButtonEXP}>
                    <Text style={styles.publishButtonTextEXP}>Publish</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Language Name"
                value={languageLang}
                onChangeText={setLanguageLang}
                style={styles.inputEXP}
               
            />
  <View  style={styles.inputEXP}>
            <Picker
                selectedValue={proficiencyLang}
                
                onValueChange={(itemValue) => setProficiencyLang(itemValue)}
            >
                <Picker.Item label="Select Proficiency Level" value="" />
                <Picker.Item label="Beginner" value="Beginner" />
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Advanced" value="Advanced" />
                <Picker.Item label="Fluent" value="Fluent" />
            </Picker>

            </View>
        </View>
    </View>
</Modal>


      {/* My Network Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Network</Text>
        <View style={styles.networkContainer}>
          <TouchableOpacity style={styles.networkItem}>
            <Image source={require('../assets/images/conexion.png')} style={styles.networkIcon} />
            <Text style={styles.networkText}>Connections</Text>
            <Text style={styles.networkCount}>68</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.networkItem}>
            <Image source={require('../assets/images/contact.png')}style={styles.networkIcon} />
            <Text style={styles.networkText}>Followed Contacts</Text>
            <Text style={styles.networkCount}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.networkItem}>
            <Image source={require('../assets/images/group.png')} style={styles.networkIcon} />
            <Text style={styles.networkText}>Groups</Text>
            <Text style={styles.networkCount}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.networkItem}>
            <Image source={require('../assets/images/page.png')}style={styles.networkIcon} />
            <Text style={styles.networkText}>Pages</Text>
            <Text style={styles.networkCount}>14</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
 ////////////////////////////

 //AN
 titleTextAN: {
  fontWeight: 'bold',
  color: '#333',  // Darker color for the title
  fontSize: 16,
  marginBottom:20,
},
infoTextAN: {
  color: '#666',  // Lighter color for the info
  fontSize: 16,
  marginBottom:20,
},
 ////
 ////EXPERIENCE STYLE

 
 iconRowexp:{
  flexDirection: 'row',
  justifyContent: 'flex-end',


 },
 addButtonEXP:{

  width:140,
  height:40,
  borderRadius: width * 0.05,
  borderWidth: 1,
  borderColor: '#28678E',
  alignItems:'center',
  justifyContent: 'center',
  marginTop:20,

 },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainerEXP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentEXP: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  headerEXP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitleEXP: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  publishButtonEXP: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  publishButtonTextEXP: {
    color: '#fff',
    fontSize: 16,
  },
  inputEXP: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  dateContainerEXP: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputDateEXP: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  inputDescriptionEXP: {
    borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  fontSize: 16,
  textAlignVertical: 'top',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  
  },
  iconEXP: {
    marginLeft: 8,
   marginTop:-40, 
   
  
  },


 ////////////////////////

//education style
addButtonED:{
    width:140,
    height:40,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: '#28678E',
    alignItems:'center',
    justifyContent: 'center',
},
descriptionText: {
  fontSize: 16,
  color: '#555',  // Adjust color as needed
  marginTop: 5,   // Optional margin for spacing
},

educationItem: {
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,

},
educationRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
degreeText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
schoolText: {
  fontSize: 18,
  color: '#666',
},
dateText: {
  fontSize: 15,
  color: '#999',
},
iconRow: {
  flexDirection: 'row',
},
iconED: {
  marginLeft: 10,
},
//modal
modalContainerED: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContentED: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  width: '90%',
},
headerED: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
modalTitleED: {
  fontSize: 18,
  fontWeight: 'bold',
},
publishButtonED: {
  backgroundColor: '#007bff',
  paddingVertical: 6,
  paddingHorizontal: 20,
  borderRadius: 20,
},
publishButtonTextED: {
  color: 'white',
  fontSize: 16,
},
inputMED: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
  fontSize: 16,
},
pickerContainer: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  marginBottom: 10,
},
pickerED: {
  height: 50,
  width: '100%',
},
dateContainerED: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 10,
},
inputDateED: {
  flex: 1,
  height: 50,
  fontSize: 16,
},
inputDescriptionED: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  fontSize: 16,
  textAlignVertical: 'top', // Align text to the top in multiline input
},
 //////////////////////////////

 buttonTextaddpost:{

  color:'#fff',

  fontSize:15,
  marginTop:6,

 },

 buttonTextview:{
  
   color:'#28678E',
  
   fontSize:15,
   marginTop:6,
  
 },

 buttonaddpost:{
  backgroundColor:'#44A0D8',
  borderRadius:11,
  width:120,
   height:35,
  alignItems:'center',

 },
 buttonview:{

 borderColor:'#28678E',
 borderWidth:1.5,
 borderRadius:11,
 width:120,
   height:35,
 alignItems:'center',
 },


 buttonContainer:{

  flexDirection: 'row',
  alignItems:'center',
  marginTop:-20,
  justifyContent: 'space-between',
   paddingLeft: 50,
   paddingRight:50,
 },
  
  replytButton: {
    color: '#007BFF', // A nice blue color for the text
    fontSize: 16, // Adjust the size to make it readable but not too large
    fontWeight: 'bold', // Semi-bold to make it stand out a bit
    paddingVertical: 5, // Add some vertical padding for better spacing
    marginRight:20,
  },

  commenticons:{
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Aligns items vertically in the center
    justifyContent: 'space-between', // Distributes space between elements
    padding: 5,
    marginLeft:24,
   
  },
  usernameblockcomment:{
    marginTop:28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15, // Slightly larger border radius for a smoother look
    marginBottom: 20, // Increased margin for better spacing between cards
    shadowColor: '#000',
    shadowOpacity: 0.15, // Slightly increased shadow opacity for better contrast
    shadowRadius: 10, // Increased shadow radius for a softer shadow effect
    shadowOffset: { width: 0, height: 5 }, // Added shadow offset for a more realistic shadow
    borderColor: '#fff', // Changed border color to a distinguishing blue shade
    borderWidth: 2, // Added border width for a more defined border
    elevation: 3, // Android shadow elevation
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  postImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 10,
    marginBottom: 10,
  },
  postButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  postButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 15,
    width:75,
    alignItems:'center',
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  mediaButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    width:150,

  },
  mediaButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  input: {
    flex: 1,
    padding: 15,
    borderColor: '#EEE',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 10,
    marginVertical: 20,
  },
  documentContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  documentText: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  //like button ICON
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60,
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
  commentSection: {
    marginTop: 20,
  },

  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between', // Aligns items in the same row
  },

  // userInfo and icons in the same row
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom:20,
    marginTop:20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  commentActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionIcon: {
    padding: 5,
    marginHorizontal: 5,
    color: '#007BFF',
  },

  responseContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingLeft: 20,
  },
  responseText: {
    fontSize: 14,
    color: '#000',
  },
  responseList: {
    maxHeight: 100,
  },
  // edit, delete, comment icons
  editButtonpost: {
    marginLeft: 90,
    marginTop: -10,
  },
  deleteButton: {
    marginTop: -10,
  },
  // comments
  commentToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    color: "#000",
    marginRight: 8,
  },
  commentCount: {
    fontSize: 16,
    color: '#000',
    marginRight: 60,
  },
  shareButton: {
    marginRight: 60,
  },
  commentInput: {
    borderColor: '#EEE',
    borderWidth: 1,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 10,
    marginBottom: 10,
    borderRightWidth: 0,
    width: 256,
  },
  sendcommenticon: {
    borderColor: '#EEE',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 50,
    borderLeftWidth: 0,
  },
  // Style for comment input field
  editCommentInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  // Style for comment text
  commentText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
   // marginTop:20,
    marginLeft:-40,
  },
  // Style for like button in comment
  commentLikeButton: {
    padding: 5,
   
   
  },
  // Style for edit button in comment
  editCommentButton: {
    padding: 5,
    marginHorizontal: 10,
  },
  // Style for delete button in comment
  deleteCommentButton: {
    padding: 5,
    marginHorizontal: 10,
  },

 
  // Style for reply input field
  replyInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
   
  },
  // Style for hide/show replies button
  hideViewRepliesButton: {
    color: '#007BFF',
    fontSize: 14,
    marginVertical: 10,
  },
  // Style for reply edit input field
  editReplyInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  // Style for reply text
  replyText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  // Style for like button in reply
  replyLikeButton: {
    padding: 5,
    marginHorizontal: 10,
  },
  // Style for edit button in reply
  editReplyButton: {
    padding: 5,
    marginHorizontal: 10,
  },

 //////////////////////////////
 
 
 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: width * 0.15, 
    borderTopRightRadius: width * 0.15,
  },
  headerBackground: {
    height: height * 0.2, 
    backgroundColor: '#0047A2', 
  },
  curve: {
    backgroundColor: '#fff',
    height: height * 0.09, 
    width: '100%',
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    marginTop: height * 0.15, 
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -height * 0.1, 
  },
  profileImage: {
    width: width * 0.3, 
    height: width * 0.3,
    borderRadius: width * 0.15,
    borderWidth: 7,
    borderColor: '#fff',
    marginBottom: height * 0.015, // Adjust margin for better spacing
  },
  name: {
    fontSize: width * 0.055, 
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#44A0D8',
    paddingVertical: height * 0.01, 
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    marginTop: height * 0.015, // Adjust margin for consistency
    width: width * 0.25,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  description: {
    marginTop: height * 0.01, 
    fontSize: width * 0.04, 
    color: '#777',
  },
  bio: {
    textAlign: 'center',
    marginVertical: height * 0.01, 
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.035, 
    color: '#555',
  },
  location: {
    color: '#aaa',
    fontSize: width * 0.035, 
  },
  section: {
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.02, // Adjust margin for consistency
  },
  sectionTitle: {
    fontSize: width * 0.053, 
    fontWeight: 'bold',
    marginBottom: height * 0.015, 
  },
  networkContainer: {
    backgroundColor: '#fff',
    borderRadius: width * 0.025, // Adjust borderRadius for consistency
    padding: height * 0.02, // Consistent padding based on height
    borderWidth: 1,
    borderColor: '#ccc',
    width: '107%', 
    alignSelf: 'center', // Center horizontally
  },
  networkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015, 
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  networkIcon: {
    width: width * 0.06, // Dynamic sizing for icons
    height: width * 0.06,
    marginRight: width * 0.025,
  },
  networkText: {
    flex: 1,
    fontSize: width * 0.04, 
    color: '#333',
  },
  networkCount: {
    fontSize: width * 0.045, 
    fontWeight: 'bold',
    color: '#0047A2',
  },
  dashedBox: {
    borderWidth: 1,
    borderColor: '#4BA3C7',
    borderStyle: 'dashed',
    borderRadius: width * 0.025, 
    padding: height * 0.02, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: width * 0.035, 
    color: '#777',
    textAlign: 'center',
    marginBottom: height * 0.01, 
  },
  addButton: {
    paddingVertical: height * 0.01, 
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: '#28678E',
  },
  addButtonText: {
    color: '#28678E',
    fontWeight: 'bold',
  },
});

