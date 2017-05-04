var urltext = 'http://test.yijiayi360.com';
var domainUrl='https://www.yijiayi360.com';
//var version = "0.9";
var index = 0;
var data = {
	'page': index
};
var timer = "";
var Adindex=0;
var $$ = jQuery.noConflict(); //$$替换jq的$
//投资页100
//动态页312
//账户页38
angular.module('starter.controllers', ['ngCordova','ngSanitize']).run(function ($cordovaAppVersion,$cordovaInAppBrowser,$ionicPlatform,$ionicHistory,$ionicSlideBoxDelegate,$http,$cordovaSplashscreen, $rootScope, $location,$ionicPopup, $timeout, $cordovaToast,$state) {
        $rootScope.t_sign_data='立即签到'
        $rootScope.flagInit=true;
        $rootScope.RecommendIs=true;
		$rootScope.data={
			pwd:'',
			email:''
		}
		document.addEventListener('deviceready', function onDeviceReady(){
			
			$cordovaAppVersion.getVersionNumber().then(function (version) {
		    	$rootScope.version= version;
		    	if($rootScope.version < $rootScope.appVersion) {
					$rootScope.showPopup()
				}
		    });
		})
		
		$rootScope.exitDisplay=true;
		$rootScope.callphone=function(){
			phonedialer.dial("4000351924", function(err) {
	            if (err == "feature")
//	                alert();
					$cordovaToast.showLongBottom("您已取消拨打电话.")
	            if (err == "empty")
//	                alert();
					$cordovaToast.showLongBottom("不能识别的电话号码")
			});
		}
		$rootScope.$on('$stateChangeStart', 
		    function(event, toState, toParams, fromState, fromParams) {
		    	console.log(toState.url+'1111111111111toState.url'+'fromState.url11111111'+fromState.url)
		    	// 解决账户tab的点击 bug
				if(toState.url=='/account'){
					if($rootScope.data.pwd){
						$$('#tabsFixed2').css('display','block')
					}
				}
				if(toState.url=='/forgetPass'){
					$$('input').val("")
//					$ionicSlideBoxDelegate.update(); //刷新页面

				}
				if(toState.url=='/reg'){
					$$('input').val("")

				}
				if(fromState.url=='/account'){
					$$('#tabsFixed2').css('display','none')
				}
				if(toState.url=='/aboutus2' && fromState.url=='/accset'){
					$rootScope.accsetToAbout=true;
				}else if(toState.url=='/aboutus' && fromState.url=='/addset'){
					$rootScope.accsetToAbout=false;
				}
				if(toState.url=='/Ad' && fromState.url=='/invest'){
			       		event.preventDefault() //可以阻止模板解析 
			       		$state.go("tab.invest")
				}
				if(toState.url=='/accountlogin'){
					
					if($rootScope.data.pwd)
					{
						event.preventDefault() //可以阻止模板解析 
						$state.go("tab.account");
					}
				}
				
				if(toState.url=='/account'){
					if(!$rootScope.data.pwd)
					{
						event.preventDefault() //可以阻止模板解析 
						$state.go("tab.accountlogin");
					}
				}
				if(toState.url=='/recommend'){
					$$('#loading').css('display','block')
					 $http.post(urltext+'/index.php?ctl=webapp_recommend',{bid:$rootScope.logindata.id})
						.success(function(res){
							$$('#loading').css('display','none')
							$rootScope.recommendtitle=res.program_title;
							$$('.recommend').css({'background':'url('+urltext+res.url+') no-repeat center','background-size': '100% 100%'});
					   })
				}
				// 应用设置页面  点击账户页   跳转到   设置页的   bug问题
				if(toState.url=='/accset'&& fromState.url!='/account'){
					event.preventDefault() //可以阻止模板解析 
					$state.go("tab.accountlogin")
				}
				if(toState.url=='/addset'){
					if($rootScope.data.pwd==''){
						$rootScope.exitDisplay=false;
					}else{
						$rootScope.exitDisplay=true;
					}
					$rootScope.aboutusDis=true;
					
				}
				if(toState.url=='/accset'){
					if($rootScope.data.pwd==''){
						$rootScope.exitDisplay=false;
					}else{
						$rootScope.exitDisplay=true;
					}
					$rootScope.aboutusDis=false;
				}
				
				if(fromState.url=='/addset'&&toState.url=='/reg'){
					event.preventDefault() //可以阻止模板解析 
					$state.go("tab.addset")
				}
				if(fromState.url=='/accset'&&toState.url=='/reg'){
					event.preventDefault() //可以阻止模板解析 
					$state.go("tab.accset")
				}
				// 点击 投资tab  判断当前是 登录状态还是未登录状态
				if(toState.url=='/invest'){
//					var index= layer.open({
//					    type: 2
//					    ,content: '加载中'
//					  });
				 $rootScope.showPopup = function() {
						   // 一个精心制作的自定义弹窗
						   var myPopup = $ionicPopup.show({
						     template:"此次更新为ssl安全升级，为了您更好的用户体验，请选择下载更新版本！",
						     title: '温馨提示',
						     scope: $rootScope,
						     buttons: [
						       { text: '<a >确定</a>',
						        type: 'button-positive',
						        onTap: function(e) {
					             	 var options = {
									      location: 'yes',
									      clearcache: 'yes',
									      toolbar: 'no'
									    };
									  $cordovaInAppBrowser.open(domainUrl+"/yjy.apk", '_system', options)
									      .then(function(event) {
									        //alert('success')
									      })
									      .catch(function(event) {
									        //alert('error')
									      });
						        }
						       },
						       {
						         text: '<b>取消</b>'
						       }
						     ]
						   });
						}
					$$('#loading').css('display','block')
					if($rootScope.data.pwd){
						  $http.post(urltext + '/index.php?ctl=webapp_index_deal', "")
							.success(function(res) {
//								layer.close(index)
 								$rootScope.errorShow=false
								$$('#loading').css('display','none')
								$rootScope.inshowlist = res; //加载数据中
								$ionicSlideBoxDelegate.update(); //刷新页面
								$cordovaSplashscreen.hide();
							}).error(function(e) {
//								layer.close(index)
								$$('#loading').css('display','none')
								$rootScope.errorShow=true
							})
					}else{
							//未登录
							$http.post(urltext + '/index.php?ctl=webapp_index',"")
							.success(function(res) {
//								layer.close(index)
								$$('#loading').css('display','none')
								 $rootScope.errorShow=false
								$rootScope.outshowlist = res.list; //加载数据中
								$rootScope.advantage = res.advantage; //加载数据中
								$rootScope.appVersion=res.android_version;
							
								
								$ionicSlideBoxDelegate.update(); //加载数据中
								$cordovaSplashscreen.hide();
							})
							.error(function(e) {
//								layer.close(index)
								$$('#loading').css('display','none')
								$rootScope.errorShow=true
							});
					}
					
					
				}

			
		    })


        $ionicPlatform.ready(function ($rootScope) {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        //双击退出
        $ionicPlatform.registerBackButtonAction(function (e) {
            //判断处于哪个页面时双击退出
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
//              $ionicHistory.goBack();

                $cordovaToast.showShortBottom('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            e.preventDefault();
            return false;
        }, 101);
    })
//登录注册
.controller('LoginCtrl', function($rootScope,$scope, $http,$ionicSlideBoxDelegate,$ionicTabsDelegate,$state,$timeout,$location,$cordovaToast) {
		if(localStorage.getItem('email'))
		{
			 $$('#username').val(localStorage.getItem('email'))
		}
		$rootScope.urltext = 'http://test.yijiayi360.com'
		$scope.goReg = function() {
			$state.go("tab.reg")
		}
		$scope.login = function() {
			if($$('#username').val()==''||$$('#password').val()=='')
			{
				$cordovaToast.showLongBottom('请输入有效的密码')
				return '';
			}
			$$('#loading').css('display','block')
			var mydata = { //传输数据
				"email": $$('#username').val(),//用户名
				"pwd": $$('#password').val()    //密码
			}
			console.log(mydata)
			var postdata=mydata.email//登录传输的数据
			$http.post(urltext + '/index.php?ctl=webapp_login', mydata)
				.success(function(response) {
					$$('#loading').css('display','none')
						//定义登录后传送数据 
						var hasmydata = { //传输数据
							"email": data.email,//用户名
							"pwd": data.pwd     //密码
						}
					if(response.user_login_status == 1) {
						$rootScope.data = { //检测账户密码的变化
							email: mydata.email,
							pwd: mydata.pwd
						}
						localStorage.setItem('email',mydata.email);
						$rootScope.inshow=true;
						$rootScope.outshow=false;
						//登录成功
						$rootScope.logindata = { //账户密码一致保存起来
							"user_login_status":response.user_login_status,
							"id":response.id,
							"user_pwd": response.user_pwd,
					    }
						console.log($rootScope.logindata+'登录后保存状态')
						//需要数据
						//请求个人账户页
						$http.post(urltext + '/index.php?ctl=webapp_uc_index',{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd}) 
							.success(function(res) {
								console.log(res);
								$rootScope.ips_acct_no=res.ips_acct_no;//托管账户
								$rootScope.vip_grade=res.vip_grade;//VIP等级
								$rootScope.idcardpassed=res.user.idcardpassed//实名认证
								$$('#loading').css('display','none')
								$rootScope.flag=true
								$rootScope.username=res.user_name;
								$rootScope.login_username=res.user_name;
								$rootScope.pBalance=res.pBalance;//可用余额
								$rootScope.totalent=res.totalent;//账户总额
								$rootScope.total_money_format=res.total_money_format;//现金奖励
								$rootScope.score=res.score;
								if(res.t_sign_data=='0'){
									$rootScope.t_sign_data='立即签到'
								}else{
									$rootScope.t_sign_data='已签到'
								}
								$state.go('tab.account')
						})
							
					}
					if(response.user_login_status == 0){
						$$('#loading').css('display','none')
						$cordovaToast.showShortBottom('登录失败：'+response.show_err+'!');
					}
				}).error(function() {
				})
		}
		$scope.forgetPass=function(){
			$state.go('tab.forgetPass')
//			window.location = "#/tab/SetPayPass"
		}
		
		
	})
.controller('forgetPassCtrl', function($http,$state,$scope,$interval,$timeout,$rootScope,$cordovaToast){
	$scope.description='获取验证码';
	$scope.codeDisable=false;
	var count=60;
	$scope.getCode=function(){
	
		if(!$scope.codeDisable)
		{
			if($$('.usererr.assertive.tel').css('display')=='block')
			{
				return ''
			}
			if($$('#forgetTel').val())
			{
				if($$('#forgetTel').val().length==11&&!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($$('#forgetTel').val())))
				{
					$$('#forgetTel')[0].focus();
//					alert('请输入有效的手机号码！');  
					$cordovaToast.showLongBottom('请输入有效的手机号码')
					return '';
				}
			}
				
				$scope.codeDisable=true;
				$$('#loading').css('display','block')
				$$('div.obtain').css('color','red');
				$scope.description = count-- +'s';
				$http.post(urltext + '/index.php?ctl=webapp_send_reset_pwd_code',{mobile:$$('#forgetTel').val()}) 
					.success(function(res) {
						$$('#loading').css('display','none')
						
						if(res.response_code==0)
						{
//							alert(res.show_err);
							$cordovaToast.showLongBottom(res.show_err)
							$scope.codeDisable=false;
							$$('div.obtain').css('color','#fff');
							$scope.description='获取验证码';
							 $interval.cancel(timerHandler);
							 count=60;
						}else{
//							alert('验证短信已经发送，请注意查收');
							$cordovaToast.showLongBottom('验证码已经发送，请注意查收')
							/*$$('div.gain').css('color','#fff');
							$scope.description='请输入验证码';
							$interval.cancel(timerHandler);
						 	count=5;*/
						}
				})
				var timerHandler=$interval(function() {
					$$('div.obtain').css('color','#ff4800');
					$scope.description = count-- +'s';
					if(count==-1)
					{
						$scope.codeDisable=false;
						$$('div.obtain').css('color','#fff');
						$scope.description='获取验证码';
						$interval.cancel(timerHandler)
						 count=60;
					}
				 }, 1000)
		}
	
	}
	$scope.goSumbit=function(){
		
		//	referer  推荐人
		if($$('#forgetTel').val())
		{
			if($$('#forgetTel').val().length==11&&!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($$('#forgetTel').val())))
			{
				$$('#forgetTel')[0].focus();
//				alert('请输入有效的手机号码！');  
				$cordovaToast.showLongBottom('请输入有效的手机号码')
				return '';
			}
		}else{
			return '';
		}
		if($$('#forgetPass').val()&&$$('#forgetPass2').val()&&$$('#forgetTel').val()&&$$('#forgetCode').val())
		{
			$$('#loading').css('display','block')
			var regData={
				user_pwd:$$('#forgetPass').val(),
				user_pwd_confirm:$$('#forgetPass2').val(),
				mobile:$$('#forgetTel').val(),
				mobile_code:$$('#forgetCode').val()
			}
			$http.post(urltext + '/index.php?ctl=webapp_save_reset_pwd',regData) 
				.success(function(res) {
					$$('#loading').css('display','none')
					if(res.response_code==0)
					{
//						alert()
						$cordovaToast.showLongBottom(res.show_err)
					}else if(res.response_code==1)
					{
//						alert('重置密码成功')
//						 $state.go('tab.accountlogin')
						  $cordovaToast.showLongBottom('重置密码成功，正在跳转登录界面').then(function(success) {
						    $state.go('tab.accountlogin')
						  }, function (error) {
						    // error
						  });
					}
					
			})
		}
		
	
	}
})
.controller('RegCtrl', function($http,$state,$scope,$interval,$timeout,$rootScope,$cordovaToast) {

	$scope.wzfuxygo=function(){
		$state.go("tab.wzfwxy")
	}
	$scope.description='获取验证码';
	$scope.codeDisable=false
	var count=60;
//	$scope.legitimate=false;
	$scope.getCode=function(){
		if(!$scope.codeDisable)
		{
			if($$('#reg_tel').val()&&!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($$('#reg_tel').val())))
			{
				$$('#reg_tel')[0].focus();
//				alert();  
				$cordovaToast.showLongBottom('请输入有效的手机号码！')
				return '';
			}
			
			$scope.codeDisable=true;
			$$('#loading').css('display','block')
			$$('div.gain').css('color','#ff4800');
			$scope.description = count-- +'s';
			$http.post(urltext + '/index.php?ctl=webapp_getcode',{mobile:$$('#reg_tel').val()}) 
				.success(function(res) {
					$$('#loading').css('display','none')
					if(res.response_code==0)
					{
//						alert();
						$cordovaToast.showLongBottom(res.show_err)
						$$('div.gain').css('color','#fff');
						$scope.description='获取验证码';
						$interval.cancel(timerHandler);
					 	count=60;
					 	$scope.codeDisable=false;
					}else{
//						alert();
						$cordovaToast.showLongBottom('验证短信已经发送，请注意查收')
						/*$$('div.gain').css('color','#fff');
						$scope.description='请输入验证码';
						$interval.cancel(timerHandler);
					 	count=5;*/
					}
			})
			var timerHandler=$interval(function() {
				$$('div.gain').css('color','#ff4800');
				$scope.description = count-- +'s';
				if(count==-1)
				{
					$scope.codeDisable=false
					$$('div.gain').css('color','#fff');
					$scope.description='获取验证码';
					$interval.cancel(timerHandler);
					count=60;
				}
			 }, 1000)
		}

	}
	$scope.goRegister=function(){
		if($$('#reg_name').val()&&$$('#reg_pass').val()&&$$('#reg_pass2').val()&&$$('#reg_tel').val()&&$$('#reg_code').val())
		{
				var refer=''
				
				if($rootScope.RecommendIs){
				    refer=$$('#reg_refer').val();
				    if(refer&&!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(refer)))
					{
						$$('#reg_tel')[0].focus();
//						alert();  
						$cordovaToast.showLongBottom('请输入有效的手机号码！')
						return '';
					}
				}else{
					refer=$rootScope.RecommendCode
				}
				//	referer  推荐人
				$$('#loading').css('display','block')
				var regData={
					user_name:$$('#reg_name').val(),
					user_pwd:$$('#reg_pass').val(),
					user_pwd_confirm:$$('#reg_pass2').val(),
					mobile:$$('#reg_tel').val(),
					mobile_code:$$('#reg_code').val(),
					referer:refer
				}
				$http.post(urltext + '/index.php?ctl=webapp_register',regData) 
					.success(function(res) {
						$$('#loading').css('display','none')
						if(res.user_login_status==0)
						{
//							alert()
							$cordovaToast.showLongBottom(res.show_err)
						}else if(res.user_login_status==1)
						{
							
//							 $state.go('tab.accountlogin')
							  $cordovaToast.showLongBottom('注册用户成功，正在跳转登录界面').then(function(success) {
							   	$state.go('tab.accountlogin')
							  }, function (error) {
							    // error
							  });
						}
						
				})
		}

	}
             

})
//未登录

