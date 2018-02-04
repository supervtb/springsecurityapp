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





class DialogConfirmUser extends Component {
    constructor(){
        super();
        this.state = {
            name:""
        }

    }
    componentWillMount(){
        this.setState({"name":this.props.name})
    }

    submitForm(event) {
        event.preventDefault();
        superagent
            .delete('http://localhost:8082/rest/v1/users/'.concat(this.props.name))
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
        var user = data.items;

        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <DialogTitle id="alert-dialog-title">{"Удалить компанию"}</DialogTitle>
                    <DialogContent>
                        Вы действительно хотите удалить {user.name}?
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


export default DialogConfirmUser;