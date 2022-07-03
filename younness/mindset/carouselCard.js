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
import {View,Text,StyleSheet,Animated,ScrollView,Dimensions,Image,
   TouchableOpacity,SafeAreaView} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import Carousel,{Pagination} from 'react-native-snap-carousel'

export default class CarouselCard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            array : this.props.array,
            activeSlide : 0,
            itemWidth : (Dimensions.get('screen').width * 70) / 100,
        }
    }

    renderItem = ({item, index}) =>{
         
        return (
          <TouchableOpacity 
           onPress={()=>console.log("item pressed")}
           key={index}
           style={{height : "100%",backgroundColor : "gray",
             borderRadius : 10,
             justifyContent : "center",alignItems : "center",
           }}
           
           >
             <View style={styles.itemCard} >
                 <Image 
                     source={{uri : item.image}}
                     style={styles.itemImage}
                 />
                 <View style={styles.playIcon} >
                   <Icon 
                     name="play" size={64} color={"black"}
                   />
                 </View>
                 <View style={styles.itemTitle}>
                   <Text style={styles.itemTitleStyle}>{item.title}</Text>
                   <View style={styles.itemBottomBorder}/>
                 </View>
             </View>
           </TouchableOpacity>
       )
   }

   get pagination () {
     const { array, activeSlide } = this.state;
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

    render(){
        return(

            <View style={{height : "95%"}} >
                <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.array}
                      renderItem={this.renderItem}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={this.state.itemWidth}
                      onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                    <View style={{marginTop : "3%"}} >
                        {this.pagination}
                    </View>
            </View>


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
        marginBottom : "0%",
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
        backgroundColor : '#0A0908',
        height : Dimensions.get('screen').height * 0.4,
    },
    VideoView : {
        marginTop : "4%",
        marginBottom : "4%",
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
    wrapper: {
        height : "50%",
        flex : 1
    },
    category : {
        height : "80%",
        width : "100%",
        
    },
    categoryTitle : {
        fontSize : 22,
        fontWeight : "bold",
        color : "white",
        marginTop : "3%",
        marginLeft : "5%",
        marginBottom : "3%",
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
        flex : 1,
        alignItems : "center"
    },
    itemTitle : {
      position : "absolute",
      top : "70%",
      width : "100%",
      justifyContent : "center",
      alignSelf : "center",
      alignItems : "center"
    },
    itemTitleStyle : {
      fontSize : 26,
      fontWeight : "bold",
      color : "white",
      marginBottom : "2%"
    
    },
    itemBottomBorder : {
      width : "90%",
      borderBottomWidth : 2,
      borderBottomColor : "white",
    },
    playIcon : {
      position : "absolute",
      top : "20%",
      width : "100%",
      justifyContent : "center",
      alignSelf : "center",
      alignItems : "center"
    }
    })