.controller('AdCtrl', function($scope, $rootScope, $http, $ionicSlideBoxDelegate, $timeout, $interval,$cordovaSplashscreen) {
	$rootScope.flagAd = false;
	$scope.stateUrl = 'tab.invest'
	var countdowns = 1;
	$scope.countdown = countdowns;
    window.location.href = "#/tab/invest"; //跳到投资页面
	var query = new Object();

})

//tab投资


.controller('InvestCtrl', function($scope,$sce, $rootScope, $ionicHistory, $location, $http, $ionicSlideBoxDelegate,$ionicTabsDelegate, $state, $timeout) {




//  登录首页数据请求
$rootScope.errorShow=false
$rootScope.data = { //全局变量
		email: "",
		pwd: ""
	}
console.log($rootScope.data.pwd)
	$rootScope.outshow=true;
	$rootScope.inshow=false;
	
	$rootScope.backLogin=function(){
		$state.go('tab.accountlogin')
	}
	$rootScope.backIndex=function(){
		$state.go('tab.invest')
	}
//全局返回按钮
	$rootScope.backTab = function() {
		$ionicHistory.goBack();
	};
	$rootScope.backTabSettings = function() {
		$state.go('tab.accset')
	};
	
//加号下的DIV默认不显示
	$rootScope.showC = false;
//点击加号切换显示隐藏
	$rootScope.showOhide = function() {
		$rootScope.showC = !$rootScope.showC;
	}
//点击页面其它部分隐藏加号下的内容
	$rootScope.hideAdd = function() {
		$rootScope.showC = false
	}
	
	
	var inlineUrl=$location.absUrl();
	console.log(inlineUrl)
//**************以上和未登录切换***********
//查看标的详情
var DetailData={
	"email":"aab",
    "pwd":"MTIzNDU2YQ==",
    "id":20598}

$scope.goDetails=function(email,pwd,id){
	$state.go('tab.details')
	$rootScope.detailIdID=id;
	var DetailData={
	"email":email,
    "pwd":pwd,
    "id":id}
	$$('#loading').css('display','block')
	$http.post(urltext +"/index.php?ctl=webapp_deal_details",DetailData)
	.success(function(res){
		
		$$('#loading').css('display','none')
		console.log(res)
		$rootScope.detailId=res.id;
		$rootScope.deis_faved=res.is_faved
		console.log($rootScope.deis_faved)
		if($rootScope.deis_faved==0){
			$$("#heart").css("background-image","url('img/heart.png')")
			$rootScope.concern="未关注"
		}else if($rootScope.deis_faved>0){
			$$("#heart").css("background-image","url('img/follownow.png')")
			$rootScope.concern="关注"
		}
		$rootScope.derate_foramt=res.rate_foramt
		$rootScope.dedeal_sn=res.deal_sn
		$rootScope.dename=res.name
		$rootScope.derepay_time=res.repay_time
		$rootScope.derepay_time_type=res.repay_time_type//年月
		if($rootScope.derepay_time_type==0){
			$rootScope.Dayrepay_time="天"
		}else{
			$rootScope.Dayrepay_time="个月"
		}
		$rootScope.dedeal_status=res.deal_status//判断投资状态
		console.log($rootScope.dedeal_status)
		$rootScope.deremain_time=res.remain_time
		console.log($rootScope.deremain_time)
		
		
		
		$rootScope.demin_loan_money_format=res.min_loan_money_format
//		$rootScope.dedescription=res.description
		//项目描述
		if(res.description==''){
//			 $scope.myHTML = $sce.trustAsHtml(...)
			$rootScope.dedescription= $sce.trustAsHtml('<span style=" color: #ffa03b;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的项目描述信息</span>')

		}else{
//			angular.element('#DEdescription').html($rootScope.dedescription)
			$rootScope.dedescription=res.description
		}
		
		//企业信息
//		$rootScope.derisk_certifications=res.risk_certifications
		if(res.risk_certifications=='')
		{
			$rootScope.derisk_certifications= $sce.trustAsHtml('<span style="color: #ffa03b;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的企业信息</span>');
		}else{
//			angular.element('#DErisk_certifications').html($rootScope.derisk_certifications)
			$rootScope.derisk_certifications=res.risk_certifications
		}
		
		//风控保障risk_certifications 企业信息
		

//		$rootScope.derisk_security=res.risk_security
		if(res.risk_security=='')
		{
			$rootScope.derisk_security=$sce.trustAsHtml('<span style="color: #ffa03b;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的风险保障信息</span>')
//			angular.element('#DErisk_security').html('<span id="desPageNull">当前没有可查看的企业信息</span>')
		}else{
//			angular.element('#DErisk_security').html($rootScope.derisk_security)
			$rootScope.derisk_security=res.risk_security
		}
//		angular.element('#DErisk_security').html($rootScope.derisk_security)
		
		
	})
}



//在线客服
	$http.post(urltext + "/index.php?ctl=webapp_service","")
		.success(function(res){
			console.log(res)
			var str = res; 
            var hrefUrl = str.slice(1,res.length-1).replace(/\\/g,"");
            console.log(hrefUrl)
		    $scope.hrefUrl=hrefUrl
	    })
//动态跳转
		
//安全保证
    $scope.goSafety = function() {
			window.location.href = "#/tab/safety";
			$rootScope.showC = false;
		}
//跳转登录页******************判断
$scope.goLogin = function() {
			if($rootScope.data.email==""&&$rootScope.data.pwd==""){
				//window.location.href = "#/tab/investlogin";
				$state.go("tab.investlogin")
				$ionicTabsDelegate.select(2);
			    $rootScope.showC = false;
			}else{
				window.location.href = "#/tab/trial";
			    $rootScope.showC = false;
			}
		}

//锦囊
	$scope.goSilkBag = function() {
			$rootScope.showC = false;
			window.location.href = "#/tab/silkBag";
		}
//签到
	$scope.goSigninMine = function() {
			window.location.href = "#/tab/account";
			$rootScope.showC = false;
		}
//行业动态
	$scope.goIndustry = function() {
			window.location.href = "#/tab/industry";
			$rootScope.showC = false;
		}
//积分商城
	$scope.goIntegral = function() {
			window.location.href = "#/tab/integral";
			$rootScope.showC = false;
		}
//土豪学堂
	$scope.goSchool = function() {
			window.location.href = "#/tab/school";
			$rootScope.showC = false;
		}
//联系客服
	$scope.goOnService = function() {
		window.location.href = "#/tab/ContactService";
		$rootScope.showC = false;
	}
//应用设置
	$scope.goSetting = function() {
		window.location.href= "#/tab/addset";
		$rootScope.showC = false;
	}
})




