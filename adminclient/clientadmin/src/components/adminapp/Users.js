import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import superagent from 'superagent'
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import DialogViewUsers from "./DialogViewUsers";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import DialogFormUsers from "./DialogFormUsers";
import DialogConfirmUser from "./DialogConfirmUser";


class Users extends Component {

    constructor(){
        super();
        this.state = {
            open: false,
            selectedIndex : 0,
            items : ''
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

    handleClickOpen = (item) => {
        this.setState({ open: true , items : item});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    selectedIndex=(index) =>{
        this.setState({selectedIndex:index}) ;
    };

    render() {
        var users = this.state.items
        var viewdata = this.handleClickOpen;
        var selectedIndex = this.selectedIndex;
        var data = this.props.data;

        var arrayUsers  = this.state.listUsers;
        var arrAllUsers = [];
        for( var key in arrayUsers){
            arrAllUsers.push(arrayUsers[key]);
        }

        var templateAllUsers =  arrAllUsers.map(function (item, index) {
            function openView(e, selectedindex) {
                viewdata(item);
                selectedIndex(selectedindex);
            }
            return (
                <TableRow key = {item.id}>
                    <TableCell >{item.id}</TableCell>
                    <TableCell >{item.name}</TableCell>
                    <TableCell >{item.email}</TableCell>
                    <TableCell >{item.firstname}</TableCell>
                    <TableCell >{item.bonuscardnumber}</TableCell>
                    <TableCell >{item.points}</TableCell>
                    <TableCell> <Button onClick={openView.bind(this, item, 1)} >Просмотреть</Button><Button onClick={openView.bind(this, item, 2)}>Изменить</Button><Button onClick={openView.bind(this, item, 3)} >Удалить</Button>  </TableCell>
                </TableRow>
            )



        })
        let renderdialog = 0;
        if (this.state.selectedIndex == 1){
            renderdialog =  <DialogViewUsers data={this.state} fun={this.handleClose}/>;
        }
        if (this.state.selectedIndex == 2){
            renderdialog =  <DialogFormUsers data={this.state}
                                             fun={this.handleClose}
                                             user = {users}
                                             name = {users.name}
                                             firstName = {users.firstname}
                                             secondName = {users.secondname}
                                             middleName = {users.middlename}
                                             email = {users.email}
                                             bonuscardnumber = {users.bonuscardnumber}
                                             points = {users.points}

            />;
        }

        if(this.state.selectedIndex == 3) {
            renderdialog = <DialogConfirmUser data = {this.state}
                                          fun = {this.handleClose}
                                          name = {users.name}
            />
        }
        return ( <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell >логин</TableCell>
                            <TableCell >почта</TableCell>
                            <TableCell >имя</TableCell>
                            <TableCell >номер карты</TableCell>
                            <TableCell >баллы</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templateAllUsers}
                    </TableBody>
                </Table>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {renderdialog}
                </Dialog>
            </Paper>
        );
    }
}

export default Users;
