import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import superagent from 'superagent'
import Checkbox from 'material-ui/Checkbox';



class Users extends Component {

    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/users')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
            .end((err,res) =>{ if (res){
                    this.setState({
                        listUsers : res.body
                    })
                }
                else {
                    localStorage.removeItem('accesstoken');
                    this.setState({});

                }}
            );
    }



    render() {
        var arrayUsers  = this.state.listUsers;
        var arrAllUsers = [];
        for( var key in arrayUsers){
            arrAllUsers.push(arrayUsers[key]);
        }

        var templateAllUsers =  arrAllUsers.map(function (item, index) {
            console.log(item)
            return (
                <TableRow key = {item.id}>
                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                    <TableCell >{item.id}</TableCell>
                    <TableCell >{item.name}</TableCell>
                    <TableCell >{item.email}</TableCell>
                    <TableCell >{item.firstname}</TableCell>
                    <TableCell >{item.bonuscardnumber}</TableCell>
                    <TableCell >{item.points}</TableCell>
                </TableRow>
            )

        })


        return ( <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" ></TableCell>
                            <TableCell >ID</TableCell>
                            <TableCell >логин</TableCell>
                            <TableCell >почта</TableCell>
                            <TableCell >имя</TableCell>
                            <TableCell >номер карты</TableCell>
                            <TableCell >баллы</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templateAllUsers}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Users;
