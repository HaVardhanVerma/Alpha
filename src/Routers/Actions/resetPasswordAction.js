import { redirect } from "react-router-dom";

import { account } from "../../lib/appwriter";

const resetPasswordAction = async({request}) => {
    const formData = await request.formData();

    // console.log("This is request", request);
    // console.log("this is formData", formData.get('password'));

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const secret = url.searchParams.get('secret');

    // Validate that userId and secret are present
    if(!userId || !secret) {
        return {
            message: 'Invalid or missing reset link parameters. Please request a new password reset link.',
        };
    }

    try {
        await account.updateRecovery(
            userId,
            secret,
            formData.get('password')
        );

        // console.log("This is response", response);

        return redirect('/login');
    }
    catch(ERROR) {
        console.log(`error updating password ${ERROR.message}`);

        return {
            message: ERROR.message,
        }
    }

}

export default resetPasswordAction;