.controller('TrialCtrl', function($scope, $ionicHistory, $rootScope) {
   $scope.HBJJ=0;
    $scope.YEB=0;
    $scope.YJY=0;
    $scope.YHDQ=0;
    $scope.YHHQ=0;
   $scope.money=10000;//默认的10000
   $scope.nowtrial=function(){
   	var XZDY=  angular.element("#selects option:selected").val()//几个月//选择的月
   	XZDY=parseInt(XZDY)
   	$scope.YHHQ=$scope.money*0.0035/12*XZDY;//银行活期
   		//银行定期
   	switch(XZDY){
   		case 1:
   		$scope.YHDQ=$scope.money*0.0035/12*XZDY
   		break;
   		case 3:
   		$scope.YHDQ=$scope.money*0.011/12*XZDY;
   		break;
   		case 6:
   		$scope.YHDQ=$scope.money*0.013/12*XZDY;
   		break;
   		case 12:
   		$scope.YHDQ=$scope.money*0.015/12*XZDY;
   		break;
   	}
   //货币基金
   	$scope.HBJJ=$scope.money/10000*1.10000*XZDY*30;
   //余额宝
   $scope.YEB=$scope.money*0.036/12*XZDY;
   // 医加医
	$scope.YJY=$scope.money*0.1/12*XZDY;
   
   }
    $scope.nowtrial()
})



//未登录安全保障
.controller('SafetyCtrl', function($scope) {})
//加号点开的controller
//锦囊
.controller('silkBagCtrl', function($scope) {})
//签到有礼
.controller('signinMineCtrl', function($scope) {})
//行业动态
.controller('industryCtrl', function($scope,$http,$rootScope,$state,$sce) {
	$$('#loading').css('display','block')
	var index=1;
	var data={'page':index};
	$http.post(urltext + "/index.php?ctl=webapp_viewpoint",data)
	.success(function(res){
		$$('#loading').css('display','none')
		console.log(res)
		$scope.industryList=res.list
		$scope.program_title=res.program_title
	})	  
		  $scope.doRefresh = function() {
		  		 $$('#loading').css('display','block')
		  		 $scope.industryList = [];
		  		 $scope.currentPage=1;
				 $scope.noMorePage=false;
				 $http.post(urltext + "/index.php?ctl=webapp_viewpoint",data)
			     .success(function(res) {
			     	$$('#loading').css('display','none')
			      	$scope.industryList = res.list;
			     })
			     .finally(function() {
			       $scope.$broadcast('scroll.refreshComplete');
			     });
		  };
	
			$scope.currentPage=1;//定义下拉加载分页的初始值
			$scope.noMorePage=false;
			$scope.loadMore=function(){
			    $scope.currentPage += 1;//每当滚动到底部，页码累计加1
			    $$('#loading').css('display','block')
			    $http.post(urltext + "/index.php?ctl=webapp_viewpoint",{page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$$('#loading').css('display','none')  
			        	if(newItems.list.length>0)
			        	{
			        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
				                $scope.industryList.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
				           }  
			        	} 
			        	if (newItems.list.length < newItems.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
			                $scope.noMorePage=true;//禁止滚动触发时间
			            } 
			            $scope.$broadcast('scroll.infiniteScrollComplete');     
			        })
			};
				
	
	$scope.goIndustry=function(id){
		$$('#loading').css('display','block')
//		angular.element('#dynaContent').html("")
			$scope.MyDetailData={'id':id}
			$http.post(urltext + "/index.php?ctl=webapp_article",$scope.MyDetailData)
			.success(function(res){
				$$('#loading').css('display','none')
				console.log(res)
				$rootScope.dynaDtitle=res.title
				$rootScope.dynaProgram=res.program_title
				var dynamain=res.content
//				$rootScope.dynaContent=res.content.replace('<img  src="','<img style="width:100%;" src="'+urltext)//查找替换
				$rootScope.dynaContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img style="width:100%;" src="'+urltext))//查找替换
			    console.log($scope.dynaContent)
//			    angular.element('#dynaContent').html($rootScope.dynaContent)
			})
				$state.go("tab.INDdynaDetails")
		}
})
//积分商城
.controller('integralCtrl', function($scope) {})
//土豪学堂
.controller('schoolCtrl', function($scope,$http,$rootScope,$sce,$state) {
	var data={'page':1};
	
	$$('#loading').css('display','block')
	$http.post(urltext + "/index.php?ctl=webapp_help",data)	
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.program_title=res.program_title
			$scope.schoolList=res.list
		})
	
  	$scope.doRefresh = function() {
  		 $$('#loading').css('display','block')
  		 $scope.schoolList = [];
  		 $scope.currentPage=1;
		 $scope.noMorePage=false;
		 $http.post(urltext + "/index.php?ctl=webapp_viewpoint",data)
	     .success(function(res) {
	     	$$('#loading').css('display','none')
	      	$scope.schoolList = res.list;
	     })
	     .finally(function() {
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};

	$scope.currentPage=1;//定义下拉加载分页的初始值
	$scope.noMorePage=false;
	$scope.loadMore=function(){
	    $scope.currentPage += 1;//每当滚动到底部，页码累计加1
	    $$('#loading').css('display','block')
	    $http.post(urltext + "/index.php?ctl=webapp_viewpoint",{page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
	        .success(function(newItems) {
	        	$$('#loading').css('display','none')  
	        	if(newItems.list.length>0)
	        	{
	        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
		                $scope.schoolList.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
		           }  
	        	} 
	        	if (newItems.list.length < newItems.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
	                $scope.noMorePage=true;//禁止滚动触发时间
	            } 
	            $scope.$broadcast('scroll.infiniteScrollComplete');     
	        })
	};

	
	$scope.industryschDetails=function(id){
		$$('#loading').css('display','block')

			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':id})
			.success(function(res){
				$$('#loading').css('display','none')
				console.log(res)
				$rootScope.schooldydynaDtitle=res.title
				$rootScope.schooldydynaProgram=res.program_title
//				var dynamain=res.content
//				$rootScope.dynaContent=res.content.replace('<img  src="','<img style="width:100%;" src="'+urltext)//查找替换
				$rootScope.schooldydynaContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img style="width:100%;" src="'+urltext))//查找替换

//			    angular.element('#dynaContent').html($rootScope.dynaContent)
			})
			$state.go("tab.schoolDetail")
	}
})
//应用设置
.controller('settingsCtrl', function($http,$cordovaToast,$sce,$scope,$rootScope,$state,$cordovaDevice,$cordovaAppVersion,$cordovaInAppBrowser,$cordovaBarcodeScanner) {
	
	$scope.SignOut=function(){
		$rootScope.data.pwd='';
		$rootScope.data.email="";
		$rootScope.inshow=false;
		$rootScope.outshow=true;
		$$('#password').val('')
		$state.go("tab.invest")
	}
	$scope.aboutUs=function(){
			$state.go("tab.aboutus")
			$$('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':66})
			.success(function(res){
				$$('#loading').css('display','none')
				console.log(res)
//				$rootScope.aboutustitle=res.title
				$rootScope.aboutusProgram=res.title
				$rootScope.aboutusContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img style="width:100%;" src="'+urltext))//查找替换

			})
	}
	$scope.aboutUs2=function(){
			$state.go("tab.aboutus2")
			$$('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':66})
			.success(function(res){
				$$('#loading').css('display','none')
				console.log(res)
//				$rootScope.aboutustitle=res.title
				$rootScope.aboutusProgram=res.title
				$rootScope.aboutusContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img style="width:100%;" src="'+urltext))//查找替换

			})
	}

	
	$scope.clearCache=function(){
			document.addEventListener('deviceready', function onDeviceReady()
			{
			        var success = function(status) {
//			            alert();
						$cordovaToast.showLongBottom('清除缓存成功')
			        }
			
			        var error = function(status) {
//			            alert();
						$cordovaToast.showLongBottom('清除缓存失败' )
			        }
			
			        window.cache.clear( success, error );
			});
			
	}
	$scope.goUpdataApp=function(){
		if($rootScope.version<$rootScope.appVersion){
			$cordovaToast.showLongBottom('当前已是最新版本');
		}else{
			var str=''
			if($cordovaDevice.getPlatform()=='Android'){	
//				str=domainUrl+'/yjy.apk'
					$rootScope.showPopup()
			}else{
				// ios 链接地址
				str='itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1181777000'
				 var options = {
				      location: 'yes',
				      clearcache: 'yes',
				      toolbar: 'no'
				    };
				  $cordovaInAppBrowser.open(str, '_system', options)
				      .then(function(event) {
				        //alert('success')
				      })
				      .catch(function(event) {
				        //alert('error')
				      });
			}
		   
		}
	}
	$scope.encourage=function(){
		var str=''
		if($cordovaDevice.getPlatform()=='Android'){
			str='market://details?id=com.ionicframework.myapp7691776'
		}else{
			// ios 链接地址
		}
	    var options = {
	      location: 'yes',
	      clearcache: 'yes',
	      toolbar: 'no'
	    };
	    $cordovaInAppBrowser.open(str, '_system', options)
	      .then(function(event) {
	        //alert('success')
	      })
	      .catch(function(event) {
	        //alert('error')
	      });
	}
	$scope.goScan=function(){
		    document.addEventListener("deviceready", function () {
		    $cordovaBarcodeScanner
		      .scan()
		      .then(function(barcodeData) {
		      	if(!barcodeData.text||!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(barcodeData.text))){
		       		$rootScope.RecommendCode=barcodeData.text;
		       		$rootScope.RecommendIs=false;
		       		$state.go("tab.reg")
		       	}

		      }, function(error) {
		        // An error occurred
		        alert('An error occurred')
		      });
		  }, false);
	}
})

