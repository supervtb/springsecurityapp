import React, { Component } from 'react';


import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import superagent from 'superagent'
import Checkbox from 'material-ui/Checkbox';



class Bonuses extends Component {

    constructor(){
        super();
        this.state = {

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


    render() {
        var arrayBonuses  = this.state.listBonus;
        var arrAllBonus = [];
        for( var key in arrayBonuses){
            arrAllBonus.push(arrayBonuses[key]);
        }

        var templateAllBonuses =  arrAllBonus.map(function (item, index) {
            console.log(item);
            return (
                <TableRow key = {item.bonusId}>
                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                    <TableCell >{item.bonusId}</TableCell>
                    <TableCell >{item.nameBonus}</TableCell>
                    <TableCell >{item.descriptionBonus}</TableCell>
                    <TableCell >{item.priceBonus}</TableCell>
                    <TableCell >{item.store.storeName}</TableCell>
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
                            <TableCell >описание</TableCell>
                            <TableCell >стоимость</TableCell>
                            <TableCell >магазин</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templateAllBonuses}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Bonuses;
