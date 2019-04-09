import React from 'react';
import { Text, View, Image, StyleSheet, Button, AsyncStorage, SafeAreaView, StatusBar } from 'react-native';
import {createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator,  } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import StackViewStyleInterpolator from "react-navigation-stack[表情]c[表情]iews/StackView/StackViewStyleInterpolator";

class News extends React.Component {
    render() {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: 'pink'}]}>
                <StatusBar backgroundColor="red"/>
                <Text>11111111111111111111111111111111111111111111111111111</Text>
                <Text>这是新闻页面</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Detail')}
                    title="去新闻详情"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Setting')}
                    title="去设置"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Modal')}
                    title="打开全屏模态"
                />
                <Button
                    onPress={this.logout}
                    title="退出登录"
                />
            </SafeAreaView>
        );
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('login');
    }
}
class Detail extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="skyblue"/>
                <Text>11111111111111111111111111111111111111111111111111111</Text>
                <Text>这是新闻详情页面</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="返回新闻页面"
                />
            </View>
        );
    }
}
class Setting extends React.Component {
    render() {
        return (
            <View style={[styles.container, {backgroundColor: 'lightgreen'}]}>
                <Text>这是设置页面</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('News')}
                    title="去新闻页面"
                />
            </View>
        );
    }
}
class Modal extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>这是全屏模态</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="关闭模态"/>
            </View>
        );
    }
}
class loading extends React.Component {
    constructor(props){
        super(props)
        this.handleLogin()
    }
    handleLogin = async() => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'ModalStack' : 'login');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>app首屏加载页</Text>
            </View>
        );
    }
}
class login extends React.Component {
    login = async() => {
        await AsyncStorage.setItem('token', 'abc');
        this.props.navigation.navigate('ModalStack');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>这是登录页面</Text>
                <Button onPress={this.login} title="登录"/>
            </View>
        );
    }
}
const TabStack = createMaterialTopTabNavigator(
    {
        News,
        Setting
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true
    }
)
TabStack.navigationOptions = {
    headerStyle: {
        backgroundColor: 'red',
    },
}
Detail.navigationOptions = {
    gesturesEnabled: true,
    headerStyle: {
        backgroundColor: 'skyblue',
    },
}
const HomeStack = createStackNavigator(
    {
        TabStack,
        Detail
    },
    {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        })
    }
)
HomeStack.navigationOptions  = ({navigation}) => {
    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
        drawerLockMode = 'locked-open';
    }
    return {
        drawerLockMode
    };
}
const DrawerStack = createDrawerNavigator(
    {
        HomeStack
    }
)
const ModalStack = createStackNavigator(
    {
        DrawerStack,
        Modal
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)
const RootStack = createSwitchNavigator(
    {
        loading,
        login,
        ModalStack
    }
)
export default createAppContainer(RootStack)

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});