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