

//util 公共对象函数
class util{
	//初始化对象
	constructor(){
		this.win=window.top;
		this.UA=navigator.userAgent;
		this.isPC=this.UA.indexOf('Windows NT')>-1;
		this.isAndroid=this.UA.indexOf('Android')>-1;
		this.isIos=this.UA.indexOf('Mac OS X')>-1;
		this.isIphone=this.UA.indexOf('iPhone;')>-1;
		this.isIpad=this.UA.indexOf('iPad;')>-1;
		this.isIE7=this.UA.indexOf('MSIE 7.0;')>-1;
		this.isIE8=this.UA.indexOf('MSIE 8.0;')>-1;
		this.isIE9=this.UA.indexOf('MSIE 9.0;')>-1;
		this.isIE10=this.UA.indexOf('MSIE 10.0;')>-1;
		this.isIE11=this.UA.indexOf('Trident')>-1;
	};

	/*封装的ajax函数
	*type           	类型  get|post
	*url            	api地址
	*data           	请求的json数据
	*nohideloading  	ajax执行完成之后是否隐藏遮罩
	*notimeout			是否有请求超时
	*complete       	ajax完成后执行（失败成功后都会执行）
	*beforeSend        	请求发送前执行
	*success        	成功之后执行
	*error          	失败之后执行
	*goingError     	是否执行自定义error回调
	*timeout        	ajax超时时间
	*isGoingLogin   	是否跳转到登录界面
	*/
	ajax(json){
		let This=this;
		let noError=true;
		let url=null;
		let asyncVal=typeof(json.async)=='boolean'?json.async:true;
		This.showLoading();
		//是否有请求超时
		if(!json.notimeout){
			var timeout=setTimeout(function(){
				This.hideLoading();
				// 请求超时
				noError=false;
				asyncVal&&popup.alert({type:'msg',title:'您的网络太慢了哦,请刷新重试!'});
			}, json.timeout||config.ajaxtimeout);
		}
		// 增加时间戳参数
		if(json.url.indexOf('?')!=-1){
			url=json.url+'&_='+this.time();
		}else{
			url=json.url+'?_='+this.time();
		};
		return $.ajax({
			type: json.type||"post",
			url: url,
			data: json.data||"",
			datatype:"json",
			async: asyncVal,
			beforeSend:function(xhr){
				json.beforeSend&&json.beforeSend(xhr);
			},
			success:function(data){
				if(!json.nohideloading){ This.hideLoading();};
				clearTimeout(timeout);
				if(typeof(data)=='string'){
					This.error(JSON.parse(data),json);
				}else{
					This.error(data,json);
				}
			},
			complete:function(XMLHttpRequest){
				if(!json.nohideloading){ This.hideLoading();};
				clearTimeout(timeout);
				if(json.complete){json.complete(XMLHttpRequest);}
			},
			error:function(XMLHttpRequest){
				This.hideLoading();
				clearTimeout(timeout);
				if(noError){
					This._error(XMLHttpRequest,json);
				};	
			}
		});
	};

	//file 文件上传
	fileAJAX(json){
		var This=this;
		var noError=true;
		$.ajax({
			type: json.type||"post",
			url: json.url,
			xhrFields: {
			    withCredentials: true
			},
			crossDomain: true,
			data: json.data||"",
			datatype:"json", 
            cache: false, 
            contentType: false,  
            processData: false,
            goingError:json.goingError||false,
            notimeout:json.notimeout||false,
            beforeSend:function(xhr){
            	json.beforeSend&&json.beforeSend(xhr);
            },
			success:function(data){
				if(!json.nohideloading){ This.hideLoading();};
				clearTimeout(time);
				This.error(data,json);
			},
			error:function(XMLHttpRequest){
				if(!json.nohideloading){ This.hideLoading();};
				json.error(XMLHttpRequest,json);
				clearTimeout(time);
				if(noError){
					This._error(XMLHttpRequest,json);
				};	
			},
			complete:function(XMLHttpRequest){
				if(!json.nohideloading){ This.hideLoading();};
				clearTimeout(time);
				if(json.complete){json.complete(XMLHttpRequest);}
			},
		});
		var time=setTimeout(function(){
			This.hideLoading();
			// 请求超时
			noError=false;
			popup.alert({type:'msg',title:'您的网络太慢了哦,请刷新重试!'});
		}, json.timeout||config.ajaxtimeout);
	}

