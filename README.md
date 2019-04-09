## 功能
1. 这是一个支持自定义的下拉刷新组件
2. 这是一个支持自定义的上拉加载更多的组件
3. 这是一个基于FlatList，SectionList组件。支持两者的可选配置

## 效果
![image](https://github.com/FreeBaiShun/bsrefresh-list-view/blob/master/react-native-bsrefresh-list-view.gif)       
gitHub地址: https://github.com/FreeBaiShun/bsrefresh-list-view

## npm集成
npm i react-native-bsrefresh-list-view        
npm i

## 用法

```
import React, {Component} from 'react';
import RequestManager from '../network/RequestManager';
import config from '../network/NetworkConfig';
import RefreshListView, { RefreshState } from 'react-native-bsrefresh-list-view'

import {
Platform,
View,
Text,
Image,
Button,
FlatList,
} from 'react-native'

import Case from './Case'
var pageCur = 1;
var arrMList = [];

export default class Home extends Component {
_flatList;


static navigationOptions = ({navigation}) => {
return {
headerStyle:{
backgroundColor: 'red',
},
headerTitle: (
<Text style={{color:'red'}}>
首页
</Text>
)
};
}

state = {
dataFlatList:[],
refreshState: RefreshState.Idle,
}

_renderItem = (item) => {
var dictCur = item.item;
var txt =  dictCur.title + '---' + dictCur.content;
return(
<View style = {{height: 50.0}}>
<Text>
{txt}
</Text>
</View>
)
}
_keyExtractor = (item, index) => {
return index;
}
render() {
return (
<View>
<RefreshListView
//FlatList
componentName = {'FlatList'}
data = {this.state.dataFlatList}
//SectionList
//componentName = {'SectionList'}
//sections = {this.state.dataFlatList}

renderItem = {this._renderItem}
refreshState={this.state.refreshState}
onHeaderRefresh={this.onHeaderRefresh}
onFooterRefresh={this.onFooterRefresh}
keyExtractor={this._keyExtractor}

// 可选
footerRefreshingText='玩命加载中 >.<'
footerFailureText='我擦嘞，居然失败了 =.=!'
footerNoMoreDataText='-我是有底线的-'
footerEmptyDataText='-好像什么东西都没有-'
>

</RefreshListView>
</View>

)
}

componentDidMount() {
this.onHeaderRefresh();
}

//请求数据
fetchData(page,callback){
RequestManager.get(config.api.getText,
{
page:page,
count:50,
},(json,error) => {
if(error){
if(callback){
callback(null,error);
}
}else{
if(page == 1){
pageCur = 1;
arrMList = [];
}
arrMList = arrMList.concat(json.result);
if(callback){
callback(arrMList,null);
}
}
});
}

onHeaderRefresh = () => {
this.setState({ refreshState: RefreshState.HeaderRefreshing });
this.fetchData(1,(arr, error) => {
if(error){
this.setState({ refreshState: RefreshState.Failure });
}else{
this.setState({
dataFlatList: arr,
refreshState: arr.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
})
}
});
}

onFooterRefresh = () => {
pageCur++;
console.log('pageCur = ' + pageCur);
this.setState({ refreshState: RefreshState.FooterRefreshing })
this.fetchData(pageCur,(arr, error) => {
if(error){
this.setState({ refreshState: RefreshState.Failure });
}else{
this.setState({
dataFlatList: arr,
refreshState: (arr.length%50 != 0) ? RefreshState.NoMoreData : RefreshState.Idle,
})
}
});
}
}
```

## 该Demo启动
1. 在react-native路径下执行
```
$ npm i
```
2. 在ios路径下执行

```
pod install
```
3. 运行
用xcode打开BottomTest.xcworkspace工程文件运行即可



