// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        document.addEventListener('keydown',this.keydownHandler);
    }

    keydownHandler = (e) => {
        if(e.key === 'z' && e.ctrlKey === true){
            this.props.undoCallback();
            this.forceUpdate();
        } 
        else if(e.key === 'y' && e.ctrlKey === true){
            this.props.redoCallback();
            this.forceUpdate();
        } 
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    handleUndoClick = () => {
        this.props.undoCallback();
    }

    handleRedoClick = () => {
        this.props.redoCallback();
    }

    changeListName = (newName, id) => {
        this.props.changeListNameCallback(newName, id);
    }

    render() {
        if (this.props.currentList.id === undefined){
            console.log("empty")
        }
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id="add-undo-redo-box">
                        {this.props.currentList.id === undefined ?
                            <AddBox 
                            id="add-list-button"
                            className="material-icons todo_button"
                            onClick={this.handleAddNewList} />
                        :   <>
                            {this.props.hasTransactions.hasTransactionToUndo() ?
                                <Undo 
                                    id="undo-button" 
                                    className="list-item-control material-icons todo-button"
                                    onClick={this.handleUndoClick} />
                            :   <div/>
                            }
                            {this.props.hasTransactions.hasTransactionToRedo() ?
                                <Redo
                                    id="redo-button" 
                                    className="list-item-control material-icons todo-button"
                                    onClick={this.handleRedoClick} />
                            :   <div/>
                            }
                            </>
                        
                        }
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            toDoList={toDoList} 
                            currentList={this.props.currentList}                               // PASS THE LIST TO THE CHILDREN
                            loadToDoListCallback={this.props.loadToDoListCallback}  // PASS THE CALLBACK TO THE CHILDREN
                            listNameChanged={this.changeListName} />
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;