//import liraries
import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../common';
import { pickerStyle } from '../common/theme';
import Picker from 'react-native-picker';
import api from '../api';
import { Network, toastShort } from '../utils';
// create a component
export default class Dayage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dayAge: null,
            selectedIndex:null
            
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {callbackDayage} = this.props;
        if (nextProps.batch !== this.props.batch) {
            Picker.hide()
            if (nextProps.batch) {
                let headers = {
                    'X-Token': token,
                    'Content-Type': 'application/json'
                };
                let params = { "orgId": this.props.orgId, "yjCode": nextProps.batch.yjcode };
                Network.postJson(api.HOST + api.DAYAGES, params, headers, (res) => {
                    if (res.meta.success && res.data) {
                        this.setState({
                            dayAge: res.data,
                            selectedIndex:res.data
                        });
                    }
                    callbackDayage(this.state.selectedIndex);
                })
                
            } else {
                this.setState({
                    dayAge: null,
                    selectedIndex:null
                });    
            }
            
            
            
        }
        return true
        
    }
    selectDayAge() {
        const {dayAge,selectedIndex}=this.state;
        let dayageLists = [];
        for (var index = dayAge; index >= 1; index--) {
            dayageLists.push(index)
        }
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:'选择日龄',
            pickerData: dayageLists,
            selectedValue:[selectedIndex],
            onPickerConfirm: data => {
                const dayAge=parseInt(data);
                const {callbackDayage} = this.props;
                this.setState({
                    selectedIndex:dayAge   
                })
                callbackDayage(dayAge);
            }

        });
        Picker.toggle();
        
        
    }
    render() {
        const {dayAge,selectedIndex}=this.state;
        return (
            <View style={pickerStyle.container}>
                <View style={pickerStyle.pickerTip}>
                    <Icon name='calendar' size={18} color={theme.iconColor}></Icon>
                    <Text style={pickerStyle.pickerTipText}>日龄</Text>
                </View>
                {(this.state.selectedIndex) ?
                    <TouchableHighlight
                        underlayColor="rgb(255, 255,255)"
                        onPress={() => this.selectDayAge()}>
                        <View style={pickerStyle.picker}>
                            <Text style={pickerStyle.pickered}>{selectedIndex}</Text>
                            <Icon name='angle-right' size={24} color='#8c8c8c'></Icon>
                        </View>
                    </TouchableHighlight> : <View style={pickerStyle.nopicker}><Text style={pickerStyle.nopickerText}>暂无日龄</Text></View>}

            </View>
        );
    }
}
