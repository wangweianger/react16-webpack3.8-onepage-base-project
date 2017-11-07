import { Component } from 'react'

require('./home.scss')

export default class Home extends Component {
  // 默认数据
  static defaultProps = {
    datas:[
      {id:1,name:'wangwei',sex:'男',hobby:'羽毛球，游泳，旅游'},
      {id:2,name:'zhangsan',sex:'男',hobby:'篮球，台球，游泳'},
      {id:3,name:'xiaofang',sex:'女',hobby:'羽毛球，游泳，旅游'}
    ]
  }

  alertId(item){
    alert('我的编号是'+item.id)
  }

  render() {
    return (
      <div>
        <div className="home">
          {this.props.datas.map(item => (
            <li key={item.id}>
                姓名：<span>{item.name}</span>
                性别：<span>{item.sex}</span>
                爱好：<span>{item.hobby}</span>
                <button className="but ml15" onClick={this.alertId.bind(this,item)}>弹出编号</button>
            </li>
          ))}
        </div>
      </div>
    )
  }
}

