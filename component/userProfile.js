
import React from 'react';
import { StyleSheet, View, PermissionsAndroid, Modal, Text, TouchableOpacity, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import ImageZoomViewer from 'react-native-image-zoom-viewer'
import * as ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'react-native-firebase';

export default class App extends React.PureComponent{




  constructor(props){
    super(props);
    const tryMe = async () =>{
      try {

        const data = await AsyncStorage.getItem('user');
        if (data !== null) {
          console.log(data);
          var value = JSON.parse(data);
          console.log(value._id);
          firebase.database().ref('/users/' + value._id)
            .once('value', (snapshot) => {
              this.setState({ 
                profileImage: snapshot.val().profileImage,
                userUid : value._id,
                fullName : snapshot.val().fullName,
                  age: snapshot.val().age,
                  phoneNumber: snapshot.val().phoneNumber,
                  socialStatus: snapshot.val().socialStatus,
                  gender: snapshot.val().gender,
                  interest: snapshot.val().interest,
                  aboutMe: snapshot.val().aboutMe,
                  goal: snapshot.val().goal,
            });

            })

        }

      } catch (error) {
        console.log(error)
      }
    }
    tryMe();
  }

  state = { 
    showModal: false,
    isLoading:false,
    totalByte:0,
    transferredBytes:0,
    showEditModal : false,
    
   }


    checkPermission = () => {
    if (Platform.OS !== "android") {
        return Promise.resolve(true);
    }
    const rationale = {
        title: "storage Permission",
        message:
            " need access to your device gallery so you can send pictures and videos"
    };

    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        rationale
    ).then(result => {
        console.log("Permission result:", result);
        return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });



}


   //arrow function to change user profile image
  changeImage = () =>{

    this.checkPermission();
    const options = {
      title: "Select Picture",
      mediaType: "photo",
      takePhotoButtonTitle: "Take a Photo",
      maxWidth: 1000,
      maxHeight: 1000,
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },

    };
    console.log("image pressed");
    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const { uri } = response;
        console.log(uri)
        const extensionIndex = uri.lastIndexOf(".");
        const extension = uri.slice(extensionIndex + 1);
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const correspondingMime = ["image/jpg", "image/jpeg", "image/png"];
        const source = { uri: response.uri };
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        if (!allowedExtensions.includes(extension)) {
          return alert("That file type is not allowed.");
        }
        else{
         const uploadFile =  firebase.storage()
            .ref(filename)
            .putFile(uploadUri)
          const res =uploadFile;

          res.then((snapshot)=>{
            console.log("loading ended");
            this.setState({profileImage : snapshot.downloadURL,totalByte:0,transferredBytes:0,isLoading:false});
            firebase.database().ref('/users/'+this.state.userUid)
            .update({profileImage : snapshot.downloadURL});
          })

          uploadFile.on("state_changed",(snap)=>{

            this.setState({ totalByte: snap.totalBytes, transferredBytes: snap.bytesTransferred, isLoading: true})

          })


        }



      }
    });
  }

    render(){

        console.log("about me",( typeof this.state.aboutMe === "undefined" ) ? "true" :"false")

      return(







          <View style={styles.container}>


          <ScrollView>

            {/* code for rounded image and it change button */}
            <LinearGradient colors={['#05036D', 'pink', '#36AFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
              flex: 1, borderBottomWidth: 1,
              borderBottomColor: 'white', }}  >

            <View style={[styles.card,{alignSelf:'center',borderBottomWidth:0}]} >

                  <TouchableOpacity onPress={()=>this.setState({showModal:true})} >
                  <View style={{flexDirection : 'row'}}>
                    <Image source={{ uri:this.state.profileImage }} style={styles.imageView} />
                    {this.state.isLoading ? <Text style={styles.upload} >Uploading : <Text style={{color:"orange"}} >{Math.round((this.state.transferredBytes / this.state.totalByte) * 100)}</Text>  </Text> : <Text></Text>}
                    <TouchableOpacity onPress={() => this.changeImage()} style={styles.changeImage} >
                      <Icon name="camera" size={32} color="black" />
                    </TouchableOpacity>
                  </View>
                  </TouchableOpacity>

                <Modal visible={this.state.showModal} transparent={true} onRequestClose={()=>this.setState({showModal:false})} >
                  <ImageZoomViewer imageUrls={[{url : this.state.profileImage}]} onCancel={()=>this.setState({showModal : false})} />
                </Modal>

            </View>
                    </LinearGradient>

              {/* code for user profile data and edit button */}
            <LinearGradient colors={['pink','gray']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1 }} >

              <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', backgroundColor:"#9ba1a3" }} >

                <View style={[styles.card, { borderBottomWidth: 0,alignSelf:'center'}]} >

                 <TouchableOpacity onPress={()=>{
                                  this.props.navigation.navigate("ChangeProfileData",{
                                      this : this,
                                      userUid : this.state.userUid,
                                      fullName: (typeof this.state.fullName === 'undefined' || this.state.fullName.length == 0) ? "not set yet" : this.state.fullName ,
                                      age: (typeof this.state.age === 'undefined' || this.state.age.length == 0) ? "not set yet" : this.state.age,
                                      phoneNumber: (typeof this.state.phoneNumber === 'undefined' || this.state.phoneNumber.length == 0) ? "not set yet"  : this.state.phoneNumber,
                                      socialStatus: (typeof this.state.socialStatus === 'undefined' || this.state.socialStatus.length == 0) ? "not set yet" : this.state.socialStatus,
                                      gender: (typeof this.state.gender === 'undefined' || this.state.gender.length == 0) ? "not set yet" : this.state.gender,
                                      interest: (typeof this.state.interest === 'undefined' || this.state.interest.length == 0) ? "not set yet" : this.state.interest,
                                      aboutMe: (typeof this.state.aboutMe === 'undefined' || this.state.aboutMe.length == 0) ? "not set yet" : this.state.aboutMe,
                                      goal: (typeof this.state.goal === 'undefined' || this.state.goal.length == 0) ? "not set yet" : this.state.goal,
                                  })
                 }} style={{flexDirection:'row'}} >
                                  <Icon name="settings" size={27} color="black" style={{marginRight:'3%'}} />
                                  <Text style={styles.Title} >Click to edit</Text>
                 </TouchableOpacity>

               </View>

              </View>

          <View style={styles.card} >
              <Icon name="person-circle" size={24} color="black"  /> 
              <Text style={styles.text} ><Text style={styles.Title} > Name : </Text> {
                              (typeof this.state.fullName === 'undefined' || this.state.fullName.length == 0) ? 'not yet set' : this.state.fullName
              } </Text>

          </View>

              <View style={styles.card} >
                <Icon name="heart" size={24} color="black" />

                          <Text style={styles.text} ><Text style={styles.Title} > Age :</Text>{
                              (typeof this.state.age === 'undefined' || this.state.age.length == 0) ? 'not yet set' :  this.state.age
                          } </Text>

              </View>
              <View style={styles.card} >
                <Icon name="phone-portrait" size={24} color="black" />
                          <Text style={styles.text} ><Text style={styles.Title} > Phone Number :</Text> {
                              (typeof this.state.phoneNumber === 'undefined' || this.state.phoneNumber.length == 0) ? 'not yet set' : this.state.phoneNumber
                          }  </Text>

              </View>

              <View style={styles.card} >
                <Icon name="globe" size={26} color="black" />
                          <Text style={styles.text} ><Text style={styles.Title} >Social Status : </Text> {
                              (typeof this.state.socialStatus === 'undefined' || this.state.socialStatus.length == 0) ? 'not yet set' : this.state.socialStatus
                          }  </Text>

              </View>
              <View style={styles.card} >
                <Icon name="male" size={24} color="black" />
                <Text style={styles.text} >/</Text>
                <Icon name="female" size={24} color="black" />

                          <Text style={styles.text} ><Text style={styles.Title} > Gender : </Text> {
                              (typeof this.state.gender === 'undefined' || this.state.gender.length == 0) ? 'not yet set' : this.state.gender
                          }  </Text>

              </View>
              <View style={styles.card} >
                <Icon name="search" size={24} color="black" />
                          <Text style={styles.text} ><Text style={styles.Title} > Interested in  : </Text> {
                              (typeof this.state.interest === 'undefined' || this.state.interest.length == 0) ? 'not yet set' : this.state.interest
                          }  </Text>

              </View>

              <View style={styles.aboutMe_goal} >
                <View style={{ flexDirection: 'row' }} >
                  <Icon name="heart" size={26} color="black" />
                  <Text><Text style={styles.Title} > About me : </Text> </Text>
                </View>
              <View style={{backgroundColor : 'white',padding:'2%',borderRadius:10,marginTop:'2%'}} >
                              <Text style={styles.text} >{
                                  (typeof this.state.aboutMe === 'undefined' || this.state.aboutMe.length == 0) ? 'not yet set' : this.state.aboutMe
                              } </Text>

              </View>
            </View>

              <View style={styles.aboutMe_goal} >
                <View style={{ flexDirection: 'row'}} >
                  <Icon name="flame" size={26} color="black" />
                  <Text><Text style={styles.Title} > Goal : </Text> </Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: '2%', borderRadius: 10, marginTop: '2%' }} >
                              <Text style={styles.text} >{
                                  (typeof this.state.goal === 'undefined' || this.state.goal.length == 0 ) ? 'not yet set' : this.state.goal
                              } </Text>

                </View>
            </View>

            </LinearGradient>
          </ScrollView>

          </View>



      )



    }




}



const styles = StyleSheet.create({



  container : {
    flex : 1,
  },
  imageView : {
    height:300,
    width: 300,
    borderRadius:150,
    alignSelf : 'center',
  },
  Title : {
    fontSize : 24,
    fontWeight : 'bold',
    color: 'white',
  },
  card : {
    borderBottomWidth : 1,
    borderBottomColor : 'white',
    padding : '3%',
    flexDirection:'row',
  },
  text : {
        fontSize:18,
        lineHeight  : 25,

  },
  aboutMe_goal : {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: '3%',

  },
  changeImage : {
    top : '80%',
    right : '20%',
  },
  upload :{
    fontSize:20,
    fontWeight:'bold',
    color:"white",
    top: '50%',
    left: '30%',
    position:'absolute'
  },
  editCard : {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: '3%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#05036D',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#05036D',
    borderWidth: 3,
    width: '90%',
    height: 40,
    marginLeft: 20,
    paddingLeft: 15,
    textAlign: 'center',
  },
  pickerList : {
    borderWidth : 2,
    backgroundColor : 'white',
    borderColor : 'white',
  }


})