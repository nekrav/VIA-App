import React from 'react';
import { Database, Habits } from '../db'
import { Notifier } from '../notifier/notifier'

const oneDay = 60 * 60 * 24 * 1000;

export class Controller extends React.Component {

    setAddModalVisible(object, visible) {
        object.setState({ addModalVisible: visible });
    }

    setViewModalVisible(object, visible) {
        object.setState({ viewModalVisible: visible })
    }

    loadAll(object, tableName) {
        const itemsArr = []
        const finishedArr = []
        Database.getAll(tableName)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                    if (item.completed === 'true') {
                        finishedArr.push({ key: JSON.stringify(item.id), value: item })
                    }
                }
                object.setState({
                    items: itemsArr,
                    numberOfItems: len,
                    numberOfFinishedItems: finishedArr.length
                })
            }).then(() => {
                // Notifier.scheduleAllNotifications();
            })
    }

    goToItem(object, tableName, item) {
        Database.getOne(tableName, item).then((res) => {
            selectedItem = res.rows.item(0)
            object.setState({ selectedItem: selectedItem }, () => {
                this.setViewModalVisible(object, true);
            })
        })
    }

    saveExisting(object, tableName, item) {
        console.warn(item)
        Database.update(tableName, item).then(() => {
            this.loadAll(object, tableName);
        })
    }

    delete(object, tableName, item) {
        Database.deleteOne(tableName, item.id).then(() => {
            this.setViewModalVisible(object, false)
            this.loadAll(object, tableName);
        })
    }

    silenceAlarms(object, tableName, item) {
        if (item.notification_time != "") {
            var timesObj = JSON.parse('[' + item.notification_time + ']');
            Object.keys(timesObj).map(key => {
                timesObj[key].checked = "false"
                item.notification_time = timesObj
            }, () => {
                this.saveExisting(object, tableName, item)
            })
        }
    }

    getTodaysDate() {
        return new Date(Date.now());
    }

    deleteAfterOneDay(object, tableName, item) {
        if (item.finished_date != "") {
            if (this.getTodaysDate() - Date.parse(item.finished_date) > oneDay) {
                this.delete(object, tableName, item);
            }
        }
    }

    getChecked(item) {
        if (item != null)
            var checked = false
        return checked = item === "true"
    }
}