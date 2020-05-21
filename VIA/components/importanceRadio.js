import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ImportanceRadio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value3Index: '',
        };
    }



    render() {
        return (
            <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: colorsProvider.topBarColor }}>
                <RadioForm
                    formHorizontal={true}
                    animation={true}>

                    <RadioButton labelHorizontal={true} key={0} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                            obj={0}
                            index={0}
                            isSelected={this.state.value3Index === 0}
                            onPress={() => { this.setState({value3Index: 0})}}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={this.state.value3Index === 0 ? '#2196f3' : '#000'}
                            buttonSize={40}
                            buttonOuterSize={80}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                            obj={0}
                            index={0}
                            labelHorizontal={true}
                            onPress={{}}
                            labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                    <RadioButton labelHorizontal={true} key={1} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                             obj={1}
                            index={1}
                            isSelected={this.state.value3Index === 1}
                            onPress={() => { this.setState({value3Index: 1})}}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={this.state.value3Index === 1 ? '#2196f3' : '#000'}
                            buttonSize={40}
                            buttonOuterSize={80}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                             obj={1}
                            index={1}
                            labelHorizontal={true}
                            onPress={{}}
                            labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                    <RadioButton labelHorizontal={true} key={2} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                              obj={2}
                            index={2}
                            isSelected={this.state.value3Index === 2}
                            onPress={() => { this.setState({value3Index: 2})}}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={this.state.value3Index === 2 ? '#2196f3' : '#000'}
                            buttonSize={40}
                            buttonOuterSize={80}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                              obj={2}
                            index={2}
                            labelHorizontal={true}
                            onPress={{}}
                            labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                    <RadioButton labelHorizontal={true} key={3} >
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                               obj={3}
                            index={3}
                            isSelected={this.state.value3Index === 3}
                            onPress={() => { this.setState({value3Index: 3})}}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={this.state.value3Index === 3 ? '#2196f3' : '#000'}
                            buttonSize={40}
                            buttonOuterSize={80}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                               obj={3}
                            index={3}
                            labelHorizontal={true}
                            onPress={{}}
                            labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                </RadioForm>
            </View>
        );
    }
}