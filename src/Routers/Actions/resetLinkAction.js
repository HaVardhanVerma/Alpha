import { account } from "../../lib/appwriter";

const resetLinkAction = async ({request}) => {
    const formData = await request.formData();

    const email = formData.get('email');

    console.log("location", `${location.origin}/reset-password`);
    
    // console.log("This is email", email);

    try {
        await account.createRecovery(email, `${location.origin}/reset-password`);

        return {
            ok: true,
            message: 'You will receive a password reset link shortly. Please check your email and follow the instructions to reset your password',
        };
    }
    catch (ERROR){
        console.log(`Error getting password reset link: ${ERROR.message}`);

        return {
            ok: false,
            message: ERROR.message,
        };
    }
}

export default resetLinkAction;