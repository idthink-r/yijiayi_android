// Ionic Starter App
 // "Uncaught ReferenceError: $ionicHistory is not defined", source: file:///android_asset/www/js/app.js (107)

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'],function($httpProvider){
	
  //此方法用于修改$http请求的数据格式，让后台可以按照ajax，传输数据的方式接收
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})


.run(['$ionicPlatform', '$ionicPopup','$rootScope','$location', function ($ionicPlatform, $ionicPopup, $rootScope, $location) {
	   
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    
    
  });
	   
	  
	}])
	   
	  










.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');// other values: top
	 /*用于修改安卓tab居下 （在参数里要加入$ionicConfigProvider）*/
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  /*用于修改安卓tab居下 --结束*/

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
//网站协议
  .state('tab.wzfwxy', {
        url: '/wzfwxy',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-wzfwxy.html',
            controller: 'wzfwxyCtrl'
          }
        }
      })

//tabs
  // setup an abstract state for the tabs directive
    .state('tab', {
	    url: '/tab',
	    templateUrl: 'templates/tabs.html'
  })
//数据加载广告
.state('Ad', {
    url: '/Ad',
    cache: true,
    templateUrl: 'templates/Ad.html',
    controller: 'AdCtrl'
  })
  // Each tab has its own nav history stack:
//个人账户跳转登录
      .state('tab.accountlogin', {
        url: '/accountlogin',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      
 //未登录投资页跳转至登录界面
 .state('tab.investlogin', {
    url: '/investlogin',
    views: {
      'tab-invest': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })

      
//实名认证  
  .state('tab.goRealName', {
      url: '/goRealName',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-goRealName.html',
//        controller: 'goRealNameCtrl'
        }
      }
    })
      
//注册
      .state('tab.reg', {
        url: '/reg',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-reg.html',
            controller: 'RegCtrl'
          }
        }
      })


 // 登录安全保障
  .state('tab.safety', {
    url: '/safety',
    views: {
      'tab-invest': {
        templateUrl: 'templates/tab-safety.html',
        controller: 'SafetyCtrl'
      }
    }
  })  
  
  
//离线未登录投资***********************************************
  .state('tab.invest', {
    url: '/invest',
    views: {
      'tab-invest': {
        templateUrl: 'templates/tab-invest.html',
        controller: 'InvestCtrl'
      }
    }
  })
//登录投资页路由开始
 //登录查看详情
   .state('tab.details', {
      url: '/details',
      cache: false,
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-details.html',
          controller: 'DetailsCtrl'
        }
      }
    })
  .state('tab.trial', {
    url: '/trial',
    views: {
      'tab-invest': {
        templateUrl: 'templates/tab-trial.html',
        controller: 'TrialCtrl'
      }
    }
  })

  //登录...其它
  .state('tab.other', {
      url: '/other',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-other.html',
          controller: 'OtherCtrl'
        }
      }
    })
  //号点开路由
  //登录锦囊
  .state('tab.silkBag', {
      url: '/silkBag',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-silkBag.html',
          controller: 'silkBagCtrl'
        }
      }
    })
  //登录行业动态
  .state('tab.industry', {
      url: '/industry',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-industry.html',
          controller: 'industryCtrl'
        }
      }
    })
  //未登录积分商城
  .state('tab.integral', {
      url: '/integral',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-integral.html',
          controller: 'integralCtrl'
        }
      }
    })
  
  //联系客服
  .state('tab.ContactService', {
      url: '/ContactService',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-ContactService.html',
          controller: 'ContactServiceCtrl'
        }
      }
    })
  //登录土豪学堂
  .state('tab.school', {
      url: '/school',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-school.html',
          controller: 'schoolCtrl'
        }
      }
    })
  //登录加号跳设置
  .state('tab.addset', {
      url: '/addset',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
    //账户跳设置
  .state('tab.accset', {
      url: '/accset',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
  //立即投资
  .state('tab.nowInvest', {
  	
      url: '/nowInvest',
      cache: false,
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-nowInvest.html',
          controller: 'nowInvest'
        }
      }
    })
  .state('tab.INSetPayPass', {
      url: '/INSetPayPass',
      cache: false,
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-SetPayPass.html',
          controller: 'SetPayPassCtrl'
        }
      }
    })
  
  
  //医加学堂子页
   .state('tab.schoolDetail', {
      url: '/schoolDetail',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-schoolDetail.html',
          controller: 'schoolDetailCtrl'
        }
      }
    })
  
