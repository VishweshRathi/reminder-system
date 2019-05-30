import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import axios from 'axios'
// import class from './Show_Reminder.css'

class ShowReminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminderList: [],
            error_info: {}
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/showEntry').then(res=>{
            if(!res.data.isError)
                this.setState({reminderList: res.data.data})
            else 
                this.setState({error_info: res.data})
        }).catch(err=>{
            alert(err.data)
        })
    }

    showReminders = () =>{
        let reminderList = this.state.reminderList
        return reminderList.map(reminder=>{
            let date_sell = new Date(reminder.date_sell);
            let std_date_sell = date_sell.getDate() + '/' + (date_sell.getMonth()+1) + '/' + date_sell.getFullYear()
            let date_nxt_installment = new Date(reminder.nxt_installment);
            let std_date_nxt_installment = reminder.nxt_installment == 0 ? "Not Applicable" : date_nxt_installment.getDate() + '/' + (date_nxt_installment.getMonth()+1) + '/' + date_nxt_installment.getFullYear()
            return(
            <tr style={{textAlign: "center"}}>
                <td>{reminder._id}</td>
                <td>{reminder.cus_name}</td>
                <td>{std_date_sell}</td>
                <td>{reminder.num_installment}</td>
                <td>{reminder.num_installment_remain}</td>
                <td>{reminder.total_amount}</td>
                <td>{std_date_nxt_installment}</td>
            </tr>
            )
        })
    }

    render(){
        const {reminderList, error_info} = this.state
        if(error_info.isError) return <p style={{textAlign: "center", fontWeight: "bold", fontSize: "1.3em"}}>{error_info.data}</p>
        if (reminderList.length === 0) return null;
        return(
        <Aux>
            <div class="container">
                <h2>Reminder List</h2>
                <div class="table-responsive" style={{margin: "3em 0 7em"}}>          
                    <table class="table">
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>Bill Id</th>
                                <th style={{textAlign: "center"}}>Customer name</th>
                                <th style={{textAlign: "center"}}>Sold date</th>
                                <th style={{textAlign: "center"}}>Total installments</th>
                                <th style={{textAlign: "center"}}>Remaning installments</th>
                                <th style={{textAlign: "center"}}>Amount</th>
                                <th style={{textAlign: "center"}}>Next installment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showReminders()}
                        </tbody>
                    </table>
                </div>
            </div>            
        </Aux>
        );
    }
}

export default ShowReminders