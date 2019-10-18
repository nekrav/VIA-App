var uuid = require('react-native-uuid');

export class Tasks {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.due_date = props.due_date
        this.importance = props.importance
        this.percentage_done = props.percentage_done
        this.completed = props.completed
        this.project = props.project
        this.time_spent = props.time_spent
        this.notes = props.notes
        this.notification_time = props.notification_time
    }

    static get TABLE_CREATE() {
        return `${Tasks.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'created_date NOT NULL, ' +
        'due_date text, ' +
        'importance text, ' +
        'percentage_done text, ' +
        'completed text, ' +
        'project text,' +
        'time_spent text, ' +
        'notes,' + 
        'notification_time ' +
        ')'
    }

    static get TABLE_NAME() {
        return 'tasks'
    }
}