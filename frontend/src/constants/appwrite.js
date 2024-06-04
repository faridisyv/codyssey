// src/services/appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('663feaf300350d6e928e'); // Your project ID

const account = new Account(client);

export { account };
