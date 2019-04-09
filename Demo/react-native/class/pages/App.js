import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

import Home from './Home'
import My from './My'
import Case from './Case'
import router from './Router'
import TabItem from './TabItem'


import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';


export default class App extends Component {
    render() {
        return (
            <Root/>
        )
    }
}

const bottomStack = createBottomTabNavigator(
    {
        '首页': Home,
        '我的': My,
    },
    {
        initialRouteName: '首页',
        order: ['首页', '我的'],

        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: 'white',
            }
        },

        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                const name = navigation.state.routeName;
                var activeImg, inactiveImg;
                if (name == '首页') {

                    activeImg = require('../imgs/ic_tab_home_colourful.png');
                    inactiveImg = require('../imgs/ic_tab_home.png');
                } else if (name == '我的') {

                    activeImg = require('../imgs/ic_tab_mine_colourful.png');
                    inactiveImg = require('../imgs/ic_tab_mine.png');
                }
                return (
                    <TabItem
                        focused={focused}
                        normalImg={inactiveImg}
                        selectImg={activeImg}
                    />
                );
            }
        }),
    }
)

bottomStack.navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.index == 0 ? '首页' : '我的'

})

const routeStack = createStackNavigator(
    {
        Tab: {
            screen: bottomStack,
        },
        Case: {
            screen: Case,
        }

    },
    {
        initialRouteName: 'Tab',
        defaultNavigationOptions: ({navigation}) => ({

            headerStyle: {
                backgroundColor: 'white',
            },
            headerLeft: () => {
                var flag = false;
                if (navigation.state.routeName != 'Tab') {
                    flag = true;
                }

                if (flag == true) {
                    return (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../imgs/ic_back.png')} style={{margin: 20, width: 10, height: 16}}/>
                        </TouchableOpacity>
                    )
                }
                return null

            },
        }),
    }
)

const Root = createAppContainer(routeStack);
















