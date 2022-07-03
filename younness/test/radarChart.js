/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  BackHandler
} from 'react-native';
import update from 'immutability-helper';
import {useRoute} from '@react-navigation/native';
import {RadarChart} from 'react-native-charts-wrapper';
import { Alert } from 'react-native';
class RadarChartScreen extends React.Component {

  constructor(props) {
    super(props);
    global.routeName = this.props.navigation.state.routeName
    this.state = {
      data: {},
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        
      },
      routeName  : ""
    };
  }



  componentDidMount() {
    //this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    console.log("route name (radar chart) :",this.props.navigation.state.routeName)
    console.log(global.routeName)
    this.setState({
      routeName : this.props.navigation.state.routeName
    })
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [{value: 100}, {value: 90}, {value: 105}, {value: 115}, {value: 110}, {value: 105}, {value: 115}, {value: 110}],
              label: 'DS 1',
              config: {
                color: processColor('#FF8C9D'),
                drawFilled: false,
                fillColor: processColor('#FF8C9D'),
                fillAlpha: 100,
                lineWidth: 6,
                lineColor : processColor('red'),
                valueTextColor: processColor('#FF8C9D'),
                valueTextSize: 0,
                
              }
            }, {
              values: [{value: 90}, {value: 80}, {value: 100}, {value: 110}, {value: 105}, {value: 110}, {value: 110}, {value: 115}],
              label: 'DS 2',
              config: {
                color: processColor('#C0FF8C'),

                drawFilled: false,
                fillColor: processColor('#C0FF8C'),
                fillAlpha: 100,
                lineWidth: 6,
                valueTextColor: processColor('#C0FF8C'),
                valueTextSize: 0,
              }
            }, {
              values: [{value: 105}, {value: 95}, {value: 100}, {value: 110}, {value: 105}, {value: 100}, {value: 110}, {value: 105}],
              label: 'DS 3',
              config: {
                color: processColor('#8CEAFF'),

                drawFilled: false,
                fillColor: processColor('#8CEAFF'),
                fillAlpha: 100,
                lineWidth: 6,
                valueTextColor: processColor('#8CEAFF'),
                valueTextSize: 0,
              }
            }],
          }
        },
        xAxis: {
          $set: {
            valueFormatter: ['D', 'M', 'N', 'H', 'R',"C","S","EP"],
            textSize: 25,
            textColor: processColor('white'),
            
          }
        }
      })
    );
  }

 

  componentWillUnmount(){
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (

      <View style={{flex: 1}}>

        <View style={styles.container}>
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={{drawLabels:true,textColor :processColor("red"),textSize : 20 }}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            drawWeb={true}
            webLineWidth={5}
            webLineWidthInner={5}
            webAlpha={255}
            webColor={processColor("red")}
            webColorInner={processColor("white")}

            skipWebLineCount={1}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
          
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >D : DISCIPLINE</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >M : MINDEST</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >N : NUTRITION</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >H : HYDRATATION</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >R : RECUPERATION</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >C : CONCENTRATION</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >S : SOMMEIL</Text>
          <Text style={{color:"white",marginLeft : "5%",fontSize :15,fontWeight:"bold"}} >EP : ENTRAINEMENT PERSO</Text>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  chart: {
    flex: 1
  }
});

export default RadarChartScreen;
