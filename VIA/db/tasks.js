// const uuidv4 = require('uuid/v4');

export class Tasks {
    constructor(props) {
        this.id = props.id
        this.name = props.name
        this.description = props.description
        this.project = props.project
        this.percentage = props.percentage
    }

    static get TABLE_CREATE() {
        return `${Tasks.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'description text, ' +
        'project text, ' +
        'percentage integer' +
        ')'
    }

    static get TABLE_NAME() {
        return 'tasks'
    }
}