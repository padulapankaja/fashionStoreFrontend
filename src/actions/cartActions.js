import { GET, GET_CART } from './types'
import axios from 'axios';
import Config from "../controllers/Config";
import User from '../controllers/User'

export const addtocart =  data  => {
    return dispatch =>
      new Promise( (resolve, reject) => {
         axios.post(`${Config.host}${Config.port}/cart/insert` ,
          {
            userid : User.getId(),
            productid : data.product_id ,
            quantity : data.quantity,
            selected_color : data.selected_color ? data.selected_color : '',
            selected_size : data.selected_size

          }).then( result => {
                 console.log( "API" , result.data);
                 dispatch(getCart());
                return  resolve({ type : 'success' , message : "Item Added Successfully"  });               
              }).catch( error => {
                console.log(error);
                reject({ type : 'failed' , message : "failed"});
              })
  
      }).catch(err => {
        throw err;
      });
  
    }

export const getCart = data => {
    return dispatch =>
      new Promise( (resolve, reject) => {
        let userid = User.getId()
         axios.get(`${Config.host}${Config.port}/cart/get/${userid}` 
         ).then( result => {
                 console.log( "API" , result.data);
                 dispatch({type : GET_CART, payload : result.data.data })
                return  resolve({ type : 'success' , message : "get cart Successfully"  });               
              }).catch( error => {
                console.log(error);
                reject({ type : 'failed' , message : "failed"});
              })
  
      }).catch(err => {
        throw err;
      });
  
} 

