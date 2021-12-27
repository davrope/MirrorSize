import React from 'react';

class Height extends React.Component{
    constructor(props){
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('Your height is ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Height:
                    <input type = "number" value = {this.state.value} onChange = {this.handleChange} />
                </label>
                <input type = "submit" value = "Submit"/>
            </form>
        );
    }
}