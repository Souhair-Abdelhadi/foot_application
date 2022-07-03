import { createStackNavigator } from 'react-navigation-stack';
import Messages from './Messages'
import { createAppContainer } from 'react-navigation';

 const  stack = createStackNavigator({
     Users : {
        screen : Messages,

     }
 },

 {
    defaultNavigationOptions : {
        headerShown : false,
    },
 }
 
 )


 export default createAppContainer(stack);