	/*FormData 上传文件函数
	filename : string  input name 属性
	onlyOne : boolean   是否只上传一个文件
	data : Object      ajax上次的data数据
	url ：string      api地址
	checktype: array     默认['png','jpg'，'gif']
	nohideloading : boolean  	ajax执行完成之后是否隐藏遮罩
	timeout : number        	ajax超时时间
	goingError : boolean     	是否执行自定义error回调
	isGoingLogin : boolean   	是否跳转到登录界面
	success : function   成功之后的回调函数
	complete : function       	ajax完成后执行（失败成功后都会执行）
	error : function          	失败之后执行
	*/
	cerateFileFormData(json){
		var This=this;
		var checktype=json.checktype||['jpg','png','gif'];
		var filename=json.filename?json.filename:'filename'
		var html='<div id="createFileHtml" class="hidden">';
				html+='<form enctype="multipart/form-data" id="uploadForm">';
					html+='<input type="file" name="'+filename+'" id="expInputFile" ';
						if(!json.onlyOne){ html+=' multiple="multiple"' }
					html+='></div></form>';
		if($('#createFileHtml').length){
			$('#createFileHtml').remove();
		}
		$('body').append(html);
		$('#expInputFile').click();	
		$('#expInputFile').one('change',function(){
			// 检查文件类型
			var files=$('#expInputFile')[0].files;
			for(var i=0;i<files.length;i++){
				var begin=false;
				for(var k=0;k<checktype.length;k++){
					var checked=new RegExp("\."+checktype[k]+"$").test(files[i]['name']);
					if(!checked){continue;}
					begin=checked;
				}
				if(!begin){
					popup.alert({title:'请上传正确的文件类型！'}); return false;
				};
			}
			// 执行ajax
			This.showLoading();
		    var formData = new FormData($( "#uploadForm" )[0]); 
		    if(json.data){
			    for(var i in json.data){
			    	formData.append(i, json.data[i]);
			    };
		    };
		    This.fileAJAX({
		    	url:json.url,
		    	data:formData,
		    	notimeout:json.notimeout||false,
            	goingError:json.goingError||false,
		    	beforeSend:function(xhr){
		    		json.beforeSend&&json.beforeSend(xhr);
		    	},
		    	success:function(data){
		    		$('#createFileHtml').remove();
		    		json.success&&json.success(data);
		    	},
		    	error:function(data){
		    		$('#createFileHtml').remove();
		    		json.error&&json.error(data,json);
		    	},
		    	complete:function(data){
		    		json.complete&&json.complete(data);
		    	}
		    });
		});
	}

	//error 处理函数
	error(data,json){
		//判断code 并处理
		var dataCode=parseInt(data.code);
		if(!json.isGoingLogin && dataCode==1004){
			//判断app或者web
			// if(window.location.href.indexOf(config.loginUrl) == -1){ 
			// 	sessionStorage.setItem("weixin-url", window.location.href); //记录没有登陆前的访问页面
			// 	location.href=config.loginUrl;
			// }else{
			// 	popup.alert({type:'msg',title:'用户未登陆,请登录!'});
			// }
			popup.alert({type:'msg',title:'用户未登陆,请登录!'})
		}else{
			switch(dataCode){
				case 1000:
					json.success&&json.success(data);
					break;
				default:
					if(json.goingError){
						//走error回调
						json.error&&json.error(data);
					}else{
						//直接弹出错误信息
						popup.alert({type:'msg',title:data.desc});
					};	
			}
		};
	}

