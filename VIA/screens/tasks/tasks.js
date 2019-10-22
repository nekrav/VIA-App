import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { Database, Projects, Tasks } from '../../db'
import { CreateTask, ViewTask } from '../../modals'
import { Controller } from '../controller'
import DraggableList from 'react-native-draggable-list';
import DragSortableView from 'react-native-drag-sort';

const styles = require('./styles');

var uuid = require('react-native-uuid');

const parentWidth = width - 18
const childrenWidth = 76
const childrenHeight = 76
const marginChildrenTop = 7
const marginChildrenBottom = 0
const marginChildrenLeft = 0
const { width } = Dimensions.get('window')
const marginChildrenRight = 7
const controller = new Controller;

const dbTableName = Tasks.TABLE_NAME

export class TasksScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {},
        };
    }

    componentDidMount() {
        controller.loadAll(this, dbTableName)
    }

    saveNew(task) {
        let newTask = {}
        newTask.id = uuid.v4();
        newTask.name = task.name;
        newTask.created_date = new Date().getDate();
        newTask.due_date = task.due_date ? task.due_date : "";
        newTask.importance = task.importance ? task.importance : "";
        newTask.percentage_done = 0;
        newTask.completed = "false";
        newTask.project = task.project ? task.project : "";
        newTask.time_spent = 0;
        newTask.notes = task.notes ? task.notes : "";
        newTask.notification_time = task.notification_time ? task.notification_time : "";

        Database.save(dbTableName, newTask).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
        })
    }

    showAddModal() {
        let newTask = {};
        if (this.state.addModalVisible) {
            return <CreateTask
                animationType="slide"
                transparent={false}
                name={(text) => { newTask.name = text }}
                due_date={(text) => { newTask.due_date = text }}
                importance={(text) => { newTask.importance = text }}
                project={(text) => { newTask.project = text }}
                time_spent={(text) => { newTask.time_spent = text }}
                notes={(text) => { newTask.notes = text }}
                notification_time={(text) => { newTask.notification_time = text }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newTask) }}
            ></CreateTask>
        }
    }

    showViewTask() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theTask = this.state.selectedItem
                return <ViewTask
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theTask.name = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editDueDate={(text) => {
                        theTask.due_date = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editImportance={(text) => {
                        theTask.importance = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editPercentageDone={(text) => {
                        theTask.percentage_done = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editCompleted={(text) => {
                        theTask.completed = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editProject={(text) => {
                        theTask.project = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editTimeSpent={(text) => {
                        theTask.time_spent = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotes={(text) => {
                        theTask.notes = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotificationTime={(text) => {
                        theTask.notification_time = text;
                        this.setState({ selectedTask: theTask })
                    }}


                    save={() => { controller.saveExisting(this, dbTableName, theTask) }}

                    selectedItem={theTask}

                    delete={() => { controller.delete(this, dbTableName, theTask) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewTask>
            }
        }
    }

    onDragRelease(newData) {
        this.setState({ activeBlock: null, items: newData });
    }

    onDragMove(newData) {
        this.setState({ items: newData });
    }

    onDragGrant(index) {
        this.setState({ activeBlock: index });
    }

    renderLastItem() {
        return
        //   ...
        // );
    }

    renderItem(item) {
        return (
            <View key={item.id}>
                <TouchableOpacity
                    key={item.id}
                    style={styles.itemButton}
                    onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                    <View style={styles.listItem}>
                        {/* <CheckBox
                            style={styles.checkBox}
                            center
                            title='Click Here'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked}
                        /> */}
                        <Text style={styles.itemName}>{item.value.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


    render() {
        // if (this.state.items != []) {
        //     // listData = this.state.items.map((d, index) => ({
        //     //     key: `${d.value.id}`,
        //     //     label: d.value.name,
        //     //     backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
        //     }))
        // }

        const {
            items, activeBlock, itemHeight, itemsPerRow,
        } = this.state;

        const lastItem = items.length === this.renderLastItem();


        return (
            <View style={styles.outerView}>
                {this.showAddModal()}
                {this.showViewTask()}
                <Text style={styles.title}>Tasks</Text>
                <Text style={styles.numberOfItems}>{this.state.numberOfItems}</Text>
                <Button style={styles.addButton}
                    title="Add Task"
                    onPress={() => {
                        controller.setAddModalVisible(this, true);
                    }} />
                {/* <DraggableList
                        // data={this.state.items}
                        data={this.state.items}
                        renderItem={({ item, index, move, moveEnd, isActive }) => <TouchableOpacity
                            style={styles.itemButton}
                            onLongPress={move}
                            onPressOut={moveEnd}
                            onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                            <View style={styles.listItem}> */}
                {/* <CheckBox
                                style={styles.checkBox}
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            /> */}
                {/* <Text style={styles.itemName}>{item.value.name}</Text>
                            </View>
                        </TouchableOpacity>}
                        keyExtractor={(item, index) => `draggable-item-${item.key}`}
                        scrollPercent={10}
                        onMoveEnd={({ items }) => this.setState({ items })} /> */}
                {/* <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <TouchableOpacity
                        style={styles.itemButton}
                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                        <View style={styles.listItem}>
                            <CheckBox
                                style={styles.checkBox}
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            />
                            <Text style={styles.itemName}>{item.value.name}</Text>
                        </View>
                    </TouchableOpacity>} /> */}

                {/* <DragSortableView
                    dataSource={this.state.items}
                    parentWidth={parentWidth}
                    childrenWidth={childrenWidth}
                    childrenHeight={childrenHeight}
                    // marginChildrenTop={marginChildrenTop}
                    onDataChange={(data) => {
                        // delete or add data to refresh
                        if (data.length != this.state.data.length) {
                            this.setState({
                                data: data
                            })
                        }
                    }}
                    onClickItem={(data, item, index) => { }}
                    renderItem={(item, index) => {
                        return this.renderItem(item, index)
                    }} /> */}

                {/* <DraggableList
                    onDragRelease={newData => this.onDragRelease(newData)}
                    onDragMove={newData => this.onDragMove(newData)}
                    onDragGrant={index => this.onDragGrant(index)}
                    lastItem={() => this.renderLastItem()}
                    itemHeight={itemHeight}
                    itemsPerRow={itemsPerRow}
                    data={items}
                    startPosition={0}
                    topOffset={10}
                    keyField="name" // this key has to be the same has the item view in  renderItem
                    renderItem={item => this.renderItem(item)}
                /> */}

                {/* <DraggableList
                    data={this.state.items}
                    renderItem={({ item }) => <TouchableOpacity
                        key={item.id}
                        style={styles.itemButton}
                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                        <View style={styles.listItem}>
                            <CheckBox
                                style={styles.checkBox}
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            />
                            <Text style={styles.itemName}>{item.value.name}</Text>
                        </View>
                    </TouchableOpacity>} /> */}

                <ScrollView
                    ref={(scrollView) => this.scrollView = scrollView}
                    scrollEnabled={this.state.scrollEnabled}
                    style={styles.container}>
                    <Text style={styles.txt}>{"TXT"}</Text>
                    <View style={styles.sort}>
                        <DragSortableView
                            dataSource={this.state.items}
                            parentWidth={parentWidth}

                            childrenWidth={childrenWidth}
                            childrenHeight={childrenHeight}

                            marginChildrenTop={marginChildrenTop}
                            marginChildrenBottom={marginChildrenBottom}
                            marginChildrenLeft={marginChildrenLeft}
                            marginChildrenRight={marginChildrenRight}

                            onDragStart={(startIndex, endIndex) => {
                                this.setState({
                                    scrollEnabled: false
                                })
                            }}
                            onDragEnd={(startIndex) => {
                                this.setState({
                                    scrollEnabled: true
                                })
                            }}
                            onDataChange={(data) => {
                                // delete or add data to refresh
                                if (data.length != this.state.items.length) {
                                    this.setState({
                                        items: data
                                    })
                                }
                            }}
                            onClickItem={(data, item, index) => {
                                // click delete
                                // if (this.state.isEnterEdit) {
                                //     const newData = [...data]
                                //     newData.splice(index,1)
                                //     this.setState({
                                //         data: newData
                                //     })
                                // }
                            }}
                            keyExtractor={(item, index) => item.id} // FlatList作用一样，优化
                            renderItem={(item, index) => {
                                return this.renderItem(item, index)
                            }}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }

}