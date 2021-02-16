const yargs = require('yargs');
const notes = require('./notes.js');

// Create commands
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: argv => {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Show note list',
  handler: () => {
    notes.listNote();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    describe: 'Note title',
    demandOption: true,
    type: 'string',
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Log result by pasing command line args
yargs.parse();
