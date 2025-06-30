import React from 'react'

import PropTypes from 'prop-types';
import iconLogo from '../assets/logo-icon.svg';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { hopscotch, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {useState, useEffect, useCallback} from 'react';

import toTitle from '../utils/toTitle';

import {useSnackBar} from '../Hooks/useSnackBar';

const AiResponse = ({aiResponse, children}) => {

    // Initialize the codeTheme state to an empty string, This will be used to store the selected code theme
    const [codeTheme, setCodeTheme] = useState('');

    const {showSnackbar} = useSnackBar();

    // useEffect to detect the changes in the user's preferred color scheme.
    useEffect(() => {
        // Create a media query to detect the user's preferred color scheme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Initially set the codeTheme based on the current media query result
        setCodeTheme(mediaQuery.matches ? hopscotch : coy);

        // Create an eventListener to handle changes in the user's preferred color scheme
        const themeListner = mediaQuery.addEventListener('change', (event) => {
            setCodeTheme(event.matches ? hopscotch : coy);
        });

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', themeListner);
        }
    }, []);

    // This function will execute for every code tag
    const code = ({children, className, ...rest}) => {
        const match = className?.match(/language-(\w+)/);

        return match ? (
            <>
                <div className='code-block'>
                    <div className='p-4 pb-0 font-sans'>{toTitle(match[1])}</div>

                    <SyntaxHighlighter
                        {...rest}
                        PreTag='div'
                        language={match[1]}
                        style={codeTheme}
                        customStyle={{
                            marginBlock: '0',
                            padding: '2px',
                        }}

                        codeTagProps={{
                            style: {
                                padding: '14px',
                                fontWeight: '600',
                            }
                        }}
                    >{children}</SyntaxHighlighter>
                </div>

                <div className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-t-extraSmall rounded-b-medium flex justify-between items-center h-11 font-sans text-bodyMedium ps-4 pe-2'>
                    <p>
                        Use Code
                        <a
                            className='link ms-2'
                            href="https://gemini.google.com/faq#coding"
                            target="_blank"
                        >
                            With caution
                        </a>
                    </p>

                    <motion.button className="Icon-btn">
                        <span className='material-symbols-rounded icon' onClick={handleCopy.bind(null, children)}>content_copy</span>
                        <div className='state-layer'></div>
                    </motion.button>
                </div>
            </>
        ) : (
            <code className={className}>{children}</code>
        )
    }

    const handleCopy = useCallback(async (text) => {
        
        try {
            await navigator.clipboard.writeText(text);
            
            showSnackbar({message: 'Text copied to clipboard'});
        } catch (ERROR) {
            console.log(`Error copying to clipboard: ${ERROR.message}`);
        }
    }, [showSnackbar]);
    
    return (
        <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr)] md:gap-5'>
            <figure className='w-8 h-8 grid place-items-center'>
                <img 
                    src={iconLogo}
                    width={32}
                    height={32}
                    alt="" 
            />
            </figure>

            {children}
            {aiResponse && (
                <div className='markdown-content'>
                    <Markdown remarkPlugins={[remarkGfm]} components={{code}}>
                        {aiResponse}
                    </Markdown>
                </div>
            )}
        </div>
    )
};

AiResponse.propTypes = {
    aiResponse: PropTypes.string,
    children: PropTypes.any,
}

export default AiResponse
