// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: 0,
            editListName: false,
        }
        
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.setState({ clicked: this.state.clicked+1 });

        setTimeout(() => {
            if (this.state.clicked === 1){
                this.props.loadToDoListCallback(this.props.toDoList);
            } else if (this.state.clicked === 2){
                this.setState({ editListName: true })
            }
            this.setState({ clicked: 0 })
        }, 200)
    }

    saveChangeListName = (e) => {
        if (e.target.value === '') this.props.toDoList.name = "Untitled";
        else this.props.toDoList.name = e.target.value;
        this.setState({ editListName: false })
    }

    render() {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink render");
        let clasName = 'todo-list-button'
        if (this.props.toDoList === this.props.currentList){
            clasName = 'todo-list-button1'
        }

        return (
            <>
            {this.state.editListName === false ?
                <div 
                className={clasName}
                onClick={this.handleLoadList}
                >
                    <div className='alignText'>{this.props.toDoList.name}<br /></div>
                </div>
            :   <input
                className={clasName}
                defaultValue={this.props.toDoList.name}
                onBlur={this.saveChangeListName}
                autoFocus />
            }
            </>
            
        )
    }
}

export default ListLink;