import React from 'react'

require('./home.scss')


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: 'wangweianger00'
        }
    }

    render() {
        return (
            <div>
                <div className="home">
                    {this.state.username}<br/>
                    <img src="http://img0.imgtn.bdimg.com/it/u=1058181807,3427139407&fm=27&gp=0.jpg" /> 
                </div>
            </div>
        )
    } 
}

module.exports = Home 
