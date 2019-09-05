//import liraries
import React, { Component } from 'react';
import { Alert, View,PixelRatio, Text, StyleSheet, Switch, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api';
import { theme } from '../../components';
import { screen } from '../../common';
import { Network, toastShort } from '../../utils';
// create a component
export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskItem:null,
            biologyInId:null,
            switchStatus: null,
            taskStatus: null,
            disabled: null    
        }
    }
    static getDerivedStateFromProps(nextProps,prevState) {
        const {taskItem,biologyInId}=nextProps;
        if (taskItem !== prevState.taskItem) {
            switch (taskItem.item.FINISH_STATE) {
                case -1:
                case 1:
                    return{
                        switchStatus: true,
                        taskStatus: '未完成',
                        disabled: false,
                        taskItem,
                        biologyInId
                    }
                    break;
                case 0:
                    return {
                        switchStatus: false,
                        taskStatus: `完成(${taskItem.item.FINISH_TIME})`,
                        disabled: true,
                        taskItem,
                        biologyInId
                    }
                    break;
                default:
                    break;
            }
            
        }
        return null
    }
    taskAction(item, biologyInId) {
        console.info(biologyInId)
        if (item.FINISH_STATE == 0) {
            return
        } else {
            Alert.alert(
                '提示',
                '确定完成此任务?',
                [
                    {
                        text: '确定', onPress: () => {
                            let headers = {
                                'X-Token': token,
                                'Content-Type': 'application/json'
                            };
                            let params = { "biologyInId": biologyInId, "status": 0, "taskId": item.ID };
                            Network.postJson(api.HOST + api.TASKUPDATE, params, headers, (res) => {
                                // console.info(res.data)
                                if (res.meta.success) {
                                    this.setState({
                                        switchStatus: !this.state.switchStatus,
                                        disabled: true,
                                        taskStatus: `完成(${res.data.finishTime})`
                                    });
                                } else {
                                    toastShort(res.meta.message);
                                }
                            })
                        }
                    },
                    {
                        text: '取消', onPress: () => {
                            return
                        }
                    }
                ]
            )


        }
    }  
    render() {
        const {taskItem,biologyInId} = this.state;
        const item=taskItem.item;
        return (
            <TouchableHighlight underlayColor="rgb(255, 255,255)" disabled={this.state.disabled} onPress={() => this.taskAction(item,biologyInId)}>
                <View style={styles.taskItem}>
                    <View style={styles.taskItemLeft}>
                        <View style={styles.taskItemLeftTop}>
                            <Text style={styles.taskItemLeftTopText}>
                                {item.TASK_NAME}
                            </Text>
                        </View>
                        <View style={styles.taskItemLeftBottom}>
                            <View style={styles.taskTime}>
                                <Icon name='clock-o' size={24} color={'green'}></Icon>
                                <Text style={styles.taskItemLeftBottomText}>{item.START_TIME}--{item.END_TIME}</Text>
                            </View>
                            {(this.state.switchStatus) ?
                                <View style={styles.taskIsEnd}>
                                    <Icon name='clock-o' size={24} color={'red'}></Icon>
                                    <Text style={styles.taskItemLeftBottomText}>{this.state.taskStatus}</Text>
                                </View> :
                                <View style={styles.taskIsEnd}>
                                    <Icon name='check-circle' size={24} color={'green'}></Icon>
                                    <Text style={styles.taskItemLeftBottomText}>{this.state.taskStatus}</Text>
                                </View>}

                        </View>
                    </View>
                    <View style={styles.taskItemRight}>
                        <Switch
                            onValueChange={() => this.taskAction(item, biologyInId)}
                            value={this.state.switchStatus}
                            disabled={this.state.disabled}
                        >
                        </Switch>
                    </View>
                </View>
            </TouchableHighlight>);
    }
}

// define your styles
const styles = StyleSheet.create({
    taskItem: {
        padding: 6,
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: screen.onePixel,
        borderBottomColor: '#f0f0f0',
        marginBottom:1
    },
    taskItemLeft: {
    },
    taskItemLeftTop: {
        flexDirection: 'row',
    },
    taskItemLeftBottom: {
    },
    taskTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskIsEnd: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    taskItemLeftBottomText: {
        paddingLeft: 6
    },
    taskItemRight: {
        justifyContent:'flex-end',
        alignItems: 'center'
    }
});
