import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class DialogView extends Component {


    render() {
        var data = this.props.data;
        var company = data.items;
        return(
            <div>
        <DialogTitle id="alert-dialog-title">{"Компания"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            ID компании: {company.storeId}
    </DialogContentText>
        <DialogContentText id="alert-dialog-description">
            Название компании: {company.storeName}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
            Процент компании: {company.percent}
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
export default DialogView;