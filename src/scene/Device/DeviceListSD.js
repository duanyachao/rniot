import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView
} from 'react-native';
import api from '../../api';
import DeviceSDItem from './DeviceSDItem';
export default class DeviceListSD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }

    }
    renderItem(rowData,sectionID,rowID){
        const {orgId}=this.props;
        return <DeviceSDItem rowData={rowData} rowID={rowID} orgId={orgId}></DeviceSDItem>
    }
    componentDidMount() {
    }
    render() {
        const {devices}=this.props;
        return (
            <ListView
                initialListSize={1}
                dataSource={this.state.dataSource.cloneWithRows(devices)}
                renderRow={(rowData,sectionID,rowID)=>this.renderItem(rowData,sectionID,rowID)}
                style={styles.listViewStyle}
                onEndReachedThreshold={10}
                enableEmptySections={true}
            ></ListView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listViewStyle: {

    }
})