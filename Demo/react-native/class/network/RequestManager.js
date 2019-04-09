import  queryString from 'query-string';
import React, { Component } from 'react';
import {
    FetchResult,
} from  'react-native';

import config from '../network/NetworkConfig';

export default class RequestManager extends Component{

  static get(url, params, callback){
      if(params){
        url = config.api.getBase + url + '?' + queryString.stringify(params);
      }
      fetch(url,{
          method:'GET',
      }).then((response) => response.json())
      .then((res) => {
          //根据后台判断是否请求成功
          callback(res,null);
      }).catch(error => {
          console.log(error);
          callback(null,error)
      });
    }

    static post(url,params,callback){
        fetch(config.api.postBase + url,{
            method:'POST',
            header:{
                'Accept':['application/json','text/json','text/plain','text/html'],
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((responseData) => {
            //根据后台判断是否请求成功
            callback(responseData,null);
        }).catch(error => {
            console.log(error);
            callback(null,error);
        });
    }
}
