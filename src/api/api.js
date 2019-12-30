/**
 * @Project Name: vue-admin
 * @Author: w
 * @Date: 2017-11-15 10:09
 * @Idea: WebStorm
 */

export function onGet(axios,selectedData,params) {
  return axios.get('getFormData1')
    .then(result =>{
      if (result.errno === 0) {
        selectedData.data = [];

        let num = parseInt(params==""?result.data.inputText:params);
        num = num>result.data.data.length?result.data.data.length:num;
        selectedData.data = getArrItem(result.data.data,num);
        selectedData.inputText = num;
      } else {
        console.log(result.msg);
      }
    })
}

function getArrItem(temp_array, num) {
  let return_array = new Array();
  for (let i = 0; i < num; i++) {
    if (temp_array.length > 0) {
      let arrIndex = Math.floor(Math.random() * temp_array.length);
      return_array[i] = temp_array[arrIndex];
      temp_array.splice(arrIndex, 1);
    } else {
      break;
    }
  }
  return return_array;
}
