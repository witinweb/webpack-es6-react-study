import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';

class ContactsAppContainer extends Component{
    constructor(){
        super();
        this.state={
            contacts:[]
        };
    }

    componentDidMount(){
        fetch('./src/contacts.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({contacts: responseData});
            })
            .catch((error) => {
                console.log("Error fetching", error);
            });
    }

    render(){
        return(
            <ContactsApp contacts={this.state.contacts} />
        )
    }
}

export default ContactsAppContainer

// 상태 저장 컴포넌트
// SearchBar 와 ContactList 를 렌더링하고
// filterText 상태와 handleUserInput 콜백을 속성을 통해 전달한다

class ContactsApp extends Component{
    constructor(){
        super();
        this.state={
            filterText: ''
        };
    }
    handleUserInput(searchTerm){
        this.setState({filterText:searchTerm})
    }
    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
                <ContactList contacts={this.props.contacts}
                             filterText={this.state.filterText} />
            </div>
        )
    }
}
ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
}

// 부모에서 속성을 통해 filterText(문자열) 와 onUserInput(콜백 함수)을 받는 순수 컴포넌트
class SearchBar extends Component{
    handleChange(event){
        this.props.onUserInput(event.target.value)
    }
    render(){
        return <input type="search"
                      placeholder="search"
                      value={this.props.filterText}
                      onChange={this.handleChange.bind(this)} />
    }
}

SearchBar.proptypes = {
    filterText: PropTypes.string.isRequired
}

// 속성을 통해 contacts와 filterText를 받는 순수 컴포넌트이며 연락처를 필터링한 후 표시함
// 순수 컴포넌트라고 하는 이유는 동일한 contacts와 filterText 속성을 전달하면 동일한 내용을 표시하기 때문

class ContactList extends Component{
    render(){
        let filteredContacts = this.props.contacts.filter(
            (contact) => contact.name.indexOf(this.props.filterText) !== -1
        );
        return(
            <ul>
                {filteredContacts.map(
                    (contact) => <ContactItem key={contact.email}
                                              name={contact.name}
                                              email={contact.email} />
                )}
            </ul>
        )
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
}

class ContactItem extends Component{
    render(){
        return <li>{this.props.name} - {this.props.email}</li>
    }
}
ContactItem.propTypes = {
    name : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired
}