import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput : '',
            items: [],
            isActive: false
        };
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        }, () => console.log(this.state.userInput)); // fonction call aback pour voir le contenu du state de userInput
    }

    addTodo(event) {
        event.preventDefault(); // pour éviter le comportement de base du formulaire qui est de recharger la page lors de la soumission
        this.setState({
            userInput: '', // on vide le champ input après chaque submit
            items: [...this.state.items, this.state.userInput] // ES6 on créé comme une copie de tableau en lui insérant ce qu'il yavait dedans deja et on lui ajoute le nouveau userInput
        });
    }

    addActive = () => {
        this.setState(prevState => ({ isActive: !prevState.isActive }));
    };

    display() {
        if(this.state.isActive == true){
            return 'active';
        }
    }

    deleteTodo(item) {
        
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({
            items: array
        });
    }

    renderTodos() { //méthode pour afficher nos todos
        return this.state.items.map((item) => {
            return (
                <li key={item} className={`list-group-item ${this.display()}`} onClick={this.addActive}>
                    {item} | <button onClick={ this.deleteTodo.bind(this)}>X</button>
                </li>
            );   
        });
    }

    render() {
        const { isActive } = this.state.isActive;
        return(
            <div>
                <h1 align="center"> Ma Todo List </h1>
                <form className="form-row align-items-center">
                    <input 
                    className="form-control mb-2"
                    value={ this.state.userInput } 
                    type="text" 
                    placeholder="Renseigner un item"
                    onChange={this.onChange.bind(this)}
                    />
                    <button 
                    onClick={this.addTodo.bind(this)}
                    className="btn btn-primary"
                    >
                        Ajouter
                    </button>
                </form>
                <ul className="list-group mt-4">
                    {this.renderTodos()}
                </ul>
            </div>
        );
    }
}

export default TodoList;