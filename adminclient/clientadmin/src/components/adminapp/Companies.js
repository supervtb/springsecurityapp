import React, { Component } from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import superagent from 'superagent'
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';



class Companies extends Component {
    constructor(){
        super();
        this.state = {
            open: false,
            items : ''
        }
    }


    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/store')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
            .end((err,res) =>{ if (res){
                    this.setState({
                        listStore : res.body
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







    render() {
        var company = this.state.items
        var viewdata = this.handleClickOpen;
        var data = this.props.data;
        var arrayStore  = this.state.listStore;
        var arrAllStores = [];
        for( var key in arrayStore){
            arrAllStores.push(arrayStore[key]);
        }



        var templateAllBonuses =  arrAllStores.map(function (item, index) {
            function openView(e) {
                viewdata(item);
            }

            return (
                <TableRow  key = {item.storeId}>
                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                    <TableCell >{item.storeId}</TableCell>
                    <TableCell >{item.storeName}</TableCell>
                    <TableCell >{item.percent} </TableCell>
                    <TableCell > <Button onClick={openView.bind(this, item)} >Просмотреть</Button><Button >Изменить</Button> <Button>Удалить</Button></TableCell>
                </TableRow>
            )

        })



        return ( <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" ></TableCell>
                            <TableCell >ID</TableCell>
                            <TableCell >название</TableCell>
                            <TableCell >процент кэшбэка</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templateAllBonuses}
                    </TableBody>
                </Table>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Компания"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                             ID компании: {company.storeId}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Название компании: {company.storeName}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Процент компании: {company.percent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

export default Companies;
