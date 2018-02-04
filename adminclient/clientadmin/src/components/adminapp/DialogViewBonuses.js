import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class DialogViewBonuses extends Component {


    render() {
        var data = this.props.data;
        var bonuses = data.items;
        return(
            <div>
                <DialogTitle id="alert-dialog-title">{"Бонус"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ID бонуса: {bonuses.bonusId}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Название бонуса: {bonuses.nameBonus}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Описание бонуса: {bonuses.descriptionBonus}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Стоимость бонуса: {bonuses.priceBonus}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Компания: {bonuses.store.storeName}
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
export default DialogViewBonuses;