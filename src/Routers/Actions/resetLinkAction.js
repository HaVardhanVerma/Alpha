import { account } from "../../lib/appwriter";

const resetLinkAction = async ({request}) => {
    const formData = await request.formData();
    const email = formData.get('email');

    try {
        const response = await account.createRecovery(email, `${location.origin}/reset-password`);
        return response;
    }
    catch (ERROR) {
        return ERROR;
    }
};

export default resetLinkAction;