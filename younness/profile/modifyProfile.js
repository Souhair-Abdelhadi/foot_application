/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,Platform,
   TouchableOpacity,SafeAreaView,TextInput} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"
import {changeImageUrl,changeFullName} from "../redux/actions/count"
const ImagePicker = require("react-native-image-picker");
var birthDay = [];

for (var i = 1; i <= 31; i++) {
    birthDay = [...birthDay,
    { label: i.toString(), value: i.toString() }
    ]
}
var birthMonth = [];

for (var i = 1; i <= 12; i++) {
    birthMonth = [...birthMonth,
    { label: i.toString(), value: i.toString() }
    ]
}
var birthYear = [];

for (var i = 1940; i <= new Date().getUTCFullYear(); i++) {
    birthYear = [...birthYear,
    { label: i.toString(), value: i.toString() }
    ]
}

class App extends React.Component{
  constructor(props){
    super(props)
  }
  
  state = {
    firstName : "",
    lastName : "",
    email : "",
    phone : "",
    gender : "",
    birthDay : "",
    birthMonth : "",
    birthYear : "",
  }

   messageIdGenerator() {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
        });
  }
  handleAddPicture = async () => {
    const options = {
        title: "Select Picture",
        mediaType: "photo",
        takePhotoButtonTitle: "Take a Photo",
        maxWidth: 2000,
        maxHeight: 2000,
        allowsEditing: true,
        noData: true,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        },
        

    };
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
            
            const file = {
                uri,
                name: `${this.messageIdGenerator()}.${extension}`,
                type: correspondingMime[allowedExtensions.indexOf(extension)]
            };

            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            const message = {};
            message._id = this.messageIdGenerator();
            message.user = {_id : "myUid", name : "myName"};
            var today_date = new Date();
            message.createdAt = today_date.toUTCString();
            message.image = uri;
            message.messageType = "image";
            
            if (!allowedExtensions.includes(extension)) {
                return alert("That file type is not allowed.");
            }
            else{
              alert("Image selected")
            }
        }
    });

    
};

  render(){
    return(
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={()=>{
                console.log("left arrow icon pressed")
                this.props.navigation.goBack()
              }}
              >
                <Icon 
                  name="arrow-back-circle" size={32} color="white"
                />
              </TouchableOpacity>
              <View style={styles.editProfile}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </View>
              <View style={styles.save}>
                <TouchableOpacity
                  onPress={()=>{
                    alert("this is just for a demo, not finish yet")
                  }}
                >
                  <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.profileImage}>
            <Image 
              source={this.props.imageUrl !== null ? 
                        {uri : this.props.imageUrl }
                          : require('../assets/personIcon.png')
                      }
              style={styles.profileImageStyle}
            />
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={()=>{
                this.handleAddPicture()
              }}
            >
              <Icon 
                name="camera" size={32} color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>

          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>First Name</Text>
            <TextInput 
              placeholder='First Name' placeholderTextColor='black'  keyboardType={'default'}
              style={styles.textInput} onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName} autoCapitalize={'none'}
            />
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>
          
          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>Last Name</Text>
            <TextInput 
              placeholder='Last Name' placeholderTextColor='black'  keyboardType={'default'}
              style={styles.textInput} onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName} autoCapitalize={'none'}
            />
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>Email</Text>
            <TextInput 
              placeholder='Email address' placeholderTextColor='black'  keyboardType={'email-address'}
              style={styles.textInput} onChangeText={email => this.setState({ email })}
              value={this.state.email} autoCapitalize={'none'}
            />
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>Phone</Text>
            <TextInput 
              placeholder='Phone Number' placeholderTextColor='black'  keyboardType={'number-pad'}
              style={styles.textInput} onChangeText={phone => this.setState({ phone })}
              value={this.state.phone} autoCapitalize={'none'}
            />
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>Gender</Text>
            <TextInput 
              placeholder='Gender' placeholderTextColor='black'  keyboardType={'default'}
              style={styles.textInput} onChangeText={gender => this.setState({ gender })}
              value={this.state.gender} autoCapitalize={'none'}
            />
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputCardText}>Date of Birth</Text>
            <View style={{flexDirection : "row",height : 30}}>
              <Text style={{
                fontSize : 18,
                color : "black",
                position : "absolute",
                left : "10%",
              }}>Day</Text>
              <Text style={{
                fontSize : 18,
                color : "black",
                position : "absolute",
                left : "40%",
              }}>Month</Text>
              <Text style={{
                fontSize : 18,
                color : "black",
                position : "absolute",
                left : "75%",
              }}>Year</Text>
            </View>
            <View style={styles.dateOfBirth}>
              <View style={styles.dateBox} >
                <Picker
                    onValueChange={(birthDay) => this.setState({ birthDay})}
                    selectedValue={(e) => console.log(e)}
                    mode="dialog"

                >
                    {birthDay.map((snap) => {
                        return (<Picker.Item label={snap.label} value={snap.value} key={snap.label} />)
                    })}
                </Picker>
              </View>
              <View style={styles.dateBox} >
                <Picker
                    onValueChange={(birthMonth) => this.setState({ birthMonth})}
                    selectedValue={(e) => console.log(e)}
                    mode="dialog"

                >
                    {birthMonth.map((snap) => {
                        return (<Picker.Item label={snap.label} value={snap.value} key={snap.label} />)
                    })}
                </Picker>
              </View>
              <View style={[styles.dateBox,{width : "40%"}]} >
                <Picker
                    onValueChange={(birthYear) => this.setState({ birthYear})}
                    selectedValue={(e) => console.log(e)}
                    mode="dialog"

                >
                    {birthYear.map((snap) => {
                        return (<Picker.Item label={snap.label} value={snap.value} key={snap.label} />)
                    })}
                </Picker>
              </View>
            </View>
            <View 
              style={{
                borderBottomWidth : 3,
                borderBottomColor : "gray",
              }}
            />
          </View>
        </View>
    
        </ScrollView>
      </SafeAreaView>
    )
  }


}

