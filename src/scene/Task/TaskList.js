//import liraries
import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api';
import { screen,theme } from '../../common';
import { Network, toastShort } from '../../utils';
import TaskItem from './TaskItem';
// create a component
export default class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskData:null,
            biologyInId:null
        }
    }
    static getDerivedStateFromProps(nextProps,prevState) {
        const { taskData,biologyInId }=nextProps;
        if (taskData !== prevState.taskData) {
            // console.info(taskData)
            return{
                taskData,
                biologyInId
            }
        }
        return null
    }
    renderTaskList=(data)=>{
        const keyExtractor = (item, index) =>index.toString();
        const renderItem =(item)=> {
            return (
                <TaskItem taskItem={item} biologyInId={this.state.biologyInId}/>
            )
        }
        return (
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={(item) =>renderItem(item)} />
        )
    }
    render() {
        return (
            this.renderTaskList(this.state.taskData)
        )

    }
}

