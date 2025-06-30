import { account } from "../lib/appwriter";

const logout = async (navigate) => {
    try {

        await account.deleteSession('current');

    } catch (ERROR) {
        // If an error occurs during session deletion, log the error message.
    }

    return navigate('/login');
};

export default logout;