import React from 'react'
import zaneDate from 'zane-calendar'

require('./home.scss')


export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: 'wangweianger00',
            begintime:'',
        }
    }

    componentDidMount(){
        zaneDate({
            elem:'#zane-calendar',
            done:(fulltime,begintime,endtime)=>{
                this.setState({
                    begintime:begintime
                })
            }
        }) 
    }
    
    handleAlert(e){
        popup.alert({title:'Alert弹窗'})
    }

    handleConfirm(e){
        popup.confirm({title:'确定执行吗？',yes(){
            alert('执行了!')
        }})
    }

    render() {
        return (
            <div>
                <div className="tc mb20">
                    时间日历插件
                    <input className="input" type="" name="" id="zane-calendar" />
                </div>
                <div className="mt30 tc">
                    <button className="btn cursor" onClick={this.handleAlert.bind(this)}>Alert弹窗</button>
                    <button className="btn cursor ml10" onClick={this.handleConfirm.bind(this)}>Confirm弹窗</button>
                </div>
                <div className="home">
                    {this.state.username}<br/>
                    <img src="http://img0.imgtn.bdimg.com/it/u=1058181807,3427139407&fm=27&gp=0.jpg" /> 
                </div>

            </div>
        )
    } 
}

