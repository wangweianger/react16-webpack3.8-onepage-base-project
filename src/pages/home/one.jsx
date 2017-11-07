import React from 'react'

require('./home.scss')

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: 'wang'
        }
    }

    render() {
        return (
            <div>
                <div className="home">
                    {this.state.username}<br/>
                    <img src="http://img4.imgtn.bdimg.com/it/u=2064784076,1799293544&fm=200&gp=0.jpg" />
                </div>
            </div>
        )
    } 
}

module.exports = Home 
