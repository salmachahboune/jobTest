import React, { useState,useEffect } from 'react';
const { width, height } = Dimensions.get('window');
import { View, Text, StyleSheet, FlatList, TouchableOpacity,ScrollView, TextInput,Image,Dimensions, Modal,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { PermissionsAndroid } from 'react-native';
import { Link } from 'expo-router';

const activityFeedData = [
  // Sample data
];

export default function ActivityFeedScreen() {
  /////////////////////////////////////////render post////////////////////
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

 const handleSubmitPost = () => {
  if (isEditing) {
    const updatedPosts = [...posts];
    updatedPosts[editIndex] = {
      ...updatedPosts[editIndex],
      text: postText,
      media: [...media],
      documents: [...documents],
      mediaType,
    };
    setPosts(updatedPosts);
    setIsEditing(false);
    setEditIndex(null);
  } else {
    const newPost = {
      text: postText,
      media: [...media],
      documents: [...documents],
      mediaType,
      likes: 0,
      liked: false,
      comments: [],
      userName: 'Amina El Mansouri',
      userPhotoUri: '../assets/images/bgProfile.png',
      timestamp: new Date().toISOString(),
    };
    
    console.log(newPost);  // Check the post data here
    setPosts([newPost, ...posts]);
  }

  setPostText('');
  setMedia([]);
  setDocuments([]);
  setMediaType(null);
  closeModal();
};


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


const handleCommentChange = (text, index) => {
  setCommentText(prevState => ({
    ...prevState,
    [index]: text, // Update the comment text for the specific post
  }));
};

const addCommentToPost = (index, commentText) => {
  if (!commentText[index] || commentText[index].trim() === '') return; // Avoid adding empty comments

  const updatedPosts = [...posts];
  const postToUpdate = { ...updatedPosts[index] };

  postToUpdate.comments = [
    ...postToUpdate.comments,
    {
      text: commentText[index],
      likes: 0,
      liked: false,
      responses: [],
      userName: "Amina El Mensouri", // Replace with dynamic name
      userPhotoUri: '../assets/images/profilepic.png', // Replace with dynamic photo URI
      timestamp: new Date(), // Current date and time
    }
  ];

  updatedPosts[index] = postToUpdate;
  setPosts(updatedPosts);

  // Clear the comment text for this specific post
  setCommentText(prevState => ({
    ...prevState,
    [index]: '', // Clear comment for the current post after adding
  }));
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
    {/* User info, edit/delete buttons */}
    <View style={styles.userInfo}>
      <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
      <View>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.timestamp}>
          {item.timestamp ? String(formatTimestamp(item.timestamp)) : 'Unknown Time'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => editPost(index)} style={styles.editButtonpost}>
        <Ionicons name="create" size={30} color="#007BFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePost(index)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={25} color="#FF0000" />
      </TouchableOpacity>
    </View>

    {/* Post Text */}
    <Text style={styles.postText}>
      {item.text ? String(item.text) : ''}
    </Text>

    {/* Render media (images/videos) */}
    {item.media && item.media.map((mediaUri, mediaIndex) => (
      <Image key={mediaIndex} source={{ uri: mediaUri }} style={styles.postImage} />
    ))}

    {/* Render documents */}
    {item.documents && item.documents.map((doc, docIndex) => (
      <View key={docIndex} style={styles.documentContainer}>
        <Ionicons name="document" size={40} color="#007BFF" />
        <Text style={styles.documentText}>{doc.split('/').pop()}</Text>
      </View>
    ))}

    {/* Like, comment, share buttons */}
    <View style={styles.likeContainer}>
      <TouchableOpacity onPress={() => toggleLike(index)} style={styles.likeButton}>
        <Ionicons name={item.liked ? "heart" : "heart-outline"} size={24} color={item.liked ? "#FF0000" : "#000"} />
        <Text style={styles.likeCount}>
          {item.likes !== undefined ? String(item.likes) : '0'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleCommentVisibility(index)} style={styles.commentToggleButton}>
        <Ionicons name={visibleComments[index] ? "chatbubble" : "chatbubble-outline"} size={24} />
        <Text style={styles.commentCount}>
          {item.comments && item.comments.length !== undefined ? String(item.comments.length) : '0'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => sharePost(item)} style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => repostPost(index)} style={styles.repostButton}>
        <Ionicons name="repeat" size={24} color="#000" />
      </TouchableOpacity>
    </View>

    {/* Comments Section */}
    {visibleComments[index] && (
      <View style={styles.commentSection}>
        {renderComments(item.comments, index)}
        <View style={styles.commentContainer}>
          <TextInput
            placeholder="Add a comment..."
            value={commentText[index] || ''} 
            onChangeText={(text) => handleCommentChange(text, index)} 
            onSubmitEditing={() => addCommentToPost(index, commentText)} 
            style={styles.commentInput}
          />
          <TouchableOpacity onPress={() => addCommentToPost(index, commentText)}>
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


//////////////////////////////////////////
const removeMedia = (index) => {
  setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));  // Remove media at the given index
};

const removeDocument = (index) => {
  setDocuments((prevDocuments) => prevDocuments.filter((_, i) => i !== index));  // Remove document at the given index
};

/////////////////////////////////////////////////////////////
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats the date as 'MM/DD/YYYY, HH:MM:SS AM/PM'
  };
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
    setMedia([...postToEdit.media]);  // Set the media array for the post being edited
    setDocuments([...postToEdit.documents]); // Set the documents array if editing includes documents
    setMediaType(postToEdit.mediaType);  // This is still valid if you're using mediaType
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

  /////////////////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  const [filterVisible, setFilterVisible] = useState(false);

  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState([]);
  const [documents, setDocuments] = useState([]);  // Add this line


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
  

      {/* Post Modal */}
    
        <>
          <FlatList
            data={posts} // Display the most recent post on the home screen
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPost}
            contentContainerStyle={{ padding: 20 }}
          />
      
        </>
     
  
         {/**MODAL OF POSTS */}

