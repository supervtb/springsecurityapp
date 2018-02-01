import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from './adminapp/Header'
import Body from './adminapp/Body'
import superagent from 'superagent';


class Admin extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.state = {
            selectedIndex : 0,
        };
    }

    isAuthenticated(){

        const accesstoken = localStorage.getItem('accesstoken');
        return accesstoken && accesstoken.length>10;
    }

    logout(e) {
        e.preventDefault()
        localStorage.removeItem('accesstoken');
        this.setState({});
    }

    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/user')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
            .end((err,res) =>{ if (res){
                    this.setState({
                        firstname:res.body.firstname,
                        secondname:res.body.secondname,
                        bonuscardnumber: res.body.bonuscardnumber,
                        points: res.body.points,
                        bonuses : res.body.bonus

                    });
                var arr = [];
                var rl = res.body.role
                    for( var key in rl){
                    if(rl[key].roleName == "user"){
                        localStorage.removeItem('accesstoken');
                        this.setState({});
                    }
                    };

                }
                else {
                    localStorage.removeItem('accesstoken');
                    this.setState({});

                }}
            );



    }

    select = (index) => {this.setState({selectedIndex: index}); console.log(index);}


    render() {
        var selectedIndex = this.state.selectedIndex;

        var currentUser = {
            name: this.state.firstname,
            secondname : this.state.secondname,
            bonuscardnumber : this.state.bonuscardnumber,
            points : this.state.points,
            bonus : this.state.bonuses,
            listBonuses : this.state.listBonus
        }
        const isAlready = this.isAuthenticated();
        return (
            <div>
                {!isAlready ? <Redirect to= {{pathname : '/'}} /> : (
                    <div>
                        <div> <Header logout = {this.logout} data = {currentUser} fun = {this.select} /> </div>
                        <div> <Body data = {currentUser} state={this.state} /> </div>

                    </div>


                )}
            </div>


        );
    }
}

export default Admin;