//tab动态
.controller('DynamicCtrl', function($scope, $http, $timeout,$sce, $ionicLoading, $state,$rootScope,$ionicSlideBoxDelegate) {
	$scope.lists = [];
	    $scope.hasmore = true;
	    var loadIndex=0;
	    loadajax();
		$scope.loadMore = function () { 
	      $scope.dataValue++; 
	      loadajax(); 
	    }
		function loadajax() {
		loadIndex++;
		var loaddata = {
				'page': loadIndex
			}
	      $http.post(urltext + "/index.php?ctl=webapp_dynamic", loaddata)
	      .success(function (res) {
	      	console.log(res.list)
	        if (res.list.length == 0) { 
	          $scope.hasmore = false;
			  $ionicLoading.show({ 
				template: '最后一条数据'
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 500)//这里判断是否还能获取到数据，如果没有获取数据，则不再触发加载事件
//	          return; 
	        }
	        $scope.dymoneys=res.virtual_money
	        
	        $scope.lists = $scope.lists.concat(res.list); 
	        $rootScope.errorShow=false
	      })
	      .error(function () {
	        console.log("err"); 
	      })
	      .finally(function () {
	        $scope.$broadcast('scroll.infiniteScrollComplete');//这里是告诉ionic更新数据完成，可以再次触发更新事件 
	      }); 
        }
			//下拉刷新
		$scope.do_refresher = function() {
				index = 1;
				data = {
					"data": index
				}
				$http.post(urltext + "/index.php?ctl=webapp_dynamic", data)
					.success(function(res) {
						console.log(res)
						$scope.lists = res.list
						$scope.$broadcast("scroll.refreshComplete"); //请求到数据刷新页面。
					})
				$scope.moredata = false
		}
		
		//点击动态内容查看详情
		$scope.goDynaDetail=function(id){
			$$('#loading').css('display','block')
//			angular.element('#dynaContent').html("")
			$scope.MyDetailData={'id':id}
			$http.post(urltext + "/index.php?ctl=webapp_article",$scope.MyDetailData)
			.success(function(res){
				$$('#loading').css('display','none')
				console.log(res)
				$rootScope.dynaDtitle=res.title
				$rootScope.dynaProgram=res.program_title
//				var dynamain=res.content
//				$rootScope.dynaContent=res.content.replace('<img src="','<img style="width:100%;" src="'+urltext)//查找替换
				
				$rootScope.dynaContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img  style="width:100%;" src="'+urltext))//查找替换
			    console.log($scope.dynaContent)
			   	
//			    angular.element('#dynaContent').html($rootScope.dynaContent)
			})
				$state.go("tab.DYdynaDetails")
		}
	})
//动态子页面i
.controller("dynaDetailCtrl",function($scope, $http, $timeout, $ionicLoading, $state,$rootScope,$ionicSlideBoxDelegate){
	
	
})


//tab账户
.controller('AccountCtrl', function($scope, $rootScope, $http, $state,$ionicModal) {
	$scope.myGrade=function(){
		switch($rootScope.vip_grade){
			case "普通VIP会员":
			$rootScope.nowVIP="普通VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_ptvip.png')");
			break;
			case "您还不是VIP会员":
			$rootScope.nowVIP="您还不是VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_ptvip.png')");
			
			break;
			case "白银VIP会员":
			$rootScope.nowVIP="白银VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_byvip.png')");
			break;
			case "黄金VIP会员":
			$rootScope.nowVIP="黄金VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_hjvip.png')");
			break;
			case "铂金VIP会员":
			$rootScope.nowVIP="铂金VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_bjvip.png')");
			break;
			case "钻石VIP会员":
			$rootScope.nowVIP="钻石VIP会员";
			angular.element("#vipimg").css("background-image","url('img/uc_zsvip.png')");
			console.log(angular.element("#vipimg"))
			break;
		}
	};
	$scope.myGrade();
	
	$scope.do_refresher=function(){
		console.log("00")
			$http.post(urltext + '/index.php?ctl=webapp_uc_index',{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd}) 
							.success(function(res) {
								console.log(res);
								$rootScope.ips_acct_no=res.ips_acct_no;//托管账户
								$rootScope.vip_grade=res.vip_grade;//VIP等级
								$rootScope.idcardpassed=res.user.idcardpassed//实名认证
								$$('#loading').css('display','none')
								$rootScope.flag=true
								$rootScope.username=res.user_name;
//								$rootScope.login_username=res.user_name;
								$rootScope.login_username=$$('#username').val();
								$rootScope.pBalance=res.pBalance;
								$rootScope.totalent=res.totalent;
								$rootScope.investment=res.investment;
								$rootScope.score=res.score;
						}).finally(function() {
							$scope.myGrade();
       // 停止广播ion-refresher
       $scope.$broadcast('scroll.refreshComplete');
     });
	}
//模态框
$ionicModal.fromTemplateUrl('templates/modal.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
	
	
$ionicModal.fromTemplateUrl('templates/czmodal.html', {
	scope: $scope
}).then(function(modal) {
	$scope.czmodal = modal;
});
	//  签到
	var myAttendata = { //传输数据
						"email": $rootScope.data.email,//用户名$rootScope.data.email
						"pwd": $rootScope.logindata.user_pwd
				}
		$scope.username=$rootScope.data.email;
		if($rootScope.t_sign_data=='已签到'){
			$$('.btnmy .btn2').css('color','#ffa03b')
		}else{
			$$('.btnmy .btn2').css('color','#fff')
		}
		$scope.goSign=function(){
				if($rootScope.t_sign_data != '已签到')
				{
					$http.post(urltext + "/index.php?ctl=webapp_sign",{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd})
					.success(function(res){
						if(res.status==1)
						{
							$rootScope.t_sign_data='已签到'
							$$('.btnmy .btn2').css('color','#ffa03b')
						}
						
				    })
				}
			}



//模态框
$ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
//解决跳回


		
//设置跳转
		$scope.goSetting = function() {
			window.location = "#/tab/accset";
		}
//日志跳转
		$scope.goDayRecord = function() {
			window.location.href = "#/tab/dayRecord";
		}
		$scope.goInvest = function() {
			window.location.href = "#/tab/investRecord";
		}
		$scope.goRecommend = function() {
			window.location.href = "#/tab/recommend";
		}
		$scope.goaccountDetails = function() {
			//发送请求判断是否实名认证
				window.location.href = "#/tab/accountDetails";
			}
		//判断登录
        $scope.goAttention=function(){
            window.location="#/tab/myAttention";
        }
	})
//实名认证
.controller('goRealNameCtrl',function($scope,$ionicModal,$rootScope,$http,$state){
	
	$scope.idnoAreal_name=function(){
		$$('#loading').css('display','block')
		var idnorealdata={
			'email':$rootScope.data.email,
			'pwd':$rootScope.logindata.user_pwd,
			'idno':$scope.idno,
			'real_name':$scope.real_name
		}
		console.log(idnorealdata)
		$http.post(urltext+"/index.php?ctl=webapp_register_idno",idnorealdata)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.showerr=res.show_err;
			console.log(res)
			if(res.status==1)
			{
				$rootScope.idcardpassed=1//实名认证
			}
			
		})
	}
	$rootScope.backTabRealName=function(){
		if($rootScope.idcardpassed==1)
		{
			$state.go('tab.accountDetails')
		}
	}
	//实名认证
	//模态框
	$ionicModal.fromTemplateUrl('templates/showNotice.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.showNotice = modal;
	});

	
	//模态框
	$ionicModal.fromTemplateUrl('templates/show_err.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.show_err = modal;
	});
	
	
	
})


