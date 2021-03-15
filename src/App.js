// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

import AddNewItem_Transaction from './components/transactions/AddNewItem_Transaction';
import ChangeDate_Transaction from './components/transactions/ChangeDate_Transaction';
import ChangeStatus_Transaction from './components/transactions/ChangeStatus_Transaction';
import MoveItemUp_Transaction from './components/transactions/MoveItemUp_Transaction';
import MoveItemDown_Transaction from './components/transactions/MoveItemDown_Transaction';
import DeleteItem_Transaction from './components/transactions/DeleteItem_Transaction';
import ChangeTask_Transaction from './components/transactions/ChangeTask_Transaction';

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'

class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("recentLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    // console.log("loading " + toDoList);
    this.tps = new jsTPS();

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  closeCurrentList = () => {
    this.setState({
      currentList: {items: []},
    })
  }

  deleteCurrentList = () => {
    const newList = this.state.toDoLists.filter(list => 
      list.id !== this.state.currentList.id
    );
    console.log("successful")
    this.setState({
      toDoLists: newList,
      currentList: {items: []},
    }, this.afterToDoListsChangeComplete)
  }

  addNewItemInCurrentList = () => {
    let temp = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "No Date",
      status: "incomplete",
    }
    this.state.currentList.items.push(temp)
    this.setState({
      nextListItemId: this.state.nextListItemId + 1
    }, this.afterToDoListsChangeComplete)
    return temp;
  }

  removeItemInCurrentList = (listItemId) => {
    let item;
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === listItemId) item = i;
    }
    this.state.currentList.items.splice(item, 1);
    console.log(this.state.currentList)
    // let tempToDoLists = this.state.toDoLists.shift();
    // tempToDoLists = this.state.toDoLists.unshift(this.state.currentList);
    this.setState({
      // todoLists: tempToDoLists,
      nextListItemId: this.state.nextListItemId - 1
    }, this.afterToDoListsChangeComplete)
  }

  addNewItemInCurrentListTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  changeTask = (desc, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === id){
        this.state.currentList.items[i].description = desc;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }

  changeDescriptionTransaction = (newItem, oldItem, id) => {
    let transaction = new ChangeTask_Transaction(this, newItem, oldItem, id);
    this.tps.addTransaction(transaction);
  }

  changeDate = (date, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === id){
        this.state.currentList.items[i].due_date = date;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }

  changeDateTransaction = (newDate, oldDate, id) => {
    let transaction = new ChangeDate_Transaction(this, newDate, oldDate, id);
    this.tps.addTransaction(transaction);
  }


  changeStatus = (status, id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === id){
        this.state.currentList.items[i].status = status;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }


  changeStatusTransaction = (newStatus, oldStatus, id) => {
    let transaction = new ChangeStatus_Transaction(this, newStatus, oldStatus, id);
    this.tps.addTransaction(transaction);
  }

  moveItemUp = (id) => {
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === id && i !== 0){
        let temp = this.state.currentList.items[i]
        this.state.currentList.items.splice(i, 1)
        this.state.currentList.items.splice(i - 1, 0, temp)
        break;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }

  moveItemUpTransaction = (id) => {
    let transaction = new MoveItemUp_Transaction(this, id);
    this.tps.addTransaction(transaction);
  }

  moveItemDown = (idItem) => {
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === idItem && i !== this.state.currentList.items.length - 1){
        let temp = this.state.currentList.items[i]
        this.state.currentList.items.splice(i, 1)
        this.state.currentList.items.splice(i + 1, 0, temp)
        break;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }

  moveItemDownTransaction = (id) => {
    let transaction = new MoveItemDown_Transaction(this, id);
    this.tps.addTransaction(transaction);
  }

  deleteItem = (idItem) => {
    let temp = [];
    for (let i = 0; i < this.state.currentList.items.length; i++){
      if (this.state.currentList.items[i].id === idItem){
        temp.push(i)
        temp.push(this.state.currentList.items[i])
        this.state.currentList.items.splice(i, 1)
        break;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
    return temp;
  }

  restoreItem = (itemArray) => {
    this.state.currentList.items.splice(itemArray[0], 0, itemArray[1])
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }


  deleteItemTransaction = (id) => {
    let transaction = new DeleteItem_Transaction(this, id);
    this.tps.addTransaction(transaction);
  }


  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  changeListName = (newName, id) => {
    for (let i = 0; i < this.state.toDoLists.length; i++){
      if (this.state.toDoLists[i].id === id){
        this.state.toDoLists[i].name = newName;
        break;
      }
    }
    this.forceUpdate();
    this.afterToDoListsChangeComplete();
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  undo = () => {
    if (this.tps.hasTransactionToUndo()){
      this.tps.undoTransaction();
      this.afterToDoListsChangeComplete();
    }
  }

  redo = () => {
    if (this.tps.hasTransactionToRedo()){
      this.tps.doTransaction();
      this.afterToDoListsChangeComplete();
    }
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          currentList={this.state.currentList}
          toDoLists={this.state.toDoLists}
          hasTransactions={this.tps}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          undoCallback={this.undo}
          redoCallback={this.redo}
          changeListNameCallback={this.changeListName}
        />
        <Workspace 
          toDoListItems={items} 
          currentList={this.state.currentList}
          addNewItem={this.addNewItemInCurrentListTransaction}
          deleteListCallback={this.deleteCurrentList}
          closeListCallback={this.closeCurrentList}
          itemChangeDescriptionCallback={this.changeDescriptionTransaction}
          itemChangeDateCallback={this.changeDateTransaction}
          itemChangeStatusCallback={this.changeStatusTransaction}
          moveItemUpCallback={this.moveItemUpTransaction}
          moveItemDownCallback={this.moveItemDownTransaction}
          deleteItemCallback={this.deleteItemTransaction}
          />
      </div>
    );
  }
}

export default App;