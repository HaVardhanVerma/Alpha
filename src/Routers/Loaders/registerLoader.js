import { redirect } from "react-router-dom";
import { account } from "../../lib/appwriter";  

const registerLoader = async () => {
    try {
        const user = await account.get();
        return redirect('/');
    }
    catch (error) {
        return null;
    }
}

export default registerLoader;
