// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: false,
            dueDate: false,
            status: false,
        }
        
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    toggleChangeDescription = () => {
        this.setState({
            description: true,
        })
    }

    saveChangeDescription = (e) => {
        let temp = this.props.toDoListItem.description
        if (e.target.value === '') this.props.toDoListItem.description = "No Description"
        else this.props.toDoListItem.description = e.target.value
        this.props.changeItemDescription(this.props.toDoListItem.description, temp, this.props.toDoListItem.id)
        this.setState({
            description: false,
        })
    }

    toggleChangeDate = () => {
        this.setState({
            dueDate: true,
        })
    }

    saveChangeDate = (e) => {
        let temp = this.props.toDoListItem.due_date
        if (e.target.value === '') this.props.toDoListItem.due_date = "No Date"
        else this.props.toDoListItem.due_date = e.target.value
        this.props.changeItemDate(this.props.toDoListItem.due_date, temp, this.props.toDoListItem.id)
        this.setState({
            dueDate: false,
        })
    }

    toggleChangeStatus = () => {
        this.setState({
            status: true,
        })
    }

    saveChangeStatus = (e) => {
        let temp = this.props.toDoListItem.status
        if (e.target.value === '') this.props.toDoListItem.status = "incomplete"
        else this.props.toDoListItem.status = e.target.value
        this.props.changeItemStatus(this.props.toDoListItem.status, temp, this.props.toDoListItem.id)
        this.setState({
            status: false,
        })
    }

    moveItemUp = () => {
        this.props.moveItemUp(this.props.toDoListItem.id)
    }

    moveItemDown = () => {
        this.props.moveItemDown(this.props.toDoListItem.id)
    }

    deleteItem = () => {
        this.props.deleteItem(this.props.toDoListItem.id)
    }

    render() {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card1'>
                {this.state.description === false ? 
                    <div 
                        className='item-col task-col'
                        onClick={this.toggleChangeDescription}>{listItem.description}</div>
                :   <input
                        className='item-col task-col1'
                        defaultValue={listItem.description}
                        onBlur={this.saveChangeDescription}
                        autoFocus />
                }
                {this.state.dueDate === false ?
                    <div 
                        className='item-col due-date-col'
                        onClick={this.toggleChangeDate}>{listItem.due_date}</div>
                :   <input
                        className='item-col due-date-col1'
                        defaultValue={listItem.due_date}
                        type='date'
                        onBlur={this.saveChangeDate}
                        autoFocus />
                }
                {this.state.status === false ?
                    <div 
                        className='item-col status-col' 
                        className={statusType}
                        onClick={this.toggleChangeStatus}>{listItem.status}</div>
                :   <select
                        className='item-col status-col1'
                        defaultValue={listItem.status}
                        onBlur={this.saveChangeStatus}
                        autoFocus>
                            <option value='complete'>complete</option>
                            <option value='incomplete'>incomplete</option>
                    </select>
                }
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className='list-item-control todo-button upArrow'
                        onClick={this.moveItemUp} />
                    <KeyboardArrowDown 
                        className='list-item-control todo-button downArrow'
                        onClick={this.moveItemDown} />
                    <Close 
                        className='list-item-control todo-button deleteItem'
                        onClick={this.deleteItem} />
                </div>
            </div>
        )
    }
}

export default ToDoItem;