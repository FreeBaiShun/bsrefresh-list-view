import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    Image,
} from 'react-native';

export default class TabItem extends Component{
    render() {
        return(
            <Image source={this.props.focused ? this.props.selectImg : this.props.normalImg} style={{width:25, height:25}}/>
        );
    }
}