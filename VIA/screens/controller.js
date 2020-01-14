import React from 'react';
import { Database, Habits } from '../db'
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
        console.warn(item.notification_time)
        console.warn(JSON.parse('[' +  item.notification_time + ']'))
        if (item.notification_time != "") {
            
            for (let i = 0; i < item.notification_time.length; i++) {
                // console.warn(JSON.parse('{' + item.notification_time[i] + '}'))
            }
        //     console.warn(item.notification_time)

            Object.keys(item.notification_time).map(key => {
            //     // if (item.notification_time[key].times.length > 0) {
            //         console.warn(key)
            //         // item.notification_time[key].checked = !item.notification_time[key].checked;
            //     // }
            })



        }
    }

}