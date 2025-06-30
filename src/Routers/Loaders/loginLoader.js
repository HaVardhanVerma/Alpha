import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const loginLoader = async () =>  {

    try {
        // trying to retrive the user's account information
        await account.get();
        return redirect('/');
    }
    catch(ERROR) {
        return null;
    }
};

export default loginLoader;