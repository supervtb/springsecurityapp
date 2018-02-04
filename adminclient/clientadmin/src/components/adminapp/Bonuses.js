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

import DialogViewBonuses from './DialogViewBonuses'
import DialogFormBonuses from './DialogFormBonuses'
import DialogConfirmBonuses from "./DialogConfirmBonuses";





class Bonuses extends Component {

    constructor(){
        super();
        this.state = {
            open: false,
            selectedIndex : 0,
            items : ''
        }
    }

    componentDidMount(){
        superagent.get('http://localhost:8082/rest/v1/bonuses')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+localStorage.getItem('accesstoken'))
            .end((err,res) =>{ if (res){
                    this.setState({
                        listBonus : res.body
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
        var bonus = this.state.items
        var viewdata = this.handleClickOpen;
        var selectedIndex = this.selectedIndex;
        var data = this.props.data;
        var arrayBonuses  = this.state.listBonus;
        var arrAllBonus = [];
        for( var key in arrayBonuses){
            arrAllBonus.push(arrayBonuses[key]);
        }

        var templateAllBonuses =  arrAllBonus.map(function (item, index) {
            console.log(item);
            function openView(e, selectedindex) {
                viewdata(item);
                selectedIndex(selectedindex);
            }
            return (
                <TableRow key = {item.bonusId}>
                    <TableCell >{item.bonusId}</TableCell>
                    <TableCell >{item.nameBonus}</TableCell>
                    <TableCell >{item.descriptionBonus}</TableCell>
                    <TableCell >{item.priceBonus}</TableCell>
                    <TableCell >{item.store.storeName}</TableCell>
                    <TableCell> <Button onClick={openView.bind(this, item, 1)} >Просмотреть</Button><Button onClick={openView.bind(this, item, 2)}>Изменить</Button> <Button onClick={openView.bind(this, item, 3)}>Удалить</Button></TableCell>
                </TableRow>
            )

        })

        let renderdialog = 0;
        if (this.state.selectedIndex == 1){
            renderdialog =  <DialogViewBonuses data={this.state} fun={this.handleClose}/>;
        }
        if (this.state.selectedIndex == 2){
            console.log(this.state.selectedIndex)
            renderdialog =  <DialogFormBonuses data={this.state}
                                        fun={this.handleClose}
                                        bonus = {bonus.bonusId}
                                        nameBonus={bonus.nameBonus}
                                        descriptionBonus = {bonus.descriptionBonus}
                                               priceBonus = {bonus.priceBonus}
                                               store = {bonus.store.storeName}
                                               storeId = {bonus.store.storeId}
            />;
        }

        if(this.state.selectedIndex == 3) {
            console.log(this.state.selectedIndex)
            renderdialog = <DialogConfirmBonuses data = {this.state}
                                          fun = {this.handleClose}
                                          bonusId = {bonus.bonusId}
                                          nameBonus={bonus.nameBonus}
            />
        }
        return ( <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell >название</TableCell>
                            <TableCell >описание</TableCell>
                            <TableCell >стоимость</TableCell>
                            <TableCell >магазин</TableCell>
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

export default Bonuses;
