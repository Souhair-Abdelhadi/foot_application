import React from 'react'
import { StyleSheet, View, Alert,Text,} from 'react-native'
import Sound from 'react-native-sound'
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider'
import LinearGradient from 'react-native-linear-gradient'


export default class AudioCustomView extends React.Component{




    state = {
        playAudio :false,
        currentTime : 0,
        paused: false,
        finished: false,
        audio_play_time_update: '',
        audio_time_update_continue:'',
        audioPath: this.props.props.audio ? this.props.props.audio : '',
        sound : {},
        audioLength: this.props.props.length ? this.props.props.length : 0,

    }

    

    render(){

        console.log(this.props.props.audio)

        return(


            <View style={[{ display: 'flex' }, styles.readAudio]}>

                <LinearGradient colors={['white','#324052']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                    flexDirection: 'row', paddingRight: '3%', alignSelf: 'flex-start', borderWidth: 2,
                    borderRadius: 4,marginLeft:'2%',marginRight : '2%'
 }} >

                <View style={styles.audioStyle}>

                    {/* play audio */}
                    <View style={{ display: !this.state.playAudio && this.state.paused == false ? 'flex' : 'none' }} >
                        <Icon
                            name="ios-play"
                            size={35}
                            color={"blue"}
                            style={{
                                left: 20,
                                position: "relative",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.5,
                                backgroundColor: "transparent"
                            }}
                            onPress={() => {

                               
                                clearInterval(this.state.audio_play_time_update);
                                clearInterval(this.state.audio_time_update_continue);
                                const sound = new Sound(this.props.props.audio, null, error => {
                                    this.setState({sound : sound,audioLength : sound.getDuration()});
                                    if (error) {
                                        console.log("failed to load the sound", error);
                                        this.setState({playAudio : false});
                                    }
                                    this.setState({sound : sound});
                                    this.setState({ playAudio: true });
                                    this.setState({ pause: false });
                                    this.setState({ finished: false });
                                    sound.play(success => {
                                        console.log(success, "success play");
                                        this.setState({finished : false});
                                        clearInterval(this.state.audio_play_time_update);
                                        clearInterval(this.state.audio_time_update_continue);
                                        this.setState({currentTime : 0});
                                        sound.stop();
                                        this.setState({playAudio : false})
                                        this.setState({pause : false})
                                        this.setState({finished : false})
                                        if (!success) {
                                            Alert.alert("There was an error playing this audio");
                                            this.setState({playAudio : false});
                                        }
                                    });

                                    var audio_play_time_update = setInterval(() => {
                                        console.log("interval executed");
                                        sound.getCurrentTime((sec, isPlaying) => {
                                            if (isPlaying === true) {
                                                this.setState({currentTime : sec});
                                            }
                                            else if (isPlaying == false && Math.floor(sound.getDuration()) == this.state.currentTime){
                                                clearInterval(this.state.audio_play_time_update);
                                                clearInterval(this.state.audio_time_update_continue);
                                            }
                                        });

                                        

                                    }, 1000);

                                    this.setState({audio_play_time_update : audio_play_time_update});

                                });
                            }}
                        />
                    </View>

                    {/* pause the audio */}
                    <View style={{ display: this.state.playAudio ? 'flex' : 'none' }} >
                        <Icon
                            name="pause-circle"
                            size={35}
                            color={"red"}
                            style={{
                                left: 20,
                                position: "relative",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.5,
                                backgroundColor: "transparent"
                            }}
                            onPress={() => {
                                this.setState({playAudio : false});
                                this.setState({paused : true});
                                this.state.sound.pause();
                                clearInterval(this.state.audio_play_time_update);
                                clearInterval(this.state.audio_time_update_continue);
                            }}
                        />
                    </View>

                    {/* audio continue view */}
                    <View style={{ display: !this.state.playAudio && this.state.paused ? 'flex' : 'none' }} >
                        <Icon
                            name="play-circle"
                            size={35}
                            color={"green"}
                            style={{
                                left: 20,
                                position: "relative",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.5,
                                backgroundColor: "transparent"
                            }}
                            onPress={async () => {
                                this.setState({playAudio : true});
                                this.setState({paused : false});
                                await this.state.sound.setCurrentTime(this.state.currentTime);
                                await this.state.sound.play(success => {
                                    console.log(success, "success play");
                                    this.setState({ finished: true});
                                    clearInterval(this.state.audio_play_time_update);
                                    clearInterval(this.state.audio_time_update_continue);
                                    this.setState({ currentTime: 0});
                                    this.state.sound.stop();
                                    this.setState({ playAudio: false});
                                    this.setState({ paused : false});
                                    this.setState({ finished: false});
                                    if (!success) {
                                        Alert.alert("There was an error playing this audio");
                                        this.setState({ playAudio: false });
                                    }
                                });

                                var audio_time_update_continue = setInterval(() => {
                                    this.state.sound.getCurrentTime((sec, isPlaying) => {
                                        console.log("interval executed");
                                        if (isPlaying === true && (this.state.sound.getDuration() != this.state.currentTime)) {
                                            this.setState({ currentTime : sec});
                                        }
                                        else{
                                            clearInterval(this.state.audio_play_time_update);
                                            clearInterval(this.state.audio_time_update_continue);
                                        }
                                    });
                                }, 1000);
                                this.setState({ audio_time_update_continue : audio_time_update_continue});
                            }}
                        />
                    </View>

                        <Slider
                            style={{ width:'70%', height: 40,marginLeft : '7%' }}
                            minimumValue={0}
                            maximumValue={this.state.audioLength}
                            onValueChange={value =>{
                                this.setState({currentTime : value});
                            }}
                            onSlidingComplete={value =>{
                                this.state.sound.setCurrentTime(value);
                                this.setState({currentTime : value});
                                this.setState({ playAudio: false, paused: true });
                            }}
                            onSlidingStart={()=>{
                                this.state.sound.stop();
                                clearInterval(this.state.audio_play_time_update);
                                clearInterval(this.state.audio_time_update_continue);
                                this.setState({ playAudio : false,paused : true});
                            }}
                            minimumTrackTintColor="#1cd4d1"
                            maximumTrackTintColor="#16fa84"
                            value={this.state.currentTime}
                            
                        />

                            <View style={{marginTop: '4%'}} >

                            <Text style={styles.audioText}> {Math.round(this.state.currentTime)}:{Math.round(this.state.audioLength)} </Text>

                            </View>


                </View>
                                    </LinearGradient>


            </View>



        )


    }




}



const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    playAudio: {
        marginLeft: '50%',
        // marginVertical: '30%',
        


    },
    readAudio: {
        marginLeft: '2%',
        marginVertical: '5%',
        marginRight : '2%',
        // width: '80%'
    },
    audioStyle: {
        // margin: 5,
        flexDirection: 'row',
        alignSelf : 'flex-start',       
    },
    audioText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',

    }


})