//import liraries
import React, { Component } from 'react';
import {
    ListView,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Modal
} from 'react-native';
import { Header, Area, Batch, Dayage, Button } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme,screen } from '../../common';
import api from '../../api';
import { Network, toastShort } from '../../utils';
import ProductTotal from './ProductTotal';
import DayItems from './DayItems';
// create a component
export default class ProductScene extends Component {
    static navigationOptions = {
        header: <Header title='生产管理'></Header>
    }
    constructor(props) {
        super(props);
        this.state = {
            orgId: null,
            biologyInId: null,
            batch: null,
            dayAge: null,
            currentDayTotalData: null,
            actType:null,
            id:null
        }
    }
    areaChange(item) {
        this.setState({
            orgId: item.orgId
        })
    }
    batchChange(batch) {
        if (batch) {
            this.setState({
                batch: batch,
                biologyInId: batch.id
            })    
        } else {
            this.setState({
                batch: null,
                biologyInId: null,
                currentDayTotalData:null
            })     
        }
    }   
    dayAgeChange(dayAge){
        if (dayAge) {
            this.setState({
                dayAge: dayAge
            })
            this.requestData(this.state.biologyInId, this.state.dayAge);    
        } else {
            this.setState({
                dayAge:null,
                currentDayTotalData:null
            })     
        }
    }
    requestData(biologyInId, dayAge) {
        let headers = {
            'X-Token': token,
            'Content-Type': 'application/json'
        };
        let params = { "biologyInId": biologyInId, "dayAge": dayAge };
        Network.postJson(api.HOST + api.DAYINFO, params, headers, (res) => {
            console.info(res)
            if (res.meta.success && res.data.length>0) {
                let result=res.data;
                let len=result.length;
                this.setState({
                    currentDayTotalData: result[len - 1],
                    actType:(dayAge==result[len - 1].chickenAge)?0:1,
                    id:(dayAge==result[len - 1].chickenAge)?result[len - 1].id:null
                })
                
            }else{
                this.setState({
                    currentDayTotalData: null,
                    actType:1
                })    
            }
        })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.dayAge !== this.state.dayAge) {
    //         this.requestData(nextState.biologyInId, nextState.dayAge);
    //     }
    //     return true
    // }
    render() {
        const { orgId,batch,biologyInId,currentDayTotalData,dayAge,actType,id}=this.state;

        return (
            <View style={styles.container}>
                <Area callbackParent={(item) => this.areaChange(item)}></Area>
                <Batch orgId={orgId} callbackBacth={(batch) => this.batchChange(batch)}></Batch>
                {(currentDayTotalData)?<ProductTotal totalData={currentDayTotalData}></ProductTotal>:null}
                <View style={styles.sjlrTit}>
                    <Icon name='pencil' size={18} color={theme.iconColor}></Icon>
                    <Text style={styles.sjlrText}>数据录入</Text>
                </View>
                <Dayage orgId={orgId} batch={batch} callbackDayage={(dayAge) => this.dayAgeChange(dayAge)}></Dayage>
                {(currentDayTotalData)?<ScrollView ><DayItems 
                    callRefreash={(biologyInId,dayAge)=>this.requestData(biologyInId, dayAge)} 
                    data={currentDayTotalData} 
                    biologyInId={biologyInId} 
                    dayAge={dayAge} 
                    actType={actType} 
                    id={id}>
                </DayItems></ScrollView>:<View style={theme.nodata}><Text>无数据</Text></View>}
            
            </View>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    sjlrTit: {
        flexDirection: 'row',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 5,
        alignItems: 'center'
    },
    sjlrText: {
        paddingLeft: 10,
        fontSize: 14,
        color: '#222'
    },
   
});
