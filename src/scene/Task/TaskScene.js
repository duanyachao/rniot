//import liraries
import React, { Component } from 'react';
import { 
    ListView,
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header,Area,Batch,Dayage} from '../../components';
import TaskList from './TaskList';
import api from '../../api';
import { Network, toastShort } from '../../utils';
import { screen,theme } from '../../common';
// create a component
export default class TaskScene extends Component {
    static navigationOptions = {
        header: <Header title='任务管理'></Header>
    }
    constructor(props) {
        super(props);
        this.state = {
            orgId: null,
            batch:null,
            dayAge:null,
            taskData:null
        }
    }
    requesttaskData = ()=>{
        const {batch,dayAge,taskData}=this.state;
        let headers = {
            'X-Token': token,
            'Content-Type': 'application/json'
        };
        let params = { "biologyInId": batch.biologyId, "dayAge": dayAge };
        Network.postJson(api.HOST + api.TASKLIST, params, headers, (res) => {
            if (res.meta.success && res.data.length>0) {
                this.setState({
                    taskData:res.data    
                })
            }else{
                this.setState({
                    taskData:null    
                })    
            }
        })
    }
    areaChange(item) {
        this.setState({
            orgId: item.orgId
        })
    }
    batchChange(batch){
        if (batch) {
            this.setState({
                batch:batch,
            })    
        } else {
            this.setState({
                batch:null,
                taskData:null
            })    
        }   
        
    }
    dayAgeChange(dayAge){
        if (dayAge) {
            this.setState({
                dayAge:dayAge
            })
            this.requesttaskData()     
        } else {
            this.setState({
                taskData:null
            })    
        }  
    }
    render() {
        const { orgId,batch,biologyInId,dayAge,taskData}=this.state;
        // console.info(batch)
        return (
            <View style={styles.container}>
                <Area callbackParent={(item) => this.areaChange(item)}></Area>
                <Batch orgId={orgId} callbackBacth={(batch) => this.batchChange(batch)}></Batch>
                <Dayage orgId={orgId} batch={batch} callbackDayage={(dayAge) => this.dayAgeChange(dayAge)}></Dayage>
                <View style={styles.taskTitle}>
                    <Icon name='bars' size={24} color={theme.iconColor}></Icon>
                    <Text style={styles.taskTitleText}>任务列表</Text>
                </View> 
                {(taskData && taskData.length>0 )?<TaskList taskData={taskData}></TaskList>:<View style={theme.nodata}><Text>无任务</Text></View>}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical:6,
    },
    taskTitleText: {
        paddingLeft: 10,

    }
});
