/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react";
import {View,Text,StyleSheet,Animated,Alert,Dimensions,ImageBackground,ScrollView,
   TouchableOpacity,SafeAreaView} from 'react-native'
import VideoPlayer from 'react-native-video-controls'
import Orientation from "react-native-orientation-locker"
import Icon from "react-native-vector-icons/Ionicons"
export default class VideoFrame extends React.Component{

    constructor(props){
        super(props)
        Orientation.lockToPortrait()
    }

    state = {
        opacity  : 1,
        fullscreen : false,
        videoWidth : "100%",
        videoHeight : 250,
        display : 'flex',
        pause : false,
        imageBackgroundHeight : Dimensions.get('screen').height,
        imageBackgroundWidth : Dimensions.get('screen').width,
        bodyHeight  : "40%",
        bodyWidth : "100%",
    }

    onLoadStart() {
        // this.setState({ opacity: 1 });
        this.setState({opacity : 1,});
    }

    onLoad() {
        // this.setState({ opacity: 0 });
        this.setState({opacity : 0});

        // this.state.currentPosition;
    }

    onBuffer({ isBuffering }) {
        // this.setState({ opacity: isBuffering ? 1 : 0 });

    }

    onFullScreenClicked() {
        // this.setState({width:Dimensions.get('screen').width,height : Dimensions.get('screen').height-15,isFullScreen:true})
        this.setState({fullscreen : true ,
            videoWidth : Dimensions.get('screen').height,
            videoHeight : Dimensions.get('screen').width,
            display : 'none',
            imageBackgroundHeight : '100%',
            imageBackgroundWidth : '100%',
            bodyHeight : Dimensions.get('screen').width,
            bodyWidth : Dimensions.get('screen').height,
        });
        Orientation.lockToLandscapeRight()
      }
    onFullScreenDismiss() {
        // this.setState({ width: 300, height: 200, isFullScreen: false })
        this.setState({fullscreen : false,
            videoWidth : "100%",
            videoHeight : 250,
            display : 'flex',
            imageBackgroundHeight : "100%",
            imageBackgroundWidth : "100%",
            bodyHeight  : "40%",
            bodyWidth : "100%",
        });
        Orientation.lockToPortrait()

    }

    onError(){
        this.setState({pause : true})
    }

    onEnd(){
        console.log("")
    }

    _onOrientationDidChange = (orientation) => {
        if ( (orientation == 'LANDSCAPE-LEFT' || orientation == 'LANDSCAPE-RIGHT' ) && (this.state.fullscreen == true) ) {
          //do something with landscape left layout
          this.setState({
              videoWidth : Dimensions.get('window').width,
              videoHeight : Dimensions.get('window').height
          })
        } 
        else if(this.state.fullscreen == false) {
          //do something with portrait layout
          this.setState({
            videoWidth : Dimensions.get('window').width,
            videoHeight : 250,
        })
        }
      };

    componentDidMount(){

        //Orientation.addOrientationListener(this._onOrientationDidChange);


    }


    render(){
        return(
            <SafeAreaView style={styles.container} >
                <ImageBackground 
                    style={[styles.imageBackground,{
                        height : this.state.imageBackgroundHeight,
                        width : this.state.imageBackgroundWidth
                    }]}
                    source={{uri : this.props.navigation.getParam('item').image}}
                >
                <View style={[styles.header,{display : this.state.display}]} >
                        <View style={styles.headerContent}>
                            <TouchableOpacity
                            style={{position : "absolute",left : "5%"}}
                            onPress={()=>this.props.navigation.goBack()}
                            >
                            <Icon 
                                name="arrow-back-circle" size={32} color="white"
                            />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}> {this.props.navigation.getParam('item').title} </Text>
                        </View>
                    </View>
                    <View style={[styles.body,{height : this.state.bodyHeight,width : this.state.bodyWidth}]} >
                        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight,flex : 1 }} >
                            
                        <VideoPlayer 
                            source={{ uri: this.props.navigation.getParam('item').video  }}
                            onBack={()=>console.log("onBack function is clicked")}
                            disableBack={true}
                            paused={this.state.pause}
                            onLoad={this.onLoad.bind(this) }
                            onBuffer={this.onBuffer.bind(this)}
                            onLoadStart={this.onLoadStart.bind(this)}
                            resizeMode={'cover'}
                            fullscreen={this.state.fullscreen}
                            onEnterFullscreen={this.onFullScreenClicked.bind(this)}
                            onExitFullscreen={this.onFullScreenDismiss.bind(this)}
                            disableFullscreen={false}
                            onError={this.onError.bind(this)}
                            onEnd={(data)=>{
                                console.log(data)
                            }}
                            />

                        </View>
                        
                    </View>
                    <ScrollView style={{flex : 1,display : this.state.display}}>
                    
                        <View style={[styles.DescriptionView]}>
                            <View style={styles.DescriptionTitle}>
                                <Text style={styles.DescriptionTitleStyle}>Description</Text>
                            </View>
                            <View style={styles.DescriptionMessageView}>
                                {(typeof this.props.navigation.getParam('item').Description) === "undefined" || 
                                this.props.navigation.getParam('item').Description === null ? <Text style={styles.DescriptionMessageStyle} >No description found about this video</Text> :
                                (<Text style={styles.DescriptionMessageStyle} > {this.props.navigation.getParam('item').Description} </Text>)
                                }
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        )
    }



}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white",
    },
    header : {
        height : 60,
        backgroundColor : "#01011A",
        marginBottom : "8%",
    },
    headerContent : {
        marginTop : "3%",
        marginBottom : "3%",
        flexDirection : "row",
        justifyContent : "center",
    },
    headerTitle : {
        fontSize : 26,
        fontWeight : "bold",
        color : "white",
    },
    body : {
        flex : 1,

    },
    VideoView : {
        marginTop : "4%",
        marginBottom : "4%",
    },
    imageBackground : {
        flex : 1
    },
    DescriptionView : {
        flex : 1,
        width : "90%",
        alignSelf : "center",
        borderWidth : 3,
        borderColor : "white",
        borderRadius : 15,
        paddingBottom : "10%",
        marginTop : "6%",
    },
    DescriptionTitle : {
        justifyContent : "center",
        backgroundColor : "white"
    },
    DescriptionTitleStyle : {
        fontSize : 25,
        color : "black",
        marginLeft : "2%",
    },
    DescriptionMessageView : {
        marginTop : "5%",
        justifyContent : "center",
        alignItems : "center"

    },
    DescriptionMessageStyle : {
        fontSize : 18,
        color : "white",
        lineHeight : 30,
    }
})