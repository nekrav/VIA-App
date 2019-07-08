// import SQLite from 'react-native-sqlite-storage'
import { AsyncStorage } from 'react-native'
let SQLite = require('react-native-sqlite-storage')
//SQLite.DEBUG(true)
SQLite.enablePromise(true);

import { Projects } from './projects'
import { Habits } from './habits'
import { Tasks } from './tasks'
import { RandomTasks } from './random'

export class Database {
    constructor() {
        this.database = null
        this.initPromise = null
    }

    static getAll(tableName, where = []) {
        let query = `SELECT * FROM ${tableName}`

        if (where.length > 0) {
            query += ' WHERE '
            const conditions = where.map(c => `${c[0]}=${c[1]}`)

            query += conditions
        }

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(query)
                    .then(([tex, res]) => resolve(res))
            })
                .catch(reject)
        })
    }
    

    static clear(tableName) {
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(`DELETE FROM ${tableName}`)
                    .then(([tex, res]) => resolve(res))
            })
                .catch(reject)
        })
    }

    static clearAll() {
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                this.restart(tx)
                this.tables(tx)
            })
                .catch(reject)
        })
    }

    static getTasksByProjId(id) {
        noQuotes = id.replace(/["']/g, "")
        query = `SELECT * FROM tasks WHERE project = '${noQuotes}'`
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(query)
                    .then(([tex, res]) =>  resolve(res)
                    )
            })
                .catch(reject)
        })
    }


    

    static getOne(tableName, id) {
        noQuotes = id.replace(/["']/g, "")
        query = `SELECT * FROM ${tableName} WHERE id = '${noQuotes}'`
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(query)
                    .then(([tex, res]) =>  resolve(res)
                    )
            })
                .catch(reject)
        })
    }

    static getOneByName(tableName, name) {
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(`SELECT * FROM ${tableName} WHERE name = '${name}'`)
                    .then(([tex, res]) =>
                        resolve(res))
            })
                .catch(reject)
        })
    }

    static deleteOne(tableName, id) {
        noQuotes = id.replace(/["']/g, "")

        const deleteQuery = `DELETE FROM ${tableName} WHERE id = '${noQuotes}'`

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(deleteQuery)
            })
                .then(resolve)
                .catch(reject)
        })
    }

    static deleteOneProject(tableName, id) {
        const deleteQuery = `DELETE FROM ${tableName} WHERE project_id = '${id}'`

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(deleteQuery)
            })
                .then(resolve)
                .catch(reject)
        })
    }

    static deleteOneByName(tableName, name) {
        const deleteQuery = `DELETE FROM ${tableName} WHERE name = '${name}'`

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(deleteQuery)
            })
                .then(resolve)
                .catch(reject)
        })
    }


    static save(tableName, object) {
        let cols = ''
        let valuesString = ''
        const valuesArray = []

        Object.keys(object).forEach(key => {
            cols += `${key}, `
            valuesString += '?,'
            valuesArray.push(object[key])
        })
        const saveObject = {
            query: `INSERT OR REPLACE INTO ${tableName}  (${cols.slice(0, -2)}) VALUES (${valuesString.slice(0, -1)})`,
            values: valuesArray
        }

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(saveObject.query, saveObject.values)
            })
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    static saveProject(tableName, object) {
        let cols = ''
        let valuesString = ''
        const valuesArray = []

        Object.keys(object).forEach(key => {
            cols += `${key}, `
            valuesString += '?,'
            valuesArray.push(object[key])
        })
        const saveObject = {
            query: `INSERT OR REPLACE INTO ${tableName}  (${cols.slice(0, -2)}) VALUES (${valuesString.slice(0, -1)})`,
            values: valuesArray
        }

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(saveObject.query, saveObject.values)
            })
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    static update(tableName, object) {
        let set = ''


        Object.keys(object).forEach(key => {
            set += `${key}='${object[key]}', `
        })

        const saveObject = {
            query: `UPDATE ${tableName} SET ${set.slice(0, -2)} WHERE id='${object.id}'`,
        }

        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(saveObject.query)
            })
                .then(res => {
                    resolve(res)
                })
                .catch(reject)
        })
    }

    static bulkSave(tableName, objects) {
        return Promise.all(objects.map(f => Database.save(tableName, f)))
    }

    static tables(tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Habits.TABLE_CREATE}`);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Projects.TABLE_CREATE}`);
    }

    static init() {
        if (this.initPromise) {
            return this.initPromise
        }
        this.initPromise = new Promise((resolve, reject) => {
            SQLite.openDatabase({ name: 'initialDb.db', createFromLocation: '~initial.db', location: 'Library' }, this.openCB, this.errorCB)
                .then(db => {
                    this.database = db

                    return Promise.resolve()
                })
                .then(() => this.database.transaction(tx => {
                    this.tables(tx)
                    this.mock(tx)
                }))
                .then(() => {
                    return Promise.resolve()
                })
                .then(resolve)
                .catch(err => reject(err))
        })

        return this.initPromise
    }

    static restart(tx) {
        tx.executeSql(`DROP TABLE IF EXISTS ${Projects.TABLE_NAME}`)
        tx.executeSql(`DROP TABLE IF EXISTS ${Habits.TABLE_NAME}`)
        tx.executeSql(`DROP TABLE IF EXISTS ${Tasks.TABLE_NAME}`)
        tx.executeSql(`DROP TABLE IF EXISTS ${RandomTasks.TABLE_NAME}`)
    }

    static mockaw() {
        return new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                this.mock(tx)
                this.tables(tx)
               
            })
                .catch(reject)
        })
    }

    static mock(tx) {
        //Note these IDs will intentionally break the UUID constraint for the API
        tx.executeSql('INSERT INTO projects (id, name, description, percentage) VALUES (2, "aweff", "awefwef", 1);');
        // tx.executeSql('INSERT INTO projects (id, name, date_created, completed) VALUES (?, ?, ?, ?)', ['1', 'Initial Fake Project', 'now', 'false'])
        // tx.executeSql('INSERT INTO Exercise (id, name, description, duration) VALUES (?,?,?,?)', ['1', 'First One', 'desck awef awef ', 3])
    }
}

export { Projects } from './projects'
export { Habits } from './habits'
export { Tasks } from './tasks'
export { RandomTasks } from './random'

