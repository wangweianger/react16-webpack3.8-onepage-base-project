import React from 'react'
import { connect } from 'react-redux'
import zaneDate from 'zane-calendar'
import { DatePicker, Button, Checkbox } from 'antd'

require('./home.scss')

import { updateCartNumber } from 'actions'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: 'wangweianger00',
            begintime:'',
        }
        console.log(props)
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
    handleAddNumber(){
        const { number,dispatch } = this.props
        dispatch(updateCartNumber(number+1))
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`)
    }

    render() {
        const { number } = this.props
        return (
            <div>
                <div className="tc mb20 redux">
                    <b>redux中的number值为</b> { number } 
                    <button onClick={this.handleAddNumber.bind(this)} className="button_add">增加number计数</button>
                </div>
                <div className="mb20">
                    <Checkbox onChange={this.onChange.bind(this)}>Checkbox</Checkbox>
                </div>
                <div className="mb20">
                    <Button type="primary">Primary</Button>
                    <Button className="ml20">Default</Button>
                    <Button className="ml20" type="dashed">Dashed</Button>
                    <Button className="ml20" type="danger">Danger</Button>
                </div>
                <div className="mb20">
                    <DatePicker />
                </div> 
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

// 获取购物车数量
const mapStateToProps = (state) => {
    return { 
        number:state.home.number 
    }
}
export default connect(mapStateToProps)(Home)