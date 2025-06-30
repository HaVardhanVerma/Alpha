import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const resetLinkLoader = async () =>  {

    try { 
        // trying to retrive the user's account information
        await account.get();
    }
    catch(ERROR) {
        console.log(`error getting account: ${ERROR.message}`);
        return null;
    }

    // if the user's data is successfully retrive. Redirect the user to the home page
    return redirect('/');
};

export default resetLinkLoader;