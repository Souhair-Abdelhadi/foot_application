/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity,Alert,Modal,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/Ionicons'
import  * as firebase from 'react-native-firebase'
var age = [];

for (var i = 18; i <= 100; i++) {
    age = [...age,
    { label: i.toString(), value: i.toString() }
    ]
}

export default class App extends React.Component {


    constructor(props){
        super(props);
        try {
            this.state={
                userUid: props.navigation.getParam("userUid"),
                showModal: false,
                isLoading: false,
                totalByte: 0,
                transferredBytes: 0,
                showEditModal: false,
                fullName: props.navigation.getParam("fullName"),
                age: props.navigation.getParam("age"),
                phoneNumber: props.navigation.getParam("phoneNumber"),
                socialStatus: props.navigation.getParam("socialStatus"),
                gender: props.navigation.getParam("gender"),
                interest: props.navigation.getParam("interest"),
                aboutMe: props.navigation.getParam("aboutMe"),
                goal: props.navigation.getParam("goal"),
                editFirstName: '',
                editLastName: '',
                editAge: '',
                editPhoneNumber: '',
                editSocialStatus: '',
                editGender: '',
                editInterest: '',
                editAboutMe: '',
                editGoal: '',
                fullNameError :'',
                phoneNumberError :'',

            }
        } catch (error) {
            console.log(error);
        }
    }

 
        state={
            _this: this.props.navigation.getParam("this"),

        }


    changeData = () =>{

        if (((this.state.editLastName.length == 0) && (this.state.editFirstName.length != 0)) || ((this.state.editLastName.length != 0) && (this.state.editFirstName.length == 0))){
            Alert.alert('', "First Name and Last Name are both required if you want to change your fullName")
        }
        else if (this.state.phoneNumberError.length !=0 && this.state.phoneNumberError.length < 10){
            Alert.alert('',"phoneNumber must contain 10 digits");
        }
        else{
            this.setState({ showEditModal: true });
            firebase.database().ref("/users/" + this.state.userUid)
                .update({
                    fullName: (this.state.editFirstName.length != 0 && this.state.editLastName.length != 0) ? ( this.state.editLastName + ' ' + this.state.editFirstName ) : this.state.fullName,
                    phoneNumber: (this.state.editPhoneNumber.length != 0) ? (this.state.editPhoneNumber) : this.state.phoneNumber,
                    age: (this.state.editAge.length != 0) ? ( this.state.editAge) : this.state.age,
                    socialStatus: (this.state.editSocialStatus.length != 0) ? ( this.state.editSocialStatus) : this.state.socialStatus,
                    gender: (this.state.editGender.length != 0) ? ( this.state.editGender) : this.state.gender,
                    interest: (this.state.editInterest.length != 0) ? ( this.state.editInterest) : this.state.interest,
                    aboutMe: (this.state.editAboutMe.length != 0) ? ( this.state.editAboutMe) : this.state.aboutMe,
                    goal: (this.state.editGoal.length != 0) ? (this.state.editGoal) : this.state.goal,
                    
                }).then(()=>{
                    console.log("user data update ended successfully");
                    this.setState({showEditModal : false});
                   var _this = this.props.navigation.getParam("this");
                    _this.setState({
                    fullName: (this.state.editFirstName.length != 0 && this.state.editLastName.length != 0) ? (this.state.editLastName + ' ' + this.state.editFirstName) : this.state.fullName,
                    phoneNumber: (this.state.editPhoneNumber.length != 0) ? (this.state.editPhoneNumber) : this.state.phoneNumber,
                    age: (this.state.editAge.length != 0) ? (this.state.editAge) : this.state.age,
                    socialStatus: (this.state.editSocialStatus.length != 0) ? (this.state.editSocialStatus) : this.state.socialStatus,
                    gender: (this.state.editGender.length != 0) ? (this.state.editGender) : this.state.gender,
                    interest: (this.state.editInterest.length != 0) ? (this.state.editInterest) : this.state.interest,
                    aboutMe: (this.state.editAboutMe.length != 0) ? (this.state.editAboutMe) : this.state.aboutMe,
                    goal: (this.state.editGoal.length != 0) ? (this.state.editGoal) : this.state.goal,
                    });
                    // this.props.navigation.actions.goBack();
                })
                .catch((e)=>console.log(e));

    
        }
    }



