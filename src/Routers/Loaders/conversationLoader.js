import { account, databases } from "../../lib/appwriter";
import { redirect } from "react-router-dom";

const conversationLoader = async ({params}) => {
    const {conversationId} = params;
    const data = {};

    try {
        // Attempt to get the user's account information
        data.user = await account.get();

    } catch (ERROR) {

        // If there is an error to geting the user data, log it and redirect to the login page
        return redirect('/login');
    }

    try {
        // Attempt to get the conversation document from the Apprite database
        data.conversation = await databases.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 'conversations', conversationId);

    } catch (ERROR) {
        throw ERROR; // Re-throw the error so it can be handled by the error Bondary or a suitable component.
    }
    
    // Return the data object containing user and conversation information
    return data;
};

export default conversationLoader;