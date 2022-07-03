
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator,Modal,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatRoom from './component/chatRoom'
import ImageZoomViewer from 'react-native-image-zoom-viewer'


export default class Card extends React.PureComponent {


    state = {
        loading: true,
        showModal: false,
        showChatModal:false,
        showFullImageModal:false,

    }


    render() {
        // console.log('from card : ', this.props.props);
        return (


            <View style={styles.Card}>
                {/* modal to show the profile of the specific user */}
                <Modal visible={this.state.showModal} onRequestClose={() => this.setState({ showModal: false })}  >
                    


                                <View style={styles.container}>
                        <ScrollView>

                            <LinearGradient colors={['#05036D', 'pink', '#36AFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                                flex: 1, borderBottomWidth: 1,
                                borderBottomColor: 'white',
                            }}   >

                                <View style={[styles.card, { alignSelf: 'center', borderBottomWidth: 0 }]} >

                                        <TouchableOpacity onPress={() => this.setState({ showFullImageModal: true })} >
                                            { (typeof this.props.profileImage === "undefined" )?
                                            <Image source={require('./assets/VT_logo2.png')} style={styles.imageView} /> :
                                            <Image source={{ uri: this.props.profileImage }} style={styles.imageView} /> }

                                        </TouchableOpacity>

                                        <Modal visible={this.state.showFullImageModal} transparent={true} onRequestClose={() => this.setState({ showFullImageModal: false })} >
                                        <ImageZoomViewer imageUrls={[(typeof this.props.profileImage === "undefined" ) ? 
                                            { props: { source: require('./assets/VT_logo2.png') } } : { url: this.props.profileImage }]} onCancel={() => this.setState({ showFullImageModal: false })} />
                                        </Modal>

                                    </View>
                                                            </LinearGradient>

                                <LinearGradient colors={['pink', 'gray']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1 }} >
                                    <View style={styles.card} >
                                    <Icon name="person-circle" size={24} color="black" />

                                    <Text style={styles.profileText} ><Text style={styles.Title} > Name : </Text> {(typeof this.props.fullName === 'undefined') ? ' not yet set' : this.props.fullName}  </Text>

                                    </View>

                                    <View style={styles.card} >
                                    <Icon name="heart" size={24} color="black" />

                                    <Text style={styles.profileText} ><Text style={styles.Title} > Age :</Text> {(typeof this.props.props.age === 'undefined') ? ' not yet set' : this.props.props.age } </Text>

                                    </View>
                                    <View style={styles.card} >
                                    <Icon name="phone-portrait" size={24} color="black" />

                                    <Text style={styles.profileText} ><Text style={styles.Title} > Phone Number :</Text> {(typeof this.props.phoneNumber === 'undefined') ? ' not yet set' : this.props.phoneNumber} </Text>

                                    </View>

                                    <View style={styles.card} >
                                    <Icon name="globe" size={26} color="black" />

                                    <Text style={styles.profileText} ><Text style={styles.Title} > Social status : </Text> {(typeof this.props.props.socialStatus === 'undefined') ? ' not yet set' : this.props.props.socialStatus} </Text>

                                    </View>
                                    <View style={styles.card} >
                                    <Icon name="male" size={24} color="black" />
                                    <Text style={styles.text} >/</Text>
                                    <Icon name="female" size={24} color="black" />
                                    <Text style={styles.profileText} ><Text style={styles.Title} > Gender : </Text> {(typeof this.props.props.gender === 'undefined') ? ' not yet set' : this.props.props.gender}  </Text>

                                    </View>
                                    <View style={styles.card} >
                                    <Icon name="search" size={24} color="black" />

                                    <Text style={styles.profileText} ><Text style={styles.Title} > Interested in  : </Text> {(typeof this.props.props.interest === 'undefined') ? ' not yet set' : this.props.props.interest}  </Text>

                                    </View>

                                    <View style={styles.aboutMe_goal} >

                                    <View style={{ flexDirection: 'row' }} >
                                        <Icon name="heart" size={26} color="black" />
                                        <Text><Text style={styles.Title} > About me : </Text> </Text>
                                    </View>
                                        <View style={{ backgroundColor: 'white', padding: '2%', borderRadius: 10, marginTop: '2%' }} >
                                        <Text style={styles.profileText} >{(typeof this.props.props.aboutMe === 'undefined') ? 'not yet set' : this.props.props.aboutMe} </Text>

                                        </View>
                                    </View>

                                <View style={styles.aboutMe_goal} >
                                    <View style={{ flexDirection: 'row' }} >
                                        <Icon name="flame" size={26} color="black" />
                                        <Text><Text style={styles.Title} > Goal : </Text> </Text>
                                    </View>
                                        <View style={{ backgroundColor: 'white', padding: '2%', borderRadius: 10, marginTop: '2%' }} >
                                        <Text style={styles.profileText} >{(typeof this.props.props.goal === 'undefined') ? 'not yet set' : this.props.props.goal} </Text>

                                        </View>
                                    </View>
                                </LinearGradient>

                            </ScrollView>

                                </View>

                </Modal>

                {/* modal to show chat component with the specific person */}

                <Modal visible={this.state.showChatModal} onRequestClose={() => this.setState({ showChatModal: false })} >

                    <ChatRoom props={this.props.props} userUid={this.props.userUid} this={this} />

                </Modal>



                <LinearGradient colors={['#324052', '#343252', '#323752']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >

                    <TouchableOpacity onPress={()=>{

                        // this.setState({showChatModal : true});
                        console.log("card component pressed")
                        console.log(this.props.this.props.navigation)
                        this.props.this.setState({showNavBar : false})
                        this.props.this.props.navigation.push('Conversation',{
                            userUid : this.props.userUid,
                            fullName : this.props.fullName,
                            profileImage : this.props.profileImage,
                            props : this.props.props
                        });
                        this.props.this.setState({ showNavBar: true })

                    }}>

                    <View style={styles.CardContent} >

                        <TouchableOpacity hitSlop={{ bottom: 100, }} onPress={() => {
                            console.log("image pressed");
                            this.setState({ showModal: true });
                            // console.log(this.props.props)
                            // this.props.props.navigate('About');
                        }} >
                                <Image source={(typeof this.props.profileImage === "undefined") ? require('./assets/VT_logo2.png') : {uri : this.props.profileImage} } style={styles.image} onLoadEnd={() => {
                                this.setState({ loading: false });
                                console.log("loading is set to false")
                            }} />



                            {this.state.loading && <ActivityIndicator animating size={'large'} color='blue' />}
                        </TouchableOpacity>

                                {/* <Text style={styles.text} > {this.props.children}  </Text> */}
                            {this.props.children}

                    </View>

                    </TouchableOpacity>

                </LinearGradient>

            </View>

        )

    }

}

const styles = StyleSheet.create({

    Card: {
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },
    CardContent: {
        flexDirection: 'row',
        flex: 1,
        // textAlign : 'center',


    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageView: {
        height: 300,
        width: 300,
        borderRadius: 150,
        alignSelf: 'center',
    },
    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    card: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',
        flexDirection : 'row'
    },
    profileText: {
        fontSize: 18,
        lineHeight: 25,

    },
    container : {
        flex:1,
    },
    aboutMe_goal: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',

    }

})