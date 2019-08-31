//import liraries
import React, { Component } from 'react'
import {
    Alert,
    DeviceEventEmitter,
    InteractionManager,
    View,
    ToastAndroid,
    Text,
    StyleSheet,
    BackHandler
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import SplashScene from './SplashScene'
import LoginScene from './scene/Mine/LoginScene'
import TabScene from './scene/TabScene'
import UserInfoScene from './scene/Mine/UserInfoScene'
import MyprofitScene from './scene/Mine/MyprofitScene'
import MsgScene from './scene/Mine/MsgScene'
import ModifyPasswordScene from './scene/Mine/ModifyPasswordScene'
import { theme, system, screen } from './common'

let lastBackPressed: number;
const viewscreen=screen;
/**
 * 定义根导航的配置
 */
const StackNavigatorConfig = {
    defaultNavigationOptions: {
       header:null
    },
    
}
const RouteConfigs={
    Splash: { screen: SplashScene },
    Login: { screen: LoginScene },
    Tab: { screen: TabScene },
    UserInfo: {screen: UserInfoScene},
    ModifyPassword: {screen: ModifyPasswordScene},
    Myprofit: {screen: MyprofitScene},
    Msg: {screen: MsgScene}
}
const RootStack = createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onBackButtonPressAndroid = () => {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            // 最近2秒内按过back键，可以退出应用。
            return false;
          }
          lastBackPressed = Date.now();
          ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
          return true;
    }
    render() {
        return (
            <AppContainer
            ref={nav => {
                this.navigator = nav;
              }}
            onNavigationStateChange={
                (prevState, currentState) => {
                    const AppRouter = currentState.routes;
                    if (AppRouter && AppRouter.length > 1) {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
                      } else {
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
                      }
                }
              }
            />
        );
    }
}




