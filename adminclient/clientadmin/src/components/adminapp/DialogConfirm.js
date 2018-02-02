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
            storeName : ""
        }

    }
    componentWillMount(){
        this.setState({"storeName":this.props.storeName,"percent":this.props.percent})
    }

    submitForm(event) {
        event.preventDefault();
        superagent
            .delete('http://localhost:8082/rest/v1/store/'.concat(this.props.store))
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
            .end((err, res) => {
                if(res.statusCode==200){
                    alert("удалено");
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
                    <DialogTitle id="alert-dialog-title">{"Удалить компанию"}</DialogTitle>
                    <DialogContent>
                        Вы действительно хотите удалить {company.storeName}?
                       </DialogContent>
                    <DialogActions>
                        <Button type="submit" >
                            Удалить
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