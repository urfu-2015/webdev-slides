'use strict';

class Note {
    constructor(props) {
        this.name = props.name;
        this.text = props.text;
        this.createdAt = props.createdAt;
    }

    save() {
        memoryStorage.push(this)
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
}

const memoryStorage = [
    new Note({
        name: 'films',
        text: 'Films to watch'
    }),
    new Note({
        name: 'books',
        text: 'Books to read'
    })
];

module.exports = Note;