	// _error 处理函数
	_error(XMLHttpRequest,json){
		this.hideLoading();
			if(json.code){
				json.error(JSON.parse(XMLHttpRequest.responseText));
			}else{
				switch(XMLHttpRequest.status){
					case 401:
						if(window.location.href.indexOf(config.loginUrl) == -1){ 
							sessionStorage.setItem("weixin-url", window.location.href); //记录没有登陆前的访问页面
							window.location.href=config.loginUrl;
						}else{
							popup.alert({type:'msg',title:"你需要登录哦"});
						};
						break;
					case 400:
						popup.alert({type:'msg',title:"您的请求不合法呢"});
						break;	
					case 404:
						popup.alert({type:'msg',title:"访问的地址可能不存在哦"});
						break;		
					case 500:case 502:
						popup.alert({type:'msg',title:"服务器内部错误"});
						break;		
					// default:
					// 	popup.alert({type:'msg',title:"未知错误。程序员欧巴正在赶来修改哦"});	
				}
			}
	}

	// 获取当前时间毫秒
	time(){
		return new Date().getTime();
	}

	/*根据参数生成常用的正则表达式
	*string    type 生成的正则表达式类型
	*array     numArr 生成正则的条件数组 例如:[6,16] 也可省略
	*/
	regCombination(type,numArr){
		var reg="";
		switch(type){
			case "*":     //"*":"不能为空！"   
				if(numArr){
					reg=new RegExp("^[\\w\\W]{"+numArr[0]+","+numArr[1]+"}$"); 
				}else {
					reg=new RegExp("^[\\w\\W]+$"); 
				}  
				break;
			case "n":    //"number":"请填写数字！
				if(numArr){
					reg=new RegExp("^\\d{"+numArr[0]+","+numArr[1]+"}$");
				}else{
					reg=new RegExp("^\\d+$");
				}
				break;
			case "s":  //"s":"不能输入特殊字符！"   
				if(numArr){
					reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]{"+numArr[0]+","+numArr[1]+"}$");
				}else{
					reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]+$");
				}
				break; 
			case "c":  //"z":"中文验证" 
				reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d]{"+numArr[0]+","+numArr[1]+"}$");
				break;	
			case "p":    //"p":"邮政编码！
				reg=new RegExp("^[0-9]{6}$");
				break;	
			case "m":    //"m":"写手机号码！"
				reg=new RegExp("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$");
				break;	
			case "e":   //"e":"邮箱地址格式
				reg=new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
				break;
			case "id":   //"id":验证身份证
				reg=new RegExp("^\\d{17}[\\dXx]|\\d{14}[\\dXx]$");
				break;
			case "money": //钱
				reg=new RegExp("^[\\d\\.]+$");	
				break;	
			case "url":   //"url":"网址"
				reg=new RegExp("^(\\w+:\\/\\/)?\\w+(\\.\\w+)+.*$");
				break;	
			case "u":    //
				reg=new RegExp("^[A-Z\\d]+$");
				break;
		}
		return reg;
	}

	/*extent json函数
	*json1  原始数据
	*json2  新数据 
	*/
	extend (json1,json2){
		var newJson=json1;
		for(var j in json2){
			newJson[j]=json2[j];
		}
		return newJson;
	}

	/* 设置url参数
	*name    设置的query名字
	*value   值
	*url     设置的url （location.href）
	*isHashMode 是否是hash
	*/
	setQueryString(name,value,url,isHashMode){
	    if(typeof name == 'undefined' || typeof value == 'undefined' || typeof url == 'undefined'){
	        return url;
	    }
	    var reg = new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
	        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";
	    
	    url=url.replace(/#.*/,"");
	    if(isHashMode===true){
	        if(reg.test(tempHash)){
	            tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
	        }else{
	            var separator=tempHash.indexOf("#")===-1?"#":"&";
	            tempHash=tempHash+separator+name+"="+encodeURIComponent(value)}
	            tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3})
	    }else if(reg.test(url)){
	        url=url.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
	    }else{
	        var separator=url.indexOf("?")===-1?"?":"&";
	        url=url+separator+name+"="+encodeURIComponent(value)
	    }
	    return url+tempHash
	};

	/*检查输入的是否是数字*/
	IsNum (e) {
	    var k = window.event ? e.keyCode : e.which;
	    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
	    } else {
	        if (window.event) {
	            window.event.returnValue = false;
	        }
	        else {
	            e.preventDefault(); //for firefox 
	        }
	    }
	} 

	/*获取 storage 缓存数据
	* type  类型   local：localStorage   session：sessionStorage
	* name  缓存数据name名
	*/
   	getStorage(type,name){
   		var type=type||'local';
   		if(type=='local'){
   			var result = localStorage.getItem(name)? localStorage.getItem(name):"";
   		}else if(type=='session'){
   			var result = sessionStorage.getItem(name)? sessionStorage.getItem(name):"";
   		}
	    return result;
 	}

 	/*设置 storage 缓存数据
 	*type  类型   local：localStorage   session：sessionStorage
 	*name  缓存数据name名
 	*content  缓存的数据内容
 	*/
	setStorage(type,name,content){
		var type=type||'local';
		var data=content;
		if(typeof(data)=='object'){ data=JSON.stringify(content) };
		if(type=='local'){
			localStorage.setItem(name,data);
		}else if(type=='session'){
			sessionStorage.setItem(name,data);
		}
	}

	//showLoading
	showLoading(){
		$('#loading').stop().fadeIn(200);
	}

	//hideLoading
	hideLoading(){
		$('#loading').stop().fadeOut(200);
	}

	/*生成随机字符串*/
	randomString(len) {
	　　len = len || 32;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}

	//秒数换算成时间函数 得到00:00:00 格式
	formatSeconds(value) {
	    var second = parseInt(value);// 秒
	    var minute = 0;// 分
	    var hour = 0;// 小时
	    if(second > 60) {
	            minute = parseInt(second/60);
	            second = parseInt(second%60);
	        if(minute > 60) {
	            hour = parseInt(minute/60);
	            minute = parseInt(minute%60);
	        }
	    }
	    var result = this.getZero(minute)+':'+this.getZero(parseInt(second));
	    if(minute > 0) {
	        result =this.getZero(parseInt(minute))+":"+this.getZero(parseInt(second));
	    }
	    if(hour > 0) {
	        result =this.getZero(parseInt(hour))+':'+this.getZero(parseInt(minute))+":"+this.getZero(parseInt(second));
	    }
	    return result;
	}

	/*判断时间前面是否加0*/
	getZero (num){
	    if(num<10){
	            return '0'+num;
	    }else{
	            return num;
	    }
	}

	/* 短信定时器
      nowTime vue.js 初始数据  当前时间
      getMsgText vue.js 初始数据  当前的提示文字
    */
    getMsgTime(obj,msgText, fn) {
        var This = obj;
        This.nowTime = config.msgTime;
        var timer = setInterval(function() {
            This.nowTime--;
            This[msgText] = This.nowTime + ' S后重发';
            //时间走完时执行
            if (This.nowTime <= 0) {
                clearInterval(timer);
                This[msgText] = "重新获取";
                fn();
            }
        }, 1000);
    } //end

	/****************************************************************************数据处理方法（begin）***************************************************************/

	/*根据某个val值获得当前数组的索引
	arr  数组集合（一维json数组）
	key  json的key值
	val  需要匹配的值
    */
	gttArrItemIndex(arr, key, val) {
		var index = -1;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i][key] == val) {
				index = i;
			}
		}
		return index;
	}

	/*检测某值在数组中是否存在
	arr   数组集合（一维json数组）
	value 需要匹配的值
	*/
	isInArray(arr, value) {
		if (!value) {
			return false;
		}
		var result = false;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (value.toString().indexOf(arr[i]) != -1) {
				result = true;
			};
		};
		return result;
	}

	/*检测某值在数组中是否存在 并返回存在的索引值
	arr         数组集合（一维json数组） 
	value       json的key值 
	checkKey    检测的key值
	*/
	isInArrayAndIndex(arr, value, checkKey) {
		var result = {
			isin: false,
			index: 0
		};
		for (var i = 0, len = arr.length; i < len; i++) {
			if (value == arr[i][checkKey]) {
				result.isin = true;
				result.index = i;
			};
		};
		return result;
	}

	/*json数组中获得某个kye的集合
	datas   array   数组集合（一维json数组） 
	keys    array     key值集合  例如['id','name','age']
	*/
	getValListForJson(json) {
		var newArr = [];
		for (var i = 0; i < json.datas.length; i++) {
			var newjson = {};
			for (var k = 0; k < json.keys.length; k++) {
				newjson[json.keys[k]] = json.datas[i][json.keys[k]]
			}
			newArr.push(newjson);
		}
		return newArr;
	}

	/*获得数组中某个key值的集合
	arr  数组集合（一维json数组）
	key  string 
	*/
	getArrsItems(arr, key) {
		var str = "";
		for (var i = 0; i < arr.length; i++) {
			str += arr[i][key] + ',';
		}
		return str.slice(0, -1);
	}

	/*获得某value值相加的和     （算总价时需要用到）
	arr  数组集合（一维json数组）
	key  string
	*/
	getTotalDatas(arr, key) {
		var total = 0;
		for (var i = 0; i < arr.length; i++) {
			total = total + arr[i][key];
		}
		return total;
	}

	/*获得商品数量少于number的索引集合 并返回index
	arr      数组集合（一维json数组）
	key      string
	number   int
	*/
	getNumberZeroProducts(arr, key, number) {
		var newarr = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i][key] <= number) {
				newarr.push(i);
			};
		}
		return newarr
	};

	/*获得某些key值的集合
	datas  array  数组集合（一维json数组）
	keys   array  （['id','name','age']） 
	*/
	getNumListDouHao(json) {
		var str = "";
		for (var i = 0; i < json.datas.length; i++) {
			if (i == json.datas.length - 1) {
				for (var k = 0; k < json.keys.length; k++) {
					if (k == json.keys.length - 1) {
						str += json.datas[i][json.keys[k]];
					} else {
						str += json.datas[i][json.keys[k]] + ',';
					}
				}
			} else {
				for (var k = 0; k < json.keys.length; k++) {
					if (k == json.keys.length - 1) {
						str += json.datas[i][json.keys[k]];
					} else {
						str += json.datas[i][json.keys[k]] + ',';
					}
				}
				str += '\n';
			}
		}
		return str;
	}

	/*传入一个对象，返回该对象的值不为空的所有参数，并返回一个对象
	obj   object    传入的对象
	*/
	objDislodge(obj) {
		var objData = JSON.parse(JSON.stringify(obj));
		for (var n in objData) {
			if (objData[n] == null || objData[n] == '') {
				delete objData[n]
			}
		}
		return objData;
	}

	/*传入一个json对象，返回该对象的值不为空的所有参数，并返回一个对象
	json   object    传入的对象
	*/
	jsonDislodge(json) {
		var objData = JSON.parse(JSON.stringify(obj));
		objData.forEach((item, index) => {
			for (let n in item) {
				if (item[n] == null || item[n] == '') {
					delete item[n]
				}
			}
		})
		return objData;
	}

	/*将json里面某个参数的参数名替换成另外一个参数名
	name1:初始参数名
	name2:替换后参数名
	*/
	jsonNameReplace(json, name1, name2) {
		var json = JSON.parse(JSON.stringify(json));
		json.forEach((item, index) => {
			item[name2] = item[name1];
			delete item[name1];
		})
		return json;
	}

	/*
	除掉json数组里面对象的某些参数
	*/
	delJsonObjByArr(json, arr) {
		var json = JSON.parse(JSON.stringify(json));
		json.forEach((item, index) => {
			arr.forEach((item2, index) => {
				delete item[item2]
			})
		});
		return json;
	}

	/*
	除掉对象里面的某些参数
	*/
	delObjByArr(obj, arr) {
		var obj = obj;
		arr.forEach((item, index) => {
			delete obj[item]
		})
		return obj;
	}

	/*传入一个json数组和所需要的参数集，返回一个全新的json数组
	
	*/
	getNewJson(json, arr) {
		var array = [];
		json.forEach((item, index) => {
			var obj = {};
			for (var i = 0, len = arr.length; i < len; i++) {
				for (var n in item) {
					if (arr[i] == n) {
						obj[arr[i]] = item[n];
					}
				}
			}
			array.push(obj);
		})
		return array;
	}

	/*
		传入一个对象和所需要的参数集，返回一个全新的对象
	*/
	getNewObj(obj, arr) {
		var object = {};
		for (var n in obj) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (n == arr[i]) {
					object[n] = obj[n]
				}
			}
		}
		return object;
	}

	/*向json数组里面添加一个字段
    arr 需要push的arr json数组
    pushps:[{key:'name',val:125}]  第一层push的数据
    deeplevel  是否有更深栏目需要push 有就传下面的参数
    listkey    需要push的二层数据key名字
    pushcs:[{key:'name',val:125}] 第二层push的数据
    */
	pushKeVaInArr(json) {
		for (var i = 0, len = json.arr.length; i < len; i++) {
			for (var k = 0; k < json.pushps.length; k++) {
				json.arr[i][json.pushps[k]['key']] = json.pushps[k]['val']
			}
			if (json.deeplevel) {
				for (var j = 0, lenj = json.arr[i][json.listkey].length; j < lenj; j++) {
					for (var o = 0; o < json.pushcs.length; o++) {
						json.arr[i][json.listkey][j][json.pushcs[o]['key']] = json.pushcs[o]['val']
					};
				}
			}
		}
		return json.arr;
	}


	/****************************************************************************数据处理方法（end）***************************************************************/

	//新建iframe 并赋src   文件下载时用得到
    interIosForIframe(src) {
        if ($('#clickOnIos').length) {
            $('#clickOnIos').attr('src', src)
        } else {
            $('body').append('<iframe id="clickOnIos" src=' + src + ' class="hide"></iframe>');
        }
    };


    //登录成功之后设置cookie
	setCookie(cookiename,value){
		var dt= new Date();
  		dt.setTime(dt.getTime() + (3*24*60*60*1000));
        // $.cookie(cookiename,value,{expires:dt, path:'/' ,domain: 'morning-star.cn'});
        $.cookie(cookiename,value,{expires:dt, path:'/'});
	}

	//退出登录后移除cookie
	removeCookie(cookiename){
		// $.cookie(cookiename,"",{expires:-1, path:'/' ,domain: 'morning-star.cn'});
		$.cookie(cookiename,"",{expires:-1, path:'/' });
		sessionStorage.setItem('usermsgs',"");
	};

	//订单倒计时定时器
	/*	invalidtime    //过期时间
	**	systemtime  //系统当前时间
	**	obj  //操作的对象
	**	callback   //回调函数
	*/
	timeCountDown(json){
		var This=this;
        var timespe = (json.invalidtime - json.systemtime) / 1000; //时间差
        if (timespe <= 0) { json.obj.text('00:00:00'); };
        var timer = setInterval(function() {
        	$(json.obj).text(This.formatSeconds(timespe));
            timespe--;
            if (timespe <= 0) {
                clearInterval(timer);
                json.obj.text('00:00:00');
                //调起事件
                json.callback&&json.callback();
            }
        }, 1000);
	};

	/*函数递归  把[1,2] [3,4] [5,6] 得到 [1,3,5],[1,3,6],[1,4,5] ...
	arr : 需要递归的数组
	arr1: 数组的第一项
	arr2:第二项
	index:初始索引
	*/
	diguiArrData(arr,arr1,arr2,index){
        if(!arr1.length){arr1=['']}
        if(!arr2.length){arr2=['']} 
        var arr3=[]
        for(var i=0;i<arr1.length;i++){
            for(var j=0;j<arr2.length;j++){
                if(arr1[i].length>1){
                    arr3.push(arr1[i].concat(arr2[j]))
                }else{
                    arr3.push([arr1[i],arr2[j]])   
                }
                
            }
        }
        if(arr[index+1]){
            this.diguiArrData(arr,arr3,arr[index+1],index+1)
        }else{
            return arr3
        }
    };

}

//初始化util对象
module.exports=new util();






