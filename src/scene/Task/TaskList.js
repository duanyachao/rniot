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
            taskData:null
        }
    }
    
    static getDerivedStateFromProps(nextProps,prevState) {
        const { taskData }=nextProps;
        if (taskData !== prevState.taskData) {
            // console.info('改变',taskData,prevState.taskData)
            return{
                taskData
            }
        }
        return null
    }
    renderTaskList=(data)=>{
        const keyExtractor = (item, index) =>index.toString();
        const renderItem =(rowData, sectionID, rowID)=> {
            return (
                <TaskItem taskItem={rowData} biologyInId={this.props.biologyInId}/>
            )
        }
        const renderHeader=()=> {
            return (
                <View style={styles.taskTitle}>
                    <Icon name='bars' size={24} color={theme.iconColor}></Icon>
                    <Text style={styles.taskTitleText}>任务列表</Text>
                </View>
            )
        }
        const itemH = 100;
        return (
            <FlatList
                data={data}
                getItemLayout={(item, index) => ({ length: itemH, offset: itemH * index, index })}
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

