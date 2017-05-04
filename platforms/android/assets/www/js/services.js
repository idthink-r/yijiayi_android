angular.module('starter.services', [])
///调用浏览器的本地数据储存
.factory('locals',['$window', function ($window) {
    return {
    	//存储单个属性
      set: function (key,value) {
        $window.localStorage[key] = value;
      },
       //读取单个属性
      get: function (key,defaultValue) {
        return $window.localStorage[key] || defaultValue;
      }
    };
  }]);
