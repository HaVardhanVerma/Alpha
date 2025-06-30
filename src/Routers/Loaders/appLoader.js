import { redirect } from "react-router-dom";
import { account, databases } from "../../lib/appwriter";
import { Query } from "appwrite";

const appLoader = async () => {

    const data = {};

    try {
        // Attempt to retrive the user's account information
        data.user = await account.get();

    } catch(ERROR) {
        // Redirect to login page if account retrival fails

        console.log(`Error getting user session ${ERROR.message}`);

        return redirect('/login');
    }

    try {

        data.conversations = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            [
                Query.select(['$id', 'title']),
                Query.orderDesc('$createdAt'),
                Query.equal('user_id', data.user.$id),
            ],
        );
    }
    catch(ERROR) {
        console.log(`Error getting user session ${ERROR.message}`);
    }

    return data;
}; 

export default appLoader;