const styles = StyleSheet.create({
  container :{
    flex : 1,

  },
  header : {
    height : 250,
    backgroundColor : "#030C15"
  },
  headerContent : {
    flexDirection : "row",
    marginLeft : "3%",
    marginTop : "6%",
    alignItems : "center"
  },
  editProfile : {
    position : "absolute",
    left : "30%"

  },
  editProfileText : {
    fontWeight : "bold",
    fontSize : 21,
    color : "white",
  },
  save : {
    justifyContent : "center",
    position : "absolute",
    left : "80%"
  },
  saveText : {
    fontSize : 17,
    color : "white",
  },
  profileImage : {
    justifyContent : "center",
    alignSelf : "center",
    flexDirection : "row"
  },
  profileImageStyle : {
    height :150,
    width : 150,
    borderRadius : 150/2,
    marginTop : "6%"
  },
  cameraIcon : {
    position :"absolute",
    top : "80%",
    left : "32%"
  },
  body : {
    flex : 1,

  },
  inputCard : {
    width : "90%",
    alignSelf : "center",
    marginTop : "2%",
    marginBottom : "1%"
  },
  textInput : {
    fontSize : 24,
    color : 'black',
    fontWeight : "bold"
  },
  inputCardText : {
    fontSize : 18,
    color : '#353535',
    fontWeight : "bold",
    marginBottom : "3%",
    marginTop : "3%"
  },
  dateOfBirth : {
    flexDirection : "row",
    alignSelf : "center",
    marginTop : "3%",
    marginBottom : "3%"
  },
  dateBox : {
    backgroundColor: "white", 
    borderColor: "black", 
    borderWidth: 2,
    width : "30%"
  }

  
  

})

const mapStateToProps = (state) =>{
  return {
    imageUrl : state.imageUrl,
    fullName : state.fullName,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    changeImageUrl : (url) =>{
      dispatch(changeImageUrl(url))
    },
    changeFullName : (fullName) =>{
      dispatch(changeFullName(fullName))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)