    render() {
        console.log( this.props.navigation.getParam("fullName"),
             this.props.navigation.getParam("age"),
             this.props.navigation.getParam("phoneNumber"),
             this.props.navigation.getParam("socialStatus"),
             this.props.navigation.getParam("gender"),
            this.props.navigation.getParam("interest"),
            this.props.navigation.getParam("aboutMe"),
            this.props.navigation.getParam("goal"),)
        return (


            <LinearGradient colors={['pink', 'gray']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1,zIndex:1 }} >



                <Modal visible={this.state.showEditModal} transparent={true}   >


                        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", flex: 1 }}>


                            <View style={{ marginVertical: '50%', alignSelf: 'center' }} >

                                <ActivityIndicator size="large" color="blue" />
                                <Text style={styles.modalUpdatingText} > Making Changes </Text>

                            </View>

                        </View>



                </Modal>

                <View style={styles.circle} >
                    <TouchableOpacity  onPress={()=>{
                        console.log("save clicked");
                        this.changeData();
                    }}
                    hitSlop={{bottom:80,left:80,top:80,right:80}}

                    >
                        <Text style={styles.circle_text} >Save</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
{/* 
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', backgroundColor: "#9ba1a3" }} >

                        <View style={[styles.card, { borderBottomWidth: 0, alignSelf: 'center' }]} >

                            <Text style={styles.Title} > Change your data</Text>

                        </View>

                    </View> */}
                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >
                            <Icon name="person-circle" size={24} color="black" />
                            <Text style={styles.Title} > First name : </Text>

                        </View>
                        <TextInput placeholder='First name' placeholderTextColor='#05036D'
                            style={styles.input}
                            onChangeText={editFirstName => this.setState({ editFirstName })}
                            value={this.state.editFirstName}
                            maxLength={15}
                            

                        />
                    </View>

                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >
                            <Icon name="person-circle" size={24} color="black" />
                            <Text style={styles.Title} > Last name : </Text>

                        </View>
                        <TextInput placeholder='Last name' placeholderTextColor='#05036D'
                            style={styles.input}
                            onChangeText={editLastName => this.setState({ editLastName })}
                            value={this.state.editLastName}
                            maxLength={15}

                        />
                    </View>

                    <View style={styles.editCard} >

                        <View style={[styles.card, { borderBottomWidth: 0 }]} >
                            <Icon name="heart" size={24} color="black" />

                            <Text style={styles.Title} > Age :</Text>

                        </View>

                        <View style={{ backgroundColor: "white", borderColor: "black", borderWidth: 2 }} >
                            <Picker
                                onValueChange={(editAge) => this.setState({ editAge})}
                                selectedValue={(e) => console.log(e)}
                                mode="dialog"

                            >
                                <Picker.Item label={"Choose a option"} enabled={false} />

                                {age.map((snap) => {
                                    return (<Picker.Item label={snap.label} value={snap.value} key={snap.label} />)
                                })}
                            </Picker>
                        </View>

                    </View>






                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >


                            <Icon name="phone-portrait" size={24} color="black" />
                            <Text style={styles.Title} > Phone Number :</Text>


                        </View>
                        <TextInput placeholder='Phone Number' placeholderTextColor='#05036D'
                            style={styles.input}
                            onChangeText={editPhoneNumber => this.setState({ editPhoneNumber })}
                            value={this.state.editPhoneNumber}
                            maxLength={10}
                            keyboardType='phone-pad'

                        />
                    </View>


                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >

                            <Icon name="globe" size={26} color="black" />
                            <Text style={styles.Title} > Social Status : </Text>

                        </View>

                        <View style={{ backgroundColor: "white", borderColor: "black", borderWidth: 2 }} >
                            <Picker
                                onValueChange={(editSocialStatus) => this.setState({ editSocialStatus })}
                                selectedValue={(e) => console.log(e)}
                                mode="dialog"

                            >
                                <Picker.Item label={"Choose a option"} enabled={false} />
                                <Picker.Item label={"Single"} value={"Single"} key={"Single"} />
                                <Picker.Item label={"Married"} value={"Married"} key={"Married"} />


                            </Picker>
                        </View>



                    </View>




                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >

                            <Icon name="male" size={24} color="black" />
                            <Text style={styles.text} >/</Text>
                            <Icon name="female" size={24} color="black" />

                            <Text style={styles.Title} > Gender : </Text>

                        </View>

                        <View style={{ backgroundColor: "white", borderColor: "black", borderWidth: 2 }} >
                            <Picker
                                onValueChange={(editGender) => this.setState({ editGender })}
                                selectedValue={(e) => console.log(e)}
                                mode="dialog"

                            >
                                <Picker.Item label={"Choose a option"} enabled={false} />
                                <Picker.Item label={"Male"} value={"Male"} key={"Male"} />
                                <Picker.Item label={"Women"} value={"Women"} key={"Women"} />


                            </Picker>
                        </View>



                    </View>





                    <View style={styles.editCard} >
                        <View style={[styles.card, { borderBottomWidth: 0 }]} >

                            <Icon name="search" size={24} color="black" />
                            <Text style={styles.Title} > Interested in  : </Text>

                        </View>

                        <View style={{ backgroundColor: "white", borderColor: "black", borderWidth: 2 }} >
                            <Picker
                                onValueChange={(editInterest) => this.setState({ editInterest })}

                                mode="dialog"

                            >
                                <Picker.Item label={"Choose a option"} enabled={false} />
                                <Picker.Item label={"Girls"} value={"Girls"} key={"Girls"} />
                                <Picker.Item label={"Boys"} value={"Boys"} key={"Boys"} />


                            </Picker>
                        </View>



                    </View>


                    <View style={styles.aboutMe_goal} >


                        <View style={[styles.card, { borderBottomWidth: 0 }]} >

                            <Icon name="heart" size={26} color="black" />
                            <Text><Text style={styles.Title} > About me : </Text> </Text>
                        </View>

                        <TextInput placeholder='Give a short description about yourself' placeholderTextColor='#05036D'
                            style={styles.description}
                            onChangeText={editAboutMe => this.setState({ editAboutMe })}
                            value={this.state.editAboutMe}
                            multiline={true}
                            maxLength={500}
                            numberOfLines={6}
                            textAlignVertical='top'

                        />

                    </View>

                    <View style={styles.aboutMe_goal} >

                        <View style={[styles.card, { borderBottomWidth: 0 }]} >

                            <Icon name="flame" size={26} color="black" />
                            <Text><Text style={styles.Title} > Goal : </Text> </Text>

                        </View>

                        <TextInput placeholder='Give a few lines about your goal here' placeholderTextColor='#05036D'
                            style={styles.description}
                            onChangeText={editGoal => this.setState({ editGoal })}
                            value={this.state.editGoal}
                            multiline={true}
                            maxLength={500}
                            numberOfLines={6}
                            textAlignVertical='top'

                        />

                    </View>
                </ScrollView>
            </LinearGradient>
        )

    }
}






const styles = StyleSheet.create({



    container: {
        flex: 1,
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
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
        lineHeight: 25,

    },
    aboutMe_goal: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',

    },
    changeImage: {
        top: '80%',
        right: '20%',
    },
    upload: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        top: '50%',
        left: '30%',
        position: 'absolute'
    },
    editCard: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#05036D',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        borderWidth: 3,
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft: 15,
        textAlign: 'center',
        alignSelf: 'flex-start',

    },
    pickerList: {
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'white',
    },
    description: {
        borderWidth: 1,
        borderColor: '#05036D',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        borderWidth: 3,
        width: '90%',
        marginLeft: 20,
        paddingLeft: 15,
        alignSelf: 'flex-start',
        textAlignVertical: 'center'
    },
    circle : {
        height:60,
        width:60,
        borderRadius : 60/2,
        backgroundColor: '#5dcfcd',
        alignItems:'center',
        justifyContent : 'center',
        position:'absolute',
        left : '85%',
        elevation : 3,
        zIndex:3,
        top: '50%',
    },
    circle_text : {
        fontSize:20,
        fontWeight : 'bold',
        color : 'white',
    },
    modalUpdatingText : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '5%',
}


})
