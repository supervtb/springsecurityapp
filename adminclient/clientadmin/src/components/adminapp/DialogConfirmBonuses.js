import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import superagent from 'superagent';





class DialogConfirmBonuses extends Component {
    constructor(){
        super();
        this.state = {
            bonusId : "",
            nameBonus : ""
        }

    }
    componentWillMount(){
        this.setState({"bonusId":this.props.bonusId,"nameDonus":this.props.nameBonus})
    }

    submitForm(event) {
        event.preventDefault();
        superagent
            .delete('http://localhost:8082/rest/v1/bonuses/'.concat(this.props.bonusId))
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
        var bonuses = data.items;

        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <DialogTitle id="alert-dialog-title">{"Удалить бонус"}</DialogTitle>
                    <DialogContent>
                        Вы действительно хотите удалить {bonuses.bonusName}?
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


export default DialogConfirmBonuses;