<Modal visible={modalVisible} animationType="fade" onRequestClose={closeModal} transparent={true}>
        <View style={styles.modalPContainer}>
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
        {/**mediaaaa */}
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TouchableOpacity onPress={pickImageOrVideo}>
    <Ionicons name="image-outline" size={30} color="#3498db" />
  </TouchableOpacity>
  <TouchableOpacity onPress={pickDocument}>
    <Ionicons name="document-attach-outline" size={30} color="#3498db" />
  </TouchableOpacity>
</View>
       {/* Preview selected media */}
       <ScrollView horizontal style={styles.mediaPreview}>
  {media.map((item, index) => (
    <View key={index} style={styles.mediaContainer}>
      <Image source={{ uri: item }} style={styles.mediaImage} />
      <TouchableOpacity onPress={() => removeMedia(index)} style={styles.deleteMediaButton}>
        <Ionicons name="trash-outline" size={25} color="#FF0000" />
      </TouchableOpacity>
    </View>
  ))}

  {documents.map((item, index) => (
    item && (
      <View key={index} style={styles.documentPreview}>
        <Ionicons name="document-outline" size={30} color="#3498db" />
        <Text numberOfLines={1} style={styles.documentText}>{item.split('/').pop()}</Text>
        <TouchableOpacity onPress={() => removeDocument(index)} style={styles.deleteDocumentButton}>
          <Ionicons name="trash-outline" size={25} color="#FF0000" />
        </TouchableOpacity>
      </View>
    )
  ))}
</ScrollView>

        </View>
</Modal>



      {/* Activity feed */}
      <FlatList
        data={activityFeedData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.feed}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={30} color="#2c3e50" />
        <Ionicons name="bookmark-outline" size={30} color="#2c3e50" />
        <TouchableOpacity
            style={styles.addButton}
             onPress={() => setModalVisible(true)}
        >
            <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <Link href="/job_offer_R" asChild>
        <TouchableOpacity>
        <Ionicons name="briefcase-outline" size={30} color="#2c3e50" />
        </TouchableOpacity>
        </Link>
        <Link href="/profile_R" asChild>
        <TouchableOpacity>
        <Ionicons name="person-outline" size={30} color="#2c3e50" />
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, // This makes the container take up the full screen
    justifyContent: 'center', // Centers the modal vertically
    alignItems: 'center', // Centers the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a semi-transparent background overlay
  },
  
  deleteMediaButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  deleteDocumentButton: {
    marginLeft: 10,
  },
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

  modalPContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15, // Reduced padding for compactness
    borderRadius: 20, // Softer, rounded corners for elegance
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
  },
  modalTitle: {
    fontSize: 18, // Elegant and readable title size
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  postInput: {
    height: 80, // Reduced input height for a cleaner look
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f1f3f4',
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    fontSize: 14, // Smaller, clean font for post input

  },
  modalPinput:{
   
    height: 150, // Reduced input height for a cleaner look
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f1f3f4',
    padding: 10,
    marginBottom: 15,
  
    fontSize: 14, //
  },
  mediaContainer: {
  
    flexDirection: 'row',
   marginLeft:200,
    width: '100%',
    marginBottom: 10, // Reduced margin for compactness
  },
  mediaButton: {
    alignItems: 'center',
    paddingHorizontal: 10, // Added padding for a cleaner look
  },
  mediaButtonText: {
    fontSize: 12, // Smaller text size for media buttons
    color: '#3498db',
    marginTop: 5,
  },
  mediaPreview: {
    flexDirection: 'row',
    height: 100, // Ensure there is enough height for the images
    marginBottom: 15,
  },
  
  mediaImage: {
    width: 200, // Current width
    height: 200,
    borderRadius: 10,
    marginTop:15,
    marginLeft:-200, // Try reducing this margin
  },
  
  postButton: {
    backgroundColor: '#3498db',
    borderRadius: 15, // Rounded for a modern look
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft:200,
  
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14, // Slightly smaller text for button
    fontWeight: '600',
  },
  documentPreview: {
    width: 70, // Smaller document preview
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Reduced margin for compactness
    backgroundColor: '#f1f3f4',
    borderRadius: 10,
  },
  documentText: {
    fontSize: 10, // Smaller text for document file names
    color: '#34495e',
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
  },
  
  ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
    ////////////////////////////
   

   
   
    ////////////////////////
   
 
    //////////////////////////////

  
   
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
       resizeMode: 'contain',  // You can also try 'contain'
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
     modalPContainer: {
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

    
    

});
