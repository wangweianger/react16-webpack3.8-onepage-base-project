import React from 'react'

require('./home.scss')

export default class Child extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: 'wang'
        }
    }

    render() {
        return (
            <div>我是 {this.props.match.path}的child <br/>我也可以按需加载额</div>
        )
    }
} 

