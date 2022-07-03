/* eslint-disable no-shadow */
/* eslint-disable keyword-spacing */
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
import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Modal,Alert,BackHandler,
   TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import RNSecureStorage,{ACCESSIBLE} from 'rn-secure-storage';
import Icon from "react-native-vector-icons/Ionicons"
 export default class App extends React.Component{

  constructor(props){
    super(props)

  }
  state = {
    modalVisible : false,
    recordList : [],
    currentAmount : 0,
    percentage : 0
  }
  getTime = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    
    hours = hours < 10 ? "0"+hours : ""+hours;
    minutes = minutes < 10 ? "0"+minutes : ""+minutes;

    return (hours+":"+minutes)
  }

  calculatePercentage = () =>{
    if(this.state.currentAmount < 2000){
      var percentage = Math.round((this.state.currentAmount/2000)*100)
      this.setState({percentage : percentage})
    }else{
      this.setState({percentage : 100})
    }
    console.log("percentage calculated")
  }

  addAmountOfWater = (amount) => {
    
    RNSecureStorage.get('recordDay').then((data)=>{
      if (data === null){
        this.state.recordList.push({
          amount : amount,
          time : this.getTime()
        })
        this.setState({currentAmount : this.state.currentAmount + amount})
        this.calculatePercentage()
        RNSecureStorage.set('drinkRecords',JSON.stringify(this.state.recordList),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
        .then((value)=>{
          console.log(value)
          RNSecureStorage.set('recordDay',JSON.stringify(new Date().getUTCDate()),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
          })
          .catch(e=>console.log(e))
        },
        (err)=>{
          console.log(err)
        }
        )
        .catch(e=>console.log(e))
      }
      else if(data !== null){
        var day = JSON.parse(data)
        if( day != new Date().getUTCDate()){
          this.state.recordList.length =0
          this.state.recordList.push({
            amount : amount,
            time : this.getTime()
          })
          this.setState({currentAmount : this.state.currentAmount + amount})
          this.calculatePercentage()
          RNSecureStorage.set('drinkRecords',JSON.stringify(this.state.recordList),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
            RNSecureStorage.set('recordDay',JSON.stringify(new Date().getUTCDate()),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
          })
          .catch(e=>console.log(e))
          },
          (err)=>{
            console.log(err)
          }
          )
          .catch(e=>{
            this.state.recordList.length=0
            this.setState({recordList : []})
          })
        }
        else {
          this.state.recordList.push({
            amount : amount,
            time : this.getTime()
          })
          this.setState({currentAmount : this.state.currentAmount + amount})
          this.calculatePercentage()
          RNSecureStorage.set('drinkRecords',JSON.stringify(this.state.recordList),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
            RNSecureStorage.set('recordDay',JSON.stringify(new Date().getUTCDate()),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
          })
          .catch(e=>console.log(e))
          },
          (err)=>{
            console.log(err)
          }
          )
          .catch(e=>{
            this.state.recordList.length=0
            this.setState({recordList : []})
          })
          }
      }
    })
    .then(()=>{
      this.setState({recordList : this.state.recordList})
    })
    .catch(e=>{
      this.state.recordList.length=0
      this.state.recordList.push({
        amount : amount,
        time : this.getTime()
      })
      this.setState({currentAmount : this.state.currentAmount + amount})
      this.calculatePercentage()
      RNSecureStorage.set('drinkRecords',JSON.stringify(this.state.recordList),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
      .then((value)=>{
        console.log(value)
        RNSecureStorage.set('recordDay',JSON.stringify(new Date().getUTCDate()),{accessible : ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
          .then((value)=>{
            console.log(value)
            this.setState({recordList : this.state.recordList})
          })
          .catch(e=>console.log(e))
      },
      (err)=>{
        console.log(err)
      }
      )
      .catch(e=>console.log(e))
    })
    /*
    this.state.recordList.push({
      amount : amount,
      time : this.getTime()
    })
    */
    console.log("amount " ,amount,"time : ",this.getTime())
  }
  
  getAmountOfWaterImage = (amount) =>{
    if(amount === 100){
      return require('../assets/100_ml.png')
    }
    else if(amount === 200){
      return require('../assets/200_ml.png')
    }
    else if(amount === 300){
      return require('../assets/300_ml.png')
    }
    else if(amount === 400){
      return require('../assets/400_ml.png')
    }
    else if(amount === 500){
      return require('../assets/500_ml.png')
    }
    
  }

  handleBackButton() {
    console.log("this.constructor.name :",this.constructor.name)   
    if ((this.constructor.name === "BottomBar")){
      Alert.alert("Confirm exit","Do you want to exit App?",[
        {text : "CANCEL",},{text : "OK",onPress : ()=>{
          console.log("this is the home screen")
          return true
        }}
      ])
    }
    else {
      console.log("this screen isn't home")
      return false
    }
  }

  componentDidMount(){
    //this.BackHandler =  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    console.log("route name :",this.props.navigation.state.routeName)
    RNSecureStorage.get('drinkRecords').then((data)=>{
      if(data === null){

      }
      else {
        RNSecureStorage.get('recordDay').then((value)=>{
          var objectValue = JSON.parse(value)
          console.log("day ",objectValue)
          if(objectValue == new Date().getUTCDate()){
            var list = JSON.parse(data)
            list.map((item,index)=>{
              this.setState({recordList : [...this.state.recordList,item],
                currentAmount : this.state.currentAmount + item.amount
              })
              if(this.state.currentAmount < 2000){
                var percentage = Math.round((this.state.currentAmount/2000)*100)
                this.setState({percentage : percentage})
              }else{
                this.setState({percentage : 100})
              }
            })
          }
          else{
            this.state.recordList.length = 0
            this.setState({recordList : this.state.recordList,
              currentAmount : 0
            })
          }
        })
        
      }
    })
    .then(()=>{
      this.setState({recordList : this.state.recordList, percentage : this.state.percentage})

    })
    .catch(e=>{
      this.state.recordList.length=0
      this.setState({recordList : [],currentAmount : 0})
    })

  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton.bind(this))
    //this.BackHandler.remove()
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
}
  render(){

    return(
      <SafeAreaView style={styles.container}>

        <Modal  visible={this.state.modalVisible}  transparent={true}
            onRequestClose={()=>{
              this.setState({modalVisible : false})
            }}
         >
          <View style={styles.modal}>
            <Text style={styles.modalText} >Choose the amount of water that you drunk</Text>
            
            <View style={styles.inlineItems}>

              <View style={styles.modalItem}>
                <TouchableOpacity 
                  
                  onPress={()=>{
                    this.setState({modalVisible : false})
                    this.addAmountOfWater(100)
                  }}
                >
                  <Image 
                    source={require('../assets/100_ml.png')}
                    style={{
                      height : 45,
                      width : 45,
                      marginTop : "35%"
                    }}
                  />
                  <Text style={styles.modalItemText} >100ml</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItem}>
                <TouchableOpacity 
                  
                  onPress={()=>{
                    this.setState({modalVisible : false})
                    this.addAmountOfWater(200)
                  }}
                >
                  <Image 
                    source={require('../assets/200_ml.png')}
                  />
                  <Text style={styles.modalItemText} >200ml</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItem}>
                <TouchableOpacity 
                  
                  onPress={()=>{
                    this.setState({modalVisible : false})
                    this.addAmountOfWater(300)

                  }}
                >
                  <Image 
                    source={require('../assets/300_ml.png')}
                  />
                  <Text style={styles.modalItemText} >300ml</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inlineItems}>

              <View style={styles.modalItem}>
                <TouchableOpacity 
                  
                  onPress={()=>{
                    this.setState({modalVisible : false})
                    this.addAmountOfWater(400)

                  }}
                >
                  <Image 
                    source={require('../assets/400_ml.png')}
                  />
                  <Text style={styles.modalItemText} >400ml</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalItem}>
                <TouchableOpacity 
                  
                  onPress={()=>{
                    this.setState({modalVisible : false})
                    this.addAmountOfWater(500)

                  }}
                >
                  <Image 
                    source={require('../assets/500_ml.png')}
                  />
                  <Text style={styles.modalItemText} >500ml</Text>
                </TouchableOpacity>
              </View>
              
            </View>

          </View>

          
        </Modal>

      <ScrollView>

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>Boire et voir vos records quotidiens</Text>
          </View>
        </View>

        <View style={styles.drinkImage}> 
          <Image  
            source={require('../assets/hydrationLogo.png')}
            style={styles.drinkImageStyle}
          />
        </View>

        <View style={styles.drinkProgress}
        >
          <Text style={styles.drinkProgressText} >{this.state.currentAmount} / <Text style={{color : "black"}}>2000ml</Text></Text>
          <CircularProgress 
            value={this.state.percentage}
            radius={60}
            duration={2000}
            textColor={'blue'}
            maxValue={100}
            activeStrokeColor={'blue'}
            valueSuffix={"%"}
            
              />
              <View style={{marginBottom : "5%"}} />
              <View style={{
                alignSelf : "center"
              }}>
                <TouchableOpacity
                  onPress={()=>{
                    this.setState({modalVisible : true})
                  }}
                >
                  <Icon 
                    name="add-circle" color="#249765" size={64}
                  />
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.record}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordHeaderText}>Record</Text>
            </View>
            <View style={styles.recordContent}>

              {this.state.recordList.length !== 0 ? 
                this.state.recordList.map((data,index)=>{
                return(
                  <View style={styles.recordContentItem} key={index}>
                    <Image 
                      source={this.getAmountOfWaterImage(data.amount)}
                    />
                    <View style={{marginLeft : "5%",marginRight : "5%"}} />
                    <Text style={{fontSize : 18,fontWeight : "bold"}}>{data.amount}ml</Text>
                    <View style={{marginLeft : "5%",marginRight : "5%"}} />
                    <Text style={{fontSize : 18,fontWeight : "bold"}}>{data.time} min</Text>

                  </View>
                )
              })
              : <Text style={{
                fontSize : 18,fontWeight : "bold",color : "black",textAlign : "center",
                marginTop : "5%",marginBottom : "5%"
              }} >There is no record for today</Text>
              }

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )


  }




 }

 const styles = StyleSheet.create({
   container : {
     flex : 1,
     backgroundColor : "#056064",
   },
   header : {
     backgroundColor : "#4A97CD",
     height : 60,
     justifyContent :"center",

   },
   headerContent : {

   },
   headerText : {
     fontSize : 22,
     color : "white",
     fontWeight : "bold",
     textAlign : "center"
   },
   drinkImage : {
     alignSelf : "center",
     marginTop : "10%",
     marginBottom : "5%",
   },
   drinkImageStyle : {
     height : 200,
     width : 200
   },
   drinkProgress : {
     marginTop : "3%",
     marginBottom : "3%",
     backgroundColor : "white",
     alignItems : "center",
     width : "80%",
     alignSelf : "center",
     borderRadius : 15
   },
   drinkProgressText : {
     fontSize : 20,
     fontWeight : "bold",
     color : "blue",
     marginBottom : "3%",
     marginTop : "3%"
   },
   modal : {
     backgroundColor : "rgba(31, 141, 170, 0.7)",
     height : "60%",
     width : "90%",
     alignSelf : "center",
     marginVertical : "40%"
    },
   modalItem : {
     flexDirection : "row",
     marginLeft : "5%",
     marginRight : "5%",
   },
   modalItemText : {
    fontSize : 18,
    color : "white",
    textAlign :"center",
    fontWeight : "bold",
   },
   inlineItems : {
     flexDirection : "row",
     marginTop : "15%"
   },
   modalText : {
    fontSize : 22,
    color : "white",
    textAlign : "center",
   },
   record : {
     marginTop : "5%",
     width : "90%",
     backgroundColor : "white",
     borderRadius : 10,
     borderColor : "gray",
     alignSelf : "center",
     marginBottom : "5%"
   },
   recordHeader : {
     height : 40,
     backgroundColor : "#4A97CD",
     justifyContent : "center"
    },
    recordHeaderText : {
      fontWeight : "bold",
      fontSize : 20,
      color : "white",
      marginLeft : "5%"
    },
    recordContent : {
      justifyContent :"center"
    },
    recordContentItem : {
      flexDirection : "row",
      alignItems : "center",
      justifyContent : "center",
      marginTop : "3%",
      marginBottom : "3%"
    }
 })