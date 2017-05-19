var urltext = 'http://test.yijiayi360.com';
//var urltext = 'https://www.yijiayi360.com';
var domainUrl='https://www.yijiayi360.com';
//var domainUrl='http://test.yijiayi360.com';
//var version = "0.9";
var index = 0;
var data = {
	'page': index
};
var timer = "";
var Adindex=0;
var $$ = jQuery.noConflict(); //angular.element替换jq的$
var FLlastloadRecord,VIPloadRecord,webapp_deal_detailsFun;
var fortimerHandler;
var regtimerHandler;
//投资页100
//动态页312
//账户页38
angular.module('starter.controllers', ['ngCordova','ngSanitize']).run(function ($cordovaNetwork,$cordovaDevice,$cordovaStatusbar,$cordovaAppVersion,$cordovaInAppBrowser,$ionicPlatform,$ionicHistory,$ionicSlideBoxDelegate,$http,$cordovaSplashscreen, $rootScope, $location,$ionicPopup, $timeout, $cordovaToast,$state) {
        $rootScope.t_sign_data='立即签到'
        $rootScope.flagInit=true;
        $rootScope.RecommendIs=true;
		$rootScope.data={
			pwd:'',
			email:''
		}
		$rootScope.mydeltimer=''
		$rootScope.doInvestRefresh=false;
	 	$rootScope.Number=Number;
		$rootScope.exitDisplay=true;
		$rootScope.modalFlag=true;
//		$rootScope.investHref=false;
		$rootScope.callphone=function(){
			if($cordovaDevice.getPlatform()!='Android'){
				phonedialer.dial("4000351924", function(err) {
	            if (err == "feature")
						$cordovaToast.showShortBottom("您已取消拨打电话.")
		            if (err == "empty")
	//	                alert();
						$cordovaToast.showShortBottom("不能识别的电话号码")
				});
			}
			
		}
		$rootScope.invaildTel=function(e){
			if(!angular.element(e.currentTarget).val())
			{
				angular.element(e.currentTarget).siblings('.telInvaild').html('手机号不能为空!').css('display','block')
			}else if(!(/^1[34578]\d{9}$/.test(angular.element(e.currentTarget).val()))){
				angular.element(e.currentTarget).siblings('.telInvaild').html('手机号输入有误!').css('display','block')
			}else{
				angular.element(e.currentTarget).siblings('.telInvaild').css('display','none')
			}

		}
		$rootScope.invaildUser=function(e){
			if(!angular.element(e.currentTarget).val())
			{
				angular.element(e.currentTarget).siblings('span.usererr').html('请输入用户名!').css('display','block')
			}else if(angular.element(e.currentTarget).val().length<3 ){
				angular.element(e.currentTarget).siblings('span.usererr').html('长度不得少于3').css('display','block')
			}else if(angular.element(e.currentTarget).val().length>15){
				angular.element(e.currentTarget).siblings('span.usererr').html('长度不得超过15').css('display','block')
			}else{
				angular.element(e.currentTarget).siblings('span.usererr').css('display','none')
			}

		}
		$rootScope.invaildNull=function(e){
			if(angular.element(e.currentTarget).val())
			{
				angular.element(e.currentTarget).siblings('span.usererr').css('display','none')
			}else{
				angular.element(e.currentTarget).siblings('span.usererr').css('display','block')
			}
		}
		$rootScope.invaildAgainPass=function(e){
			if(angular.element(e.currentTarget).val())
			{
				if(angular.element('._pass').val()!=angular.element(e.currentTarget).val())
				{
					angular.element(e.currentTarget).siblings('span.usererr').html('两次密码不一致!').css('display','block')
				}else{
					angular.element(e.currentTarget).siblings('span.usererr').css('display','none')
				}
				
			}else{
				angular.element(e.currentTarget).siblings('span.usererr').html('请再次输入密码!').css('display','block')
			}
		}
		$rootScope.invaildRefer=function(e){
			if(angular.element(e.currentTarget).val())
			{
				if(!(/^1[34578]\d{9}$/.test(angular.element(e.currentTarget).val())))
				{
					angular.element(e.currentTarget).siblings('span.usererr').css('display','block')
				}else{
					angular.element(e.currentTarget).siblings('span.usererr').css('display','none')
				}
				
			}
		}
		
		
		$rootScope.focusFun=function(e){
			angular.element(e.currentTarget).siblings('span.usererr').css('display','none')
		}
		
		$rootScope.$on('$stateChangeStart', 
		    function(event, toState, toParams, fromState, fromParams) {
		    	// 解决账户tab的点击 bug

				if(toState.url=='/account'){
					if($rootScope.data.pwd){
						angular.element('#tabsFixed2').css('display','block')
					}
				}
				
				if(toState.url=='/details' && fromState.url=='/trial'){
			       		webapp_deal_detailsFun();
				}
				
				if(fromState.url=='/ContactService'){
					$$('textarea').blur();
					$$('input').blur();
					alert($$('textarea').length)
					alert($$('input').length)
				}
				if(toState.url=='/forgetPass'){
					angular.element('.registerClass input').val("")
					angular.element('.forgetPassClass input').val("")

				}
				/*if(fromState.url=='/forgetPass'){
					if(fortimerHandler){
						$interval.cancel(fortimerHandler);
					}
				}
				
				if(fromState.url=='/ACCSetPayPass'){
					if($rootScope.mydeltimer){
						$interval.cancel($rootScope.mydeltimer);
					}
				}*/
				
				
				
				if(toState.url=='/reg'){
					angular.element('.registerClass input').val("")
					angular.element('.forgetPassClass input').val("")
					if(fromState.url!='/addset' && fromState.url!='/accountlogin' && fromState.url!='/accset'){
						/*if(fromState.url=='/invest' && $rootScope.investHref)
						{
							$rootScope.investHref=false;
						}else{*/
							event.preventDefault() //可以阻止模板解析
			       			$state.go("tab.accountlogin")
//						}
						
					}
				}
				if(fromState.url=='/reg2'){
					if(!$rootScope.RecommendIs)
					{
						$rootScope.RecommendIs=true;
						$rootScope.RecommendCode=''
					}
				}
				
				if(toState.url=='/reg2')
				{
					if(fromState.url!='/addset'){
						event.preventDefault() //可以阻止模板解析 
						$state.go("tab.invest");
					}
					
				}
				
				if(fromState.url=='/account'){
					angular.element('#tabsFixed2').css('display','none')
				}
				/*if(fromState.url=='/accountlogin'){
					angular.element('.showcase-form #password').val('')
				}*/
				
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
					}else{
						if(angular.element('#password').val()&&angular.element('#username').val())
						{
							angular.element('.login-buttons').addClass('showLoginBtn')
						}else{
							angular.element('.login-buttons').removeClass('showLoginBtn')
						}
						if($rootScope.data.email!=""){
							var reg = /^(.).+(.)$/g;
							var str = $rootScope.data.email;
							angular.element('#username').attr('content',str)
							angular.element('#username').val(str.replace(reg, "$1*$2"))
						}
						
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
					angular.element('#loading').css('display','block')
					 $http.post(urltext+'/index.php?ctl=webapp_recommend',{bid:$rootScope.logindata.id})
						.success(function(res){
							angular.element('#loading').css('display','none')
							$rootScope.recommendtitle=res.program_title;
							angular.element('.recommend').css({'background':'url('+urltext+res.url+') no-repeat center','background-size': '100% 100%'});
					   })
				}
				// 应用设置页面  点击账户页   跳转到   设置页的   bug问题
				if(toState.url=='/accset'&& fromState.url!='/account'){
					if(fromState.url!='/aboutus2'){
						event.preventDefault() //可以阻止模板解析 
						$state.go("tab.accountlogin")
					}
					
				}
				if(toState.url=='/addset'){
					if($rootScope.data.pwd==''){
						$rootScope.exitDisplay=false;
					}else{
						$rootScope.exitDisplay=true;
					}
					$rootScope.aboutusDis=true;
					
				}
				/*if(toState.url=='/addset'){
					if(fromState.url!='/invest')
					{
						event.preventDefault() //可以阻止模板解析 
						$state.go("tab.invest")
					}
				}*/
				if(toState.url=='/accset'){
					if($rootScope.data.pwd==''){
						$rootScope.exitDisplay=false;
					}else{
						$rootScope.exitDisplay=true;
					}
					$rootScope.aboutusDis=false;
				}
				
				
				
			

				// 点击 投资tab  判断当前是 登录状态还是未登录状态
				if(toState.url=='/invest'){

				
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
									  $cordovaInAppBrowser.open(domainUrl+"/yjy_P2P.apk", '_system', options)
									      .then(function(event) {
									        //alert('success')
									      })
									      .catch(function(event) {
									        //alert('error')
									      });
						        }
						       },
						       {
						         text: '<a>取消</a>'
						       }
						     ]
						   });
						}
					angular.element('#loading').css('display','block')
					if($rootScope.data.pwd){
						$rootScope.outshow=false;
						$rootScope.inshow=true;

						  $http.post(urltext + '/index.php?ctl=webapp_index_deal', "")
							.success(function(res) {

 								$rootScope.errorShow=false
								angular.element('#loading').css('display','none')
								$rootScope.inshowlist = res; //加载数据中
								$ionicSlideBoxDelegate.update(); //刷新页面
								$cordovaSplashscreen.hide();
							}).error(function(e) {
//								layer.close(index)
								angular.element('#loading').css('display','none')
								if($cordovaNetwork.isOffline())
								{
									$rootScope.errorShow=true
								}
								
							})
					}else{
						$rootScope.outshow=true;
						$rootScope.inshow=false;
							//未登录
							$http.post(urltext + '/index.php?ctl=webapp_index',"")
							.success(function(res) {
//								layer.close(index)
								angular.element('#loading').css('display','none')
								 $rootScope.errorShow=false
								$rootScope.outshowlist = res.list; //加载数据中
								$rootScope.advantage = res.advantage; //加载数据中
				
								$rootScope.appVersion=res.android_version;
								
								
								$ionicSlideBoxDelegate.update(); //加载数据中
								$cordovaSplashscreen.hide();
								
								document.addEventListener('deviceready', function onDeviceReady(){
									
									$cordovaAppVersion.getVersionNumber().then(function (version) {
								    	$rootScope.version= version;
								    	if($rootScope.version < $rootScope.appVersion && $rootScope.flagInit) {
								    		$rootScope.flagInit=false;
											$rootScope.showPopup()
										}
								    });	
								    if ($cordovaDevice.getPlatform()=='Android') {
									    StatusBar.backgroundColorByHexString("#000");  
									}else{  
									    $cordovaStatusbar.overlaysWebView(false);  
									    $cordovaStatusbar.style(1);  
									    StatusBar.styleLightContent();  
									    $cordovaStatusbar.styleColor('black');  
									}  
								})
							})
							.error(function(e) {
//								layer.close(index)
								angular.element('#loading').css('display','none')
								if($cordovaNetwork.isOffline()){
									$rootScope.errorShow=true
								}
								
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
                e.preventDefault();
                $ionicHistory.goBack();
                $cordovaToast.showShortBottom('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
           
            return false;
        }, 101);
    })
