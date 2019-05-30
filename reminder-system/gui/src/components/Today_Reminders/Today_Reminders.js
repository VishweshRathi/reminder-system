import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import axios from 'axios'
// import class from './Add_Reminder.css'

class TodayReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            cus_name: "",
            date_sell: "",
            num_installment: "",
            total_amount: ""
        };
    }

    todayReminders = () =>{
        axios.get('http://localhost:3001/todayReminders').then(res=>{
            alert(res)
        }).catch(err=>{
            alert(err.data)
        })
    }

    render() {
        return (
            <Aux>
                <div style={{textAlign: "center", margin: "5em"}}>
                    <p style={{marginBottom:"2em",fontWeight: "bold", fontSize: "1.4em"}}>Please press the below button to send Email.</p>
                    <button style={{width: "10%"}} onClick={this.todayReminders} type="button" class="btn btn-success">Success</button>
                </div>
            </Aux >
        );
    };
}

export default TodayReminder