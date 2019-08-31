/**
 * 单独抽出Tab 页面和路由
 * by duanyachao
 * 2019年8月28日
 */
import React, { Component } from 'react'
import { InteractionManager,View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import EnvDataScene from './EnvData/EnvDataScene'
import TaskScene from './Task/TaskScene'
import ProductScene from './Product/ProductScene'
import DeviceScene from './Device/DeviceScene'
import VideoScene from './Video/VideoScene'
import MineScene from './Mine/MineScene'
import { theme, system, screen } from './../common'
import { TabBarItem, Header} from './../components'
import { Network, toastShort } from './../utils'

/**
 * 定义主页tab
 */
const TabOptions = (tabBarLabel,iconName) => {
    const tabBarIcon = (({tintColor, focused}) => {
        return (
            <Icon name={iconName}
                size={theme.tabIconsize}
                style={{ color: tintColor }}>
            </Icon>
        )
    })
    return { tabBarLabel,tabBarIcon}
}
const RouteConfigs={
    Warn: {
        screen:createStackNavigator({ Warn: EnvDataScene }),
        // screen:EnvDataScene,
        navigationOptions: ()=> TabOptions('报警','warning')
    },
    Task: {
        screen:createStackNavigator({ Task: TaskScene }),
        // screen: TaskScene,
        navigationOptions: ()=> TabOptions('任务','tasks')
    },
    Product: {
        screen:createStackNavigator({ Product: ProductScene }),
        // screen: ProductScene,
        navigationOptions: ()=> TabOptions('生产','product-hunt')
    },
    Device: {
        screen:createStackNavigator({ Device: DeviceScene }),
        // screen:DeviceScene,
        navigationOptions: ()=> TabOptions('设备','sliders')
    },
    Video: {
        screen:createStackNavigator({ Video: VideoScene }),
        // screen: VideoScene,
        navigationOptions: ()=> TabOptions('监控','video-camera')
    },
    Mine: {
        screen:createStackNavigator({ Mine: MineScene }),
        // screen: MineScene,
        navigationOptions: ()=> TabOptions('我的','user')
    }
}
const BottomTabNavigatorConfig={
    initialRouteName: 'Warn',
    // order: ["Home", "Nearby", "Order", "Mine"],
    backBehavior: "none",
    // tabBarComponent: TabBarBottom,
    tabBarOptions: {
        activeTintColor: theme.theme,
        inactiveTintColor: '#979797',
        showLabel:true,
        showIcon: true,
        style: { backgroundColor: '#fff' },
        safeAreaInset: {
            bottom: 'always',
            top: 'never'
        },
        labelStyle: {
            fontSize: theme.tabFontSize,
        }, 
    },
    swipeEnabled: true,
    lazy: true,
    animationEnabled: true,
}
const TabScene = createBottomTabNavigator(RouteConfigs,BottomTabNavigatorConfig)
// TabScene.navigationOptions = {
//     header: null,
// }
TabScene.navigationOptions = ({ navigation }) => {
    const routes = navigation.state.routes;
    const params = routes ? routes[navigation.state.index].params : null;
  
    const headerTitle = params ? params.title : '';
  
    const headerTitleStyle = {
      fontSize: system.iOS ? 23 : 20,
      color: 'white',
      flex: 1,
      textAlign: 'center',
      paddingTop: system.Android ? 17 : null
    };
    const headerBackTitle = null;
    const headerTintColor = 'white';
    const headerStyle = {
      backgroundColor: theme.theme,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
      elevation: 0
    };
  
    // 识兔这里的导航都是手动控制的，所以这里设置为null就可以隐藏了。
    const header = null;
  
    return {
      headerTitle,
      headerStyle,
      headerTitleStyle,
      headerBackTitle,
      headerTintColor,
      header
    };
  };
export default TabScene
