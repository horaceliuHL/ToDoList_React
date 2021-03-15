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

    handleChangeItemDescription = (newItem, oldItem, id) => {
        this.props.itemChangeDescriptionCallback(newItem, oldItem, id);
    }

    handleChangeItemDate = (newDate, oldDate, id) => {
        this.props.itemChangeDateCallback(newDate, oldDate, id);
    }

    handleChangeItemStatus = (newStatus, oldStatus, id) => {
        this.props.itemChangeStatusCallback(newStatus, oldStatus, id);
    }

    handleMoveItemUp = (id) => {
        this.props.moveItemUpCallback(id);
    }

    handleMoveItemDown = (id) => {
        this.props.moveItemDownCallback(id);
    }

    handleDeleteItem = (id) => {
        this.props.deleteItemCallback(id);
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
                        {this.props.currentList.id === undefined ?
                            <div/>
                        :   <>
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
                            </>
                        }
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem, index) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            index={index}
                            length={this.props.toDoListItems.length}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            changeItemDescription={this.handleChangeItemDescription}
                            changeItemDate={this.handleChangeItemDate}
                            changeItemStatus={this.handleChangeItemStatus}
                            moveItemUp={this.handleMoveItemUp}
                            moveItemDown={this.handleMoveItemDown}
                            deleteItem={this.handleDeleteItem}
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