/* eslint-disable eol-last */
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

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { changeCount, changeFullName, changeImageUrl } from '../redux/actions/count';
import { bindActionCreators } from 'redux';

class App extends Component {

    decrementCount() {
        let { count, actions } = this.props;
        count--;
        this.props.changeCount(count);
    
    }
    incrementCount() {
    let { count, actions } = this.props;
    count++;
    this.props.changeCount(count);
    console.log(this.props.changeCount,count)
    }

    changeProfileImage(){
      this.props.changeImageUrl("https://files.oyebesmartest.com/uploads/large/11576594019gg0sm0ekzh6kq5qnhdtlxk68ewzrqfneptqet6ystbikg6tkp4xa82shqhtinppuxccqaftxrpel45hlhamjxzewngw7jglrdphy.jpg")
    }
  render() {
    //const { count } = this.props.count;
    console.log(this.props)
    return (
      <View styles={styles.container}>
        <Button
          title="increment"
          onPress={() => this.incrementCount()}
        />
        <Text>{this.props.count}</Text>
        <Button
          title="decrement"
          onPress={() => this.decrementCount()}
        />
        <View  >
          <Image 
            source={this.props.imageUrl === null ? require('../assets/personIcon.png') : 
            {uri : this.props.imageUrl}
            }  
          style={{
            height : 100,
            width : 100,
            borderRadius : 100/2
          }}
          />
          <Button 
            title="change profile Image"
            onPress={()=>{
              this.changeProfileImage()
            }}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
    return {
      count : state.count,
      imageUrl : state.imageUrl,
      fullName : state.fullName
    }
};
  

  const mapDispatchToProps = (dispatch) => {
    return {
      changeCount : (count) =>{
        dispatch(changeCount(count))
      },
      changeImageUrl : (url) =>{
        dispatch(changeImageUrl(url))
      },
      changeFullName : (fullName) =>{
        dispatch(changeFullName(fullName))
      },
    }};
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)