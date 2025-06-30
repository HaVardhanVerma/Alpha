import { account } from "../lib/appwriter";

const logout = async (navigate) => {
    try {

        await account.deleteSession('current');

    } catch (ERROR) {
        return console.log(`Error deleting user session: ${ERROR.message}`);
    }

    return navigate('/login')
};

export default logout;