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





class DialogFormUsers extends Component {
    constructor(){
        super();
        this.state = {
            firstName : "",
            middlename : "",
            secondName : "",
            email : "",
            bonuscardnumber : "",
            points : ""
        }

    }
    componentWillMount(){
        this.setState({
            "firstName":this.props.firstName,
            "middleName" : this.props.middleName,
            "secondName" : this.props.secondName,
            "email" : this.props.email,
            "bonuscardnumber" : this.props.bonuscardnumber,
            "points" : this.props.points
        })
    }

    handleFirstNameChanged(event){
        this.setState({firstName : event.target.value})

    }
    handleSecondNameChanged(event){
        this.setState({secondName: event.target.value})

    }
    handleMiddleNameChanged(event){
        this.setState({middleName: event.target.value})

    }
    handleEmailChanged(event){
        this.setState({email: event.target.value})

    }
    handleBonusCardNunberChanged(event){
        this.setState({bonuscardnumber: event.target.value})

    }
    handlePointsChanged(event){
        this.setState({points: event.target.value})

    }

    componentWillMount(){
        this.setState({"firstName":this.props.firstName,
            "secondName":this.props.secondName,
            "middleName" : this.props.middleName,
            "email" : this.props.email,
            "bonuscardnumber" : this.props.bonuscardnumber,
            "points" : this.props.points
        })
    }
    submitForm(event) {
        event.preventDefault();
        superagent
            .put('http://localhost:8082/rest/v1/users/'.concat(this.props.name))
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('accesstoken'))
            .send({
                "firstname": this.state.firstName,
                "secondname": this.state.secondName,
                "middlename": this.state.middleName,
                "email": this.state.email,
                "bonuscardnumber": this.state.bonuscardnumber,
                "points": this.state.points
            })
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
        var selectedUser = this.props.user;

        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)} >
                    <DialogTitle id="alert-dialog-title">{"Изменить данные пользователя"}</DialogTitle>
                    <DialogContent>
                        <TextField label="ID пользователя" disabled value={selectedUser.id}  />
                        <TextField label="Логин" disabled value={selectedUser.name}  />
                        <div>   <TextField fullWidth label="Имя" value={this.state.firstName} onChange={this.handleFirstNameChanged.bind(this)} /> </div>
                        <div>   <TextField fullWidth label="Отчество" value={this.state.middleName} onChange={this.handleMiddleNameChanged.bind(this)} /> </div>
                        <div>   <TextField fullWidth label="Фамилия" value={this.state.secondName} onChange={this.handleSecondNameChanged.bind(this)} /> </div>
                        <div>   <TextField fullWidth label="Почта" value={this.state.email} onChange={this.handleEmailChanged.bind(this)}  /> </div>
                        <div>   <TextField fullWidth label="Номер карты" value={this.state.bonuscardnumber} onChange={this.handleBonusCardNunberChanged.bind(this)} /> </div>
                        <div>   <TextField fullWidth label="Количество баллов" value={this.state.points} onChange={this.handlePointsChanged.bind(this)} /> </div>
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


export default DialogFormUsers;