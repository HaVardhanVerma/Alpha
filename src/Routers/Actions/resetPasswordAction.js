import { redirect } from "react-router-dom";

import { account } from "../../lib/appwriter";

const resetPasswordAction = async({request}) => {
    const searchParams = new URL(request.url).searchParams;
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    const formData = await request.formData();

    // Validate that userId and secret are present
    if(!userId || !secret) {
        return {
            message: 'Invalid or missing reset link parameters. Please request a new password reset link.',
        };
    }

    try {
        // Update the user's password with the new password from the form data
        const response = await account.updateRecovery(
            userId,
            secret,
            formData.get('password'),
            formData.get('password')
        );

        // If the password update is successful, redirect to the login page
        if(response) {
            return redirect('/login');
        }
    }
    catch(ERROR) {
        // If an error occurs during password update, return the error
        return ERROR;
    }
};

export default resetPasswordAction;