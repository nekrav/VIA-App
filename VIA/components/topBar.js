import React from 'react';
import * as colorsProvider from './colorsProvider';
import { TouchableOpacity, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions, PixelRatio } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import { ImportanceRadio } from './importanceRadio';
import { ParentSelection } from './parentSelection';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker'
import KeyboardListener from 'react-native-keyboard-listener';

const TOP_MARGIN = PixelRatio.get() < 3 ? '2%' : '10%'

const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importanceValue: this.props.importance,
            parent: this.props.parent,
            parentName: this.props.parentName,
            dateModalVisibility: false,
            dueDate: this.props.dueDate
        };
    }

    componentDidMount() {
        if (this.props.fromCreate) {
            this.nameTextInput.focus()
        }
    }


    getDueDate(date) {
        if (this.props.hasDueDate) {
            if (this.getNumberOfDaysLeft(date) === 0) {
                return <Text style={{ color: colorsProvider.whiteColor }}>Due Today</Text>
            }
            else if (this.getNumberOfDaysLeft(date) < 0) {
                return (<View style={{ flexDirection: 'column', marginTop: 15, marginRight: 15, marginLeft: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.keyboardOpen) {
                            Keyboard.dismiss()
                        }
                        this.RBSheet.open()
                    }}>
                        <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: colorsProvider.whiteColor }}>{Math.abs(this.getNumberOfDaysLeft(date))} days late</Text>
                </View>)
            }
            else if (date) {
                return (<View style={{ flexDirection: 'column', marginTop: 15, marginRight: 15, marginLeft: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.keyboardOpen) {
                            Keyboard.dismiss()
                        }
                        this.RBSheet.open()
                    }}>
                        <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', }}>{this.getNumberOfDaysLeft(date)} days {"\n"}till due</Text>
                </View>)
            }
            else {
                return <TouchableOpacity onPress={() => {
                    if (this.state.keyboardOpen) {
                        Keyboard.dismiss()
                    }
                    this.RBSheet.open()
                }}>
                    <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', marginTop: 15, marginRight: 15, marginLeft: 10, textDecorationLine: 'underline' }}>No due {"\n"}date set</Text>
                </TouchableOpacity>
            }
        }
    }


    renderBottomSlidingPane() {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            onClose={() => {
            }}
            dragFromTopOnly={true}
            height={screenHeight / 2.10}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.topBarColor,
                    fontSize: colorsProvider.fontSizeMain
                }}>Due Date</Text>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.shadowColor,
                    fontSize: colorsProvider.fontSizeSmall,
                    marginTop: 10,
                    marginBottom: 10,
                }}>{this.state.dueDate}</Text>
            </View>

            <View style={{ flexDirection: 'column', }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorsProvider.topBarColor,
                }}>
                    <DatePicker
                        textColor={colorsProvider.whiteColor}
                        mode="date"
                        fadeToColor='none'
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            this.setState({ dueDate: date.toString() })
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colorsProvider.redColor,
                            margin: 10,
                            borderRadius: 10,
                            alignContent: 'center',
                        }}
                        onPress={() => {
                            this.props.selectDueDate("");
                            this.RBSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Delete Due Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.closeButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.RBSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Close</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.setButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.props.selectDueDate(this.state.dueDate)
                            this.RBSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </RBSheet>)
    }

    getNumberOfDaysLeft(date) {
        if (date)
            return (Moment(new Date(date)).diff({ todayDate }, 'days'))
    }

    renderImportance(importance) {
        if (this.props.hasImportance)
            return (<ImportanceRadio
                color={this.props.color}
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
                color={this.props.parentColor}
                parentName={parent}
                parent={this.state.parent}
                parentType={this.props.parentType}
                selectParent={this.props.selectParent}
                allParents={this.props.allParents}
                addParent={(id, name) => {
                    this.props.setParent(id, name)
                    this.setState({ parent: id, parentName: name })
                }}
                removeParent={() => {
                    this.props.setParent(null, null)
                    this.setState({ parent: null, parentName: null })
                }}
            />
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: this.props.color}}>
                    {this.renderBottomSlidingPane()}
                    <KeyboardListener
                        onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                        onWillHide={() => { this.setState({ keyboardOpen: false }); }}
                    />
                    <View style={{ marginTop: TOP_MARGIN, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: "1%" }}>
                        <TouchableOpacity
                            onPress={() => { this.props.closeModal() }}
                            style={{ margin: 5 }}>
                            <SIcon name={colorsProvider.backIcon} size={30} color={colorsProvider.whiteColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.nameTextInput.focus(); }}
                            style={{ width: this.props.hasDueDate ? '60%' : '80%', marginBottom: 10, }}>
                            <TextInput
                                ref={(input) => { this.nameTextInput = input; }}
                                maxLength={40}
                                numberOfLines={2}
                                placeholder={"Name"}
                                onSubmitEditing={Keyboard.dismiss}
                                style={{
                                    color: colorsProvider.whiteColor,
                                    fontFamily: colorsProvider.font,
                                    fontSize: colorsProvider.fontSizeMain,
                                    borderBottomColor: colorsProvider.whiteColor,
                                    borderBottomWidth: 1
                                }}
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
            </TouchableWithoutFeedback>
        );
    }
}