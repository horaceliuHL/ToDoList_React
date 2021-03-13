// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
    }

    handleAddClick = () => {
        this.props.addNewItem();
    }

    handleDeleteButtonClick = () => {
        this.setState({
            modal: true,
        })
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
        this.setState({
            modal: false,
        })
    }

    closeModal = () => {
        this.setState({
            modal: false,
        })
    }

    handleCloseClick = () => {
        this.props.closeListCallback();
    }

    render() {
        let showOrHidden = this.state.modal === false ? "modal-hidden" : "modal-display";
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <AddBox 
                            id="add-item-button" 
                            className="list-item-control material-icons todo-button"
                            onClick={this.handleAddClick} />
                        <Delete 
                            id="delete-list-button" 
                            className="list-item-control material-icons todo-button"
                            onClick={this.handleDeleteButtonClick} />
                        <Close 
                            id="close-list-button" 
                            className="list-item-control material-icons todo-button" 
                            onClick={this.handleCloseClick} />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                        />))
                    }
                </div>
                <br />
                <div className={showOrHidden}>
                    <div className="modal-content">
                        <span className="close-button" onClick={this.closeModal}>&#10006;</span>
                        <div className="modal-title">Delete List?</div>
                        <div className="separator"></div>
                        <div>
                            <span className="confirm-button" onClick={this.handleDeleteList}>Confirm</span>
                            <span className="cancel-button" onClick={this.closeModal}>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Workspace;