import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import ActionButton from 'react-native-action-button';
import RBSheet from "react-native-raw-bottom-sheet";
import { Database } from '../db'
import Moment from 'moment';
import { CreateHabit } from '../modals'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChildItem } from '../components'
const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ChildrenContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
            allChildren: this.props.allChildren,
            addModalVisible: false,
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ allChildren: this.props.allChildren });
    }

    deleteItem(item) {
        var array = this.state.allChildren
        var index = array.indexOf(item)
        this.state.allChildren.splice(index, 1)

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ allChildren: array });
            this.props.deleteItem(item)
        }
    }

    goToItem(itemId) {

    }

    renderBottomSlidingPane() {

        // parentTypeCapitalized = this.props.parentType.charAt(0).toUpperCase() + this.props.parentType.slice(1)

        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={screenHeight / 1.36}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: this.props.color,
                    fontSize: colorsProvider.fontSizeMain
                }}></Text>
            </View>
            <FlatList
                data={this.state.allChildren}
                contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                style={{ marginLeft: 10, marginRight: 10 }}
                renderItem={({ item }) =>
                    <View style={{
                        flex: 1,
                        borderRadius: 10,
                        backgroundColor: this.props.color,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.props.addParent(item.value.id, item.value.name);
                                this.RBSheet.close()
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{
                                marginRight: 5,
                                marginLeft: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: colorsProvider.fontSizeChildren,
                                fontFamily: colorsProvider.fontFamily,
                                color: colorsProvider.whiteColor
                            }}>{item.value.name}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
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
                        // this.props.removeParent();
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
                    }}>Remove From </Text>
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
                    }}>Close</Text>
                </TouchableOpacity>

            </View>
        </RBSheet>)
    }

    renderParentText() {
        if (this.state.name == null || this.state.name == "null") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        Is this part of a bigger ?
                    </Text>

                </TouchableOpacity>
            );
        }
        else if (this.state.name != "") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        {this.state.name}
                    </Text>

                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>Is this part of a bigger ?
          </Text>
                </TouchableOpacity>
            );
        }
    }


    renderChildItem(name) {
        return (<ChildItem
            deleteItem={itemId => {
                this.props.deleteItem(itemId)
            }}
            updateImportance={itemId => {
                this.props.updateImportance(itemId);
            }}
            goToItem={itemId => {
                this.goToItem(itemId)
            }}
            name={name}
        />)
    }

    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
            return <CreateHabit
                animationType="slide"
                transparent={false}
                id={(text) => { newHabit.id = text }}
                name={(text) => { newHabit.name = text }}
                setImportanceNN={(text) => {
                    newHabit.importance = 1;
                }}
                setImportanceNU={(text) => {
                    newHabit.importance = 2;
                }}
                setImportanceIN={(text) => {
                    newHabit.importance = 3;
                }}
                setImportanceIU={(text) => {
                    newHabit.importance = 4;
                }}
                time_to_spend={(text) => { newHabit.time_to_spend = text }}
                start_time={(text) => { newHabit.start_time = text }}
                end_time={(text) => { newHabit.end_time = text }}
                notification_time={(times) => {
                    if (times) {
                        newHabit.notification_time = times
                    } else {
                        newHabit.notification_time = JSON.stringify(emptyTimes)
                    }
                }}
                routine={(text) => { newHabit.routine = text }}
                days_to_do={(text) => { newHabit.days_to_do = text }}
                notes={(text) => { newHabit.notes = text }}
                closeModal={() => { 
                    this.setState({addModalVisible: false}) 
                }}
                save={() => { this.saveNew(newHabit) }}
            ></CreateHabit>
        }
    }

    render() {
        if (this.state.allChildren.length > 0) {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                    {this.renderBottomSlidingPane()}
                    {this.showAddModal()}
                    <ScrollView >
                        <View style={{}}>
                            {/* <View style={{ flexDirection: 'row-reverse' }}>
                                <FIcon style={{ marginTop: 10, marginRight: 20, }} size={colorsProvider.fontSizeMain} name="plus" color={colorsProvider.habitsMainColor} />
                            </View> */}
                            <FlatList
                                horizontal={false}
                                scrollEnabled={true}
                                data={this.state.allChildren}
                                style={{ flex: 1 }}
                                renderItem={({ item }) => {
                                    return <ChildItem
                                        itemKey={item.value.id}
                                        name={item.value.name}
                                        item={item.value}
                                        completed={item.value.completed}
                                        childItemTableName={this.props.childItemTableName}
                                        deleteItem={item => {
                                            this.props.deleteItem(item)
                                        }}
                                        childUpdateCompleted={item => {
                                            // var index = this.state.allChildren.indexOf(item)
                                            // if (index !== -1) {
                                            //     var oldArr = this.state.allChildren
                                            //     oldArr.splice(index, 1)
                                            //     this.setState({ allChildren: oldArr })
                                            // }
                                            this.props.childUpdateCompleted(item);
                                        }}
                                        goToItem={item => {
                                            this.goToItem(item)
                                        }}
                                    />

                                }}
                            />
                        </View>

                    </ScrollView>
                    <ActionButton
                        size={45}
                        hideShadow={false}
                        offsetY={5}
                        offsetX={10}
                        buttonColor={colorsProvider.habitsMainColor}
                        onPress={() => {
                            this.RBSheet.open()
                        }}
                    />
                </View>
            )
        } else {
            return (<Text>No Children</Text>)
            // return (
            //     // <ScrollView style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, }}>
            //     <TouchableWithoutFeedback onPress={() => { }}>

            //         <FlatList
            //             horizontal={false}
            //             scrollEnabled={true}
            //             data={this.state.allChildren}
            //             contentContainerStyle={{  borderWidth: 1, borderColor: colorsProvider.habitsMainColor, borderRadius: 10,  marginLeft: 2, marginRight: 2, marginBottom: 3, marginTop: 10, }}
            //             renderItem={({ item }) => { return <TouchableOpacity style={{flex: 1, backgroundColor: colorsProvider.habitsMainColor, margin: 10, }}><Text>{item.value.name}</Text></TouchableOpacity> }}
            //         />
            //     {/* // </ScrollView> */}
            //     </TouchableWithoutFeedback>
            // )
        }

    }
}