//登录注册
.controller('LoginCtrl', function($rootScope,$scope, $http,$ionicSlideBoxDelegate,$ionicTabsDelegate,$state,$timeout,$location,$cordovaToast,locals) {
		$scope.visablePwdDis='password';
		if(locals.get("userName")){
			var reg = /^(.).+(.)$/g;
			var str = locals.get("userName");
			angular.element('#username').attr('content',str)
			$scope.z_username=str.replace(reg, "$1*$2")
		}
		$scope.inputChangeFun=function(e){
			angular.element('#username').attr('content',null)
		}
		$scope.inpoutKeyFun=function(e){
			e=angular.element(e.target);
			var jqname=angular.element('#username');
			var jqpass=angular.element('#password');
			var jqbutton=angular.element('.login-buttons')
			if(e.val()){
				if(e.attr('id')=='username'){
					if(jqpass.val())
					{
						jqbutton.addClass('showLoginBtn')
					}else{
						jqbutton.removeClass('showLoginBtn')
					}
				}else if(e.attr('id')=='password'){
					if(jqname.val())
					{
						jqbutton.addClass('showLoginBtn')
					}else{
						jqbutton.removeClass('showLoginBtn')
					}
				}
			}else{
					jqbutton.removeClass('showLoginBtn')
				}
		}

		$scope.inpoutFocusFun=function(e){
			angular.element(e.currentTarget).siblings('.clearInputBtn').css('display','block')
		}
	
		$scope.inpoutBlurFun=function(e){
			angular.element(e.currentTarget).siblings('.clearInputBtn').css('display','none')
		}

		$scope.clearInputBtnFun=function(e){
//			var silinput=angular.element(e.currentTarget).siblings('input')
//			silinput.val('')
			$scope.z_username=''
			angular.element(e.currentTarget).siblings('input').val('')
			angular.element('.login-buttons').removeClass('showLoginBtn')
		}
		
		$scope.visibleInputBtnFn=function(e){
			e=angular.element(e.currentTarget)
			if($scope.visablePwdDis=='text'){
				e.find('span').css('background','#ddd')
//				angular.element('#password').attr('type','password')
				$scope.visablePwdDis='password';
//				e.attr('visable','')
			}else{
//				angular.element('#password').attr('type','text')
				$scope.visablePwdDis='text';
				e.find('span').css('background','#0AE')
//				e.attr('visable','true')
			}
		}
	
		$rootScope.urltext = 'https://www.yijiayi360.com'
//		$rootScope.urltext = 'http://test.yijiayi360.com'
		$scope.goReg = function() {
			$state.go("tab.reg")
		}
		$scope.login = function() {
			
			var jqusername=angular.element('#username')
//			var jqpwd=angular.element('#password')
			if(!$scope.z_username && !angular.element(e.currentTarget).siblings('input').val())
			{
				$cordovaToast.showLongBottom('请输入用户名')
				return '';
			}else if(!$scope.z_pwd){
				$cordovaToast.showLongBottom('请输入密码')
				return '';
			}
			angular.element('#loading').css('display','block')
			var val=''
			if($scope.z_username.indexOf('*')>0){
				if(jqusername.attr('content'))
				{
					val=jqusername.attr('content')
				}else{
					val=$scope.z_username 
				}
			}else{
				val=$scope.z_username
			}

			var mydata = { //传输数据
				"email": val,//用户名
				"pwd": $scope.z_pwd    //密码
			}

			var postdata=mydata.email//登录传输的数据
			$http.post(urltext + '/index.php?ctl=webapp_login', mydata)
				.success(function(response) {
					angular.element('#loading').css('display','none')
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

						locals.set("userName",mydata.email)
						/*$rootScope.inshow=true;
						$rootScope.outshow=false;*/
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
								$rootScope.idcardpassed=res.idcardpassed//实名认证
								angular.element('#loading').css('display','none')
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
								$scope.z_pwd=''
							
								$state.go('tab.account')
						})
							
					}
					if(response.user_login_status == 0){
						angular.element('#loading').css('display','none')
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

	if(!$rootScope.forDescription){
		$rootScope.forDescription="获取验证码";
	}else{
		if($rootScope.forDescription=="获取验证码"){
			angular.element('#forgetObtain').css('background','#0AE')
		}
		if($rootScope.forDescription!="获取验证码"){
			angular.element('#forgetObtain').css('background','#CCCCCC')
		}
	}
	
	$scope.codeDisable=false;
	
	
	$scope.getCode=function(){
	
		if(!$scope.codeDisable)
		{
				if(!angular.element('#forgetTel').val()){
					angular.element('#forgetTel').siblings('span.usererr ').html('请输入手机号！').css('display','block')
					return ''
				}else if(!(/^1[34578]\d{9}$/.test(angular.element('#forgetTel').val()))){
						angular.element('#forgetTel').siblings('span.usererr ').html('手机号输入有误！').css('display','block')
						return ''
				}
				
				$scope.codeDisable=true;
				angular.element('#loading').css('display','block')
						

				$http.post(urltext + '/index.php?ctl=webapp_send_reset_pwd_code',{mobile:angular.element('#forgetTel').val()}) 
					.success(function(res) {
						angular.element('#loading').css('display','none')
						if(res.response_code==0)
						{
								$cordovaToast.showLongBottom(res.show_err)
								$scope.codeDisable=false;
								
						}else{	
								var count=60;
								angular.element('#forgetObtain').css('background','#CCCCCC')
								$rootScope.forDescription = count-- +'s';
								$interval.cancel(fortimerHandler);
								fortimerHandler=$interval(function() {
									$rootScope.forDescription = count-- +'s';
									if(count==-1)
									{
										
										$scope.codeDisable=false;
										$rootScope.forDescription='获取验证码';
										$interval.cancel(fortimerHandler)
										 count=60;
										angular.element('#forgetObtain').css('background','#0AE') 
									}
							 	}, 1000)
								$cordovaToast.showLongBottom('验证码已经发送，请注意查收')
						}
				})
				
		}
	
	}
	$scope.goSumbit=function(){
			if(!angular.element('#forgetTel').val()){
//				$cordovaToast.showShortBottom('请输入手机号')
				angular.element('#forgetTel').siblings('span.usererr ').html('请输入手机号！').css('display','block')
				return ''
			}else if(!(/^1[34578]\d{9}$/.test(angular.element('#forgetTel').val()))){
					angular.element('#forgetTel').siblings('span.usererr ').html('手机号输入有误！').css('display','block')
					return ''
			}else if(!angular.element('#forgetCode').val()){
//				$cordovaToast.showShortBottom('请输入验证码')
				angular.element('#forgetCode').siblings('span.usererr ').html('请输入验证码！').css('display','block')
				return ''
			}else if(!angular.element('#forgetPass').val()){
//				$cordovaToast.showShortBottom('请输入新密码')
				angular.element('#forgetPass').siblings('span.usererr ').html('请输入新密码！').css('display','block')
				return ''
			}else if(!angular.element('#forgetPass2').val()){
				angular.element('#forgetPass2').siblings('span.usererr ').html('请再次输入新密码！').css('display','block')
				return ''
			}else if(angular.element('#forgetPass').val()!=angular.element('#forgetPass2').val()){
				angular.element('#forgetPass2').siblings('span.usererr ').html('两次密码不一致！').css('display','block')
				return ''
			}
		

			angular.element('#loading').css('display','block')
			var regData={
				user_pwd:angular.element('#forgetPass').val(),
				user_pwd_confirm:angular.element('#forgetPass2').val(),
				mobile:angular.element('#forgetTel').val(),
				mobile_code:angular.element('#forgetCode').val()
			}
			$http.post(urltext + '/index.php?ctl=webapp_save_reset_pwd',regData) 
				.success(function(res) {
					angular.element('#loading').css('display','none')
					/*$scope.codeDisable=false;
					$rootScope.forDescription='获取验证码';
					$interval.cancel(fortimerHandler)
					count=60;
					angular.element('#forgetObtain').css('background','#0AE') */
					if(res.response_code==0)
					{
						$cordovaToast.showLongBottom(res.show_err)
					}else if(res.response_code==1)
					{
						  $cordovaToast.showShortBottom('重置密码成功，正在跳转登录界面').then(function(success) {
						    $state.go('tab.accountlogin')
						  }, function (error) {
						    // error
						  });
					}
					
			})

		
	
	}
})
.controller('RegCtrl', function($http,$state,$scope,$interval,$timeout,$rootScope,$cordovaToast,$ionicModal,$stateParams) {
	

	
	$ionicModal.fromTemplateUrl('templates/modal.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modal = modal;
	});

	$scope.wzfuxygo=function(){
		angular.element('.regXy').removeClass('none')
	}
	$scope.xYhide=function(){
		angular.element('.regXy').addClass('none')
	}
	if(!$rootScope.description){
		$rootScope.description="获取验证码";
	}else{
		if($rootScope.description=="获取验证码"){
			angular.element('#regGain').css('background','#0AE')
		}
		if($rootScope.description!="获取验证码"){
			angular.element('#regGain').css('background','#CCCCCC')
		}
	}
	
	
	
	$scope.codeDisable=false
	var count=60;
	
//	$scope.legitimate=false;
	$scope.getCode=function(){
		
		if(!$scope.codeDisable)
		{
			if(!angular.element('#reg_tel').val()){
				angular.element('#reg_tel').siblings('span.usererr').html('请输入手机号！').css('display','block')
				return ''
			}else if(angular.element('#reg_tel').val() && !(/^1[34578]\d{9}$/.test(angular.element('#reg_tel').val()))){
					angular.element('#reg_tel').siblings('span.usererr ').html('手机号输入有误！').css('display','block')
					return ''
			}
			$scope.codeDisable=true;
			angular.element('#loading').css('display','block')
			
			$http.post(urltext + '/index.php?ctl=webapp_getcode',{mobile:angular.element('#reg_tel').val()}) 
				.success(function(res) {
					angular.element('#loading').css('display','none')
					if(res.response_code==0)
					{
						$scope.codeDisable=false
						$cordovaToast.showLongBottom(res.show_err)
					}else{
						angular.element('#regGain').css('background','#CCCCCC')
						$rootScope.description = count-- +'s';
						$interval.cancel(regtimerHandler);
						regtimerHandler=$interval(function() {
							$rootScope.description = count-- +'s';
							if(count==-1)
							{
								$scope.codeDisable=false
								$rootScope.description='获取验证码';
								angular.element('#regGain').css('background','#0AE')
								$interval.cancel(regtimerHandler);
								count=60;
							}
						 }, 1000)
						$cordovaToast.showLongBottom('验证短信已经发送，请注意查收')
					}
			})
			
		}

	}
	
	
	
	$scope.goRegister=function(){
				if(!angular.element('#reg_name').val()){
					angular.element('#reg_name').siblings('span.usererr ').html('请输入用户名！').css('display','block')
					return ''
				}else if(angular.element('#reg_name').val().length<3){
					angular.element('#reg_name').siblings('span.usererr').html('长度不得少于3').css('display','block')
					return ''
				}else if(angular.element('#reg_name').val().length>15){
					angular.element('#reg_name').siblings('span.usererr').html('长度不得超过15').css('display','block')
					return ''
				}else if(!angular.element('#reg_pass').val()){
					angular.element('#reg_pass').siblings('span.usererr ').html('请输入密码！').css('display','block')
					return ''
				}else if(!angular.element('#reg_pass2').val()){
					angular.element('#reg_pass2').siblings('span.usererr ').html('请再次输入密码！').css('display','block')
					return ''
				}else if(angular.element('#reg_pass2').val() && angular.element('#reg_pass').val()!=angular.element('#reg_pass2').val()){
						angular.element('#reg_pass2').siblings('span.usererr ').html('两次密码不一致！').css('display','block')
						return ''
				}else if(!angular.element('#reg_tel').val()){
					angular.element('#reg_tel').siblings('span.usererr').html('请输入手机号！').css('display','block')
					return ''
				}else if(angular.element('#reg_tel').val() && !(/^1[34578]\d{9}$/.test(angular.element('#reg_tel').val()))){
						angular.element('#reg_tel').siblings('span.usererr ').html('手机号输入有误！').css('display','block')
						return ''
				}else if(!angular.element('#reg_code').val()){
					angular.element('#reg_code').siblings('span.usererr ').html('请输入验证码！').css('display','block')
					return ''
				}
				var refer=''
				
				if($rootScope.RecommendIs){
				    refer=angular.element('#reg_refer').val();
				    if(refer&&!(/^1[34578]\d{9}$/.test(refer)))
					{
//						angular.element('#reg_tel')[0].focus();
						angular.element('#reg_refer').siblings('span.usererr').css('display','block')
//						$cordovaToast.showShortBottom('请输入有效的手机号码！')
						return '';
					}
				}else{
					refer=$rootScope.RecommendCode
				}
				//	referer  推荐人
				angular.element('#loading').css('display','block')
				var regData={
					user_name:angular.element('#reg_name').val(),
					user_pwd:angular.element('#reg_pass').val(),
					user_pwd_confirm:angular.element('#reg_pass2').val(),
					mobile:angular.element('#reg_tel').val(),
					mobile_code:angular.element('#reg_code').val(),
					referer:refer
				}
				$http.post(urltext + '/index.php?ctl=webapp_register',regData) 
					.success(function(res) {
						angular.element('#loading').css('display','none')
						/*$scope.codeDisable=false
						$interval.cancel(regtimerHandler);
						count=60;
						$rootScope.description='获取验证码';
						angular.element('#regGain').css('background','#0AE')*/
						
						if(res.user_login_status==0)
						{
							$cordovaToast.showLongBottom(res.show_err)
							
						}else if(res.user_login_status==1)
						{
							  $cordovaToast.showShortBottom('注册用户成功，正在跳转登录界面').then(function(success) {
							   	$state.go('tab.accountlogin')
							  }, function (error) {
							  });
						}
						
				})

	}
             

})
//未登录

