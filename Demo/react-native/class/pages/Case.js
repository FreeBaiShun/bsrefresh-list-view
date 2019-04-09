import React, {Component} from 'react';
import RequestManager from '../network/RequestManager';
import config from '../network/NetworkConfig';

import {
    Platform,
    View,
    Text,
    Image,
    Button,
} from 'react-native'

var arrMList = [];

export default class Case extends Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params;
        return {
            headerTitle: (
                <Text>
                    { params.title }
                </Text>
            )
        };
    }
 
   state = {
       display:''
   }
  
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'red'}}>
               <Text>
                {this.state.display}
               </Text>
               <Button title={'返回'} onPress={() => this.props.navigation.pop()}/>
            </View>
        )
    }

    componentDidMount() {
       RequestManager.get(config.api.getText,
       {
        page:1,
        count:20,
       },(json,error) => {
            if(error){
                alert(error);
            }else{
                arrMList = json.result;
                var num = Math.floor(Math.random()*10);
                this.setState({
                    display:arrMList[num].content,
                 });
            }
       });
    }

}






















