import React from 'react'
import { View } from 'react-native'
import ChatRoom from './component/chatRoom'







export default class ChatRoomModal extends React.PureComponent{





        state= {
            showModal : false
        }



        render(){
            return(


                <View style={{flex : 1}} >
                   
                <ChatRoom />

                </View>

            )
        }




}