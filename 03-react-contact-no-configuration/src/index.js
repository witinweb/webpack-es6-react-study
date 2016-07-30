import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

class ContactsAppContainer extends Component{
    constructor(){
        super();
        this.state={
            contacts:[],
            filterOptions: []
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
        fetch('./src/filter-options.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({filterOptions: responseData});
            })
            .catch((error) => {
                console.log("Error fetching", error);
            });
    }

    render(){
        return(
            <ContactsApp contacts={this.state.contacts} filterOptions={this.state.filterOptions} />
        )
    }
}


// 상태 저장 컴포넌트
// SearchBar 와 ContactList 를 렌더링하고
// filterText 상태와 handleUserInput 콜백을 속성을 통해 전달한다

class ContactsApp extends Component{
    constructor(){
        super();
        this.state={
            filterText: '',
            selectedOption: 'name'
        };
    }
    handleUserInput(searchTerm){
        this.setState({filterText:searchTerm})
    }
    handleUserOptionSelect(selectedOption){
        this.setState({selectedOption:selectedOption })
    }
    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
                <FilterOptionList filterOptions={this.props.filterOptions} selectedOption={this.state.selectedOption} onChange={this.handleUserOptionSelect.bind(this)} />
                <ContactList contacts={this.props.contacts}
                             filterText={this.state.filterText}
                             selectedOption={this.state.selectedOption} />
                
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
        let target = this.props.selectedOption
        let filteredContacts = this.props.contacts.filter(
            (contact) => contact[target].indexOf(this.props.filterText) !== -1
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

class FilterOptionList extends Component{
    handleChange(event){
        this.props.onChange(event.target.value)
    }
    render(){
        console.log('options:' + this.props.filterOptions);
        return (
        <select onChange={this.handleChange.bind(this)}>{this.props.filterOptions.map(
                (option, i) => <FilterOption key={i}
                                          name={option.name}
                                          target={option.target}/>
            )}
        </select>
        )
    }
}
FilterOptionList.propTypes = {
    filterOptions: PropTypes.arrayOf(PropTypes.object)
}

class FilterOption extends Component{
    render(){
        return <option selected={this.props.selected} value={this.props.target}>{this.props.name}</option>
    }
}
FilterOption.propTypes = {
    name : PropTypes.string.isRequired,
    target : PropTypes.string.isRequired,
    selected : PropTypes.string
}

render(
  <ContactsAppContainer />,
  document.getElementById('root')
);
