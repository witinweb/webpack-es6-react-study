import React, { Component } from 'react';
import update from 'react-addons-update';

class ContactCreator extends Component{

    constructor(){
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
        return(
            <div>
                <p>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="phone" placeholder="phone" value={this.state.name} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.handleChange.bind(this)}>
                        Insert
                    </button>
                </p>
            </div>
        );
    }
}

class Contacts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            contactData: [
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ]
        };
    }

    _insertContact(name, phone){
        let newState = update(this.state, {
            contactData: {
                $push: [{'name':name, 'phone':phone}]
            }
        });
        this.setState(newState);
    }

    render(){
        return(
            <div>
                <h1>Contacts</h1>
                <ContactCreator onInsert={this._insertContact.bind(this)} />
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<ContactInfo name={contact.name}
                                             phone={contact.phone}
                                             key={i}/>);
                    })}
                </ul>
            </div>
        )
    }
}

class ContactInfo extends React.Component {
    render() {
        return(
            <li>{this.props.name} {this.props.phone}</li>
        );
    }
}
