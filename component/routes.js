/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {Router,Scene,Stack} from 'react-native-router-flux';

import Login from './login';
import Registration from './register';


export default class Routes extends Component{

    render(){

        return (
            <Router  >
                  <Stack key="root" hideNavBar={true}  hideTabBar={true}  >
                    <Scene key="signin" component={Login} title="signin" hideNavBar={true} hideTabBar={true} />
                    <Scene key="registartion" component={Registration} title="register" hideNavBar={true}  hideTabBar={true}  />
                    
                  </Stack>
            </Router>
              
        );
    }

}



