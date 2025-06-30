import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const resetPasswordLoader = async ({request}) =>  {

    const url = new URL(request.url);

    try { 
        // Attempt to retrieve user account information
        const user = await account.get();
        return user;
    } catch(ERROR) {
        // If there is an error getting the account, log the error message
        return redirect('/login');
    }

    // Check if userId and secret parameters are present in the URL
    if(!url.searchParams.get('userId') || !url.searchParams.get('secret')) {
        return redirect('/reset-link');
    }

    return null;
};

export default resetPasswordLoader;