import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import axios from 'axios'
// import class from './Add_Reminder.css'
import Spinner from '../Spinner/Spinner'
class TodayReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            cus_name: "",
            date_sell: "",
            num_installment: "",
            total_amount: "",
            loading: false
        };
    }

    todayReminders = () =>{
        this.setState({loading: true})
        axios.get('http://localhost:3001/todayReminders').then(res=>{
            this.setState({loading: false})
            alert(res.data.data)
        }).catch(err=>{
            this.setState({loading: false})
            alert(err.data.data)
        })
    }

    render() {
        return (
            <Aux>
                {this.state.loading ? <Spinner/> : null}
                <div style={{textAlign: "center", margin: "5em"}}>
                    <p style={{marginBottom:"2em",fontWeight: "bold", fontSize: "1.4em"}}>Please press the below button to send Email.</p>
                    <button style={{width: "10%"}} onClick={this.todayReminders} type="button" className="btn btn-success">Success</button>
                </div>
            </Aux >
        );
    };
}

export default TodayReminder