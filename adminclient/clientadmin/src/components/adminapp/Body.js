import React, { Component } from 'react';



class Body extends Component {




    render() {
        var data = this.props.data


        return ( <div>
                <div>

                    <div> Добрый день {data.name} {data.secondname} </div>
                    <div> Ваш номер карты:  {data.bonuscardnumber} </div>

                </div>
            </div>
        );
    }
}

export default Body;
