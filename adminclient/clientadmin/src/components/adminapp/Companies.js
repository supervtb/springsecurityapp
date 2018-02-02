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
import DialogView from "./DialogView";
import DialogForm from "./DialogForm";
import DialogConfirm from "./DialogConfirm";



class Companies extends Component {
    constructor(){
        super();
        this.state = {
            open: false,
            selectedIndex : 0,
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

    selectedIndex=(index) =>{
      this.setState({selectedIndex:index}) ;
    };







    render() {
        var company = this.state.items
        var viewdata = this.handleClickOpen;
        var selectedIndex = this.selectedIndex;
        var data = this.props.data;
        var arrayStore  = this.state.listStore;
        var arrAllStores = [];
        for( var key in arrayStore){
            arrAllStores.push(arrayStore[key]);
        }



        var templateAllBonuses =  arrAllStores.map(function (item, index) {
            console.log(item);
            function openView(e, selectedindex) {
                viewdata(item);
                selectedIndex(selectedindex);
            }

            return (
                <TableRow  key = {item.storeId}>
                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                    <TableCell >{item.storeId}</TableCell>
                    <TableCell >{item.storeName}</TableCell>
                    <TableCell >{item.percent} </TableCell>
                    <TableCell > <Button onClick={openView.bind(this, item, 1)} >Просмотреть</Button><Button onClick={openView.bind(this, item, 2)}>Изменить</Button> <Button onClick={openView.bind(this, item, 3)}>Удалить</Button></TableCell>
                </TableRow>
            )

        })
        let renderdialog = 0;
        if (this.state.selectedIndex == 1){
            renderdialog =  <DialogView data={this.state} fun={this.handleClose}/>;
        }
        if (this.state.selectedIndex == 2){
            console.log(this.state.selectedIndex)
            renderdialog =  <DialogForm data={this.state}
                                        fun={this.handleClose}
                                        store = {company.storeId}
                                        storeName={company.storeName}
                                        percent = {company.percent} />;
        }

        if(this.state.selectedIndex == 3) {
            console.log(this.state.selectedIndex)
            renderdialog = <DialogConfirm data = {this.state}
                                          fun = {this.handleClose}
                                          store = {company.storeId}
                                          storeName={company.storeName}
            />
        }



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
                    {renderdialog}
                </Dialog>
            </Paper>
        );
    }
}

export default Companies;
