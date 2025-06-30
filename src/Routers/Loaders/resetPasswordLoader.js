import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const resetPasswordLoader = async ({request}) =>  {

    const url = new URL(request.url);

    try { 
        // trying to retrive the user's account information
        await account.get();
    }
    catch(ERROR) {
        console.log(`error getting account: ${ERROR.message}`);
    }

    // Check if userId and secret parameters are present in the URL
    if(!url.searchParams.get('userId') || !url.searchParams.get('secret')) {
        return redirect('/reset-link');
    }

    return null;
};

export default resetPasswordLoader;