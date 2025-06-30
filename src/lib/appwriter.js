import { Client, Account, Avatars, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('fusion5');

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

export {account, avatars, databases};