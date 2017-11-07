

//common 公共 AJAX 函数
class common{
	//初始化对象
	constructor(){
		
	};

	// get ajax
	commonAjax(){
		util.ajax({
			url:config.baseApi+'',
			success:(data=>{
				console.log(data)
			})
		})
	};
}

//初始化common对象
module.exports=new common();






