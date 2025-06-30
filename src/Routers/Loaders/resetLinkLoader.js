import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const resetLinkLoader = async () =>  {

    try {
        // trying to retrive the user's account information
        const user = await account.get();
        return redirect('/');
    }
    catch(ERROR) {
        return null;
    }
};

export default resetLinkLoader;