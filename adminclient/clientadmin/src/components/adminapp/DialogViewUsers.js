

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class DialogViewUsers extends Component {


    render() {
        var data = this.props.data;
        var users = data.items;
        var roles = [];
        console.log(users)
        const rolename = users.role.map((role) =>
            <DialogContentText key = {role.roleId}>{role.roleName}</DialogContentText>
        );

        const addedbonus = users.bonus.map((bonus) =>
            <DialogContentText key = {bonus.bonusId}>{bonus.nameBonus}</DialogContentText>

        );
        return(
            <div>
                <DialogTitle id="alert-dialog-title">{"Пользователь"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ID пользователя: {users.id}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Логин: {users.name}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                         Имя: {users.firstname}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Отчество: {users.middlename}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Фамилия: {users.secondname}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Почта: {users.email}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Номер карты: {users.bonuscardnumber}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Кол-во баллов: {users.points}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Роль: {rolename}
                    </DialogContentText>
                    <DialogContentText  id="alert-dialog-description">
                        Подключенные бонусы: {addedbonus}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.fun.bind(this)} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </div>
        )
    }
}
export default DialogViewUsers;