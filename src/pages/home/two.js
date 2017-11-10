import React from 'react'

require('./home.scss')

export default class Two extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: 'wei'
        }
    }

    render() {
        return (
            <div>
                <div className="home">
                    {this.state.username}<br/>
                    <img src="http://img0.imgtn.bdimg.com/it/u=3713291312,3766811990&fm=200&gp=0.jpg" />
                </div>
            </div>
        )
    }  
}

