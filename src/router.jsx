// 配置路由渲染界面
const router = [{
    path: '/',
    exact:true,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./pages/home/home'))
        })
    },
    // indexRoute: { 
    //   getComponent(nextState, cb) {
    //       	require.ensure([], (require) => {
    //           	cb(null, require('./pages/home/Home'))
    //       	})
    //   }
    // },
    // getChildRoutes(location,callback) {
    //     require.ensure([], function (require) {
    //       	callback(null, [
    //       		require('./pages/home/router'),
    //           	// require('./pages/user/router'),
    //       	])
    //     })
    // }
}]

module.exports = router;


