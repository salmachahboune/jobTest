import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal, Share ,StyleSheet,Alert, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter,  useLocalSearchParams  } from 'expo-router';


export default function ViewAllPostsScreen() {


  const router = useRouter();
  const { posts } =  useLocalSearchParams ();

  const parsedPosts = posts ? JSON.parse(posts) : [];
////////////////////////////////////////////////////
  // Hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [responseText, setresponseText] = useState('');
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [postList, setPostList] = useState(parsedPosts); // Renamed from `posts` to `postList`
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});
  const [commentText, setCommentText] = useState(''); 
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editReplyIndex, setEditReplyIndex] = useState(null);
  const [editedReplyText, setEditedReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [visibleRepliesinput, setVisibleRepliesinput] = useState({});
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Update all functions to use `postList` instead of `posts`
  const handleSubmitPost = () => {
    if (isEditing) {
      const updatedPosts = [...postList];
      updatedPosts[editIndex] = {
        ...updatedPosts[editIndex],
        text: postText,
        mediaUri,
        mediaType,
      };
      setPostList(updatedPosts); // Corrected this part
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
        userName: 'Amina El Mansouri',
        userPhotoUri: require('../assets/images/bgProfile.png'),
        timestamp: new Date().toISOString(),
      };
      setPostList([newPost, ...postList]); // Corrected this part
    }
    setPostText('');
    setMediaUri(null);
    setMediaType(null);
    closeModal();
  };
  

  const toggleCommentLike = (postIndex, commentIndex) => {
    const updatedPosts = [...postList];
    const comment = updatedPosts[postIndex].comments[commentIndex];
    comment.likes = typeof comment.likes === 'number' ? comment.likes : 0;
    comment.liked = comment.liked || false;
    comment.liked = !comment.liked;
    comment.likes = comment.liked ? comment.likes + 1 : Math.max(comment.likes - 1, 0);
    setPostList(updatedPosts);
  };
  

  const toggleCommentVisibility = (postIndex) => {
    setVisibleComments((prevVisibleComments) => ({
      ...prevVisibleComments,
      [postIndex]: !prevVisibleComments[postIndex],
    }));
  };
  const addCommentToPost = (index, commentText) => {
    const updatedPosts = [...postList];
    const newComment = {
      text: commentText,
      likes: 0,
      liked: false,
      responses: [],
      userName: "Amina El Mensouri",
      userPhotoUri: require('../assets/images/profilepic.png'),
      timestamp: new Date().toISOString(),
    };
    updatedPosts[index].comments.push(newComment);
    setPostList(updatedPosts);
    setCommentText('');
  };
  

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
            const updatedPosts = [...postList];
            updatedPosts[postIndex].comments.splice(commentIndex, 1);
            setPostList(updatedPosts);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const editComment = (postIndex, commentIndex) => {
    setEditCommentIndex(commentIndex);
    setEditedText(postList[postIndex].comments[commentIndex].text);
  };

  const saveCommentEdit = (postIndex, commentIndex) => {
    const updatedPosts = [...postList];
    updatedPosts[postIndex].comments[commentIndex].text = editedText;
    setPostList(updatedPosts);
    setEditCommentIndex(null);
    setEditedText('');
  };

  const toggleReplyVisibility = (postIndex, commentIndex) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [`${postIndex}-${commentIndex}`]: !prevVisibleReplies[`${postIndex}-${commentIndex}`],
    }));
  };

  const addResponseToComment = (postIndex, commentIndex, responseText) => {
    const updatedPosts = [...postList];
    updatedPosts[postIndex].comments[commentIndex].responses.push({
      text: responseText,
      likes: 0,
      liked: false,
      userName: "Amina El Mensouri",
      userPhotoUri: require('../assets/images/profilepic.png'),
      timestamp: new Date(),
    });
    setPostList(updatedPosts);
    setresponseText('');
  };

  const toggleReplyLike = (postIndex, commentIndex, replyIndex) => {
    const updatedPosts = [...postList];
    const reply = updatedPosts[postIndex].comments[commentIndex].responses[replyIndex];
    reply.likes = typeof reply.likes === 'number' ? reply.likes : 0;
    reply.liked = !reply.liked;
    reply.likes = reply.liked ? reply.likes + 1 : Math.max(reply.likes - 1, 0);
    setPostList(updatedPosts);
  };

  const editReply = (postIndex, commentIndex, replyIndex) => {
    setEditReplyIndex(`${postIndex}-${commentIndex}-${replyIndex}`);
    setEditedReplyText(postList[postIndex].comments[commentIndex].responses[replyIndex].text);
  };

  const saveReplyEdit = (postIndex, commentIndex, replyIndex) => {
    const updatedPosts = [...postList];
    updatedPosts[postIndex].comments[commentIndex].responses[replyIndex].text = editedReplyText;
    setPostList(updatedPosts);
    setEditReplyIndex(null);
    setEditedReplyText('');
  };

  const deleteReply = (postIndex, commentIndex, replyIndex) => {
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
            const updatedPosts = [...postList];
            updatedPosts[postIndex].comments[commentIndex].responses.splice(replyIndex, 1);
            setPostList(updatedPosts);
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const toggleReplyVisibilityinput = (postIndex, commentIndex) => {
    setVisibleRepliesinput((prevVisibleRepliesinput) => ({
      ...prevVisibleRepliesinput,
      [`${postIndex}-${commentIndex}`]: !prevVisibleRepliesinput[`${postIndex}-${commentIndex}`],
    }));
  };

  const renderReplies = (replies, postIndex, commentIndex) => {
    return replies.map((reply, replyIndex) => (
      <View key={replyIndex} style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{reply.userName}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(reply.timestamp)}</Text>
          {editReplyIndex === `${postIndex}-${commentIndex}-${replyIndex}` ? (
            <TextInput
              value={editedReplyText}
              onChangeText={setEditedReplyText}
              onSubmitEditing={() => saveReplyEdit(postIndex, commentIndex, replyIndex)}
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
          onPress={() => editReply(postIndex, commentIndex, replyIndex)}
          style={styles.editReplyButton}
        >
          <Ionicons name="create" size={20} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteReply(postIndex, commentIndex, replyIndex)} style={styles.deleteReplyButton}>
          <Ionicons name="trash-outline" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>
    ));
  };

  const renderComments = (comments, postIndex) => {
    return comments.map((comment, commentIndex) => (
      <View key={commentIndex} style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
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
          <View style={styles.commentActionsContainer}>
          <TouchableOpacity onPress={() => toggleCommentLike(postIndex, commentIndex)} style={styles.commentLikeButton}>
            <Ionicons name={comment.liked ? 'heart' : 'heart-outline'} size={20} color={comment.liked ? '#FF0000' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editComment(postIndex, commentIndex)}
            style={styles.editCommentButton}
          >
            <Ionicons name="create" size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteComment(postIndex, commentIndex)} style={styles.deleteCommentButton}>
            <Ionicons name="trash-outline" size={20} color="#FF0000" />
          </TouchableOpacity>
        </View>
       
      </View>
   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => toggleReplyVisibility(postIndex, commentIndex)}>
          <Text   style={styles.replyToggleButton} >{visibleReplies[`${postIndex}-${commentIndex}`] ? 'Hide Replies' : 'Show Replies'}</Text>
        </TouchableOpacity>
       

        <TouchableOpacity onPress={() => toggleReplyVisibilityinput(postIndex, commentIndex)} style={styles.replyinputToggleButton}>
          <Text  style={styles.replyinputToggleButton} >{visibleRepliesinput[`${postIndex}-${commentIndex}`] ? 'Reply' : 'Reply'}</Text>
        </TouchableOpacity>
    </View>
    {visibleReplies[`${postIndex}-${commentIndex}`] && renderReplies(comment.responses, postIndex, commentIndex)}
        {visibleRepliesinput[`${postIndex}-${commentIndex}`] && (
          <TextInput
            value={responseText}
            onChangeText={setresponseText}
            placeholder="Write a reply..."
            onSubmitEditing={() => addResponseToComment(postIndex, commentIndex, responseText)}
            style={styles.replyInput}
          />
        )}
      
  
      </View>
   
    ));
  }

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

