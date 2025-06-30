import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";

const loginAction = async ({ request }) => {
    const formData = await request.formData();

    try {
        await account.createEmailPasswordSession(
            formData.get("email"),
            formData.get("password")
        );
        
        
    } catch (error) {
        console.log(`error creating email session: ${error.message}`);
        return {
            message: error.message,
        };
    }
    
    // on successful login, redirect the user to the home page
    return redirect("/");
};

export default loginAction;