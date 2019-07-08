// const uuidv4 = require('uuid/v4');

export class Projects {
    constructor(props) {
        this.id = props.id
        this.name = props.name
        this.description = props.description
        this.percentage = props.percentage
    }

    static get TABLE_CREATE() {
        return `${Projects.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'description text, ' +
        'percentage integer' +
        ')'
    }

    static get TABLE_NAME() {
        return 'projects'
    }
}