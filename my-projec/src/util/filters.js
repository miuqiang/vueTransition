/**
 * 全局filter
 */
// import Vue from 'vue'

// Vue.filter('timesfilter',function(mms){
//     var days = parseInt(mss / (1000 * 60 * 60 * 24));
//     var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days*24;
//     var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
//     if(hours === 0){
//         return minutes+ '分钟'
//     }else{
//         return hours + "小时" + minutes + "分钟";
//     }
// })

const timesfilter = function (mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days*24;
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    if(hours === 0){
        return minutes+ '分钟'
    }else{
        return hours + "小时" + minutes + "分钟";
    }
};
export {timesfilter}


