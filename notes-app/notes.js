const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find(note => note.title === title);

  if (!duplicatedNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgRed.inverse('New note added'));
  } else {
    console.log(chalk.bgGreen.inverse('Note title taken'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen('Note removed'));
  } else {
    console.log(chalk.bgRed('No note found'));
  }
};

const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.bgGreen('Your Notes'));
  notes.forEach(note => console.log(note.title));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.bgGreen(note.title));
    console.log(chalk.bgGreen(note.body));
  } else {
    console.log(chalk.bgRed('Note not found'));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNote,
  readNote,
};
