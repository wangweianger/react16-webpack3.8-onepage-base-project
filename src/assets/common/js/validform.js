

function Validform (json){
	this.parent=json.check;     //需要验证的form表单
	this.now=false;             //表单初始验证状态
	this.ajaxRun=json.ajaxRun;  //ajax成功提交后做的事
	this.hobbyLenght=json.hobbyLenght?json.hobbyLenght:2;     //多选最少选择项 默认两项
	this.settings=json.settings?json.settings:{event:"blur"};            //表单默认blur状态验证
	this.init(); //初始化
}
//初始化函数
Validform.prototype.init=function(){
	this.datatype();
	this.onsubmit();
}

//表单input验证
Validform.prototype.datatype=function(){
	var This=this;
	//循环form表单下所有的元素节点
	this.parent.find('*').each(function(){
		var nodeName=($(this)[0].nodeName).toLowerCase();  //每个子节点的节点名称
		var type=$(this).attr('datatype');     //每个子节点的datatype值
		if(type){
			//给每个符合要求的子节点绑定blur事件
			$(this).bind(This.settings.event,function(){	 
				var regStr=type.replace(/^\s+|\s+$/);    //去掉两边空格
				var zimu=regStr.charAt(0);               //匹配第一个字符
				var numArr = regStr.match(/\d+/g);       //动态获得正则范围数字
				var reg=util.regCombination(zimu,numArr);         //生成正则表达式
				This.focusCheck($(this),reg,nodeName);   //验证
			})
		}
	}); 
}

//表单提交时候的验证
Validform.prototype.onsubmit=function(){
	var This=this;
	this.parent.find('button.submit').click(function(){	
		This.input();
		if(This.now){
			This.ajaxRun();
		}
	});
}

Validform.prototype.input=function(){
	var This=this;
	this.parent.find('*').each(function(){
		var nodeName=($(this)[0].nodeName).toLowerCase();  //每个子节点的节点名称
		var type=$(this).attr('datatype');	         //每个子节点的datatype值
		//每个符合要求的子节点循环检查
		if(type){
			var regStr=type.replace(/^\s+|\s+$/);   //去掉两边空格
			var zimu=regStr.charAt(0);               //匹配第一个字符
			var numArr = regStr.match(/\d+/g);      //动态获得正则范围数字
			var reg=util.regCombination(zimu,numArr);         //生成正则表达式
			if(This.focusCheck($(this),reg,nodeName)=="false"){     //验证
				return false;
			}
		}
	});
}

//datatype 检测 input框 函数
Validform.prototype.focusCheck = function(obj,reg,nodeName){
	var This=this;
	var value = obj.val() ; 
	if(obj.attr("ignore")&&value || !obj.attr("ignore")){   //当内容为空 或者没有ignore 属性的时候执行
	
		//type=type 条件的检查
		if(obj.attr("type")=="radio"){
			value = getBoxVal(obj.attr("name"))?getBoxVal(obj.attr("name")):"";
		}
		//type=checkbox 条件的检查
		if(obj.attr("type")=="checkbox"){
			value = getHobbyVal(obj.attr("name"))>=This.hobbyLenght?getHobbyVal(obj.attr("name")):"";
		}
		//recheck 条件的检查  用于确定密码跟原密码是否相同的检查
		if(obj.attr("recheck")){
			if(value !=($("[name="+obj.attr("recheck")+"]").val())){
				if(nodeName=="input" || nodeName=="select"){
					obj.parent().find("span").remove();
					if(obj.attr("errormsg")){
						obj.parent().append("<span class='red fs-12 glyphicon glyphicon-remove'>"+obj.attr("errormsg")+"</span>");
					};
				}
				obj.addClass("errorClass");
				This.now=false;
				return false;
			}
		}
		//验证通过在页面上显示的样式
		if(reg.test(value)){
			if(nodeName=="input" || nodeName=="select"){
				obj.parent().find("span").remove();
				if(obj.attr("sucmsg")){
					obj.parent().append("<span class='green fs-12 glyphicon glyphicon-ok'>"+obj.attr("sucmsg")+"</span>");
				};
			}
			obj.removeClass("errorClass");
			This.now=true;
		}else {     //验证通过在页面上显示的样式  并返回false值以供判断
			if(nodeName=="input" || nodeName=="select"){
				obj.parent().find("span").remove();
				if(obj.attr("errormsg")){
					obj.parent().append("<span class='red fs-12 glyphicon glyphicon-remove'>"+obj.attr("errormsg")+"</span>");
				};
			}
			obj.addClass("errorClass");
			This.now=false;
			return "false";
		}
	}
}

//radio框内容选择
function getBoxVal(name){
    var groupId=document.getElementsByName(name);
    for(var i=0;i<groupId.length;i++){
        if(groupId[i].checked){
            return groupId[i].value;
        }
    }
}

//jquery获取复选框值 返回所选值得length长度  
function getHobbyVal(name){   
  var chkValue =[];    
  $('input[name='+name+']:checked').each(function(){    
   chkValue.push($(this).val());    
  });    
  return chkValue.length;
}  

module.exports=function(json){
	new Validform(json);
}
