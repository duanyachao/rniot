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
export default class Bacth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            batchs: null,
            selectedIndex:null
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {callbackBacth} = this.props;
        if (nextProps.orgId !== this.props.orgId) {
            Picker.hide()
            let headers = {
                'X-Token': token
            };
            let params = { "orgId": nextProps.orgId };
            Network.get(api.HOST + api.BATCH, params, headers, (res) => {
                if (res.meta.success && res.data.length > 0) {
                    this.setState({
                        batchs: res.data,
                        selectedIndex:0
                    })
                    callbackBacth(this.state.batchs[0]);
                }else {
                    this.setState({
                        batchs: null
                    })
                    callbackBacth();
                }
                
            })
        }
        return true
    }
    selectBtach() {
        const {batchs,selectedIndex}=this.state;
        let batchLists = [];
        for (var index = 0; index < batchs.length; index++) {
            batchLists.push(batchs[index].yjcode)
        }
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:'选择批次',
            pickerData: batchLists,
            selectedValue:[(selectedIndex)?batchLists[selectedIndex]:batchLists[0]],
            onPickerConfirm: data => {
                const {callbackBacth} = this.props;
                batchs.forEach((element,index)=>{
                    if(element.yjcode==data){
                        this.setState({
                            selectedIndex:index,
                        })
                    }
                });
                callbackBacth(batchs[this.state.selectedIndex]); 
            }

        });
        Picker.toggle()
    }
    render() {
        const {batchs,selectedIndex}=this.state;
        return (
            <View style={pickerStyle.container}>
                <View style={pickerStyle.pickerTip}>
                    <Icon name='list' size={18} color={theme.iconColor}></Icon>
                    <Text style={pickerStyle.pickerTipText}>生产批次</Text>
                </View>
                {(batchs && batchs.length>0) ?
                    <TouchableHighlight
                        underlayColor="rgb(255, 255,255)"
                        onPress={() => this.selectBtach()}>
                        <View style={pickerStyle.picker}>
                            <Text style={pickerStyle.pickered}>{batchs[selectedIndex].yjcode}</Text>
                            <Icon name='angle-right' size={24} color='#8c8c8c'></Icon>
                        </View>
                    </TouchableHighlight> : <View style={pickerStyle.nopicker}><Text style={pickerStyle.nopickerText}>暂无批次</Text></View>}

            </View>
        );
    }
}
