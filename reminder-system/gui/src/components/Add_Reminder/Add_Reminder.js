import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import axios from 'axios'

// import class from './Add_Reminder.css'
class AddReminder extends Component {
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



    postDataHandler = (e) =>{
        let date_in_epoch = new Date(this.state.date_sell).getTime()
        const post = {
            _id: this.state._id,
            cus_name: this.state.cus_name,
            date_sell: date_in_epoch,
            num_installment: this.state.num_installment,
            total_amount: this.state.total_amount
        }
        axios.post('http://localhost:3001/addEntry',post).then(res=>{
            console.log("res",res)
        })
    }

    handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    }
    render() {
        return (
            <Aux>
                <div className="col-md-4"></div>
                <div className="container col-md-4">
                    <h2 style={{marginBottom: "1em"}}>Add Reminder</h2>
                    <form action={this.getData}>
                        <div className="form-group">
                            <label htmlFor="bill_id">Bill ID:</label>
                            <input type="text" className="form-control" id="bill_id" placeholder="Enter bill ID" name="_id" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cus_name">Name:</label>
                            <input type="text" className="form-control" id="cus_name" placeholder="Enter customer name" name="cus_name" onChange={event => this.handleChange(event)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_sell">Sell date:</label>
                            <input type="date" className="form-control" id="date_sell" placeholder="Enter selling date" name="date_sell" onChange={event => this.handleChange(event)}/>
                        </div>    
                        <div className="form-group">
                            <label htmlFor="num_install">Number of Installments:</label>
                            <input type="number" className="form-control" id="num_install" placeholder="Enter total installments" name="num_installment" onChange={event => this.handleChange(event)}/>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="tot_amount">Total amount</label>
                            <input type="number" className="form-control" id="tot_amount" placeholder="Enter total amount" name="total_amount" onChange={event => this.handleChange(event)}/>
                        </div>   
                        <div style={{textAlign: "right"}}>                                             
                            <button style={{width: "20%"}} type="button" className="btn btn-danger">Cancel</button>
                            <button onClick={this.postDataHandler} style={{marginLeft: "2%", width: "20%"}} type="button" className="btn btn-success">Submit</button>                            
                        </div>
                    </form>
                </div>              
                <div className="col-md-4"></div>
            </Aux >
        );
    };

}

export default AddReminder