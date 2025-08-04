const { createUser } = require('../services/user');
const { createReminder } = require('../services/reminder');
const { createRecipient } = require('../services/recipient');

const users = [
  {
    username: 'Mark',
    email: 'mark1@gmail.com',
    password: '123',
  },
  {
    username: 'Mercy',
    email: 'mercy1@gmail.com',
    password: '123',
  },
];

const reminders = [
  {
    title: 'Call Mom',
    dueDate: new Date('2025-08-04T15:12').toISOString(),
  },
  {
    title: 'Walk the dog',
    dueDate: new Date('2025-09-03T10:30').toISOString(),
  },
  {
    title: 'Wash the dishes',
    dueDate: new Date('2025-09-02T10:30').toISOString(),
  },
  {
    title: 'Study session',
    dueDate: new Date('2025-09-01T14:30').toISOString(),
  },
];

const recipients = [
  {
    name: 'George',
    email: 'george1@gmail.com',
    phone: '123-456-7890',
  },
  {
    name: 'Nelly',
    email: 'nelly1@gmail.com',
    phone: '123-456-7890',
  },
  {
    name: 'Daniel',
    email: 'daniel1@gmail.com',
    phone: '123-456-7890',
  },
  {
    name: 'Eve',
    email: 'eve1@gmail.com',
    phone: '123-456-7890',
  },
];

function addUserId(first, second) {
  for (let i = 0; i < 2; i += 1) {
    reminders[i].senderId = first;
    recipients[i].userId = first;
  }
  for (let i = 2; i < 4; i += 1) {
    reminders[i].senderId = second;
    recipients[i].userId = second;
  }
}

async function addReminder() {
  await Promise.all(
    reminders.map((reminder) => createReminder(reminder.senderId, reminder))
  );
}

async function addRecipients() {
  await Promise.all(
    recipients.map((recipient) => createRecipient(recipient.userId, recipient))
  );
}

async function seedDb() {
  const addedUsers = await Promise.all(users.map((user) => createUser(user)));
  addUserId(addedUsers[0].id, addedUsers[1].id);
  await addReminder();
  await addRecipients();
}

async function main() {
  try {
    console.log('seeding database...');
    await seedDb();
    console.log('Database successfully seeded.');
  } catch (err) {
    console.error(err);
    console.log('Ooops an error occured on seeding database.');
  }
}

main();
