module.exports = {
	path: 'user',
	// 若有子路由就必须设置 indexRoute 默认路由
	indexRoute: { 
		component: require('./User') 
	},
	// 异步加载
	// getChildRoutes(location,callback) {
	//     require.ensure([], function (require) {
	// 	    callback(null, [
	// 	    	{
	// 	    		path:'userDetails',
	// 	    		component: require('./UserDetails') 
	// 	    	}
	// 	    ])
	//     })
	// },
}