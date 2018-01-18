import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';



class Header extends Component {

    render() {
        var data = this.props.data;



        return ( <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            <span> добрый день,</span>
                            <span> {data.name} </span>
                            <Button onClick={this.props.logout}>Выйти</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
                </div>
        );
    }
}

export default Header;
