// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { IconBtn } from "./Button";

import { useRef, useCallback, useState} from "react";

import { useSubmit, useNavigation, useParams } from "react-router-dom";


function PromptField() {

  const [placeholderShow, setPlaceholderShown] = useState(true);
  const [isMultiline, setIsMultiline] = useState(false);
  const [inputValue, setInputValue] = useState(''); 

  const {conversationId} = useParams();
  console.log(conversationId);

  const submit = useSubmit();

  const navigation = useNavigation();

  const inputFieldContainer = useRef();

  const inputField = useRef();

  const handleChange = useCallback(() => {

    if(inputField.current.innerText == '\n') {
      inputField.current.innerHTML = '';
    }

    setPlaceholderShown(!inputField.current.innerText);
    setIsMultiline(inputFieldContainer.current.clientHeight > 64);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  const handleSubit = useCallback(() => {

    // prevent submission if the input is empty or form submission is ongoing
    if(!inputValue || navigation.state === 'submitting') {
      return;
    }

    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt',
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `/${conversationId || ''}`,
      },
    );

    inputField.current.innerHTML = '';
    handleChange();
  }, [handleChange, inputValue, navigation.state, submit, conversationId]);

  // move cursor to the end of the pasted text
  const moveCursor = useCallback(() => {
    const editableEle = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    // set the range to the last child of the editable element
    range.selectNodeContext(editableEle);
    range.collapse(false) //colaps the range to the end

    // clear existing selections and add the new range
    selection.removeAllRanges();
    selection.addRange(range); 
  }, [])

  // Handle paste
  const handlePaste = useCallback((e) => {
    e.preventDefault();

    inputField.current.innerText += e.clipboardData.getData('text');
    handleChange();
    moveCursor();
  }, [handleChange, moveCursor]);
  
  // Define the framer motion for propmt field, controlling its animation based on it's visibility.
  const promptFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      }, 
    },
  };

  // Define the framer motion for propmt field children, controlling its animation based on it's visibility.
  const promptFieldVariantChildren = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  };

  return (
    <motion.div className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''}`} variants={promptFieldVariant} initial='initial' animate='visible' ref={inputFieldContainer}>
        <motion.div className={`prompt-field ${placeholderShow ? '' : 'after:hidden'}`} contentEditable={true} role="textbox" aria-multiline={true} aria-label="Enter a prompt here" data-placeholder="Enter a prompt here"  variants={promptFieldVariantChildren} ref={inputField} onInput={handleChange} onPaste={handlePaste}
          onKeyDown={(e) => {
            if(e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubit();  
            }
          }}
        />
        <IconBtn icon="send" title="Submit" size="large" classes="ms-auto" variants={promptFieldVariantChildren} onClick={handleSubit}>
        </IconBtn>
        <div className="state-layer"></div>
    </motion.div>           
  )
}

export default PromptField