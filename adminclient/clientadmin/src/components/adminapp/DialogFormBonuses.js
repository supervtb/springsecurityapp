import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import superagent from 'superagent';





class DialogFormBonuses extends Component {
    constructor(){
        super();
        this.state = {
            bonus : "",
            nameBonus : "",
            descriptionBonus : "",
            priceBonus : "",
            store: "",
            storeId : ""
        }

    }
    handleStoreNameChanged(event){
        this.setState({nameBonus: event.target.value})

    }
    handlePercentChanged(event){
        this.setState({descriptionBonus: event.target.value})

    }
    handlePriceChanged(event){
        this.setState({priceBonus: event.target.value})

    }



    componentWillMount(){
        this.setState({"nameBonus":this.props.nameBonus,
            "descriptionBonus":this.props.descriptionBonus,
        "priceBonus": this.props.priceBonus,
            "store" : this.props.store,
            "storeId" : this.props.storeId
        })
    }



    submitForm(event) {
        event.preventDefault();
        superagent
            .put('http://localhost:8082/rest/v1/bonuses')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
            .send({"bonusId": this.props.bonus, "nameBonus": this.state.nameBonus, "descriptionBonus": this.state.descriptionBonus, "priceBonus" : this.state.priceBonus, "store": {"storeId" : this.props.storeId} } )
            .end((err, res) => {
                if(res.statusCode==200){
                    alert("изменения сохранены");
                }
                else {
                    alert("произошла ошибка");
                }
            });
        console.log(this.props.storeid);
    }
    render() {

        var data = this.props.data;
        var bonus = data.items;

        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <DialogTitle id="alert-dialog-title">{"Изменить данные компании"}</DialogTitle>
                    <DialogContent>
                        <TextField label="ID бонуса" fullWidth disabled value={this.props.bonus}  />
                        <div> <TextField label="магазин"  fullWidth disabled value={this.props.store} /> </div>
                        <div>  <TextField label="название бонуса" fullWidth value={this.state.nameBonus} onChange={this.handleStoreNameChanged.bind(this)}  /> </div>
                        <div> <TextField label="описание бонуса" fullWidth value={this.state.descriptionBonus} onChange={this.handlePercentChanged.bind(this)}/> </div>
                        <div> <TextField label="цена бонуса" fullWidth value={this.state.priceBonus} onChange={this.handlePriceChanged.bind(this)}/> </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" >
                            Сохранить изменения
                        </Button>
                        <Button onClick={this.props.fun.bind(this)} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </form>
            </div>
        )
    }
}


export default DialogFormBonuses;