// Request media library permissions
useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(status === 'granted');
  })();
}, []);

// Pick media from library
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

// Format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Formats the date as 'MM/DD/YYYY, HH:MM:SS AM/PM'
};

// Toggle like on a post
const toggleLike = (index) => {
  const updatedPosts = [...postList]; // Use postList instead of posts
  const post = updatedPosts[index];
  post.likes = typeof post.likes === 'number' ? post.likes : 0;
  post.liked = !post.liked;
  post.likes = post.liked ? post.likes + 1 : Math.max(post.likes - 1, 0);
  setPostList(updatedPosts); // Update postList state
};


// Repost functionality
const repostPost = (index) => {
  const postToRepost = postList[index]; // Use postList instead of posts
  const repostedPost = {
    ...postToRepost,
    reposted: true,
    originalPoster: 'Original Poster Name', // You can include information about the original poster
  };
  setPostList([repostedPost, ...postList]); // Update postList state
};

// Edit post functionality
const editPost = (index) => {
  const postToEdit = postList[index]; // Use postList instead of posts
  setPostText(postToEdit.text);
  setMediaUri(postToEdit.mediaUri);
  setMediaType(postToEdit.mediaType);
  setIsEditing(true);
  setEditIndex(index);
  openModal();
};

// Delete post functionality
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
        onPress: () => {
          const updatedPosts = postList.filter((_, i) => i !== index); // Use postList instead of posts
          setPostList(updatedPosts); // Update postList state
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

//////////////////render post//////////////////////
  const renderPost = ({ item, index }) => (
    <View style={styles.postCard}>
      <View style={styles.userInfo}>
        {/* User Photo */}
        {item.userPhotoUri ? (
          typeof item.userPhotoUri === 'string' && item.userPhotoUri.startsWith('http') ? (
            <Image source={{ uri: item.userPhotoUri }} style={styles.userPhoto} />
          ) : (
            <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
          )
        ) : (
          <Image source={require('../assets/images/profilepic.png')} style={styles.userPhoto} />
        )}
  
        {/* User Name and Timestamp */}
        <View>
          <Text style={styles.userName}>
            {item.userName ? String(item.userName) : 'Unknown User'}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp ? String(formatTimestamp(item.timestamp)) : 'Unknown Time'}
          </Text>
        </View>
  
        {/* Edit Post Button */}
        <TouchableOpacity onPress={() => editPost(index)} style={styles.editButton}>
          <Ionicons name="create" size={30} color="#007BFF" />
        </TouchableOpacity>
  
        {/* Delete Post Button */}
        <TouchableOpacity onPress={() => deletePost(index)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={25} color="#FF0000" />
        </TouchableOpacity>
      </View>
  
      {/* Repost Info */}
      {item.reposted && (
        <Text style={styles.repostInfo}>Reposted by you</Text>
      )}
  
      {/* Post Text */}
      <Text style={styles.postText}>
        {item.text ? String(item.text) : ''}
      </Text>
  
      {/* Media Content (Image or Document) */}
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
  
      {/* Like, Comment, Share, Repost Buttons */}
      <View style={styles.likeContainer}>
        {/* Like Button */}
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
  
        {/* Comment Toggle Button */}
        <TouchableOpacity onPress={() => toggleCommentVisibility(index)} style={styles.commentToggleButton}>
          <Ionicons 
            name={visibleComments[index] ? "chatbubble" : "chatbubble-outline"} 
            size={24}
            style={styles.commentIcon}
          />
          <Text style={styles.commentCount}>
            {item.comments && item.comments.length !== undefined ? String(item.comments.length) : '0'}
          </Text>
        </TouchableOpacity>
  
        {/* Share Button */}
        <TouchableOpacity onPress={() => sharePost(item)} style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={24} color="#000" />
        </TouchableOpacity>
  
        {/* Repost Button */}
        <TouchableOpacity onPress={() => repostPost(index)} style={styles.repostButton}>
          <Ionicons name="repeat" size={24} color="#000F" />
        </TouchableOpacity>
      </View>
  
      {/* Render Comments Section if Visible */}
      {visibleComments[index] && (
        <View style={styles.commentSection}>
          {renderComments(item.comments, index)}
          
          {/* Comment Input Container */}
          <View style={styles.commentContainer}>
            <TextInput
              placeholder="Add a comment..."
              value={commentText} // Bind the input value to state
              onChangeText={setCommentText} // Update state on input change
              onSubmitEditing={(e) => addCommentToPost(index, e.nativeEvent.text)} // Pass index to function
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

///////////////////

return (
  <View style={styles.container}>
    {parsedPosts && parsedPosts.length > 0 ? (
      <FlatList
      data={postList} // Parsed posts from navigation
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
      />
    ) : (
      <Text style={styles.noPostsText}>No posts available</Text>
    )}

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
          <TouchableOpacity style={styles.mediaButton} onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images)}>
            <Text style={styles.mediaButtonText}>Add Media</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  </View>
);
}

const styles = StyleSheet.create({

  replyToggleButton:{
    color: '#007BFF',
    fontSize: 14,
  
    marginRight:10,

  },

  replyinputToggleButton:{

    color: '#007BFF',
    fontSize: 14,

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
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Aligns items vertically in the center
    justifyContent: 'space-between', // Distributes space between elements
    padding: 5,
    marginLeft:24,
  },
  postButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  mediaButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
  editButton: {
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
});

