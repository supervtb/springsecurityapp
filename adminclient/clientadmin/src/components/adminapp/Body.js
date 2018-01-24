import React, { Component } from 'react';
import Users from './Users'
import Bonuses from './Bonuses'
import Companies from './Companies'



class Body extends Component {



    render() {
        var data = this.props.data
        var state = this.props.state;

        if (state.selectedIndex == 0){
            var bodycontent = <Users/>
        }
        if (state.selectedIndex == 1){
            var bodycontent = <Bonuses/>
        }
        if (state.selectedIndex == 2){
            var bodycontent = <Companies/>
        }
        return ( <div>
                {bodycontent}
            </div>
        );
    }
}

export default Body;
