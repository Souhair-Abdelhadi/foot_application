import { createStackNavigator } from 'react-navigation-stack';
import ChangeUserProfile from '../component/changeProfileData';


const screen = {

    Profile: {
        screen: ChangeUserProfile,
        // navigationOptions: ({ navigation }) => {
        //     return {
        //         headerTitle: () => <Header navigation={navigation} />,

        //     };
        // },

    },

};

const ChangeProfileData = createStackNavigator(screen, {
    defaultNavigationOptions: {
        headerShown : false,

        
    },

});





export default ChangeProfileData;