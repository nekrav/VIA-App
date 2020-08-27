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
        this.projectName = props.projectName
        this.time_spent = props.time_spent
        this.notification_time = props.notification_time
        this.properties = props.properties
        this.notes = props.notes
        
    }

    static get TABLE_CREATE() {
        return `${Tasks.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'created_date text NOT NULL, ' +
        'finished_date text, ' +
        'due_date text, ' +
        'importance text, ' +
        'percentage_done text, ' +
        'completed text, ' +
        'project text,' +
        'projectName text, ' + 
        'time_spent text, ' +
        'notes text,' + 
        'properties text, ' +
        'notification_time ' +
        ')'
    }

    static get TABLE_NAME() {
        return 'tasks'
    }
}