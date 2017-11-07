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
                    {this.state.username}
                </div>
            </div>
        )
    } 
}

module.exports = Home 
