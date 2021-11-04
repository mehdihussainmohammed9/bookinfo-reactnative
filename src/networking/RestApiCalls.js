import {Api} from './Api';

//=====================GLOBAL FUNCTIONS=========================//

/**
 * API Call - GET Method
 */
export async function apiCallGet(url, onSuccess, onFailure) {
  fetch(url, {
    method: 'get',
    headers: {},
  })
    .then(response => response.json())
    .then(res => {
      console.log('======RESPONSE====== ');
      console.log(url);
      console.log(res);
      onSuccess(res);
    })
    .catch(e => {
      console.log('=====ERROR=====');
      console.log('' + e);
      onFailure(e);
    });
}

/**
 * API Call - POST Method
 * with bodyParams: {"key":"value"}
 */
export async function apiCallPost(url, bodyParams, onSuccess, onFailure) {
  // console.log('======API POST REQUEST======');
  // console.log(url);
  fetch(url, {
    method: 'post',
    headers: {},
    body: bodyParams,
  })
    .then(response => response.json())
    .then(res => {
      // console.log('======RESPONSE======');
      // console.log(url);
      // console.log(JSON.stringify(res));
      onSuccess(res);
    })
    .catch(e => {
      console.log('=====ERROR=====');
      console.log('' + e);
      onFailure(e);
    });
}
