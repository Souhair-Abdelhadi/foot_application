/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */


import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,BackHandler,Alert,Dimensions,
  TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'
import OptionsMenu from 'react-native-option-menu';
import * as firebase from 'react-native-firebase'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Spinner from "react-native-spinkit"
import {connect} from "react-redux"
import {changeFullName,changeImageUrl} from "../redux/actions/count"
class App extends React.Component{

  state = {
    options : ['Logout','Close'],
    itemWidth : (Dimensions.get('screen').width * 70) / 100,
    activeSlide : 0,
    showSpinner : true,
    smallCardImages : [
      {
        image : require("../assets/hydration.png"),
        title : "Hydration",
        path : "HYDRATION"
      },
      {
        image : require('../assets/messenger.jpeg'),
        title : "Messenger",
        path : "MESSENGER"
      },
      {
        image : require('../assets/mindset.jpg'),
        title : "Mindset",
        path : "MINDSET"

      },
      {
        image : require('../assets/moonbeach.jpg'),
        title : "Sommeil",
        path: "SOMMEIL"

      },
    ]

  }

  SignOut = () =>{
      firebase.auth().signOut()
      .catch(error => error.message);
      console.log('user has Signed out')
  }

  Cancel = () =>{
      console.log('cancel clicked') ;
  }

  renderItem = ({item, index}) =>{
         
    return (
      <TouchableOpacity 
       onPress={()=>{
         console.log("item pressed")
         this.props.navigation.navigate(item.path)
       }}
       key={index}
       style={{backgroundColor : "gray",
         borderRadius : 10,height : 200,
         justifyContent : "center",alignItems : "center",
       }}
       
       >
         <View style={styles.itemCard} >
             <Image 
                 source={item.image}
                 style={styles.itemImage}
                 height={"30%"}
             />
             
             <View style={styles.itemTitle}>
               <Text style={styles.itemTitleStyle}>{item.title}</Text>
               <View style={styles.itemBottomBorder}/>
             </View>
         </View>
       </TouchableOpacity>
   )
}

  pagination (array,activeSlide) {
    //const { motivation, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={array.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'gray'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }


  
  componentDidMount(){
    console.log("main page")
    this.setState({showSpinner : false})
    firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
      .once('value',(snap)=>{
          if(snap.val().fullName !== null){
              this.props.changeFullName(snap.val().fullName)
          }
          if(snap.val().profileImage !== null){
              this.props.changeImageUrl(snap.val().profileImage)
          }
      })
      .catch(e=>console.log(e))
  }


  componentWillUnmount() {


    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
}
  render(){

    return (

      <SafeAreaView
        style={styles.container}
      >
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.logo}>
                <Image
                  source={require('../assets/logo_1.png')}
                  style={
                    {
                      height: 100,
                      width: 100,
                      tintColor: "white"
                    }
                  }
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: "-18%",
                    marginLeft: "16%"
                  }}
                >Foot App</Text>
              </View>
              <View style={styles.options}>
                <OptionsMenu

                  button={require('../../assets/more.png')}
                  buttonStyle={{ width: 40, height: 40, tintColor: "white" }}
                  destructiveIndex={1}
                  options={this.state.options}
                  actions={[this.SignOut]}

                />
              </View>

            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NUTRITION')
            }}
            style={[styles.largeImage, {
              backgroundColor: "black", marginBottom: "15%"
            }]}
          >
            <Image
              source={require('../assets/nutrition.jpg')}
              style={{
                width: "100%",
                height: "50%",
                flex: 1
              }}
            />
            <View style={{ backgroundColor: "black" }} >
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: "center",
                color: "white"
              }} >NUTRITION</Text>
            </View>
          </TouchableOpacity>

          <View style={{ marginBottom: "30%" }}  >
            <Spinner style={styles.spinner} isVisible={this.state.showSpinner} size={100} type={"Circle"} color={"black"} />

            {this.state.smallCardImages.length != 0 ? (<View style={styles.category} >

              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.smallCardImages}
                renderItem={this.renderItem}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={this.state.itemWidth}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
            </View>) : null}
            {this.pagination(this.state.smallCardImages, this.state.activeSlide)}



            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('RECUPERATION')
              }}
              style={[styles.largeImage, {
                backgroundColor: "black", marginBottom: "10%"
              }]}
            >

              <Image
                source={require('../assets/recuperation.png')}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <View style={{ backgroundColor: "black" }} >
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: "center",
                  color: "white"
                }} >RECUPERATION</Text>
              </View>
            </TouchableOpacity>

          </View>



        </ScrollView>

      </SafeAreaView>
    )


  }



}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor : "white",
    height : Dimensions.get('screen').height+200
  },
  header: {
    backgroundColor : "#00a46c",
    height : 120,
    borderBottomLeftRadius : 40,
    borderBottomRightRadius : 40,
  },
  headerContent : {
    flexDirection : "row",
    alignItems : "center"
  },
  logo : {
    marginLeft : '5%'
  },
  options : {
    position : "absolute",
    left :"80%",
  },
  largeImage : {
    marginTop : "10%",
    marginBottom : "5%",
    width : "90%",
    alignSelf :"center",
    height : 200,
    
  },
  smallImage : {
    marginTop : "4%",
    marginBottom : "5%",
    width : "40%",
    height : 200,
    borderRadius : 20,
    borderWidth : 2,
    borderColor : "gray"
  },
  category : {
    height : "35%",
    width : "100%",
    marginBottom : "5%"
  },
  itemCard : {
    height : "90%",
    width : "90%",
    marginLeft : "3%",
    marginTop : "2%",
    marginRight : "3%",
  },
  itemImage : {
      width : "100%",
      height : "100%",
      alignItems : "center"
  },
  itemTitle : {
    position : "absolute",
    top : "70%",
    width : "100%",
    justifyContent : "center",
    alignSelf : "center",
    alignItems : "center",
    backgroundColor : "black",
    height : "30%"

  },
  itemTitleStyle : {
    fontSize : 26,
    fontWeight : "bold",
    color : "white",
    marginBottom : "2%",

  },
  itemBottomBorder : {
    width : "90%",
    borderBottomWidth : 2,
    borderBottomColor : "white",
  },
  spinner: {
    marginBottom: 10,
    alignSelf : "center",
    justifyContent : "center",
    alignItems : "center",
    marginTop : "30%"
  },
})

const mapStateToProps = (state) => {
  return {
    imageUrl : state.imageUrl,
    fullName : state.fullName
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    changeImageUrl : (url) =>{
      dispatch(changeImageUrl(url))
    },
    changeFullName : (fullName) =>{
      dispatch(changeFullName(fullName))
    },
  }};

  export default connect(mapStateToProps,mapDispatchToProps)(App)