/* eslint-disable handle-callback-err */
/* eslint-disable keyword-spacing */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

// --------------------------------------------------------------------------------------------
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text,Modal,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    LogBox,
    Animated
} from 'react-native';
import * as firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat, Bubble,Actions,Composer, } from 'react-native-gifted-chat';
import { AudioRecorder, AudioUtils } from "react-native-audio";
import Icon from "react-native-vector-icons/Ionicons";
import Sound from "react-native-sound";
import moment from 'moment-timezone'
import VideoPlayer from 'react-native-video-controls'
import Orientation from "react-native-orientation-locker"
import RenderAudio from './audioCustomView'



var strCmp = require('../../res/dbData');
const ImagePicker = require("react-native-image-picker");


const db = firebase.firestore();
// const userUid = firebase.auth().currentUser.uid;
// const myName = firebase.auth().currentUser.displayName;


export default function chatRoom(props) {
    // console.log('from chatRoom ', props.navigation)
    const ref = props.navigation.getParam("props").id;

    // var chatsRef = db.collection(navigation.getParam('id'));
    const [userUid, setUsersUid] = useState(props.navigation.getParam("userUid"));
    const myUid = props.navigation.getParam("userUid");
    const profileImage = props.navigation.getParam("profileImage");
    const _retrieveData = async () => {
        try {

            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                // We have data!!
                const data = JSON.parse(value);

                setUsersUid(data._id);
                setMyName(data.name);
            }
        } catch (error) {
            console.log('error has occurred')
        }
    };
    _retrieveData();






    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([])
    const [localMessages,setLocalMessages] = useState([])
    // console.log(navigation.getParam('id'));
    const ConversationLocation = strCmp(ref, myUid);
    const chatsRef = db.collection(ConversationLocation);
    // const chatsRef = strCmp(ref,)
    const hisName = props.navigation.getParam("fullName");
    const [myName, setMyName] = useState();
    const [image, setImage] = useState(null);
    const [modal_on, set_modal_on] = useState(false)
    const [opacity, setOpacity] = useState(0);
    const [video, setVideo] = useState(0);
    const [DeviceOrientation, setDeviceOrientation] = useState('PORTRAIT');
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [messagesMounted,setMessagesMounted] = useState(false);

    //audio variable settings declaration


    const [showRecord, setShowRecord] = useState('flex')
    const [showStop, setShowStop] = useState('none')
    const [showAudioRecorded, setShowAudioRecorded] = useState(false)
    const [audioPath, setAudioPath] = useState('');
    const [value] = useState(new Animated.Value(0))


    // firebase.database().ref('/users/' + ref + '/conversations')
    //     .child(userUid)
    //     .update({
    //         numberOfMessages: 0,
    //         seen: true
    //     })
    //     .catch(e => console.log(e));

    // firebase.database().ref("/users/" + userUid)
    //     .child("contacts")
    //     .child(ref)
    //     .update({
    //         seen: true,
    //         newMessage: false,
    //         numberOfMessages: 0
    //     }).then(() => console.log("messages seen updated"))
    //     .catch(e => console.log(e))

    // firebase.database().ref('/users/' + ref + '/conversations')
    //     .child(userUid)
    //     .once('value', (snap) => {
    //         const userDb = firebase.database().ref('/users/' + userUid);
    //         userDb.once("value", (snapshot) => {

    //             userDb.update({
    //                 globalMessagesCounted: snapshot.val().globalMessagesCounted != null ?
    //                     snapshot.val().globalMessagesCounted - snap.child(ref).val().numberOfMessages : 0
    //             })
    //         }).catch(e => console.log(e));
    //     }).then(() => {
    //         firebase.database().ref('/users/' + ref + '/conversations')
    //             .child(userUid)
    //             .update({
    //                 numberOfMessages: 0,
    //                 seen: true
    //             })
    //             .then(() => {
    //                 console.log("conversation update executed")
    //             })
    //             .catch(e => console.log(e));
    //     })
    //     .catch(e => console.log(e));


    // firebase.database().ref("/users/" + userUid)
    //     .child("contacts")
    //     .child(ref)
    //     .update({
    //         seen: true,
    //         newMessage: false,
    //         numberOfMessages: 0
    //     }).then(() => console.log("messages seen updated"))
    //     .catch(e => console.log(e))



    useEffect(() => {
        checkPermission();
        // reloadData();
        Animated.timing(value,{
            toValue: 1,
            duration: 500,
            useNativeDriver: false, // <-- Add this
        }).start();
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            console.log(querySnapshot.docChanges.length);

            firebase.database().ref('/users/' + ref + '/conversations')
                .child(userUid)
                .once('value', (snap) => {
                    const userDb = firebase.database().ref('/users/' + userUid);
                    userDb.once("value", (snapshot) => {

                        userDb.update({
                            globalMessagesCounted: snapshot.val().globalMessagesCounted != null ?
                                snapshot.val().globalMessagesCounted - snap.val().numberOfMessages : 0
                        })
                    }).catch(e => console.log(e));
                }).then(() => {
                    firebase.database().ref('/users/' + ref + '/conversations')
                        .child(userUid)
                        .update({
                            numberOfMessages: 0,
                            seen: true
                        })
                        .then(() => {
                            console.log("conversation update executed")
                        })
                        .catch(e => console.log(e));
                })
                .catch(e => console.log(e));


            firebase.database().ref("/users/" + userUid)
                .child("contacts")
                .child(ref)
                .update({
                    seen: true,
                    newMessage: false,
                    numberOfMessages: 0
                }).then(() => console.log("messages seen updated"))
                .catch(e => console.log(e))

            if (querySnapshot.docChanges.length != 0) {
                const messagesFirestore = querySnapshot
                    .docChanges.filter(({ type,doc }) => {
                        type === 'added';

                        if (doc.data().image_user_id == myUid && doc.data().first_sent == 0) {
                            
                            doc.ref.update({
                                first_sent: 1
                            })
                            return false;
                        }
                        else{
                            if (type === 'modified' && doc.data().first_sent == 1){
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                
                }).map(({ doc }) => {
                
                    const messages = doc.data();
                    return {
                        ...messages, createdAt: moment(messages.createdAt).toDate()
                    }
                    }).sort((a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix());
                appendMessages(messagesFirestore);
            }


        })
        return () => unsubscribe();

    }, [ref])

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    }, [messages])

    async function readUser() {
        // const {user} = await AsyncStorage.getItem('user');
        // const _id = Math.random().toString(36).substring(7);
        const user = { _id : userUid, name: myName , avatar: 'https://facebook.github.io/react/img/logo_og.png' };
        if (user) {
            // setUser(JSON.parse(user))
            setUser(user);
        }
    }


    async function handleChatLogin() {

        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)

    }
    async function reloadData() {
        setMessages([...[]]);
        console.log('data loaded ');

    }

    function updateMessagesData(){
        firebase.database().ref('/users/' + ref + '/conversations')
            .child(userUid)
            .update({
                numberOfMessages: 0,
                seen: true
            })
            .catch(e => console.log(e));

        firebase.database().ref("/users/" + userUid)
            .child("contacts")
            .child(ref)
            .update({
                seen: true,
                newMessage: false,
                numberOfMessages: 0
            }).then(() => console.log("messages seen updated"))
            .catch(e => console.log(e))
    }

    async function handleSendMessage(messages) {
                    
        // messages.createdAt = new Date().toUTCString()
        if(messages.image || messages.video || messages.audio){
            appendMessages(messages);

            firebase.database().ref('/users/' + ref + '/conversations')
                .child(userUid)
                .once('value', (snap) => {
                    const userDb = firebase.database().ref('/users/' + userUid);
                    userDb.once("value", (snapshot) => {

                        userDb.update({
                            globalMessagesCounted: snapshot.val().globalMessagesCounted != null ?
                                snapshot.val().globalMessagesCounted - snap.val().numberOfMessages : 0
                        })
                    }).catch(e => console.log(e));
                }).then(() => {
                    firebase.database().ref('/users/' + ref + '/conversations')
                        .child(userUid)
                        .update({
                            numberOfMessages: 0,
                            seen: true
                        })
                        .then(() => {
                            console.log("conversation update executed")
                        })
                        .catch(e => console.log(e));
                })
                .catch(e => console.log(e));


            firebase.database().ref("/users/" + userUid)
                .child("contacts")
                .child(ref)
                .update({
                    seen: true,
                    newMessage: false,
                    numberOfMessages: 0
                }).then(() => console.log("messages seen updated"))
                .catch(e => console.log(e))
        }
        else{
            // const writes = messages.map((m) => chatsRef.add(m));
            // await Promise.all(writes);
            // messages._id = messageIdGenerator();
            // messages.user = { _id: myUid, name: myName };
            // var today_date = new Date();
            // messages.createdAt = today_date.toUTCString();
            // const message = {...messages};
            // const writes = message.map((m) => chatsRef.add(m));
            // await Promise.all(writes);
            
             await chatsRef.add(...messages)
             .catch(e=>console.log(e));

            // increase number of messages i sent to him/her
            firebase.database().ref("/users/" + userUid + "/conversations")
                .child(ref)
                .once('value', (snap) => {
                    if (snap.val() != null && snap.val().numberOfMessages != null) {
                        firebase.database().ref('/users/' + userUid + '/conversations')
                            .child(ref)
                            .update({
                                numberOfMessages: snap.val().numberOfMessages + 1,
                                seen: false
                            }).then(()=>{
                             const refDb = firebase.database().ref('/users/' + ref );
                                    refDb.once('value',(snapshot)=>{

                                        refDb.update({

                                            globalMessagesCounted: snapshot.val().globalMessagesCounted != null ? snapshot.val().globalMessagesCounted + 1 : 1

                                        }).catch(e => console.log(e));

                                    }).catch(e=>console.log(e))
                            }).catch(e=> console.log(e))

                        firebase.database().ref('/users/' + ref)
                            .child("contacts")
                            .child(userUid)
                            .update({
                                numberOfMessages: snap.val().numberOfMessages + 1,
                                seen: false
                            }).catch(e=>console.log(e))
                    }
                    else {
                        firebase.database().ref('/users/' + userUid + '/conversations')
                            .child(ref)
                            .update({
                                numberOfMessages: 1,
                                seen: false
                            }).then(() => {
                                const refDb = firebase.database().ref('/users/' + ref);
                                refDb.once('value', (snapshot) => {

                                    refDb.update({

                                        globalMessagesCounted: snapshot.val().globalMessagesCounted != null ? snapshot.val().globalMessagesCounted + 1 : 1

                                    }).catch(e => console.log(e));

                                }).catch(e => console.log(e))
                            })
                        firebase.database().ref('/users/' + ref)
                            .child("contacts")
                            .child(userUid)
                            .update({
                                numberOfMessages:  1,
                                seen: false
                            }).catch(e => console.log(e));
                    }
                })


                
            firebase.database().ref('/users/' + ref + '/conversations')
                .child(userUid)
                .update({
                    numberOfMessages: 0,
                    seen: true
                }).catch(e => console.log(e));

            firebase.database().ref('/users/' + userUid)
                .child("contacts")
                .child(ref)
                .update({
                    numberOfMessages: 0,
                    seen: true
                })
        }

        // add/update user contact for current user

        firebase.database().ref('/users/' + userUid)
            .child('contacts').child(ref).update({
                conversation: ConversationLocation,
                id: ref,
                fullName: hisName,
                newMessage : false
            })
            .catch(err => console.log(err.message))

        // add/update user contact for user on conversation with

        firebase.database().ref('/users/' + ref)
            .child('contacts').child(userUid).update({
                conversation: ConversationLocation,
                id: userUid,
                fullName: myName,
                newMessage: true


            })
            .catch(err => console.log(err.message))

       
        
        

    }

    function checkAudioPermission(){
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }

        const rationale1 = {
            title: "audio record Permission",
            message:
                " need access to your device microphone so you can send audio."
        };

        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            rationale1
        ).then(result => {
            console.log("Permission result:", result);
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });

    }

    function checkPermission() {
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }
        const rationale = {
            title: "storage Permission",
            message:
                " need access to your device gallery so you can send pictures."
        };
        

        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            rationale
        ).then(result => {
            console.log("Permission result:", result);
            const rationale = {
                title: "storage Permission",
                message:
                    " need access to your device gallery so you can send pictures."
            };

          
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });




    }

    function messageIdGenerator() {
        // generates uuid.
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }


    async function handleAddPicture() {
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
                    name: `${messageIdGenerator()}.${extension}`,
                    type: correspondingMime[allowedExtensions.indexOf(extension)]
                };

                const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const message = {};
                message._id = messageIdGenerator();
                message.user = {_id : myUid, name : myName};
                var today_date = new Date();
                message.createdAt = today_date.toUTCString();
                message.image = uri;
                message.messageType = "image";
                handleSendMessage(message);
                 firebase.storage()
                    .ref(filename)
                    .putFile(uploadUri)
                    .then( async snapshot =>{
                        
                        const message = {};
                        message._id = messageIdGenerator();
                        message.user = { _id: myUid, name: myName, avatar: profileImage };;
                        var today_date  = new Date();
                        message.createdAt =  today_date.toUTCString();
                        message.messageType = "image";
                        message.image_user_id=myUid;
                        message.first_sent=0;
                        message.image = snapshot.downloadURL;
                        await chatsRef.add(message)
                            .catch(e => console.log(e));

                        // increase number of messages i sent to him/her
                        firebase.database().ref("/users/" + userUid + "/conversations")
                            .child(ref)
                            .once('value', (snap) => {
                                if (snap.val() != null && snap.val().numberOfMessages != null) {
                                    firebase.database().ref('/users/' + userUid + '/conversations')
                                        .child(ref)
                                        .update({
                                            numberOfMessages: snap.val().numberOfMessages + 1,
                                            seen: false
                                        })
                                }
                                else {
                                    firebase.database().ref('/users/' + userUid + '/conversations')
                                        .child(ref)
                                        .update({
                                            numberOfMessages: 1,
                                            seen: false
                                        })
                                }
                            })

                        firebase.database().ref('/users/' + ref + '/conversations')
                            .child(userUid)
                            .update({
                                numberOfMessages: 0,
                                seen: true
                            })
                    })
                
                if (!allowedExtensions.includes(extension)) {
                    return alert("That file type is not allowed.");
                }
            }
        });

        
    };



    async function handleAddVideo() {
        const options = {
            title: "Select Video ",
            mediaType: "video",
            takePhotoButtonTitle: "Take a Video",
            maxWidth: 2000,
            maxHeight: 2000,
            allowsEditing: true,
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'video'
            },
            quality: 1


        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log("Response = ", response);
            if (response.didCancel) {
                // do nothing
            } else if (response.error) {
                // alert error
            } else {
                const { uri } = response;
                const extensionIndex = uri.lastIndexOf(".");
                const extension = uri.slice(extensionIndex + 1);
                const allowedExtensions = ["mp4", "avi", "3gp","mkv"];
                const correspondingMime = ["video/mp4", "video/avi", "video/3gp", "video/mkv"];
                const source = { uri: response.uri };

                const file = {
                    uri,
                    name: `${messageIdGenerator()}.${extension}`,
                    type: correspondingMime[allowedExtensions.indexOf(extension)]
                };

                const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const message = {};
                message._id = messageIdGenerator();
                message.user = { _id: myUid, name: myName };
                var today_date = new Date();
                message.createdAt = today_date.toUTCString();
                message.video = uri;
                message.messageType = "video";
                handleSendMessage(message);
                firebase.storage()
                    .ref(filename)
                    .putFile(uploadUri)
                    .then(async snapshot => {
                        const message = {};
                        message._id = messageIdGenerator();
                        message.user = { _id: myUid, name: myName, avatar: profileImage}; ;
                        var today_date = new Date();
                        message.createdAt = today_date.toUTCString();
                        message.image_user_id = myUid;
                        message.first_sent = 0;
                        message.messageType = "video";
                        message.video = snapshot.downloadURL;
                        await chatsRef.add(message)
                            .catch(e => console.log(e));

                        // increase number of messages i sent to him/her
                        firebase.database().ref("/users/" + userUid + "/conversations")
                            .child(ref)
                            .once('value', (snap) => {
                                if (snap.val() != null && snap.val().numberOfMessages != null) {
                                    firebase.database().ref('/users/' + userUid + '/conversations')
                                        .child(ref)
                                        .update({
                                            numberOfMessages: snap.val().numberOfMessages + 1,
                                            seen: false
                                        })
                                }
                                else {
                                    firebase.database().ref('/users/' + userUid + '/conversations')
                                        .child(ref)
                                        .update({
                                            numberOfMessages: 1,
                                            seen: false
                                        })
                                }
                            })

                        firebase.database().ref('/users/' + ref + '/conversations')
                            .child(userUid)
                            .update({
                                numberOfMessages: 0,
                                seen: true
                            })
                    })


                // if (!allowedExtensions.includes(extension)) {
                //     return alert("That file type is not allowed.");
                // }
            }
        });


    };




    

    function renderActions(props) {
        return (
            <Actions
                {...props}
                options={{
                    ['Send Image']: handleAddPicture,
                    ['Send Video']: handleAddVideo,
                }}
                icon={() => (
                    <Icon name={'attach'} size={28} color="blue" />
                )}
                onSend={args => console.log(args,"from renderAction")}
            />
        )
    }



    function onLoadStart() {
        // this.setState({ opacity: 1 });
        setOpacity(1);
    }

    function onLoad() {
        // this.setState({ opacity: 0 });
        setOpacity(0);

        // this.state.currentPosition;
    }

    function onBuffer({ isBuffering }) {
        // this.setState({ opacity: isBuffering ? 1 : 0 });
        setOpacity(isBuffering ? 1 : 0);

    }

    function onFullScreenClicked() {
        // this.setState({width:Dimensions.get('screen').width,height : Dimensions.get('screen').height-15,isFullScreen:true})
        setIsFullScreen(true)
        setWidth(Dimensions.get('screen').width)
        setHeight(Dimensions.get('screen').height - 15)
    }
    function onFullScreenDismiss() {
        // this.setState({ width: 300, height: 200, isFullScreen: false })
        setIsFullScreen(false)
        setWidth(300)
        setHeight(200)
    }


    useEffect(() => {
        var OrientationInterval = setInterval(() => {
            Orientation.getOrientation((orientation) => {

                setDeviceOrientation(orientation);

            })
        }, 1000);
        function window_listener() {

            if (isFullScreen === true) {
                if (Orientation.getInitialOrientation() == 'PORTRAIT' || Orientation.getInitialOrientation() == 'PORTRAIT-UPSIDEDOWN') {
                    setWidth(Dimensions.get('window').width)
                    setHeight(Dimensions.get('screen').height - 15)
                }
                else if (Orientation.getInitialOrientation() == 'LANDSCAPE-LEFT' || Orientation.getInitialOrientation() == 'LANDSCAPE-RIGHT') {
                    setWidth(Dimensions.get('window').width)
                    setHeight(Dimensions.get('screen').height)
                }
            }
        }
        window_listener();
        console.log("hooks executed");
        return () => clearInterval(OrientationInterval)

    }, [isFullScreen, DeviceOrientation])



    function renderMessageVideo(props){
        const { currentMessage } = props;
        return (

            <View style={{ width: Dimensions.get('window').width-100, height: 250 }} >


              <VideoPlayer 
              source={{ uri: currentMessage.video }}
              onBack={()=>console.log("onBack function is clicked")}
              disableBack={true}
              paused={true}
              onLoad={onLoad }
              onBuffer={onBuffer}
              onLoadStart={onLoadStart}
              resizeMode={'cover'}
              fullscreen={false}
              onEnterFullscreen={onFullScreenClicked}
              onExitFullscreen={onFullScreenDismiss}
              disableFullscreen={true}
              />
            

          </View>
        );
    };

    // audio functions 


    async function StartAudioRecord() {
        let folder = AudioUtils.DocumentDirectoryPath;
        let audioPath = folder + '/' + messageIdGenerator() + '.aac';
        setAudioPath(audioPath);
        console.log("audio path is :", audioPath);
        let options = {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "wav",
            MeteringEnabled: true,
        };
        await AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac"
        }).catch(e=>console.log(e))
     
        await AudioRecorder.startRecording().catch((e) => console.log(e))
    }

    async function StopAudioRecording() {
        await AudioRecorder.stopRecording().catch(e=>console.log(e));
        console.log("audio recording stopped");
        const uri = audioPath;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = uri;
        var length;
        const sound =  new Sound(uri,Sound.MAIN_BUNDLE,err=>{

            // console.log(sound.getDuration());
            const message = {};
            message._id = messageIdGenerator();
            message.user = { _id: myUid, name: myName };
            var today_date = new Date();
            message.createdAt = today_date.toUTCString();
            message.audio = audioPath;
            console.log("audio length : ", sound.getDuration());
            message.length = sound.getDuration();
            message.messageType = "audio";
            handleSendMessage(message);
        })
        firebase.storage()
            .ref(filename)
            .putFile(uploadUri)
            .then(async snapshot => {
                const message = {};
                message._id = messageIdGenerator();
                message.user = { _id: myUid, name: myName, avatar: profileImage };
                var today_date = new Date();
                message.createdAt = today_date.toUTCString();
                message.messageType = "audio";
                message.image_user_id = myUid;
                message.first_sent = 0;
                message.length = sound.getDuration();
                message.audio = snapshot.downloadURL;
                await chatsRef.add(message)
                    .catch(e => console.log(e));

                // increase number of messages i sent to him/her
                firebase.database().ref("/users/" + userUid + "/conversations")
                    .child(ref)
                    .once('value', (snap) => {
                        if (snap.val() != null && snap.val().numberOfMessages != null) {
                            firebase.database().ref('/users/' + userUid + '/conversations')
                                .child(ref)
                                .update({
                                    numberOfMessages: snap.val().numberOfMessages + 1,
                                    seen: false
                                })
                        }
                        else {
                            firebase.database().ref('/users/' + userUid + '/conversations')
                                .child(ref)
                                .update({
                                    numberOfMessages: 1,
                                    seen: false
                                })
                        }
                    })

                firebase.database().ref('/users/' + ref + '/conversations')
                    .child(userUid)
                    .update({
                        numberOfMessages: 0,
                        seen: true
                    })

            })

    }


    async function CancelAudioRecording(){

        await AudioRecorder.stopRecording();
        console.log("audio recording canceled");
    }

    function renderAudio(props) {


        return (
            <View>
                <RenderAudio props={props.currentMessage} />
            </View>
        )


    }


    function renderBubble(props){
        return (
            <View>
                {renderAudio(props)}
                <Bubble {...props} />
            </View>
        );
    }


   function handleAudio(){

    return (

        <View>
            <View style={[{ display: showRecord }, styles.playAudio]}>

                <TouchableOpacity onPress={() => {
                    console.log("start audio record clicked");
                    checkPermission().then(value=>{
                        if(value === true){
                            checkAudioPermission().then(val=>{
                                if(val === true){
                                    console.log(value);
                                    StartAudioRecord();
                                    setShowRecord("none");
                                    setShowStop("flex");
                                }
                            })
                            .catch(e=>console.log(e));
                        }
                    })
                    .catch(e=>console.log(e));
                  

                }} >
                    <Icon name="mic" size={32} color="blue" />
                </TouchableOpacity>

            </View>

            <View style={[{ display: showStop }, styles.playAudio]}>

                <TouchableOpacity onPress={() => {
                    StopAudioRecording();
                    setShowRecord("flex");
                    setShowStop("none");
                    setShowAudioRecorded(true);
                    console.log("audio record stop clicked");
                }} >
                    <Icon name="stop" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    CancelAudioRecording();
                    setShowRecord("flex");
                    setShowStop("none");
                    setShowAudioRecorded(true);
                    console.log("audio cancel button clicked");
                }} >
                    <Icon name="trash" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>

    )

    }


   function renderComposer(props){

    return(

        <View style={{flexDirection:'row'}} >

        <Composer {...props} />
        {handleAudio()}
        </View>

    );


   }


   function _onSend(props){
       props.onSend({ text: props.text.trim() }, true);
   }

   function renderSend(props){
       if(!props.text.trim()){
           return handleAudio()
       }
    //    return <Send {...props} onSend={ (arg) =>{
    //        handleSendMessage(arg);
    //    }} 
    //     />

       return(
        
           <View style={{ alignSelf: 'center',marginRight :'1%' }} >
               <Icon name="send" size={24}  color="blue"  onPress={() => _onSend(props)} />
            </View>

       )
   }

    return (

        <View style={styles.container} >



            <View style={styles.Card}>

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >

                    <Icon name="arrow-back-circle-outline" size={32} color='white' style={{ marginLeft: 10, width: 32, height: 32 }} />
                </TouchableOpacity>

                <Text style={styles.fullName}> {hisName}  </Text>


            </View>

            

            <GiftedChat messages={messages} onSend={handleSendMessage}
                user={{_id : myUid, name : myName }}
                renderMessageAudio ={renderAudio}
                isTyping={true}
                alwaysShowSend={true}
                messageIdGenerator={messageIdGenerator}
                renderMessageVideo={renderMessageVideo}
                renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
                renderActions={renderActions}
                renderSend={renderSend}
                keyboardShouldPersistTaps={"handled"}
                loadEarlier={true}
                
                


            />

        </View>
    )

}

const styles = StyleSheet.create({

    input: {

        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',


    },
    container: {
        flex: 1,
    },
    Card: {
        flexDirection: 'row',
        backgroundColor: '#324662',
        alignSelf: 'auto',
        paddingTop:'2%',
        paddingBottom:'2%',
    },
    fullName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: '20%'
    },
    modal_container: {

        backgroundColor: "gray",
        opacity: 0.1,


    },
    options: {

        color: '#4ac3ff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    modal_view_style: {
        borderBottomWidth: 2,
        borderColor: "black",
        // marginBottom : 5,
        padding: "5%",
        backgroundColor: "white",

    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    playAudio: {
        // marginLeft: '50%',
        marginVertical: '5%',


    },
    readAudio: {
        margin: '5%',
        borderWidth: 2,
        borderRadius: 4,
        width: "70%",
    },
    audioStyle: {
        margin: 5,
        flexDirection: 'row',

    },
    audioText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: '25%',

    },
    


})