.controller('AdCtrl', function($scope,$state, $rootScope, $location,$http, $ionicSlideBoxDelegate, $timeout, $interval,$cordovaSplashscreen,$cordovaNetwork,$ionicLoading,$ionicHistory) {
	$rootScope.flagAd = false;
	$scope.stateUrl = 'tab.invest'
	var countdowns = 1;
	$scope.countdown = countdowns;
	var query = new Object();
	window.location.href = "#/tab/invest"; //跳到投资页面
	
	
	document.addEventListener("deviceready", function () {
	     	if($cordovaNetwork.isOffline())
			{
				$ionicLoading.show({ 
				  template: '亲，您的数据连接已断开'
			    });
			}else{
				window.location.href = "#/tab/invest"; //跳到投资页面
			}
	})
	
	document.addEventListener('deviceready', function onDeviceReady(){
		 $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
//		      $state.go("Ad");
		      $ionicLoading.show({ 
				  template: '亲，您的数据连接已断开'
			    });
		 })
		  $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
			   		$ionicLoading.hide();
                    if($location.path()=='/Ad')
                     {
                        window.location.href = "#/tab/invest"; //跳到投资页面
                     }

			   })
		 
	},false)


 

})

//tab投资


.controller('InvestCtrl', function($scope,$sce, $rootScope, $ionicHistory, $location,$cordovaInAppBrowser, $http, $ionicSlideBoxDelegate,$ionicTabsDelegate, $state, $timeout,$stateParams) {





//  登录首页数据请求
$rootScope.errorShow=false

	$rootScope.backLogin=function(){
		$state.go('tab.accountlogin')
	}
	$rootScope.backIndex=function(){
		$state.go('tab.invest')
	}
	$rootScope.backInvest=function(){
		$state.go('tab.invest')
	}
//全局返回按钮
	$rootScope.backTab = function() {
		$ionicHistory.goBack();
	};
	$rootScope.goYjSchool=function(){
		$state.go('tab.school')
	}
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
	angular.element('#loading').css('display','block')
	
	webapp_deal_detailsFun=function(){
			$http.post(urltext +"/index.php?ctl=webapp_deal_details",DetailData)
			.success(function(res){
				
				angular.element('#loading').css('display','none')
				console.log(res)
				$rootScope.detailId=res.id;
				$rootScope.deis_faved=res.is_faved
				console.log($rootScope.deis_faved)
				if($rootScope.deis_faved==0){
					angular.element("#heart").css("background-image","url('img/heart.png')")
					$rootScope.concern="未关注"
				}else if($rootScope.deis_faved>0){
					angular.element("#heart").css("background-image","url('img/follownow.png')")
					$rootScope.concern="已关注"
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
					$rootScope.dedescription= $sce.trustAsHtml('<span style=" color: #0AE;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的项目描述信息</span>')
		
				}else{
		//			angular.element('#DEdescription').html($rootScope.dedescription)
					$rootScope.dedescription=res.description
				}
				
				//企业信息
		//		$rootScope.derisk_certifications=res.risk_certifications
				if(res.risk_certifications=='')
				{
					$rootScope.derisk_certifications= $sce.trustAsHtml('<span style="color: #0AE;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的企业信息</span>');
				}else{
		//			angular.element('#DErisk_certifications').html($rootScope.derisk_certifications)
					$rootScope.derisk_certifications=res.risk_certifications
				}
				
				//风控保障risk_certifications 企业信息
				
		
		//		$rootScope.derisk_security=res.risk_security
				if(res.risk_security=='')
				{
					$rootScope.derisk_security=$sce.trustAsHtml('<span style="color: #0AE;line-height: 7rem;text-align: center;margin: 0 auto;width: 100%;display: block;">当前没有可查看的风险保障信息</span>')
		//			angular.element('#DErisk_security').html('<span id="desPageNull">当前没有可查看的企业信息</span>')
				}else{
		//			angular.element('#DErisk_security').html($rootScope.derisk_security)
					$rootScope.derisk_security=res.risk_security
				}
		//		angular.element('#DErisk_security').html($rootScope.derisk_security)
				
				
			})
	}
	webapp_deal_detailsFun();
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
			if($rootScope.data.pwd==""){
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
			$state.go("tab.silkBag",{aaa:'wosss'});
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
//		window.location.href = "#/tab/ContactService";
		$http.post(urltext + "/index.php?ctl=webapp_service","")
		.success(function(res){
			console.log(res)
			var str = res; 
            var hrefUrl = str.slice(1,res.length-1).replace(/\\/g,"");
            console.log(hrefUrl)
            $scope.hrefUrl=hrefUrl
            $rootScope.paySrc = $sce.trustAsResourceUrl( $scope.hrefUrl); 
             var options = {
		      location: 'yes',
		      clearcache: 'yes',
		      toolbar: 'no'
		    };
	  		$cordovaInAppBrowser.open(hrefUrl, '_system', options)
		      .then(function(event) {
		      })
		      .catch(function(event) {
		      });
	    })
		$rootScope.showC = false;
	}
//应用设置
	$scope.goSetting = function() {
		
		$state.go('tab.addset')
//		window.location.href= "#/tab/addset";
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
	
	
.controller('silkBagCtrl', function($scope,$stateParams,$rootScope) {})

	
//签到有礼
.controller('signinMineCtrl', function($scope) {})
//行业动态
.controller('industryCtrl', function($scope,$http,$rootScope,$state,$sce) {
	angular.element('#loading').css('display','block')
	var index=1;
	var data={'page':index};
	$http.post(urltext + "/index.php?ctl=webapp_viewpoint",data)
	.success(function(res){
		angular.element('#loading').css('display','none')
		console.log(res)
		$scope.industryList=res.list
		$scope.program_title=res.program_title
	})	  
		  $scope.doRefresh = function() {

		  		 $scope.industryList = [];
		  		 $scope.currentPage=1;
				 $scope.noMorePage=false;
				 $http.post(urltext + "/index.php?ctl=webapp_viewpoint",data)
			     .success(function(res) {
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
			    $http.post(urltext + "/index.php?ctl=webapp_viewpoint",{page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
			        .success(function(newItems) {
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
		angular.element('#loading').css('display','block')
//		angular.element('#dynaContent').html("")
			$scope.MyDetailData={'id':id}
			$http.post(urltext + "/index.php?ctl=webapp_article",$scope.MyDetailData)
			.success(function(res){
				angular.element('#loading').css('display','none')
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
	
	angular.element('#loading').css('display','block')
	$http.post(urltext + "/index.php?ctl=webapp_help",data)	
		.success(function(res){
			angular.element('#loading').css('display','none')
			$scope.program_title=res.program_title
			$scope.schoolList=res.list
		})
	
  	$scope.doRefresh = function() {
  		 $scope.schoolList = [];
  		 $scope.currentPage=1;
		 $scope.noMorePage=false;
		 $http.post(urltext + "/index.php?ctl=webapp_help",data)
	     .success(function(res) {
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
	    $http.post(urltext + "/index.php?ctl=webapp_help",{page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
	        .success(function(newItems) {
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
		angular.element('#loading').css('display','block')

			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':id})
			.success(function(res){
				angular.element('#loading').css('display','none')
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
.controller('settingsCtrl', function($http,$cordovaToast,$stateParams,$sce,$scope,$rootScope,$timeout,$state,$cordovaDevice,$cordovaAppVersion,$cordovaInAppBrowser,$cordovaBarcodeScanner) {
	$cordovaAppVersion.getVersionNumber().then(function (version) {
    	$scope.currentVersion= version;
    });
	$scope.SignOut=function(){
		$rootScope.modalFlag=true;
		$rootScope.data.pwd='';
//		$rootScope.data.email="";
		$rootScope.inshow=false;
		$rootScope.outshow=true;
		angular.element('#password').val('')
		$state.go("tab.invest")
	}
	$scope.aboutUs=function(){
			$state.go("tab.aboutus")
			angular.element('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':66})
			.success(function(res){
				angular.element('#loading').css('display','none')
				console.log(res)
//				$rootScope.aboutustitle=res.title
				$rootScope.aboutusProgram=res.title
				$rootScope.aboutusContent=$sce.trustAsHtml(res.content.replace(/<img src="/g,'<img style="width:100%;" src="'+urltext))//查找替换

			})
	}
	$scope.aboutUs2=function(){
			$state.go("tab.aboutus2")
			angular.element('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_article",{'id':66})
			.success(function(res){
				angular.element('#loading').css('display','none')
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
						$cordovaToast.showLongBottom('清除缓存成功')
			        }
			        var error = function(status) {
						$cordovaToast.showLongBottom('清除缓存失败' )
			        }
			        window.cache.clear( success, error );
			},false);
			
	}
	$rootScope.goUpdataApp=function(){
	
		if($rootScope.version>=$rootScope.appVersion){
			$cordovaToast.showLongBottom('当前已是最新版本');
		}else{
			var str=''
			if($cordovaDevice.getPlatform()=='Android'){	
					$rootScope.showPopup()
			}else{
				// ios 链接地址
				str='itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1232129295'
				 var options = {
				      location: 'yes',
				      clearcache: 'yes',
				      toolbar: 'no'
				    };
				  $cordovaInAppBrowser.open(str, '_system', options)
				      .then(function(event) {
				      })
				      .catch(function(event) {
				      });
			}
		   
		}
	}
	$scope.encourage=function(){
		var str=''
		if($cordovaDevice.getPlatform()=='Android'){
			str='market://details?id=com.szqhyijiayi.sxyijiayi'
		}else{
			// ios 链接地址
			str='itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1232129295'
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
	$scope.scanCan=true;
	$scope.goScan=function(){
//		$state.go("tab.reg2")
		    document.addEventListener("deviceready", function () {

		    		$cordovaBarcodeScanner
				      .scan()
				      .then(function(barcodeData) {
					      	if(barcodeData.text && (/^1[34578]\d{9}$/.test(barcodeData.text))){
					       		$rootScope.RecommendCode=barcodeData.text;
					       		$rootScope.RecommendIs=false;
								$state.go("tab.reg2")
					       }   
				      }, function(error) {
				      	$cordovaToast.showLongBottom('请先设置允许医加医访问相机');
				      });				    
		  }, false);
	}
})

//tab动态
.controller('DynamicCtrl', function($scope,$cordovaToast ,$http, $timeout,$sce, $ionicLoading, $state,$rootScope,$ionicSlideBoxDelegate) {
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
					if(toState.url=='/dynamic')
					{
						$http.post(urltext + "/index.php?ctl=webapp_dynamic", {"data":1})
							.success(function(res) {
								$scope.hasmore=true;
								console.log(res)
								$scope.lists = res.list
								$scope.$broadcast("scroll.refreshComplete"); //请求到数据刷新页面。
							})
//							$scope.moredata = false
						}
	})
		$scope.lists = [];
	    $scope.hasmore = true;
	    var loadIndex=1;
	    loadajax();

		$scope.loadMore = function () { 
	    loadIndex++;
	      loadajax(); 
	    }
		function loadajax() {
		var loaddata = {
				'page': loadIndex
			}
	      $http.post(urltext + "/index.php?ctl=webapp_dynamic", loaddata)
	      .success(function (res) {
	      	console.log(res.list)
	        if (res.list.length == 0) { 
	          $scope.hasmore = false;
	          console.log('meiyoufengduoshuju ')
	          $cordovaToast.showShortBottom("没有更多数据")
			  /*$ionicLoading.show({ 
				template: '最后一条数据'
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 500)*///这里判断是否还能获取到数据，如果没有获取数据，则不再触发加载事件
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
						$scope.hasmore=true;
						console.log(res)
						$scope.lists = res.list
						$scope.$broadcast("scroll.refreshComplete"); //请求到数据刷新页面。
					})
//				$scope.moredata = false
		}
		
		//点击动态内容查看详情
		$scope.goDynaDetail=function(id){
			angular.element('#loading').css('display','block')
//			angular.element('#dynaContent').html("")
			$scope.MyDetailData={'id':id}
			$http.post(urltext + "/index.php?ctl=webapp_article",$scope.MyDetailData)
			.success(function(res){
				angular.element('#loading').css('display','none')
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
.controller('AccountCtrl', function($scope, $rootScope, $http, $state,$ionicModal,$timeout) {
	$scope.accgoRealName = function (){
		$scope.safemodal.hide();
		$timeout(function(){
			window.location = "#/tab/goRealName";
		},200)
	}	
	
	
	$ionicModal.fromTemplateUrl('templates/safemodal.html', {
	    scope: $scope
		}).then(function(modal) {
		    $scope.safemodal = modal;
		});
	if($rootScope.modalFlag)
	{
		var a=$timeout(function(){
			if($rootScope.idcardpassed==0 ){
				$scope.safemodal.show()
			}
			$timeout.cancel(a);
		},500)
		
		$rootScope.modalFlag=false;
	}
	
	
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

			$http.post(urltext + '/index.php?ctl=webapp_uc_index',{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd}) 
							.success(function(res) {
								console.log(res);
								$rootScope.ips_acct_no=res.ips_acct_no;//托管账户
								$rootScope.vip_grade=res.vip_grade;//VIP等级
								$rootScope.idcardpassed=res.idcardpassed//实名认证
								angular.element('#loading').css('display','none')
								$rootScope.flag=true
								$rootScope.username=res.user_name;
								$rootScope.login_username=res.user_name;
								$rootScope.pBalance=res.pBalance;//可用余额
								$rootScope.totalent=res.totalent;//账户总额
								$rootScope.total_money_format=res.total_money_format;//现金奖励
								$rootScope.score=res.score;
								if(res.t_sign_data=='0'){
									$rootScope.t_sign_data='立即签到'
									angular.element('.btnmy .btn2').css('color','#fff')
								}else{
									$rootScope.t_sign_data='已签到'
									angular.element('.btnmy .btn2').css('color','#ffa200')
								}
								
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
			angular.element('.btnmy .btn2').css('color','#ffa200')
		}else{
			angular.element('.btnmy .btn2').css('color','#fff')
		}
		$scope.goSign=function(){
				if($rootScope.t_sign_data != '已签到')
				{
					$http.post(urltext + "/index.php?ctl=webapp_sign",{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd})
					.success(function(res){
						if(res.status==1)
						{
							$rootScope.t_sign_data='已签到'
							angular.element('.btnmy .btn2').css('color','#ffa200')
							$scope.do_refresher();
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
.controller('goRealNameCtrl',function($scope,$ionicModal,$rootScope,$http,$state,$ionicHistory,$timeout){
	$rootScope.realNameFunOk=function(){
		$rootScope.show_err.hide();
		if($scope.res_status==1)
		{
			$timeout(function(){
				$rootScope.backTab()
			},200)
		}
	}
	
	
	$scope.idnoAreal_name=function(){
		if(!$scope.real_name)
		{
			angular.element('.realName .name').css('display','block')
			return ''
		}else if(!$scope.idno){
			angular.element('.realName .idno').css('display','block')
			return ''
		}
		
		
		angular.element('#loading').css('display','block')
		var idnorealdata={
			'email':$rootScope.data.email,
			'pwd':$rootScope.logindata.user_pwd,
			'idno':$scope.idno,
			'real_name':$scope.real_name
		}
		console.log(idnorealdata)
		$http.post(urltext+"/index.php?ctl=webapp_register_idno",idnorealdata)
		.success(function(res){
			angular.element('#loading').css('display','none')
			$rootScope.showerr=res.show_err;
			$rootScope.show_err.show()
			$scope.res_status=res.status
	
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
	    scope: $rootScope
	}).then(function(modal) {
	    $rootScope.show_err = modal;
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

//	angular.element(e.currentTarget).selectFlag=false;
	
	
	$scope.delSelected=function(e){
		if(selectDelDisplay)
		{
				
				if(angular.element(e.currentTarget).attr('selectFlag')){
					
					angular.element(e.currentTarget).attr('selectFlag','');
					
					e=angular.element(e.currentTarget).find('.raddioBtn')
					var val=true;
					for(var i=0;i<muselect.length;i++){
						if(muselect[i]==angular.element(e).attr("indexnow"))
						{
							val=false
						}
					}
					if(val)
					{
						muselect.push(angular.element(e).attr("indexnow"))
					}
					console.log('删掉选中的');
					angular.element(e).css({
						'background':'#0AE',
						border:0
					})
					angular.element(e).html('√');
					
				}else{
					angular.element(e.currentTarget).attr('selectFlag',true);
					e=angular.element(e.currentTarget).find('.raddioBtn')
					for(var i=0;i<muselect.length;i++){
						if(muselect[i]==angular.element(e).attr("indexnow"))
						{
							muselect.splice(i, 1);
						}
					}
					angular.element(e).css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					angular.element(e).html('');
					
				}
				if(muselect.length){
					  angular.element('.banneDel').css('display','block');
//					  angular.element('.piece').last().css('margin-bottom','1rem')
				}else{
					  angular.element('.banneDel').css('display','none');
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
			  		 angular.element('#loading').css('display','block')
			  		 $scope.currentPage=1;
        			 $scope.noMorePage=false;
        			 
					 $http.post(urltext + "/index.php?ctl=webapp_follow",myAttendata)
				     .success(function(res) {
				     angular.element('#loading').css('display','none')
				     angular.element("#refreshStyle").css("opacity","1")
				     $scope.attenItems = res.list;
				     // 刷新对删除 操作的影响
					selectDelDisplay=false;
					$scope.delItemFlags=true;
				 	angular.element('.piece .scale').css({
				 		'transform': 'scale(1)',
					    'position': 'static',
					    'marginTop': '0rem',
					    'right':' 0'
				 	})
				 	angular.element('.edit').html('编辑')
					angular.element('.raddioBtn').css('display','none');
					angular.element('.banneDel').css('display','none');
					angular.element('.piece').attr('selectFlag','true');
					angular.element('.raddioBtn').css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					angular.element('.raddioBtn').html('');
					muselect=[]

				     })
				     .finally(function() {
				       $scope.$broadcast('scroll.refreshComplete');
				     });
			  
			
		})
	}
	
	
	
	
	
	
	
		var delList=[] 
		var myAttendata = { //传输数据
						"email": $rootScope.data.email,//用户名$rootScope.data.email
						"pwd": $rootScope.logindata.user_pwd,    //密码
						"page" : 1
				}
			angular.element('#loading').css('display','block')
			$http.post(urltext + "/index.php?ctl=webapp_follow",myAttendata)
				.success(function(res){
					$scope.currentPage=1;
        			$scope.noMorePage=false;
					$scope.attenItems = res.list;
					angular.element('#loading').css('display','none')
					
			    })

			  $scope.attenItems = [];
			  $scope.doRefresh = function() {
				  	if(!$scope.delItemFlags)
				  	{
				  		$scope.$broadcast('scroll.refreshComplete');
				  		return '';
				  	}
			  		 $scope.currentPage=1;
        			 $scope.noMorePage=false;
					 $http.post(urltext + "/index.php?ctl=webapp_follow",myAttendata)
				     .success(function(res) {

				     $scope.attenItems = res.list;
				     // 刷新对删除 操作的影响
					selectDelDisplay=false;
					$scope.delItemFlags=true;
				 	angular.element('.piece .scale').css({
				 		'transform': 'scale(1)',
					    'position': 'static',
					    'marginTop': '0rem',
					    'right':' 0'
				 	})
				 	angular.element('.edit').html('编辑')
					angular.element('.raddioBtn').css('display','none');
					angular.element('.banneDel').css('display','none');
					angular.element('.piece').attr('selectFlag','true');
					angular.element('.raddioBtn').css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					angular.element('.raddioBtn').html('');
					muselect=[]

				     })
				     .finally(function() {
				       $scope.$broadcast('scroll.refreshComplete');
				     });
			  };

				$scope.currentPage=1;//定义下拉加载分页的初始值
				$scope.noMorePage=false;
				$scope.loadMore=function(){
					if(!$scope.delItemFlags)
				  	{
				  		$scope.$broadcast('scroll.infiniteScrollComplete'); 
				  		return '';
				  	}
				    $scope.currentPage += 1;//每当滚动到底部，页码累计加1

				    $http.post(urltext + "/index.php?ctl=webapp_follow",{email:$rootScope.data.email,pwd:$rootScope.logindata.user_pwd,page:$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
				        .success(function(newItems) {
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
			$scope.delItemFlags=true;
			$scope.delItem=function(){
				if($scope.delItemFlags)
				{
					angular.element("#refreshStyle").css("opacity","0")
					selectDelDisplay=true;
					$scope.delItemFlags=false
				 	angular.element('.piece .scale').css({
				 		'transform': 'scale(.94)',
					    'position': 'absolute',
					    'marginTop': '-0.2rem',
					    'right':' 0'
				 	})
					angular.element('.raddioBtn').css('display','block');
					angular.element('.edit').html('取消')
				}else{
					angular.element("#refreshStyle").css("opacity","1")
					selectDelDisplay=false;
					$scope.delItemFlags=true;
				 	angular.element('.piece .scale').css({
				 		'transform': 'scale(1)',
					    'position': 'static',
					    'marginTop': '0rem',
					    'right':' 0'
				 	})
				 	angular.element('.edit').html('编辑')
					angular.element('.raddioBtn').css('display','none');
					angular.element('.banneDel').css('display','none');
					angular.element('.piece').attr('selectFlag','true');
					angular.element('.raddioBtn').css({
						'background':'#fff',
						border:'1px solid #666666'
					})
					angular.element('.raddioBtn').html('');
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
		angular.element('#loading').css('display','block')
		var Cxdata={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"status":status,
			"dltid":dltid
		}
		console.log(Cxdata)
		$http.post(urltext +'/index.php?ctl=webapp_uc_carry_revoke_apply',Cxdata)
			.success(function(res){
				angular.element('#loading').css('display','none')
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_incharge_log',CZRecorddata)
			.success(function(res){
				czflagScroll=true;
				angular.element('#loading').css('display','none')
				$scope.CZRecordlists=res.list;
				if(!$scope.CZRecordlists.length){
					angular.element('.czBodyCon .pageNull').css('display','block')
				}else{
					angular.element('.czBodyCon .pageNull').css('display','none')
				}
		})
		
		$scope.czcurrentPage=2;
		angular.element('.czBodyCon').unbind('scroll')
		var czflagScroll=true;
		angular.element('.czBodyCon').scroll(function(){  
			
            var srollPos = angular.element('.czBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
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
//			                removeEvents(angular.element('.czBodyCon'),'scroll',czScroll);
								angular.element('.czBodyCon').unbind('scroll')
								czflagScroll=false;
			            } 
						
						if(!$scope.CZRecordlists.length){
							angular.element('.czBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.czBodyCon .pageNull').css('display','none')
						}     
			        })
            }  
        })
			
			
			
	}
	//提现
	function TXloadRecord(){
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_carry_money_log',TXRecorddata)
			.success(function(res){
				txflagScroll=true;
				angular.element('#loading').css('display','none')
				$scope.TXRecordlists=res.list;

						if(!$scope.TXRecordlists.length){
							angular.element('.txBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.txBodyCon .pageNull').css('display','none')
						}  
		})
		$scope.txcurrentPage = 2
		angular.element('.txBodyCon').unbind('scroll')
		var txflagScroll=true;
		angular.element('.txBodyCon').scroll(function(){
			
          var srollPos = angular.element('.txBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
//          totalheight = parseFloat(angular.element('.txBodyCon').height()) + parseFloat(angular.element('.txBodyCon').scrollTop());   
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
								angular.element('.txBodyCon').unbind('scroll')
								txflagScroll=false;
			            } 
			            
			           if(!$scope.TXRecordlists.length){
							angular.element('.txBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.txBodyCon .pageNull').css('display','none')
						}  
			        })
            }  
        })
	}
	//福利
	function FLloadRecord(){
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_account_log',FLRecorddata)
			.success(function(res){
				flflagScroll=true;
				angular.element('#loading').css('display','none')
				console.log(res)
				$scope.FLRecordlists= res.item;
				if(!$scope.FLRecordlists.length){
							angular.element('.flBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.flBodyCon .pageNull').css('display','none')
						}  
		   })
		
		
		$scope.flcurrentPage=2;
		angular.element('.flBodyCon').unbind('scroll')
		var flflagScroll=true;
		angular.element('.flBodyCon').scroll(function(){  
			
            var srollPos = angular.element('.flBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
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
//			                removeEvents(angular.element('.czBodyCon'),'scroll',czScroll);
								angular.element('.flBodyCon').unbind('scroll')
								flflagScroll=false;
								
			            } 
						
			            
			            if(!$scope.FLRecordlists.length){
							angular.element('.flBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.flBodyCon .pageNull').css('display','none')
						}      
			        })
            }  
        })
	}
	//积分
	function JFloadRecord(){
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_account_log',JFRecorddata)
			.success(function(res){
				jfflagScroll=true;
				console.log(res)
				angular.element('#loading').css('display','none')
				$scope.JFRecordlists=  res.item;
				if(!$scope.JFRecordlists.length){
							angular.element('.jfBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.jfBodyCon .pageNull').css('display','none')
						}  
		   })
		$scope.jfcurrentPage=2;
		angular.element('.jfBodyCon').unbind('scroll')
		var jfflagScroll=true;
		angular.element('.jfBodyCon').scroll(function(){  
			
            var srollPos = angular.element('.jfBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
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
//			                removeEvents(angular.element('.czBodyCon'),'scroll',czScroll);
								angular.element('.jfBodyCon').unbind('scroll')
								jfflagScroll=false;
			           } 
			           if(!$scope.JFRecordlists.length){
							angular.element('.jfBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.jfBodyCon .pageNull').css('display','none')
						}  
			        })
            }  
        })
	}
	//VIP
	VIPloadRecord=function(){
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_vip_buy_log',VIPRecorddata)
			.success(function(res){
				vipflagScroll=true;
				console.log(res)
				angular.element('#loading').css('display','none')
				$scope.VIPRecordlists= res.vip_buy_log_list;
				if(!$scope.VIPRecordlists.length){
							angular.element('.vipBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.vipBodyCon .pageNull').css('display','none')
						}  
		   })
		$scope.vipcurrentPage=2;
		angular.element('.vipBodyCon').unbind('scroll')
		var vipflagScroll=true;
		angular.element('.vipBodyCon').scroll(function(){  
			
            var srollPos = angular.element('.vipBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
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
//			                removeEvents(angular.element('.czBodyCon'),'scroll',czScroll);
								angular.element('.vipBodyCon').unbind('scroll')
								vipflagScroll=false;
			            } 
			            if(!$scope.VIPRecordlists.length){
							angular.element('.vipBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.vipBodyCon .pageNull').css('display','none')
						}  
			                
			        })
            }  
        })
	}
	//最后一个福利tab
	FLlastloadRecord=function (){
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_carry_moneyent_log',FLlastdata)
			.success(function(res){
				lflflagScroll=true;
				console.log(res)
				angular.element('#loading').css('display','none')
				$scope.FLlastlists= res.item;
				$scope.FLlastlistsss=  res.item[0];
				$rootScope.bank_id=res.bankid//储存
				if(!$scope.FLlastlists.length){
							angular.element('.lflBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.lflBodyCon .pageNull').css('display','none')
						}  
		   })
			var lflflagScroll=true;
		$scope.lflcurrentPage=2;
		angular.element('.lflBodyCon').unbind('scroll')
		angular.element('.lflBodyCon').scroll(function(){  
			
            var srollPos = angular.element('.lflBodyCon').scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
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
//			                removeEvents(angular.element('.czBodyCon'),'scroll',czScroll);
								angular.element('.lflBodyCon').unbind('scroll')
								lflflagScroll=false;
			            } 
			            if(!$scope.FLlastlists.length){
							angular.element('.lflBodyCon .pageNull').css('display','block')
						}else{
							angular.element('.lflBodyCon .pageNull').css('display','none')
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
			color: "#0AE",
			borderBottom: "1px solid #0AE"
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
					color: "#0AE",
					borderBottom: "1px solid #0AE"
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
					color: "#0AE",
					borderBottom: "1px solid #0AE"
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
					color: "#0AE",
					borderBottom: "1px solid #0AE"
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
					color: "#0AE",
					borderBottom: "1px solid #0AE"
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
					color: "#0AE",
					borderBottom: "1px solid #0AE"
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
			angular.element(".slidePrompt>.prompt").animate({"height":"4.5rem"},300);
			angular.element(".slidePrompt>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			angular.element(".slidePrompt>.prompt").animate({"height":"1.5rem"},300);
			angular.element(".slidePrompt>.showAll").text("······显示全部");
			flag=true;
		}
		
	}
	$scope.stopAll=function(){
		if(flag){
			angular.element(".slidePrompt1>.prompt").animate({"height":"3rem"},300);
			angular.element(".slidePrompt1>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			angular.element(".slidePrompt1>.prompt").animate({"height":"1rem"},300);
			angular.element(".slidePrompt1>.showAll").text("······显示全部");
			flag=true;
		}		
	}
	$scope.selectPay=function(){
		if(flag){
			angular.element(".payment>.circle").text("√");
			angular.element(".payment>.circle").css({ "background": "#0AE","border":"none"});
			flag=false;
		}else if(!flag){
			angular.element(".payment>.circle").text("");
			angular.element(".payment>.circle").css({ "background": "#fff","border":"1px solid #ccc"});
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
			angular.element(".slidePrompt>.prompt").animate({"height":"4.5rem"},300);
			angular.element(".slidePrompt>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			angular.element(".slidePrompt>.prompt").animate({"height":"1.5rem"},300);
			angular.element(".slidePrompt>.showAll").text("······显示全部");
			flag=true;
		}
		
	}
	$scope.stopAll=function(){
		if(flag){
			angular.element(".slidePrompt1>.prompt").animate({"height":"3rem"},300);
			angular.element(".slidePrompt1>.showAll").text("收起");
			flag=false;
		}else if(!flag){
			angular.element(".slidePrompt1>.prompt").animate({"height":"1rem"},300);
			angular.element(".slidePrompt1>.showAll").text("······显示全部");
			flag=true;
		}		 
	}
	$scope.selectPay=function(){
		if(flag){
			angular.element(".payment>.circle").text("√");
			angular.element(".payment>.circle").css({ "background": "#0AE","border":"none"});
			flag=false;
		}else if(!flag){
			angular.element(".payment>.circle").text("");
			angular.element(".payment>.circle").css({ "background": "#fff","border":"1px solid #ccc"});
			flag=true;
		}
	}
})
//购买VIP
.controller('goVIPBuyCtrl', function($scope,$http,$rootScope,$ionicLoading,$timeout,$ionicHistory) {
angular.element('#loading').css('display','block')
	$scope.selectedVip="5";
	$scope.myVar="1";
	$scope.yearss = ["1", "2", "3", "4", "5"];
	$http.post(urltext + "/index.php?ctl=webapp_uc_vip_buy",{"email":$rootScope.data.email,"pwd":$rootScope.logindata.user_pwd})
	.success(function(res){
		angular.element('#loading').css('display','none')
		$scope.vip_list=res.vip_list
		$scope.site_pirce=$scope.vip_list[$scope.vip_list.length-1].site_pirce;//现价
		$scope.original_price=$scope.vip_list[$scope.vip_list.length-1].original_price;//原价
		$scope.$watch('selectedVip',function(){
			if(!$scope.vip_list)
			{
				return '';
			}
			var MvipGrade=angular.element('#vipGrade option:selected').val()
			var vip_listlength=$scope.vip_list.length;
			console.log(vip_listlength)
			switch(vip_listlength){
				case 1:
				$scope.site_pirce=$scope.vip_list[MvipGrade-5].site_pirce;//现价
				$scope.original_price=$scope.vip_list[MvipGrade-5].original_price;//原价
				break;
				
				case 2:
				$scope.original_price=$scope.vip_list[MvipGrade-4].original_price;//原价
				$scope.site_pirce=$scope.vip_list[MvipGrade-4].site_pirce;//现价
				break;
				
				case 3:
				$scope.original_price=$scope.vip_list[MvipGrade-3].original_price;//原价
				$scope.site_pirce=$scope.vip_list[MvipGrade-3].site_pirce;//现价
				break;
				
				case 4:
				
				$scope.original_price=$scope.vip_list[MvipGrade-2].original_price;//原价
				$scope.site_pirce=$scope.vip_list[MvipGrade-2].site_pirce;//现价
				break;
				
				case 5:
				$scope.original_price=$scope.vip_list[MvipGrade-1].original_price;//原价
				$scope.site_pirce=$scope.vip_list[MvipGrade-1].site_pirce;//现价
				break;
			}
		})

	})
	 //现在购买Vip
	 $scope.buyVipNow=function(selectedVip,myVar,mypaypwd){
	 	angular.element('#loading').css('display','block')
	 	$rootScope.selectedVip_id=selectedVip
	 	var payVipdata={
	 		"email":$rootScope.data.email,
	 		"pwd":$rootScope.logindata.user_pwd,
	 		"paypassword":mypaypwd,
	 		"years":myVar,
	 		"vip_id":selectedVip,
	 	}
	 	console.log(payVipdata)
	 	$http.post(urltext + "/index.php?ctl=webapp_uc_save_vip_buy",payVipdata)
	 	.success(function(res){
	 		if(res.states==1){
				$ionicHistory.goBack();
				VIPloadRecord()
				
			}
	 		angular.element('#loading').css('display','none')
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
.controller('goBenefitMoneyCtrl',function($scope, $http ,$rootScope,$ionicLoading,$timeout,$ionicModal,$cordovaToast){
	$ionicModal.fromTemplateUrl('templates/czmodal.html', {
	scope: $scope
}).then(function(modal) {
	$scope.czmodal = modal;
});
		//实付金额
		angular.element('#loading').css('display','block')
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
			angular.element('#loading').css('display','none')
			$scope.KYmoney=res.money;
			$scope.bankcard=res.bank_carry[0].bankcard
			$scope.uimg =res.bank_carry[0].uimg       
			$scope.real_name =res.bank_carry[0].real_name
			
		})
	
		
		$scope.FLtxOk=function(){
			if(!$scope.amounts){
				$cordovaToast.showShortBottom('请输入提现金额');
				return ''
			}else if($scope.amounts<100){
				$cordovaToast.showShortBottom('提现金额不得小于100元');
				return ''
			}else if(!$scope.paypasswords){
				$cordovaToast.showShortBottom('请输入提现密码');
				return ''
			}
			angular.element('#loading').css('display','block')
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
				angular.element('#loading').css('display','none')
				console.log(res)
				$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			   if(res.response_code==1){
			  	$rootScope.backTab();
			  	FLlastloadRecord();
			  }
			})
		}
})



//投资记录页
//投资记录页
.controller('investRecordCtrl', function($scope,$rootScope,$http,$ionicHistory,$ionicModal,$ionicLoading,$timeout) {
	//偿还借款
	
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
		if(toState.url=='/investRecord'){
			$scope.thklbitem=[];//还款列表
	        $scope.tyhqjkitem=[];//已还清列表
			$scope.loadCHLoan()
		}
	})

	$rootScope.goRepayment = function(email,pwd,id) {
		angular.element('#loading').css('display','block')
		var RepaymentData={
			"email":email,
			"pwd":pwd,
			"id":id
		}
		console.log(RepaymentData)
		$http.post(urltext + "/index.php?ctl=webapp_uc_quick_refund",RepaymentData)
		.success(function(res){
			angular.element('#loading').css('display','none')
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
	$scope.thksun=true;
	$scope.tcssun=false;
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
	
	//下拉加载
	var twdtzScroll=true,ttzjkScroll=true,tchjkScroll=true
	$scope.shaixuanloadAll=function(){
		//all传的数据
		var TZRecordData={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"page":1,
		}
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_invest',TZRecordData)
		.success(function(res){
			angular.element('#loading').css('display','none')
			$scope.allData=res.item;
			angular.element(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		})
	}
	$scope.slideBox1 =  function() {		
		if(flag){
			angular.element(".slideFrame1").animate({"width":"1.5rem","height":"3rem"},500);
			flag=false;
		}else if(!flag){
			angular.element(".slideFrame1").animate({"width":0,"height":0},200);
			flag=true;
		}
 	}
	$scope.slideBox2 =  function() {		
		if(flag2){
			angular.element(".slideFrame2").animate({"width":"1.5rem","height":"3rem"},500);
			flag2=false;
		}else if(!flag2){
			angular.element(".slideFrame2").animate({"width":0,"height":0},200);
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_invest',TZRecordData)
		.success(function(res){
			if( res.item.length==0){
				angular.element('#loading').css('display','none')
				console.log("没有")
				return;
			}
			console.log("还有")
			twdtzScroll=true
			angular.element('#loading').css('display','none')
			$scope.allData=$scope.allData.concat(res.item);
			angular.element(".slideFrame1").animate({"width":0,"height":0},200);
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_invest',shaiRecordData)
		.success(function(res){
			angular.element('#loading').css('display','none')
			console.log(res)
			$scope.allData=res.item;
			angular.element(".slideFrame1").animate({"width":0,"height":0},200);
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_borrowed',shaiRecordData2)
		.success(function(res){
			angular.element('#loading').css('display','none')
			$scope.loanData=res.item
			angular.element(".slideFrame2").animate({"width":0,"height":0},200);
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_borrowed',TZLoan)
		.success(function(res){
			if( res.item.length==0){
				angular.element('#loading').css('display','none')
				console.log("没有")
				return;
			}
			ttzjkScroll=true
			angular.element('#loading').css('display','none')
			$scope.loanData=$scope.loanData.concat(res.item)
			angular.element(".slideFrame2").animate({"width":0,"height":0},200);
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
		angular.element('#loading').css('display','block')
		$http.post(urltext +'/index.php?ctl=webapp_uc_borrowed',TZLoan)
		.success(function(res){
			angular.element('#loading').css('display','none')
			$scope.loanData=res.item
			angular.element(".slideFrame2").animate({"width":0,"height":0},200);
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
		// 
		if($scope.thksun){
			angular.element('#loading').css('display','block')
			$http.post(urltext +'/index.php?ctl=webapp_uc_refund',CHLoan)
			.success(function(res){
				angular.element('#loading').css('display','none')
				console.log(res)
				$scope.thklbitem=$scope.thklbitem.concat(res.item)
			})
			$http.post(urltext +'/index.php?ctl=webapp_uc_refund',YHQLoan)
			.success(function(res){
				angular.element('#loading').css('display','none')
				console.log(res)
				$scope.tyhqjkitem=$scope.tyhqjkitem.concat(res.item)
			})
		}else{
			if($scope.tcssun){
				angular.element('#loading').css('display','block')
				$http.post(urltext +'/index.php?ctl=webapp_uc_refund',YHQLoan)
				.success(function(res){
					if(res.item.length==0){
						angular.element('#loading').css('display','none')
						console.log("第二个tab	")
						tchjkScroll=true;
						return;
					}
					angular.element('#loading').css('display','none')
					console.log(res)
					tchjkScroll=true;
					$scope.tyhqjkitem=$scope.tyhqjkitem.concat(res.item)
				})
			}else if($scope.thksun){
				angular.element('#loading').css('display','block')
				$http.post(urltext +'/index.php?ctl=webapp_uc_refund',CHLoan)
				.success(function(res){
					if(res.item.length==0){
						angular.element('#loading').css('display','none')
						console.log("第一个tab")
						tchjkScroll=true;
						return;
					}
					tchjkScroll=true;
					angular.element('#loading').css('display','none')
					console.log(res)
					$scope.thklbitem=$scope.thklbitem.concat(res.item)
					
				})
			}
		}
	}
	//投资统计
	$scope.loadTZTJ = function() {
	//投资统计
	var TZTjdata = {
		"email": $rootScope.data.email,
		"pwd": $rootScope.logindata.user_pwd,
	}
	angular.element('#loading').css('display', 'block')
	$http.post(urltext + '/index.php?ctl=webapp_uc_financial_statistics', TZTjdata)
		.success(function(res) {
			console.log(res)
			angular.element('#loading').css('display', 'none')
				$scope.borrow_amount = res.user_statistics.borrow_amount;
				$scope.success_deal_count = res.user_statistics.success_deal_count
				$scope.repay_amount = res.user_statistics.repay_amount
				$scope.need_repay_amount = res.user_statistics.need_repay_amount
				$scope.repay_manage_amount = res.user_statistics.repay_manage_amount
				$scope.need_manage_amount = res.user_statistics.need_manage_amount
				$scope.yuqi_impose = res.user_statistics.yuqi_impose
				$scope.load_money = res.user_statistics.load_money;
				$scope.load_count = res.user_statistics.load_count
				$scope.load_earnings = res.user_statistics.load_earnings
				$scope.load_wait_earnings = res.user_statistics.load_wait_earnings
				$scope.load_repay_money = res.user_statistics.load_repay_money
				$scope.load_wait_repay_money = res.user_statistics.load_wait_repay_money
				$scope.load_manage_money = res.user_statistics.load_manage_money
				$scope.incharge_count = res.incharge_count
				$scope.carry_money = res.carry_money
			//success_deal_count借款笔数
			//load_count投资笔数
			////////////////////////

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
//		console.log(getTransform(investtop)[1])
		if(getTransform(investtop)[1]<0){
			if($scope.twdtz){
				if(twdtzScroll)
				{
					twdtzScroll=false;
				}else{
					return ;
				} 
				console.log(11)
				$scope.loan1()
			}
			
			else if($scope.ttzjk){
				if(ttzjkScroll)
				{
					ttzjkScroll=false;
				}else{
					return ;
				}
				console.log(22)
				$scope.loan2()
			}
			
			
			else if($scope.tchjk){
				if(tchjkScroll)
				{
					tchjkScroll=false;
				}else{
					return ;
				}
				console.log(33)
				$scope.loan3()
			}
		}
	}
	
	function getTransform(el) {
    var results = angular.element(el).find('.scroll').css('transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/)
    if(!results) return [0, 0, 0];
    if(results[1] == '3d') return results.slice(2,5);
    results.push(0);
    return results.slice(5, 8);
}
	
	
	//4.20

	
	//选项卡点击切换效果
	$scope.wdtzt = {
		color: "#0AE",
		borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
	if($rootScope.doInvestRefresh){
		$rootScope.doInvestRefresh()
	}
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
	angular.element('#loading').css('display','block')
	var MyInvitationData={
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
			angular.element('#loading').css('display','none')
		})
		

	  $scope.doRefresh = function() {
	  		MyInvitationData={
				"user_id":$rootScope.logindata.id,
				"page":1
			}
	  		 $scope.currentPage=1;
			 $scope.noMorePage=false;
			 $http.post(urltext + "/index.php?ctl=webapp_uc_myinvite",MyInvitationData)
		     .success(function(res) {
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
		     })
		     .finally(function() {
		       $scope.$broadcast('scroll.refreshComplete');
		     });
	  };
		$rootScope.doInvestRefresh=$scope.doRefresh
		$scope.currentPage=1;//定义下拉加载分页的初始值
		$scope.noMorePage=false;
		$scope.loadMore=function(){
			$scope.currentPage += 1;//每当滚动到底部，页码累计加1
		    $http.post(urltext + "/index.php?ctl=webapp_uc_myinvite",{"user_id":$rootScope.logindata.id,"page":$scope.currentPage})   //注意改为自己本站的地址，不然会有跨域问题
		        .success(function(newItems) {
		        	angular.element('#loading').css('display','none')  
		        	if(newItems.list.length>0)
		        	{
		        		for (var i=0;i<newItems.list.length;i++){//newItems.content.length，当前json的数量
			                $scope.MyInvitationlist.push(newItems.list[i]);//一个一个取出来，推送到原来的items里
			           }  
		        	} 
		        	if (newItems.list.length < newItems.page.page_size) {//当json的数量小于10（已经确定了一页为10条数据），说明页面到底了
		                $scope.noMorePage=true;//禁止滚动触发时间
		            } 
		            $scope.$broadcast('scroll.infiniteScrollComplete');     
		        })
		};
})
//修改登录密码
.controller('SetPasswordCtrl',function($scope,$rootScope,$http,$ionicHistory,$state,$ionicLoading,$timeout,$cordovaToast) {

	$scope.resetpwdOk=function(){
		
		
		if(!angular.element('#pwd_old').val()){
			angular.element('#pwd_old').siblings('span.usererr ').html('请输入旧密码！').css('display','block')
			return ''
		}else if(!angular.element('#user_pwd').val()){
			angular.element('#user_pwd').siblings('span.usererr ').html('请输入新密码！').css('display','block')
			return ''
		}else if(!angular.element('#pwd_confirm').val()){
			angular.element('#pwd_confirm').siblings('span.usererr ').html('请再次输入密码！').css('display','block')
			return ''
		}else if(angular.element('#pwd_confirm').val() && angular.element('#user_pwd').val()!=angular.element('#pwd_confirm').val()){
				angular.element('#pwd_confirm').siblings('span.usererr ').html('两次密码不一致！').css('display','block')
				return ''
		}
				
		
		$scope.pwd_old=angular.element("#pwd_old").val();
		$scope.user_pwd=angular.element("#user_pwd").val();
		$scope.pwd_confirm=angular.element("#pwd_confirm").val();		
	/*	if(!$scope.pwd_old){
			 $cordovaToast.showShortBottom('请输入旧密码');
			 return ''
		}else if(!$scope.user_pwd){
			 $cordovaToast.showShortBottom('请输入新密码');
			  return ''
		}else if(!$scope.pwd_confirm){
			 $cordovaToast.showShortBottom('请再次输入新密码');
			  return ''
		}*/
		var XGpassword={
			"email":$rootScope.data.email,
			"pwd":$rootScope.logindata.user_pwd,
			"user_pwd_old":$scope.pwd_old,
			"user_pwd":$scope.user_pwd,
			"user_pwd_confirm":$scope.pwd_confirm
		}
		angular.element('#loading').css('display','block')

		$http.post(urltext + "/index.php?ctl=webapp_uc_save_pwd ",XGpassword)
		.success(function(res){
			angular.element('#loading').css('display','none')
			
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			
			if(res.response_code==1)
			{
				$rootScope.data.pwd='';
				$rootScope.inshow=false;
				$rootScope.outshow=true;
				angular.element('#password').val('')
				$state.go("tab.accountlogin")
				$scope.pwd_old=angular.element("#pwd_old").val("");
				$scope.user_pwd=angular.element("#user_pwd").val("");
				$scope.pwd_confirm=angular.element("#pwd_confirm").val("");
			}
			
		})
			
		

	}
	
	
})

//设置支付密码
.controller('SetPayPassCtrl', function($scope,$rootScope,$http,$interval,$ionicLoading,$timeout,$cordovaToast) {
	var SZpassword={
	"email":$rootScope.data.email,
	"pwd":$rootScope.logindata.user_pwd
	}
	//获取手机号码
	if(!$rootScope.timedel){
		$rootScope.timedel="获取验证码";
	}else{
		if($rootScope.timedel=="获取验证码"){
			angular.element('#payPassObtaion').css('background','#0AE')
		}
		if($rootScope.timedel!="获取验证码"){
			angular.element('#payPassObtaion').css('background','#CCCCCC')
		}
	}
	
	
	$http.post(urltext + "/index.php?ctl=webapp_reset_pay_pwd",SZpassword)
	.success(function(res){
		console.log(res)
		/*alert(JSON.stringify(res))
		alert(res.mobile)*/
		$scope.mymobile=res.mobile
	})
	console.log(SZpassword)
	$scope.SZsetPaypwdOk=function(){
		angular.element('#loading').css('display','block')
		$http.post(urltext + "/index.php?ctl=webapp_send_reset_pay_code",SZpassword)
		.success(function(res){
			angular.element('#loading').css('display','none')
			 $cordovaToast.showShortBottom(res.show_err)
			if(res.response_code==1)
			{
				var timedel=60
				$rootScope.timedel=timedel+'s'
				angular.element('#payPassObtaion').css('background','#CCCCCC')
				 $rootScope.mydeltimer=$interval(function(){
					timedel--;
					$rootScope.timedel=timedel+'s'
					if(timedel==0){
						timedel=60
						$rootScope.timedel="获取验证码";
						$interval.cancel($rootScope.mydeltimer);
						angular.element('#payPassObtaion').css('background','#0AE')
					}
				},1000)
			}

		})
	}
	//最后确定修改支付密码
	$scope.SubmitPayOk=function(){
			
		if(!angular.element('#YZMinput').val()){
			angular.element('#YZMinput').siblings('span.usererr ').html('请输入验证码！').css('display','block')
			return ''
		}else if(!angular.element('#ZFMMinput').val()){
			angular.element('#ZFMMinput').siblings('span.usererr ').html('请输入支付密码！').css('display','block')
			return ''
		}else if(!angular.element('#ZFMMinputA').val()){
			angular.element('#ZFMMinputA').siblings('span.usererr ').html('请再次输入支付密码！').css('display','block')
			return ''
		}else if(angular.element('#ZFMMinputA').val() && angular.element('#ZFMMinput').val()!=angular.element('#ZFMMinputA').val()){
				angular.element('#ZFMMinputA').siblings('span.usererr ').html('两次密码不一致！').css('display','block')
				return ''
		}
		
		$scope.YZMinput=angular.element("#YZMinput").val()
		$scope.ZFMMinput=angular.element("#ZFMMinput").val()
		$scope.ZFMMinputA=angular.element("#ZFMMinputA").val()
		/*if(!$scope.YZMinput){
			$cordovaToast.showShortBottom('请输入验证码')
			return ''
		}else if(!$scope.ZFMMinput){
			$cordovaToast.showShortBottom('请输入支付密码')
			return ''
		}else if(!$scope.ZFMMinputA){
			$cordovaToast.showShortBottom('请再次输入支付密码')
			return ''
		}*/
		
		var myPayOKdata={
			"email": $rootScope.data.email,
			"pwd"  :$rootScope.logindata.user_pwd,
			"mobile_code" : $scope.YZMinput,
			"pay_pwd" : $scope.ZFMMinput,
			"pay_pwd_confirm":$scope.ZFMMinputA
		}
		angular.element('#loading').css('display','block')
		$http.post(urltext + "/index.php?ctl=webapp_save_pay_pwd",myPayOKdata)
		.success(function(res){
			/*timedel=60
			$rootScope.timedel="获取验证码";
			$interval.cancel($rootScope.mydeltimer);
			angular.element('#payPassObtaion').css('background','#0AE')*/
			angular.element('#loading').css('display','none')
			$ionicLoading.show({ 
			  	showBackdrop: false,
				template: res.show_err
			  });
			  $timeout(function() {
				$ionicLoading.hide();
			  }, 650)
			 if(res.response_code==1){
			 	$scope.YZMinput=angular.element("#YZMinput").val("")
				$scope.ZFMMinput=angular.element("#ZFMMinput").val("")
				$scope.ZFMMinputA=angular.element("#ZFMMinputA").val("")
			 	$rootScope.backTab();
			 }
		})
	}
})
.controller('SetAddressCtrl', function($scope) {
	$scope.addAddress = function() {
		window.location.href = "#/tab/addAddress";
	}
})

//立即投资
.controller("nowInvest",function($scope, $ionicHistory, $rootScope,$http,$ionicModal,$cordovaToast){
	
		$scope.nowInvest=function(){
			if(!angular.element("#tzAmmount").val())
			{
				$cordovaToast.showShortBottom("请输入投资金额")
				return ''
			}else if(parseInt(angular.element("#tzAmmount").val())<parseInt($rootScope.dsQtmoneyAmount))
			{
				$cordovaToast.showShortBottom("投资金额不得低于"+$rootScope.dsQtmoneyAmount+'元')
				return ''
			}else if(!angular.element("#tzPass").val()){
				$cordovaToast.showShortBottom("请输入投资密码")
				return ''
			}
			$rootScope.czmodal.show()
		}
		$ionicModal.fromTemplateUrl('templates/czmodal.html', {
		    scope: $rootScope
		  }).then(function(modal) {
		    $rootScope.czmodal = modal;
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
		angular.element('#loading').css('display','block')
		$http.post(urltext + "/index.php?ctl=webapp_deal",nowInvestdata)
		.success(function(res){
			angular.element('#loading').css('display','none')
			console.log(res)
			$rootScope.nowinvestName=res.deal.sub_name//标的名称
			$rootScope.nowinvestmoney=res.deal.need_money//可投金额
			$rootScope.nowuser_money=Number(res.user_money).toFixed(2);//可用余额
			$rootScope.dsQtmoney=res.deal.min_loan_money_format//多少元起投
			if($rootScope.dsQtmoney.indexOf('￥')>=0)
			{
				$rootScope.dsQtmoneyAmount=$rootScope.dsQtmoney.slice(1)
			}else{
				$rootScope.dsQtmoneyAmount=$rootScope.dsQtmoney
			}
			
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
			 	$rootScope.concern="已关注"
			 	angular.element("#heart").css("background-image","url('img/follownow.png')")
			 	
			 })
		}else if($rootScope.concern=='已关注'){
			console.log(followmedata +'已关注')
			$http.post(urltext + "/index.php?ctl=webapp_uc_del_collect",followmedata)
			 .success(function(res){
			 	$rootScope.concern="未关注"
			 	console.log(res)
			 	angular.element("#heart").css("background-image","url('img/heart.png')")
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
		color: "#0AE",
		borderBottom: "1px solid #0AE"
	}
	$scope.cpxx = function() {
		$scope.tcpxx = true;
		$scope.txmms = false;
		$scope.tqyxx = false;
		$scope.tfkbz = false;
		if($scope.tcpxx == true) {
			$scope.cpxxt = {
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
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
				color: "#0AE",
				borderBottom: "1px solid #0AE"
			}
			$scope.xmmst = {}
			$scope.cpxxt = {}
			$scope.qyxxt = {}
		}
	}
})

//偿还借款
.controller('goRepaymentCtrl',function($scope,$ionicModal,$rootScope,$state,$timeout,$http,$ionicLoading){
	$scope.confirmPay=function(ids,id,paypwd,email,pwd){
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
				if(res.response_code!=0){
					$rootScope.backTab()
				}
			  }, 650)
		})
		.error(function(){
			$$('#loading').css('display','none')
		})
	}
//充值
$ionicModal.fromTemplateUrl('templates/czmodal.html', {
	scope: $scope
}).then(function(modal) {
	$scope.czmodal = modal;
});

$scope.gosetpaypassnow=function(){
	$scope.confirmPass.hide() 
	$timeout(function(){
		$state.go("tab.ACCSetPayPass")
	},150)
  };
	
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
.controller('ContactServiceCtrl',function($scope,$state,$http, $sce,$rootScope){
	
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