//投资页路由结束
//关于我们
 
  
  
  
  
  
  
  

//tab动态
  .state('tab.dynamic', {
      url: '/dynamic',
      views: {
        'tab-dynamic': {
          templateUrl: 'templates/tab-dynamic.html',
          controller: 'DynamicCtrl'
        }
      }
    })
  //tab账户
  //账户主页
  .state('tab.account', {
    url: '/account',
    cache:false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  //我的关注
  .state('tab.myAttention', {
    url: '/myAttention',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-myAttention.html',
        controller: 'myAttentionCtrl'
      }
    }
  })
  
  
  //日志页
  .state('tab.dayRecord', {
      url: '/dayRecord',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-dayRecord.html',
          controller: 'dayRecordCtrl'
        }
      }
    })
   //充值
  .state('tab.goRecharge', {
    url: '/goRecharge',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-goRecharge.html',
        controller: 'rechargeCtrl'
      }
    }
  })

  //提现
  .state('tab.goWithcash', {
    url: '/goWithcash',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-goWithcash.html',
        controller: 'goWithcashCtrl'
      }
    }
  })  
  //VIP购买
  .state('tab.goVIPBuy', {
    url: '/goVIPBuy',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-goVIPBuy.html',
        controller: 'goVIPBuyCtrl'
      }
    }
  })  

 //福利提现
  .state('tab.goBenefitMoney', {
    url: '/goBenefitMoney',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-goBenefitMoney.html',
      }
    }
  })  

  //忘记密码
//设置密码
.state('tab.forgetPass', {
      url: '/forgetPass',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-forgetPass.html',
          controller: 'forgetPassCtrl'
        }
      }
    })
  
  //投资记录
  .state('tab.investRecord', {
      url: '/investRecord',
      
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-investRecord.html',
          controller: 'investRecordCtrl'
        }
      }
    })
  //我的邀请
  .state('tab.recommend', {
      url: '/recommend',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-recommend.html',
          controller: 'recommendCtrl'
        }
      }
    })
  //账户详情
  .state('tab.accountDetails', {
      url: '/accountDetails',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-accountDetails.html',
          controller: 'accountDetailsCtrl'
        }
      }
    })
  //账户详情我的邀请
  .state('tab.MyInvitation', {
      url: '/MyInvitation',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-MyInvitation.html',
          controller: 'MyInvitationCtrl'
        }
      }
    })

//修改登录密码
.state('tab.SetPassword', {
      url: '/SetPassword',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-SetPassword.html',
//        controller:"SetPasswordCtrl"
        }
      }
    })
//设置支付密码
.state('tab.ACCSetPayPass', {
      url: '/ACCSetPayPass',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-SetPayPass.html',
          controller: 'SetPayPassCtrl'
        }
      }
    })
//偿还借款
  .state('tab.goRepayment', {
      url: '/goRepayment',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-goRepayment.html',
          controller: 'goRepaymentCtrl'
        }
      }
    })

//设置账户

.state('tab.SetAddress', {
      url: '/SetAddress',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-SetAddress.html',
          controller: 'SetAddressCtrl'
        }
      }
    })
 
.state('tab.DYdynaDetails', {
      url: '/DYdynaDetails',
      views: {
        'tab-dynamic': {
          templateUrl: 'templates/tab-dynaDetails.html',
          controller: 'dynaDetailCtrl'
        }
      }
}) 
 
.state('tab.INDdynaDetails', {
      url: '/INDdynaDetails',
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-dynaDetails.html',
          controller: 'dynaDetailCtrl'
        }
      }
}) 
/*   .state('aboutus', {
 url: '/aboutus',
  templateUrl: 'templates/aboutus.html',
  controller: 'aboutusCtrl'
}) 
*/
 //添加收货地址
.state('tab.aboutus', {
      url: '/aboutus',
      cache: false,
      views: {
        'tab-invest': {
          templateUrl: 'templates/tab-aboutus.html',
          controller: 'aboutusCtrl'
        }
      }
    })
 .state('tab.aboutus2', {
      url: '/aboutus2',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-aboutus.html',
          controller: 'aboutusCtrl'
        }
      }
    })
 //添加收货地址
.state('tab.addAddress', {
      url: '/addAddress',
      cache: false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-addAddress.html',
          controller: 'addAddressCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/Ad')
})


