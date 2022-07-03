import { createStackNavigator } from 'react-navigation-stack';
import UsersList from './home'
import Conversation from './chatRoom'
import { createAppContainer } from 'react-navigation';
import About from '../component/aboutApp'

 const  stack = createStackNavigator({
     Users : {
        screen : UsersList,

     },
     Conversation : {
         screen : Conversation,
     },
     About :{
         screen : About,
     }
 },
 {
    defaultNavigationOptions : {
        headerShown : false,
    },
 }
 
 )


 export default createAppContainer(stack);

