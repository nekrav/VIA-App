// const uuidv4 = require('uuid/v4');

export class Habits {
    constructor(props) {
        this.id = props.id
        this.name = props.name
        this.description = props.description
        this.completed = props.completed
    }

    static get TABLE_CREATE() {
        return `${Habits.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'description text, ' +
        'done text' +
        ')'
    }

    static get TABLE_NAME() {
        return 'habits'
    }
}