import { useEffect, useState } from "react";
import {useNavigation} from "react-router-dom";

const usePromptPreloader = () => {

    const navigation = useNavigation();

    const [promptPreoaderValue, setPromptPreloaderValue] = useState('');

    // useEffect to update preloader value based on navigation.formData
    useEffect(() => {
        // If form data exist, get the user prompt and update the preloader value.

        if(navigation.formData) {
            setPromptPreloaderValue(navigation.formData.get('user_prompt'));
        }   

        else {
            // If no form data found, reset preloader value to empty string.
            setPromptPreloaderValue('');
        }
    }, [navigation]); // Runs effect on when navigation state changes.

    return {promptPreoaderValue};
}

export default usePromptPreloader;