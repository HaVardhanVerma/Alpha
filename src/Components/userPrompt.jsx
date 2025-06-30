import React from 'react'

import Avatar from './Avatar';
import { useLoaderData } from 'react-router-dom';

import useToggle from '../Hooks/useToggle';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';


const UserPrompt = ({text}) => {
    
    // Retrive all the user data from the userLoaderData hook
    const {user} = useLoaderData();
    // console.log("This is the name ", user.name);

    // Use the useToggle hook to manage the expanded state  of the user prompt text
    const [expanded, ToggleExpanded] = useToggle(false);

    // Create a ref to access the text box element in the DOM
    const textBoxRef = useRef();

    // Inisialize the hasMoreContent state, indicating whether the content exceeds the visible height of the text box
    const [hasMoreContent, setHasMoreContent] = useState(false);

    // Use useEffect to update the hasMoreContent state whenever the text box ref changes. this is to ensure that the state is updated correctly if the text box content changes.
    useEffect(() => {
        setHasMoreContent(textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight,);

    }, [textBoxRef])

    return (
        <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5'>
            <Avatar name={user?.name}/>

            <p className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!expanded ? 'line-clamp-4': ''}`} ref={textBoxRef}>{text}</p>

            {
                hasMoreContent && (
                    expanded ? (
                        <motion.button className="Icon-btn" onClick={ToggleExpanded}>
                            <span className='material-symbols-rounded icon'>keyboard_arrow_up</span>
                            <div className='state-layer'></div>
                        </motion.button> 
                    ) : (
                        <motion.button className="Icon-btn" onClick={ToggleExpanded}>
                            <span className='material-symbols-rounded icon'>keyboard_arrow_down</span>
                            <div className='state-layer'></div>
                        </motion.button>
                    )
                )
            }

        </div>
    )
};

// userPrompt.propTypes =  {
//     text: PropTypes.string,
// }

export default UserPrompt;
