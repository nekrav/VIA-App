import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import { ImportanceRadio } from './importanceRadio';
import { ParentSelection } from './parentSelection';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importanceValue: this.props.importance,
            parent: this.props.parent,
            parentName: this.props.parentName,
        };
    }


    getDueDate(date) {
        if (this.getNumberOfDaysLeft(date) === 0) {
            return <Text style={{ color: colorsProvider.whiteColor }}>Due Today</Text>
        }
        else if (this.getNumberOfDaysLeft(date) < 0) {
            return (<View style={{ flexDirection: 'column', marginTop : 15, marginRight: 15, marginLeft: 10,  alignItems: 'center' }}>
                <TouchableOpacity onPress={this.props.editDueDate}>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                </TouchableOpacity>
                <Text style={{ color: colorsProvider.whiteColor }}>{Math.abs(this.getNumberOfDaysLeft(date))} days late</Text>
            </View>)
        }
        else if (date) {
            return (<View style={{ flexDirection: 'column',  marginTop : 15, marginRight: 15,marginLeft: 10,  alignItems: 'center' }}>
                <TouchableOpacity onPress={this.props.editDueDate}>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                </TouchableOpacity>
                <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', }}>{this.getNumberOfDaysLeft(date)} days {"\n"}till due</Text>
            </View>)
        }
        else {
            return <TouchableOpacity onPress={this.props.editDueDate}>
                <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', marginTop : 15, marginRight: 15,marginLeft: 10,  textDecorationLine: 'underline' }}>No due {"\n"}date set</Text>
            </TouchableOpacity>
        }

    }

    getNumberOfDaysLeft(date) {
        if (date)
            return (Moment(new Date(date)).diff({ todayDate }, 'days'))
    }

    renderImportance(importance) {
        if (this.props.hasImportance)
            return (<ImportanceRadio
                importance={importance}
                setImportanceNN={this.props.setImportanceNN}
                setImportanceNU={this.props.setImportanceNU}
                setImportanceIN={this.props.setImportanceIN}
                setImportanceIU={this.props.setImportanceIU} />
            )
    }

    renderParent(parent) {
        if (this.props.hasParent) {
            return <ParentSelection
                parentName={parent}
                parent={this.state.parent}
                selectParent={this.props.selectParent} />
        }

    }

    render() {
        return (
            <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: colorsProvider.topBarColor }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: "1%" }}>
                    <TouchableOpacity
                        onPress={() => { this.props.closeModal() }}
                        style={{ margin: 5 }}>
                        <SIcon name={colorsProvider.backIcon} size={30} color={colorsProvider.whiteColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.nameTextInput.focus(); }}
                        style={{ width: '60%', marginBottom: 10, }}>
                        <TextInput
                            ref={(input) => { this.nameTextInput = input; }}
                            maxLength={40}
                            numberOfLines={2}
                            style={{ color: colorsProvider.whiteColor, fontSize: colorsProvider.fontSizeMain, borderBottomColor: colorsProvider.whiteColor, borderBottomWidth: 1 }}
                            multiline={true}
                            value={this.props.nameOfItem}
                            onChangeText={this.props.editName}>
                        </TextInput>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        {this.getDueDate(this.props.dueDate)}
                    </View>
                </View>
                {this.renderParent(this.props.parentName)}
                {this.renderImportance(this.state.importanceValue)}
            </View>
        );
    }
}