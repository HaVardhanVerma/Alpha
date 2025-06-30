import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";

const loginAction = async ({ request }) => {
    const formData = await request.formData();

    try {
        await account.createEmailPasswordSession(
            formData.get("email"),
            formData.get("password")
        );
        
        // If the session is created successfully, redirect the user to the home page
        return redirect('/');
    } catch (error) {
        // If an error occurs during session creation, return an object with the error message
        return {
            message: error.message,
        };
    }
};

export default loginAction;