//账户子页面
//我的关注
.controller('myAttentionCtrl', function($scope,$rootScope,$http) {
	
		//删除我关注的表
	$scope.reloadRoute = function () {
		console.log("00")
    $window.location.reload();
};
	//打对号
	var muselect=[];
	var selectFlag=true;
	var selectDelDisplay=false;

//	$$(e.currentTarget).selectFlag=false;
	
	
	$scope.delSelected=function(e){
		if(selectDelDisplay)
		{
				
				if($$(e.currentTarget).attr('selectFlag')){
					
					$$(e.currentTarget).attr('selectFlag','');
					
					e=$$(e.currentTarget).find('.raddioBtn')
					var val=true;
					for(var i=0;i<muselect.length;i++){
						if(muselect[i]==$$(e).attr("indexnow"))
						{
							val=false
						}
					}
					if(val)
					{
						muselect.push($$(e).attr("indexnow"))
					}
					console.log('删掉选中的');
					$$(e).css({
						'background':'#ff3000',
						border:0
					})
					$$(e).html('√');
					
				}else{
					$$(e.currentTarget).attr('selectFlag',true);
					e=$$(e.currentTarget).find('.raddioBtn')
					for(var i=0;i<muselect.length;i++){
						if(muselect[i]==$$(e).attr("indexnow"))
						{
							muselect.splice(i, 1);
						}
					}
					$$(e).css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					$$(e).html('');
					
				}
				if(muselect.length){
					  $$('.banneDel').css('display','block');
//					  $$('.piece').last().css('margin-bottom','1rem')
				}else{
					  $$('.banneDel').css('display','none');
				}
		}
	}
	$scope.delMyattennow=function(){
		var str=muselect.join(",")
		console.log(muselect)
		var  MyAtten={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"id":str,
		}
		console.log(MyAtten)
		$http.post(urltext+'/index.php?ctl=webapp_uc_del_collect',MyAtten)
		.success(function(res){
			$scope.doRefresh()
//			 $$('.banneDel').css('display','none');
//			 selectFlag=true;
//			 $$('.raddioBtn').css('display','none');
//			console.log(res)
//			selectDelDisplay=false;
		})
	}
	
	
	
	
	
	
	
		var delList=[] 
		var myAttendata = { //传输数据
						"email": $rootScope.data.email,//用户名$rootScope.data.email
						"pwd": $rootScope.logindata.user_pwd,    //密码
						"page" : 1
				}
			$$('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_follow",myAttendata)
				.success(function(res){
					$scope.currentPage=1;
        			$scope.noMorePage=false;
					$scope.attenItems = res.list;
					$$('#loading').css('display','none')
					
			    })

			  $scope.attenItems = [];
			  $scope.doRefresh = function() {
			  		 $$('#loading').css('display','block')
			  		 $scope.currentPage=1;
        			 $scope.noMorePage=false;
					 $http.post(urltext + "/index.php?ctl=webapp_follow",myAttendata)
				     .success(function(res) {
				     $$('#loading').css('display','none')
				     $scope.attenItems = res.list;
				     // 刷新对删除 操作的影响
					selectDelDisplay=false;
					delItemFlags=true;
				 	$$('.piece .scale').css({
				 		'transform': 'scale(1)',
					    'position': 'absolute',
					    'right':' 0'
				 	})
				 	$$('.edit').html('编辑')
					$$('.raddioBtn').css('display','none');
					$$('.banneDel').css('display','none');
					$$('.piece').attr('selectFlag','true');
					$$('.raddioBtn').css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					$$('.raddioBtn').html('');
					muselect=[]

				     })
				     .finally(function() {
				       $scope.$broadcast('scroll.refreshComplete');
				     });
			  };

				$scope.currentPage=1;//定义下拉加载分页的初始值
				$scope.noMorePage=false;
				$scope.loadMore=function(){
				    $scope.currentPage += 1;//每当滚动到底部，页码累计加1
				    $$('#loading').css('display','block')
				    $http.post(urltext + "/index.php?ctl=webapp_follow",{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd,page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
				        .success(function(newItems) {
				        	$$('#loading').css('display','none')  
				        	if(newItems.list.length>0)
				        	{
				        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
					                $scope.attenItems.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
					           }  
				        	} 
				        	if (newItems.list.length < newItems.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
				                $scope.noMorePage=true;//禁止滚动触发时间
				            } 
				            $scope.$broadcast('scroll.infiniteScrollComplete');     
				        })
				};
			var delItemFlags=true;
			$scope.delItem=function(){
				if(delItemFlags)
				{
					selectDelDisplay=true;
					delItemFlags=false
				 	$$('.piece .scale').css({
				 		'transform': 'scale(.94)',
					    'position': 'absolute',
					    'right':' 0'
				 	})
					$$('.raddioBtn').css('display','block');
					$$('.edit').html('取消')
				}else{
					selectDelDisplay=false;
					delItemFlags=true;
				 	$$('.piece .scale').css({
				 		'transform': 'scale(1)',
					    'position': 'absolute',
					    'right':' 0'
				 	})
				 	$$('.edit').html('编辑')
					$$('.raddioBtn').css('display','none');
					$$('.banneDel').css('display','none');
					$$('.piece').attr('selectFlag','true');
					$$('.raddioBtn').css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					$$('.raddioBtn').html('');
					muselect=[]
				}

			}
		
			
})

// 日志页
.controller('dayRecordCtrl', function($scope,$rootScope,$http,$ionicModal) {
	
	//弹出框
	$ionicModal.fromTemplateUrl('templates/modal.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
//	充值4.21
//福利提现
 $scope.goBenefitMoney=function(){
// 	 $scope.showApprove = function() {
//		   // 一个精心制作的自定义弹窗
//				   var myPopup = $ionicPopup.show({
//				     template:"您还未认证，是否立即去认证？",
//				     title: '温馨提示',
//				     scope: $rootScope,
//				     buttons: [
//				       { text: '<a ng-click="">确定</a>',
//				        type: 'button-positive',
//				        onTap: function(e) {
//			             	 var options = {
//							      location: 'yes',
//							      clearcache: 'yes',
//							      toolbar: 'no'
//							    };
//				        }
//				       },
//				       {
//				         text: '<b>取消</b>'
//				       }
//				     ]
//				   });
//				}
//	if($rootScope.idcardpassed!=1){
//		$scope.showApprove()
//	}
 	
        	window.location="#/tab/goBenefitMoney";
        }


 $scope.goVIPBuy=function(){
        	window.location.href="#/tab/goVIPBuy";
        }
        $scope.goRecharge=function(){
//      	window.location.href="#/tab/goRecharge";
        }
        //提现页
        $scope.goWithcash=function(){
//      	window.location.href="#/tab/goWithcash";
        }
	
	/*4.20*/
	
	
	
	//撤销提现
	$scope.Revoke=function(status,dltid){
		$$('#loading').css('display','block')
		var Cxdata={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"status":status,
			"dltid":dltid
		}
		console.log(Cxdata)
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_carry_revoke_apply',Cxdata)
			.success(function(res){
				$$('#loading').css('display','none')
				FLlastloadRecord()
			})
		
	}

	$scope.FLshow=true;//账户日志的福利日志
    $scope.JFshow=false	//账户日志的积分日志
	var CZIndex=1;//日志充值页
	var TXIndex=1;//日志提现
	var FLIndex=1;//日志福利
	var JFIndex=1;//日志积分
	var VIPIndex=1;//日志积分
	var FLlastIndex=1;//最后一个Tab福利提现
	$scope.CZRecordlists = [];
	$scope.TXRecordlists=[]
	$scope.FLRecordlists=[]
	$scope.JFRecordlists=[]
	$scope.VIPRecordlists=[]
	$scope.FLlastlists=[]
	//充值传输数据
	var CZRecorddata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,    
			"page" : CZIndex
		}
	//提现传输数据
	var TXRecorddata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,   
			"page" : TXIndex
		}
	//福利传输数据
	var FLRecorddata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,   
			"page" : FLIndex,
			
		}
	//积分传输数据
	var JFRecorddata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,   
			"page" :JFIndex,
			"status":3
		}
	//Vip传输数据
	var VIPRecorddata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,   
			"page" :VIPIndex,
		}
	//最后一个tab福利数据
	var FLlastdata = { 
			"email": $rootScope.data.email,
			"pwd": $rootScope.logindata.user_pwd,   
			"page" :FLlastIndex,
		}
	//充值
	var scrollTopMax=1;
	function CZloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_incharge_log',CZRecorddata)
			.success(function(res){
				czflagScroll=true;
				$$('#loading').css('display','none')
				$scope.CZRecordlists=res.list;
				if(!$scope.CZRecordlists.length){
					$$('.czBodyCon .pageNull').css('display','block')
				}else{
					$$('.czBodyCon .pageNull').css('display','none')
				}
		})
		
		$scope.czcurrentPage=2;
		$$('.czBodyCon').unbind('scroll')
		var czflagScroll=true;
		$$('.czBodyCon').scroll(function(){  
			
            var srollPos = $$('.czBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
//           totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());   
//           $(document).height() <= totalheight
            if(srollPos>=scrollTopMax) {  
			    if(czflagScroll)
				{
					czflagScroll=false;
				}else{
					return ;
				}
			   
			    $http.post(urltext + "/index.php?ctl=webapp_uc_incharge_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,"page" :$scope.czcurrentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$scope.czcurrentPage += 1;//每当滚动到底部，页码累计加1
			        	
			        	if(newItems.list.length>0)
			        	{
			        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
				                $scope.CZRecordlists.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	czflagScroll=true;
			        	if (newItems.list.length <newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
//			                removeEvents($$('.czBodyCon'),'scroll',czScroll);
								$$('.czBodyCon').unbind('scroll')
								czflagScroll=false;
			            } 
						
						if(!$scope.CZRecordlists.length){
							$$('.czBodyCon .pageNull').css('display','block')
						}else{
							$$('.czBodyCon .pageNull').css('display','none')
						}     
			        })
            }  
        })
			
			
			
	}
	//提现
	function TXloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_carry_money_log',TXRecorddata)
			.success(function(res){
				txflagScroll=true;
				$$('#loading').css('display','none')
				$scope.TXRecordlists=res.list;

						if(!$scope.TXRecordlists.length){
							$$('.txBodyCon .pageNull').css('display','block')
						}else{
							$$('.txBodyCon .pageNull').css('display','none')
						}  
		})
		$scope.txcurrentPage = 2
		$$('.txBodyCon').unbind('scroll')
		var txflagScroll=true;
		$$('.txBodyCon').scroll(function(){
			
          var srollPos = $$('.txBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
//          totalheight = parseFloat($$('.txBodyCon').height()) + parseFloat($$('.txBodyCon').scrollTop());   
            if(srollPos>=scrollTopMax) {  
			   	if(txflagScroll)
				{
					txflagScroll=false;
				}else{
					return ;
				}
	
			    $http.post(urltext + "/index.php?ctl=webapp_uc_carry_money_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,'page':$scope.txcurrentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	 $scope.txcurrentPage += 1;//每当滚动到底部，页码累计加1
			        
			        	if(newItems.list.length>0)
			        	{
			        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
				                $scope.TXRecordlists.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	txflagScroll=true;
			        	if (newItems.list.length < newItems.page.page_size ) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
								$$('.txBodyCon').unbind('scroll')
								txflagScroll=false;
			            } 
			            
			           if(!$scope.TXRecordlists.length){
							$$('.txBodyCon .pageNull').css('display','block')
						}else{
							$$('.txBodyCon .pageNull').css('display','none')
						}  
			        })
            }  
        })
	}
	//福利
	function FLloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_account_log',FLRecorddata)
			.success(function(res){
				flflagScroll=true;
				$$('#loading').css('display','none')
				console.log(res)
				$scope.FLRecordlists= res.item;
				if(!$scope.FLRecordlists.length){
							$$('.flBodyCon .pageNull').css('display','block')
						}else{
							$$('.flBodyCon .pageNull').css('display','none')
						}  
		   })
		
		
		$scope.flcurrentPage=2;
		$$('.flBodyCon').unbind('scroll')
		var flflagScroll=true;
		$$('.flBodyCon').scroll(function(){  
			
            var srollPos = $$('.flBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
            if(srollPos>=scrollTopMax) {  
			    if(flflagScroll)
				{
					flflagScroll=false;
				}else{
					return ;
				}
			    
			    $http.post(urltext + "/index.php?ctl=webapp_uc_account_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,"page" :$scope.flcurrentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$scope.flcurrentPage += 1;//每当滚动到底部，页码累计加1
			        	
			        	if(newItems.item.length>0)
			        	{
			        		for (var i=0;i<newItems.item.length;i++){//newItems.content.length，当前json的数量
				                $scope.FLRecordlists.push(newItems.item[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	flflagScroll=true;
			        	if (newItems.item.length <newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
//			                removeEvents($$('.czBodyCon'),'scroll',czScroll);
								$$('.flBodyCon').unbind('scroll')
								flflagScroll=false;
								
			            } 
						
			            
			            if(!$scope.FLRecordlists.length){
							$$('.flBodyCon .pageNull').css('display','block')
						}else{
							$$('.flBodyCon .pageNull').css('display','none')
						}      
			        })
            }  
        })
	}
	//积分
	function JFloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_account_log',JFRecorddata)
			.success(function(res){
				jfflagScroll=true;
				console.log(res)
				$$('#loading').css('display','none')
				$scope.JFRecordlists=  res.item;
				if(!$scope.JFRecordlists.length){
							$$('.jfBodyCon .pageNull').css('display','block')
						}else{
							$$('.jfBodyCon .pageNull').css('display','none')
						}  
		   })
		$scope.jfcurrentPage=2;
		$$('.jfBodyCon').unbind('scroll')
		var jfflagScroll=true;
		$$('.jfBodyCon').scroll(function(){  
			
            var srollPos = $$('.jfBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
            if(srollPos>=scrollTopMax) {  
			    if(jfflagScroll)
				{
					jfflagScroll=false;
				}else{
					return ;
				}
			   
			    $http.post(urltext + "/index.php?ctl=webapp_uc_account_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,"page" :$scope.jfcurrentPage,"status":3})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$scope.jfcurrentPage += 1;//每当滚动到底部，页码累计加1
			      
			        	if(newItems.item.length>0)
			        	{
			        		for (var i=0;i<newItems.item.length;i++){//newItems.content.length，当前json的数量
				                $scope.JFRecordlists.push(newItems.item[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	jfflagScroll=true;
			        	if (newItems.item.length <newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
//			                removeEvents($$('.czBodyCon'),'scroll',czScroll);
								$$('.jfBodyCon').unbind('scroll')
								jfflagScroll=false;
			           } 
			           if(!$scope.JFRecordlists.length){
							$$('.jfBodyCon .pageNull').css('display','block')
						}else{
							$$('.jfBodyCon .pageNull').css('display','none')
						}  
			        })
            }  
        })
	}
	//VIP
	function VIPloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_vip_buy_log',VIPRecorddata)
			.success(function(res){
				vipflagScroll=true;
				console.log(res)
				$$('#loading').css('display','none')
				$scope.VIPRecordlists= res.vip_buy_log_list;
				if(!$scope.VIPRecordlists.length){
							$$('.vipBodyCon .pageNull').css('display','block')
						}else{
							$$('.vipBodyCon .pageNull').css('display','none')
						}  
		   })
		$scope.vipcurrentPage=2;
		$$('.vipBodyCon').unbind('scroll')
		var vipflagScroll=true;
		$$('.vipBodyCon').scroll(function(){  
			
            var srollPos = $$('.vipBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
            if(srollPos>=scrollTopMax) {  
			    if(vipflagScroll)
				{
					vipflagScroll=false;
				}else{
					return ;
				}
			
			    $http.post(urltext + "/index.php?ctl=webapp_uc_vip_buy_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,"page" :$scope.vipcurrentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$scope.vipcurrentPage += 1;//每当滚动到底部，页码累计加1
			  
			        	if(newItems.vip_buy_log_list.length>0)
			        	{
			        		for (var i=0;i<newItems.vip_buy_log_list.length;i++){//newItems.content.length，当前json的数量
				                $scope.VIPRecordlists.push(newItems.vip_buy_log_list[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	vipflagScroll=true;
			        	if (newItems.vip_buy_log_list.length <newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
//			                removeEvents($$('.czBodyCon'),'scroll',czScroll);
								$$('.vipBodyCon').unbind('scroll')
								vipflagScroll=false;
			            } 
			            if(!$scope.VIPRecordlists.length){
							$$('.vipBodyCon .pageNull').css('display','block')
						}else{
							$$('.vipBodyCon .pageNull').css('display','none')
						}  
			                
			        })
            }  
        })
	}
	//最后一个福利tab
	function FLlastloadRecord(){
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_carry_moneyent_log',FLlastdata)
			.success(function(res){
				lflflagScroll=true;
				console.log(res)
				$$('#loading').css('display','none')
				$scope.FLlastlists= res.item;
				$scope.FLlastlistsss=  res.item[0];
				$rootScope.bank_id=res.bankid//储存
				if(!$scope.FLlastlists.length){
							$$('.lflBodyCon .pageNull').css('display','block')
						}else{
							$$('.lflBodyCon .pageNull').css('display','none')
						}  
		   })
			var lflflagScroll=true;
		$scope.lflcurrentPage=2;
		$$('.lflBodyCon').unbind('scroll')
		$$('.lflBodyCon').scroll(function(){  
			
            var srollPos = $$('.lflBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
            if(srollPos>=scrollTopMax) {  
			   if(lflflagScroll)
				{
					lflflagScroll=false;
				}else{
					return ;
				} 
			   
			    $http.post(urltext + "/index.php?ctl=webapp_uc_carry_moneyent_log",{"email": $rootScope.data.email,"pwd": $rootScope.logindata.user_pwd,"page" :$scope.lflcurrentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
			        	$scope.lflcurrentPage += 1;//每当滚动到底部，页码累计加1
			        	
			        	if(newItems.item.length>0)
			        	{
			        		for (var i=0;i<newItems.item.length;i++){//newItems.content.length，当前json的数量
				                $scope.FLlastlists.push(newItems.item[i]);//一个一个取出来，推送到原来的items里
				           	}  
			        	} 
			        	lflflagScroll=true;
			        	if (newItems.item.length < newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
//			                removeEvents($$('.czBodyCon'),'scroll',czScroll);
								$$('.lflBodyCon').unbind('scroll')
								lflflagScroll=false;
			            } 
			            if(!$scope.FLlastlists.length){
							$$('.lflBodyCon .pageNull').css('display','block')
						}else{
							$$('.lflBodyCon .pageNull').css('display','none')
						}  
			                
			        })
            }  
        })
	}
	CZloadRecord()//充值
	
	
	
	
	
	

$scope.Flshow=function(){
	FLloadRecord()//福利
	$scope.FLshow=true;
	$scope.JFshow=false
	
}
$scope.AAJFshow=function(){//必须加AA ***  JFshow会报错
	$scope.FLshow=false;
	$scope.JFshow=true
	JFloadRecord()//积分
}	
	
	/*4.20*/

		$scope.sczrz = true;
		$scope.czrzs = {
			color: "#ffa03b",
			borderBottom: "1px solid #ffa03b"
		}
		$scope.czrz = function() {
			CZloadRecord()//充值
			$scope.sczrz = true;
			$scope.stxrz = false;
			$scope.szhrz = false;
			$scope.svgmrz = false;
			$scope.sflgmtx = false;
			if($scope.sczrz == true) {
				$scope.czrzs = {
					color: "#ffa03b",
					borderBottom: "1px solid #ffa03b"
				}
				$scope.txrzs = {}
				$scope.zhrzs = {}
				$scope.vgmrzs = {}
				$scope.flgmtxs = {}
			}
		}
		$scope.txrz = function() {
			TXloadRecord()//提现
			$scope.sczrz = false;
			$scope.stxrz = true;
			$scope.szhrz = false;
			$scope.svgmrz = false;
			$scope.sflgmtx = false;
			if($scope.stxrz == true) {
				$scope.txrzs = {
					color: "#ffa03b",
					borderBottom: "1px solid #ffa03b"
				}
				$scope.czrzs = {}
				$scope.zhrzs = {}
				$scope.vgmrzs = {}
				$scope.flgmtxs = {}
			}
		}
		$scope.zhrz = function() {
			FLloadRecord()//福利
			$scope.sczrz = false;
			$scope.stxrz = false;
			$scope.szhrz = true;
			$scope.svgmrz = false;
			$scope.sflgmtx = false;
			if($scope.szhrz == true) {
				$scope.zhrzs = {
					color: "#ffa03b",
					borderBottom: "1px solid #ffa03b"
				}
				$scope.txrzs = {}
				$scope.czrzs = {}
				$scope.vgmrzs = {}
				$scope.flgmtxs = {}
			}
		}
		$scope.vgmrz = function() {
			VIPloadRecord()//VIP
			$scope.sczrz = false;
			$scope.stxrz = false;
			$scope.szhrz = false;
			$scope.svgmrz = true;
			$scope.sflgmtx = false;
			if($scope.svgmrz == true) {
				$scope.vgmrzs = {
					color: "#ffa03b",
					borderBottom: "1px solid #ffa03b"
				}
				$scope.txrzs = {}
				$scope.czrzs = {}
				$scope.zhrzs = {}
				$scope.flgmtxs = {}
			}
		}
		$scope.flgmtx = function() {
			FLlastloadRecord()//最后一个福利Tab
			$scope.sczrz = false;
			$scope.stxrz = false;
			$scope.szhrz = false;
			$scope.svgmrz = false;
			$scope.sflgmtx = true;
			if($scope.sflgmtx == true) {
				$scope.flgmtxs = {
					color: "#ffa03b",
					borderBottom: "1px solid #ffa03b"
				}
				$scope.txrzs = {}
				$scope.czrzs = {}
				$scope.zhrzs = {}
				$scope.vgmrzs = {}
			}
		}
})
//4.21
.controller('rechargeCtrl',function($scope){
	var flag=true;
	$scope.showAll=function(){
		if(flag){
			$$(".slidePrompt>.prompt").animate({"height":"4.5rem"},300);
			$$(".slidePrompt>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			$$(".slidePrompt>.prompt").animate({"height":"1.5rem"},300);
			$$(".slidePrompt>.showAll").text("······显示全部");
			flag=true;
		}
		
	}
	$scope.stopAll=function(){
		if(flag){
			$$(".slidePrompt1>.prompt").animate({"height":"3rem"},300);
			$$(".slidePrompt1>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			$$(".slidePrompt1>.prompt").animate({"height":"1rem"},300);
			$$(".slidePrompt1>.showAll").text("······显示全部");
			flag=true;
		}		
	}
	$scope.selectPay=function(){
		if(flag){
			$$(".payment>.circle").text("√");
			$$(".payment>.circle").css({ "background": "#ff9000","border":"none"});
			flag=false;
		}else if(!flag){
			$$(".payment>.circle").text("");
			$$(".payment>.circle").css({ "background": "#fff","border":"1px solid #ccc"});
			flag=true;
		}
	}
})
//提现页
.controller('goWithcashCtrl',function($scope){})
//充值页
.controller('rechargeCtrl',function($scope){
	var flag=true;
	$scope.showAll=function(){
		if(flag){
			$$(".slidePrompt>.prompt").animate({"height":"4.5rem"},300);
			$$(".slidePrompt>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			$$(".slidePrompt>.prompt").animate({"height":"1.5rem"},300);
			$$(".slidePrompt>.showAll").text("······显示全部");
			flag=true;
		}
		
	}
	$scope.stopAll=function(){
		if(flag){
			$$(".slidePrompt1>.prompt").animate({"height":"3rem"},300);
			$$(".slidePrompt1>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			$$(".slidePrompt1>.prompt").animate({"height":"1rem"},300);
			$$(".slidePrompt1>.showAll").text("······显示全部");
			flag=true;
		}		 
	}
	$scope.selectPay=function(){
		if(flag){
			$$(".payment>.circle").text("√");
			$$(".payment>.circle").css({ "background": "#ff9000","border":"none"});
			flag=false;
		}else if(!flag){
			$$(".payment>.circle").text("");
			$$(".payment>.circle").css({ "background": "#fff","border":"1px solid #ccc"});
			flag=true;
		}
	}
})
//购买VIP
.controller('goVIPBuyCtrl', function($scope,$http,$rootScope,$ionicLoading,$timeout) {
	$$('#loading').css('display','block')
	$scope.selectedVip="5";
	$scope.myVar="1年";
	$scope.yearss = ["1", "2", "3", "4", "5"];
	$http.post(urltext + "/index.php?ctl=webapp_uc_vip_buy",{"email":$rootScope.data.email,"pwd":$rootScope.logindata.user_pwd})
	.success(function(res){
		$$('#loading').css('display','none')
		$scope.vip_list=res.vip_list
		$scope.original_price=res.vip_info.original_price//原价
		$scope.ssite_pirce=res.vip_info.site_pirce//现价
	})
	 //现在购买Vip
	 $scope.buyVipNow=function(selectedVip,myVar,mypaypwd){
	 	$$('#loading').css('display','block')
	 	$rootScope.selectedVip_id=selectedVip
	 	var payVipdata={
	 		"email":$rootScope.data.email,
	 		"pwd":$rootScope.logindata.user_pwd,
	 		"paypassword":mypaypwd,
	 		"years":myVar,
	 		"vip_id":selectedVip,
	 	}
	 	console.log(payVipdata);
	 	$http.post(urltext + "/index.php?ctl=webapp_uc_save_vip_buy",payVipdata)
	 	.success(function(res){
	 		$$('#loading').css('display','none')
	 		$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
	 	})
	 	.error(function(err){
	 	})
	 	
	 	
	 }
	 
	 
	 
	
})
//提现页
.controller('goWithcashCtrl',function($scope){})
//福利提现
.controller('goBenefitMoneyCtrl',function($scope, $http ,$rootScope,$ionicLoading,$timeout){
		//实付金额
		$$('#loading').css('display','block')
		$scope.add =function(){
			if($scope.amounts==""){
				return  2
			}else if($scope.amounts!=""){
				 return parseInt($scope.amounts)+2;
			}
        }
		$scope.amounts=0;
		var FLtxOkData={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"bid":  $rootScope.bank_id
		}
		console.log(FLtxOkData)
		$http.post(urltext + "/index.php?ctl=webapp_uc_carry_money",FLtxOkData)
		.success(function(res){//点击福利提现按钮跳过来的数据请求
			console.log(res)
			$$('#loading').css('display','none')
			$scope.bankcard=res.bank_carry[0].bankcard
			$scope.uimg =res.bank_carry[0].uimg       
			$scope.real_name =res.bank_carry[0].real_name
			$scope.KYmoney=res.money;
		})
	
		
		$scope.FLtxOk=function(){
			$$('#loading').css('display','block')
			var FLTXlastOkData={//福利提现最后的确认
				"email":$rootScope.data.email,
				"pwd":$rootScope.logindata.user_pwd,
				"bid":  $rootScope.bank_id,
				"paypassword":$scope.paypasswords,
				"amount":$scope.amounts
			}
			console.log(FLTXlastOkData)
			$http.post(urltext + "/index.php?ctl=webapp_uc_save_carry ",FLTXlastOkData)
			.success(function(res){//点击福利提现按钮跳过来的数据请求
				$$('#loading').css('display','none')
				console.log(res)
				$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			})
		}
})



//投资记录页
.controller('investRecordCtrl', function($scope,$rootScope,$http,$ionicHistory,$ionicModal,$ionicLoading,$timeout) {
	//偿还借款
	$rootScope.goRepayment = function(email,pwd,id) {
		$$('#loading').css('display','block')
		var RepaymentData={
			"email":email,
			"pwd":pwd,
			"id":id
		}
		console.log(RepaymentData)
		$http.post(urltext + "/index.php?ctl=webapp_uc_quick_refund",RepaymentData)
		.success(function(res){
			$$('#loading').css('display','none')
			console.log(res)
			//标的编号
			$rootScope.RepaymentID=res.deal.id;
//标的名称deal.name        
			$rootScope.RepaymentBDMC=res.deal.name;
//待还金额deal.need_remain_repay_money   
			$rootScope.RepaymentDHJE=res.deal.need_remain_repay_money 
//借款金额deal.load_money_format            
			$rootScope.RepaymentJKJE=res.deal.load_money_format 
//借款期限：deal.repay_time  {if $data.deal.repay_time_type eq 0}天{else}个月{/if}
			$rootScope.RepaymentJKQX=res.deal.repay_time
//年化收益：  deal.rate_foramt_w   
			$rootScope.RepaymentMSHY=res.deal.rate_foramt_w
//已还本息：deal.repay_money
			$rootScope.RepaymentYHBX=res.deal.repay_money
			$rootScope.RepaymentLIST=res.loan_list
			window.location = "#/tab/goRepayment";
//列表循环
//第几期   l_key_index
//还款时间repay_day_format
//			
		}).error(function(res){
			console.log(res)
		})
		
		
	}
	
	$rootScope.confirmPay=function(ids,id,paypwd,email,pwd){
		$$('#loading').css('display','block')
		var confirmPaydata={
			"ids":ids,
			"id":id,
			"paypassword":paypwd,
			"email":email,
			"pwd":pwd
		}
		console.log(confirmPaydata)
		$http.post(urltext + "/index.php?ctl=webapp_uc_do_quick_refund",confirmPaydata)
		.success(function(res){
			$$('#loading').css('display','none')
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			console.log(res)
		})
		
		
	}
	$scope.tcssun=false;
	$scope.thksun=true;
	$scope.tyhqjk=function(){
		$scope.tcssun=true;
		$scope.thksun=false;
	}
	$scope.thklb=function(){
		$scope.tcssun=false;
		$scope.thksun=true;
	}
	
	//4.20
	var pageall=1//all
	var myinvestLoan=1//投资借款
	var CHLoanpage=1//偿还借款还款列表
	var YHQLoanpage=1//偿还借款已还清
	$scope.allData=[];//我的投资
	$scope.loanData=[];//我的借款
	$scope.thklbitem=[];//还款列表
	$scope.tyhqjkitem=[];//已还清列表
	var flag=true;
	var flag2=true;
	$scope.shaixuanloadAll=function(){
		//all传的数据
		var TZRecordData={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"page":1,
		}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_invest',TZRecordData)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.allData=res.item;
			$$(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		})
	}
	$scope.slideBox1 =  function() {		
		if(flag){
			$$(".slideFrame1").animate({"width":"1.5rem","height":"3rem"},500);
			flag=false;
		}else if(!flag){
			$$(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		}
 	}
	$scope.slideBox2 =  function() {		
		if(flag2){
			$$(".slideFrame2").animate({"width":"1.5rem","height":"3rem"},500);
			flag2=false;
		}else if(!flag2){
			$$(".slideFrame2").animate({"width":0,"height":0},200);
			flag2=true;
		}
 	}
	//我的投资
	$scope.loadAll=function(){
		//all传的数据
		var TZRecordData={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"page":pageall,
		}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_invest',TZRecordData)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.allData=$scope.allData.concat(res.item);
			$$(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		})
	}
	$scope.shaixuan=function(status){
		var shaiRecordData={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"status":status,
		"page":1
	}
		console.log(shaiRecordData)
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_invest',shaiRecordData)
		.success(function(res){
			$$('#loading').css('display','none')
			console.log(res)
			$scope.allData=res.item;
			$$(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		})
	}
	$scope.shaixuan2=function(status){
		var shaiRecordData2={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"status":status,
		"page":1
	}
		console.log(shaiRecordData2)
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_borrowed',shaiRecordData2)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.loanData=res.item
			$$(".slideFrame2").animate({"width":0,"height":0},200);
			flag2=true;
		})
	}
	//我的借款
	$scope.loadLoan=function(){
	//我的借款
		var TZLoan={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"page":myinvestLoan,
	}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_borrowed',TZLoan)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.loanData=$scope.loanData.concat(res.item)
			$$(".slideFrame2").animate({"width":0,"height":0},200);
		})
	}
	//我的借款
	$scope.shaixuanloadLoan=function(){
	//我的借款
		var TZLoan={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"page":1,
	}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_borrowed',TZLoan)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.loanData=res.item
			$$(".slideFrame2").animate({"width":0,"height":0},200);
		})
	}
	
	//偿还借款
	$scope.loadCHLoan=function(){
			//偿还借款
		var CHLoan={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"page":CHLoanpage,
			"status":0
		}
		var YHQLoan={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"page":YHQLoanpage,
		"status":1
	}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_refund',CHLoan)
		.success(function(res){
			$$('#loading').css('display','none')
			console.log(res)
			$scope.thklbitem=$scope.thklbitem.concat(res.item)
		})
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_refund',YHQLoan)
		.success(function(res){
			$$('#loading').css('display','none')
			console.log(res)
			$scope.tyhqjkitem=$scope.tyhqjkitem.concat(res.item)
		})
	}
	//投资统计
	$scope.loadTZTJ=function(){
		//投资统计
	var TZTjdata={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
	}
		$$('#loading').css('display','block')
		$http.post('http://test.yijiayi360.com/index.php?ctl=webapp_uc_financial_statistics',TZTjdata)
		.success(function(res){
			console.log(res)
			$$('#loading').css('display','none')
			$scope.borrow_amount=res.user_statistics.borrow_amount;
			$scope.success_deal_count=res.user_statistics.success_deal_count 
			$scope.repay_amount=res.user_statistics.repay_amount  
			$scope.need_repay_amount=res.user_statistics.need_repay_amount 
			$scope.repay_manage_amount=res.user_statistics.repay_manage_amount
			$scope.need_manage_amount=res.user_statistics.need_manage_amount 
			$scope.yuqi_impose=res.user_statistics.yuqi_impose

			////////////////////////
			$scope.load_money=res.user_statistics.load_money;
			$scope.load_count=res.user_statistics.load_count  
			$scope.load_earnings=res.user_statistics.load_earnings   
			$scope.load_wait_earnings =res.user_statistics.load_wait_earnings 
			$scope.load_repay_money=res.user_statistics.load_repay_money
			$scope.load_wait_repay_money=res.user_statistics.load_wait_repay_money 
			$scope.load_manage_money=res.user_statistics.load_manage_money
			$scope.incharge_count=res.incharge_count
			$scope.carry_money=res.carry_money
		})
	}
	
	
	$scope.loadAll()//我的投资全部
	$scope.loadLoan()//我的借款
	$scope.loadCHLoan()//偿还借款
	$scope.loadTZTJ()//投资统计
	//我的投资下拉加载
	$scope.loan1=function(){
		pageall++;
		$scope.loadAll()
	}
//我的借款
	$scope.loan2=function(){
		myinvestLoan++;
		$scope.loadLoan()
	}
//偿还借款
	$scope.loan3=function(){
		CHLoanpage++;
		YHQLoanpage++;
		$scope.loadCHLoan()
	}
	$scope.twdtz = true;//我的投资	
	$scope.ttzjk = false;//投资借款	
	$scope.tchjk = false;//偿还借款
	$scope.ttztj = false;//投资统计
	$scope.myinvestTab=true;
	$scope.myLoadTab=false;
	$scope.loadLoanMore=function(){
		console.log(getTransform(investtop)[1])
		if(getTransform(investtop)[1]<(-60)){
			if($scope.twdtz){
				$scope.loan1()
			}else if($scope.ttzjk){
				$scope.loan2()
			}else if($scope.tchjk){
				$scope.loan3()
			}
		}
	}
	
	function getTransform(el) {
    var results = $$(el).find('.scroll').css('transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/)
    if(!results) return [0, 0, 0];
    if(results[1] == '3d') return results.slice(2,5);
    results.push(0);
    return results.slice(5, 8);
}
	
	
	//4.20

	
	//选项卡点击切换效果
	$scope.wdtzt = {
		color: "#ffa03b",
		borderBottom: "1px solid #ffa03b"
	}
	$scope.wdtz = function() {
		$scope.myinvestTab=true;
	$scope.myLoadTab=false;
		$scope.twdtz = true;
		$scope.ttzjk = false;
		$scope.tchjk = false;
		$scope.ttztj = false;
		if($scope.twdtz == true) {
			$scope.wdtzt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.tzjkt = {}
			$scope.chjkt = {}
			$scope.tztjt = {}
		}
	}
	$scope.tzjk = function() {
		$scope.myinvestTab=false;
	$scope.myLoadTab=true;
		$scope.twdtz = false;
		$scope.ttzjk = true;
		$scope.tchjk = false;
		$scope.ttztj = false;
		if($scope.ttzjk == true) {
			$scope.tzjkt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.wdtzt = {}
			$scope.chjkt = {}
			$scope.tztjt = {}
		}
	}
	$scope.chjk = function() {
		$scope.myinvestTab=false;
	$scope.myLoadTab=false;
		$scope.twdtz = false;
		$scope.ttzjk = false;
		$scope.tchjk = true;
		$scope.ttztj = false;
		if($scope.tchjk == true) {
			$scope.chjkt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.tzjkt = {}
			$scope.wdtzt = {}
			$scope.tztjt = {}
		}
	}
	$scope.tztj = function() {
		$scope.myinvestTab=false;
	$scope.myLoadTab=false;
		$scope.twdtz = false;
		$scope.ttzjk = false;
		$scope.tchjk = false;
		$scope.ttztj = true;
		if($scope.ttztj == true) {
			$scope.tztjt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.tzjkt = {}
			$scope.wdtzt = {}
			$scope.chjkt = {}
		}
	}
})
.controller('recommendCtrl', function($scope) {})
//账户详情
.controller('accountDetailsCtrl', function($scope, $ionicHistory, $rootScope,$ionicModal) {
//模态框
	$ionicModal.fromTemplateUrl('templates/show_err.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.show_err = modal;
	});

//实名认证
	$scope.goRealName = function (){
		window.location = "#/tab/goRealName";
	}
	$scope.goMyInvita = function() {
		window.location = "#/tab/MyInvitation";

	}
	$scope.goSetPass = function() {
		window.location = "#/tab/SetPassword"

	}
	$scope.goSetPayPass = function() {
		window.location = "#/tab/ACCSetPayPass"

	}
	$scope.goSetAddress = function() {
		window.location = "#/tab/SetAddress"

	}

})
//账户详情子页面
//---------------------------账户详情子页面-------------------------
//我的邀请
.controller('MyInvitationCtrl', function($scope,$rootScope,$http) {
	$$('#loading').css('display','block')
	var MyInvitationData={
//		"email":$rootScope.data.email,
//		"pwd":$rootScope.logindata.user_pwd,
		"user_id":$rootScope.logindata.id,
		"page":1
	}
	console.log(MyInvitationData)
	$http.post(urltext + "/index.php?ctl=webapp_uc_myinvite ",MyInvitationData)
		.success(function(res){//点击福利提现按钮跳过来的数据请求
			console.log(res)
			$scope.tjAllPerson=res.tjAllPerson//	 推荐好友总数-------
			$scope.moneyAll=res.moneyAll//奖励总金额----------
			$scope.tjOnePerson=res.tjOnePerson//一级会员-----------
			$scope.tjTwoPerson=res.tjTwoPerson//二级会员------------
			$scope.tjThreePerson=res.tjThreePerson//三级会员---------
			$scope.MyInvitationlist=res.list
			$scope.id=res.id//编号--------
			$scope.user_name=res.user_name//用户名---------
			$scope.mobile=res.mobile//手机号-----
			$scope.state=res.state//会员级别----------
			$scope.states=res.states//状态---------
			$$('#loading').css('display','none')
		})
})
//修改登录密码
.controller('SetPasswordCtrl',function($scope,$rootScope,$http,$ionicHistory,$state,$ionicLoading,$timeout) {

	$scope.resetpwdOk=function(){
		$$('#loading').css('display','block')
		$scope.pwd_old=angular.element("#pwd_old").val();
		$scope.user_pwd=angular.element("#user_pwd").val();
		$scope.pwd_confirm=angular.element("#pwd_confirm").val();
		var XGpassword={
		"email":$rootScope.data.email,
		"pwd":$rootScope.logindata.user_pwd,
		"user_pwd_old":$scope.pwd_old,
		"user_pwd":$scope.user_pwd,
		"user_pwd_confirm":$scope.pwd_confirm
		}
		console.log(XGpassword)
		$http.post(urltext + "/index.php?ctl=webapp_uc_save_pwd ",XGpassword)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.pwd_old=angular.element("#pwd_old").val("");
			$scope.user_pwd=angular.element("#user_pwd").val("");
			$scope.pwd_confirm=angular.element("#pwd_confirm").val("");
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			$rootScope.data.pwd='';
			$rootScope.inshow=false;
			$rootScope.outshow=true;
			$$('#password').val('')
			$state.go("tab.accountlogin")
		})
			
		

	}
	
	
})

//设置支付密码
.controller('SetPayPassCtrl', function($scope,$rootScope,$http,$interval,$ionicLoading,$timeout) {
	var SZpassword={
	"email":$rootScope.data.email,
	"pwd":$rootScope.logindata.user_pwd
	}
	//获取手机号码
	$scope.timedel="获取验证码";
	$http.post(urltext + "/index.php?ctl=webapp_reset_pay_pwd",SZpassword)
	.success(function(res){
		console.log(res)
		/*alert(JSON.stringify(res))
		alert(res.mobile)*/
		$scope.mymobile=res.mobile
	})
	console.log(SZpassword)
	$scope.SZsetPaypwdOk=function(){
		$http.post(urltext + "/index.php?ctl=webapp_send_reset_pay_code",SZpassword)
		.success(function(res){
			var timedel=60
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			 $scope.mydeltimer=$interval(function(){
				timedel--;
				$scope.timedel=timedel
				if(timedel==0){
					$scope.timedel="获取验证码";
					$interval.cancel($scope.mydeltimer);
				}
			},1000)
			 $state.go('tab.accountlogin')
//			console.log(res)
		})
	}
	//最后确定修改支付密码
	$scope.SubmitPayOk=function(){
		$$('#loading').css('display','block')
		$scope.YZMinput=angular.element("#YZMinput").val()
		$scope.ZFMMinput=angular.element("#ZFMMinput").val()
		$scope.ZFMMinputA=angular.element("#ZFMMinputA").val()
		var myPayOKdata={
			"email": $rootScope.data.email,
			"pwd"  :$rootScope.logindata.user_pwd,
			"mobile_code" : $scope.YZMinput,
			"pay_pwd" : $scope.ZFMMinput,
			"pay_pwd_confirm":$scope.ZFMMinputA
		}
		console.log(myPayOKdata)
		$http.post(urltext + "/index.php?ctl=webapp_save_pay_pwd",myPayOKdata)
		.success(function(res){
			$$('#loading').css('display','none')
			$scope.YZMinput=angular.element("#YZMinput").val("")
			$scope.ZFMMinput=angular.element("#ZFMMinput").val("")
			$scope.ZFMMinputA=angular.element("#ZFMMinputA").val("")
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
		})
	}
})
.controller('SetAddressCtrl', function($scope) {
	$scope.addAddress = function() {
		window.location.href = "#/tab/addAddress";
	}
})

//立即投资
.controller("nowInvest",function($scope, $ionicHistory, $rootScope,$http,$ionicModal){
		$ionicModal.fromTemplateUrl('templates/czmodal.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.czmodal = modal;
		  });
	$scope.goSetPayPass = function() {
		window.location = "#/tab/INSetPayPass"
	}
	
})

//未登录查看详情和
.controller('DetailsCtrl', function($scope, $ionicHistory, $rootScope,$http) {
	//立即投资
		$scope.nowInvest=function(){
		var nowInvestdata={
			'email':$rootScope.data.email,
			'pwd':$rootScope.logindata.user_pwd,
			'id':$rootScope.detailIdID
		}
		$$('#loading').css('display','block')
		$http.post(urltext + "/index.php?ctl=webapp_deal",nowInvestdata)
		.success(function(res){
			$$('#loading').css('display','none')
			console.log(res)
			$rootScope.nowinvestName=res.deal.sub_name//标的名称
			$rootScope.nowinvestmoney=res.deal.need_money//可投金额
			$rootScope.nowuser_money=Number(res.user_money).toFixed(2);//可用余额
			$rootScope.dsQtmoney=res.deal.min_loan_money_format//多少元起投
		})
		.finally(function(){
				window.location.href='#/tab/nowInvest';
		})
	
	}
	//关注和未关注
	$scope.followme=function(email,pwd){
		var followmedata={
			'email':email,
			'pwd':pwd,
			'id':$rootScope.detailIdID
		}
		if($rootScope.concern=='未关注'){
			console.log(followmedata+'未关注')
			$http.post(urltext + "/index.php?ctl=webapp_uc_do_collect",followmedata)
			 .success(function(res){
			 	console.log(res)
			 	$rootScope.concern="关注"
			 	$$("#heart").css("background-image","url('img/follownow.png')")
			 	
			 })
		}else if($rootScope.concern=='关注'){
			console.log(followmedata +'关注')
			$http.post(urltext + "/index.php?ctl=webapp_uc_del_collect",followmedata)
			 .success(function(res){
			 	$rootScope.concern="未关注"
			 	console.log(res)
			 	$$("#heart").css("background-image","url('img/heart.png')")
			 })
		}
	}
	$scope.toTrial = function() {
			window.location.href = "#/tab/trial";
		}
		//选项卡点击切换效果
		//选项卡点击切换效果
	$scope.tcpxx = true;
	$scope.cpxxt = {
		color: "#ffa03b",
		borderBottom: "1px solid #ffa03b"
	}
	$scope.cpxx = function() {
		$scope.tcpxx = true;
		$scope.txmms = false;
		$scope.tqyxx = false;
		$scope.tfkbz = false;
		if($scope.tcpxx == true) {
			$scope.cpxxt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.xmmst = {}
			$scope.qyxxt = {}
			$scope.fkbzt = {}
		}
	}
	$scope.xmms = function() {
		$scope.tcpxx = false;
		$scope.txmms = true;
		$scope.tqyxx = false;
		$scope.tfkbz = false;
		if($scope.txmms == true) {
			$scope.xmmst = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.cpxxt = {}
			$scope.qyxxt = {}
			$scope.fkbzt = {}
		}
	}
	$scope.qyxx = function() {
		$scope.tcpxx = false;
		$scope.txmms = false;
		$scope.tqyxx = true;
		$scope.tfkbz = false;
		if($scope.tqyxx == true) {
			$scope.qyxxt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.xmmst = {}
			$scope.cpxxt = {}
			$scope.fkbzt = {}
		}
	}
	$scope.fkbz = function() {
		$scope.tcpxx = false;
		$scope.txmms = false;
		$scope.tqyxx = false;
		$scope.tfkbz = true;
		if($scope.tfkbz == true) {
			$scope.fkbzt = {
				color: "#ffa03b",
				borderBottom: "1px solid #ffa03b"
			}
			$scope.xmmst = {}
			$scope.cpxxt = {}
			$scope.qyxxt = {}
		}
	}
})

//偿还借款
.controller('goRepaymentCtrl',function($scope,$ionicModal,$rootScope){
	
	
	
//输入密码的模态框
	$ionicModal.fromTemplateUrl('templates/confirmPass.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.confirmPass = modal;
	});
var flag=true;	
	$scope.checkBox = function() {							
		if(flag){
			$$(".checkbox").css({"display":"block"});
			flag=false;
		}else if(!flag){
			$$(".checkbox").css({"display":"none"});
			flag=true;
		}
	}

})


/*底部tabs隐藏显示的指令*/
.directive('hideTabs', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {

			scope.$on('$ionicView.beforeEnter', function() {

				scope.$watch(attributes.hideTabs, function(value) {
					$rootScope.hideTabs = 'tabs-item-hide';
				});
			});

			scope.$on('$ionicView.beforeLeave', function() {
				scope.$watch(attributes.hideTabs, function(value) {
					$rootScope.hideTabs = 'tabs-item-hide';
				});
				scope.$watch('$destroy', function() {
					$rootScope.hideTabs = false;
				})

			});
		}
	};
})
//网站协议
.controller("wzfwxyCtrl",function($scope,$state){
	$scope.goreg=function(){
		$state.go("tab.reg")
	}
	$scope.goLogin=function(){
		$state.go("tab.accountlogin")
	}
	
})
.controller('aboutusCtrl',function(){})

.controller('schoolDetailCtrl',function(){})

//联系客服
.controller('ContactServiceCtrl',function($scope,$state,$http, $sce){
	$http.post(urltext + "/index.php?ctl=webapp_service","")
		.success(function(res){
			console.log(res)
			var str = res; 
            var hrefUrl = str.slice(1,res.length-1).replace(/\\/g,"");
            console.log(hrefUrl)
            $scope.hrefUrl=hrefUrl
            $scope.paySrc = $sce.trustAsResourceUrl( $scope.hrefUrl); 
	    })
})
.directive('loader', function() {
	return {
		restrict: 'AE',
		link: function(scope, element, attrs) {
			element.bind("scroll",function(event){
				scope.$apply(attrs.loadmore)
			})
		}
	};
})
.filter('number2', function() { //保留小数后两位
    return function(text) {
        return Number(text).toFixed(2);
    }
})


