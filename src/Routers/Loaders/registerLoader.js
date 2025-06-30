import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const registerLoader = async () =>  {
    try { 
        // Trying to retrieve the user's account information
        const user = await account.get();
        console.log(user);
        
        // If the user is logged in, redirect to the home page
        if (user) {
            console.log(user);
        }
        
    } catch (error) {
        console.log(`Error getting account: ${error.message}`);
        // Return null if the user is not logged in
        return null;
    }

    return redirect('/');
};

export default registerLoader;
