import React from 'react';
import * as colorsProvider from './colorsProvider';
import { TouchableOpacity, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions, PixelRatio, Platform } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import { ImportanceRadio } from './importanceRadio';
import { ParentSelection } from './parentSelection';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker'
import KeyboardListener from 'react-native-keyboard-listener';

const TOP_MARGIN = PixelRatio.get() < 3 ? '2%' : '10%'
const HEIGHT_DIVISION = PixelRatio.get() < 3 ? 1.90 : 2.10
const BOTTOM_MARGIN = PixelRatio.get() < 3 ? 0 : 10

const screenHeight = Math.round(Dimensions.get('window').height);
const isAndroid = Platform.OS === "android"
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
                return <TouchableOpacity
                    style={{ flexDirection: 'column', marginTop: 15, marginRight: 15, marginLeft: 10, alignItems: 'center' }}
                    onPress={() => {
                        if (this.state.keyboardOpen) {
                            Keyboard.dismiss()
                        }
                        this.RBSheet.open()
                    }}><Text style={{ textDecorationLine: 'underline', color: colorsProvider.whiteColor }}>Due Today</Text></TouchableOpacity>
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

    renderDatePickerDependingOnDevice() {
        if (isAndroid) {
            return <DatePicker
                textColor={colorsProvider.whiteColor}
                mode="date"
                androidVariant='iosClone'
                fadeToColor='none'
                date={this.state.dueDate ? Date.parse(this.state.dueDate) : global.todayDate}
                onDateChange={date => {
                    this.setState({ dueDate: date.toString() })
                }}
            />
        } else {
            return <DatePicker
                textColor={colorsProvider.whiteColor}
                mode="date"
                androidVariant='iosClone'
                fadeToColor='none'
                date={this.state.newNotifDate}
                onDateChange={date => {
                    this.setState({ dueDate: date.toString() })
                }}
            />
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
            height={screenHeight / HEIGHT_DIVISION}
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
                }}></Text>
            </View>

            <View style={{ flexDirection: 'column', }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorsProvider.topBarColor,
                }}>
                    {this.renderDatePickerDependingOnDevice()}
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
                            if (this.state.dueDate != "")
                                this.props.selectDueDate(this.state.dueDate)
                            else
                                this.props.selectDueDate(global.todayDate)

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
            return (Moment(new Date(date)).diff(global.todayDate, 'days'))
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
                <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: this.props.color }}>
                    {this.renderBottomSlidingPane()}
                    <KeyboardListener
                        onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                        onWillHide={() => { this.setState({ keyboardOpen: false }); }}
                    />
                    <View style={{
                        marginBottom: "1%",
                        marginTop: TOP_MARGIN,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.props.closeModal() }}
                            style={{ margin: 5 }}>
                            <SIcon name={colorsProvider.backIcon} size={30} color={colorsProvider.whiteColor} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => { this.nameTextInput.focus(); }}
                            style={{ width: this.props.hasDueDate ? '60%' : '80%', marginBottom: 10, }}> */}
                        <TextInput
                            ref={(input) => { this.nameTextInput = input; }}
                            maxLength={40}
                            numberOfLines={2}
                            placeholder={"Name"}
                            onSubmitEditing={Keyboard.dismiss}
                            style={[{
                                width: this.props.hasDueDate ? '60%' : '80%',
                                marginBottom: BOTTOM_MARGIN,
                                color: colorsProvider.whiteColor,
                                fontFamily: colorsProvider.font,
                                fontSize: colorsProvider.fontSizeMain,

                            }, isAndroid ? { marginTop: 10, } : {
                                borderBottomColor: colorsProvider.whiteColor,
                                borderBottomWidth: 1
                            }]}
                            multiline={true}
                            value={this.props.nameOfItem}
                            onChangeText={this.props.editName}>
                        </TextInput>
                        {/* </TouchableOpacity> */}
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