import {account} from '../../lib/appwriter.js';
import IdGenerator from "../../utils/IdGenerator";

import { redirect } from 'react-router-dom';

const registerAction = async ({request}) => { 
    // retrive all the form data from the request
    const formData = await request.formData();

    try {
        // Create a new account
        await account.create(
            IdGenerator(),
            formData.get('email'),
            formData.get('password'),
            formData.get('name'),
        )
    }
    catch(ERROR) {
        return {
            message: ERROR.message,
        }
    }

    // After successful registration, login the user and redirect the user to the home page
    try {
        // create a session for the new user with the provoided email and password
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password'),
        )
    }
    catch (ERROR) {
        // If an error occurs during session creation, return the error
        return {
            message: ERROR.message,
        }
    }
    
    // Redirect the user to the home page
    return redirect('/');
}

export default registerAction;