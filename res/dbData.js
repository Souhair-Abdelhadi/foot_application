import AsyncStorage from '@react-native-community/async-storage';
import { useState } from 'react';

function strCmp(a,b){
  
    var A = a.length;
    var B = b.length;
    
      if (A > B){
        for (var i=0;i<B;i++){
          if (a[i] < b[i] ){
            return a+b;
          }
          else if(a[i] > b[i]){
            return b+a;
          }
        }
        if (B==i){
          return "they are equal";
        }
      }
      else {
        for (var i=0;i<A;i++){
          if (a[i] < b[i] ){
            return a+b;
          }
          else if(a[i] > b[i]){
            return b+a;
          }
        }
      }
      return "they are equal";
  
   }
  
        

module.exports = strCmp; 

   

    
