/**
 * Created by duanyachao on 17/2/24.
 * 生产区域界面
 * 优化2019年9月3日
 */
import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, FlatList, Modal, View, Text } from 'react-native';
import api from './../api';
import { Network, toastShort } from './../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../common';
import { pickerStyle } from '../common/theme';
export default class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            modalVisible: false,
            areaData: null
        }
    }
    requestAreaList = () => {
        let headers = {
            'Content-Type': 'application/json',
            'X-Token': token
        }
        Network.get(api.REGIONSV2, '', headers, (res) => {
            if (res.meta.success) {
                this.setState({
                    areaData: res.data,
                })
                this.props.callbackParent(res.data[0]);
            }
        })
    }
    UNSAFE_componentWillMount() {
        this.requestAreaList()

    }
    selectArea = (item, index) => {
        this.setState({
            selectedIndex: index,
            modalVisible: !this.state.modalVisible
        });
        this.props.callbackParent(item);
    }
    renderItem(rowData) {
        const { item, index } = rowData;
        const { selectedIndex } = this.state;
        return (
            <TouchableHighlight underlayColor="rgb(255, 255,255)" onPress={() => this.selectArea(item, index)}>
                <View style={styles.areaListItem}>
                    <Text style={styles.areaListItemText}>{item.orgName}</Text>
                    <View style={styles.gxIcon}>
                        {(selectedIndex == index) ? <Icon name='check-circle' size={18} color={theme.iconColor}></Icon> :
                            <Icon name='circle-thin' size={18} color={"#eee"}></Icon>
                        }
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        const { areaData, modalVisible, selectedIndex } = this.state;
        return (
            <View style={pickerStyle.container}>
                <View style={pickerStyle.pickerTip}>
                    <Icon name='map-signs' size={18} color={theme.iconColor}></Icon>
                    <Text style={pickerStyle.pickerTipText}>生产区域</Text>
                </View>
                {areaData && areaData.length > 0 ?
                    <TouchableHighlight
                        underlayColor="rgb(255, 255,255)"
                        onPress={() => this.setState({ modalVisible: !modalVisible })}>
                        <View style={pickerStyle.picker}>
                            <Text style={pickerStyle.pickered}>{areaData[selectedIndex].orgName}</Text>
                            <Icon name='angle-right' size={24} color='#8c8c8c'></Icon>
                        </View>
                    </TouchableHighlight>
                    : <View style={pickerStyle.nopicker}><Text style={pickerStyle.nopickerText}>暂无区域</Text></View>
                }
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: !modalVisible })}>
                    <TouchableHighlight style={{ flex: 1 }} onPress={() => this.setState({ modalVisible: !modalVisible })}>
                        <View style={styles.areaListWrapper}>
                            <View style={styles.areaList}>
                                <FlatList
                                    data={areaData}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.listViewStyle}
                                    renderItem={(rowData) => this.renderItem(rowData)} />

                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>

            </View>
        )

    }
}
const styles = StyleSheet.create({
    areaListWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        paddingLeft: 8,
        paddingRight: 8,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    areaList: {
        borderRadius: 4,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    areaListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 44,
        borderBottomColor: '#efefef',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingLeft: 18

    },
    gxIcon: {
        alignSelf: 'center',
        paddingRight: 14
    },
    areaListItemText: {
        fontSize: 18,
        color: '#000'
    }
});

