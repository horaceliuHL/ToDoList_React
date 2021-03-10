// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        let clasName = 'todo-list-button'
        if (this.props.toDoList === this.props.currentList){
            clasName = 'todo-list-button1'
        }

        return (
            <div 
                className={clasName}
                onClick={this.handleLoadList}
            >
                <div className='alignText'>{this.props.toDoList.name}<br /></div>
            </div>
        )
    }
}

export default ListLink;