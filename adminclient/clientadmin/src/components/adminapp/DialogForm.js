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





class DialogForm extends Component {
    constructor(){
        super();
        this.state = {
            storeId : "",
            storeName : "",
            percent : ""
        }

    }
    handleStoreNameChanged(event){
        this.setState({storeName: event.target.value})

    }
    handlePercentChanged(event){
        this.setState({percent: event.target.value})

    }

    componentWillMount(){
        this.setState({"storeName":this.props.storeName,"percent":this.props.percent})
    }



    submitForm(event) {
        event.preventDefault();
            superagent
                .put('http://localhost:8082/rest/v1/store')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
                .send({"storeId": this.props.store, "storeName": this.state.storeName, "percent": this.state.percent})
                .end((err, res) => {
                if(res.statusCode==200){
                    alert("изменения сохранены");
                }
                else {
                    alert("произошла ошибка");
                }
                });
     }
    render() {

        var data = this.props.data;
        var company = data.items;

        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                <DialogTitle id="alert-dialog-title">{"Изменить данные компании"}</DialogTitle>
                <DialogContent>
                    <TextField label="ID магазина" disabled value={this.props.store}  />
                    <TextField label="название" value={this.state.storeName} onChange={this.handleStoreNameChanged.bind(this)}  />
                    <TextField label="процент"  value={this.state.percent} onChange={this.handlePercentChanged.bind(this)}/>
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


export default DialogForm;