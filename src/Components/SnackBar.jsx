import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

function SnackBar({snackBar}) {

    const Variants = {
        hidden: {scaleY: 0},
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.2,
                ease: [0.05, 0.7, 0.1, 1]
            }
        }

    };

    const spanVariant = {
        hidden: {opacity: 0},
        visible: {opacity: 1}
    };

  return (
    <AnimatePresence>
        {snackBar.open && (
            <motion.div 
                variants={Variants}
                initial='hidden'
                animate='visible'
                exit={
                    {
                        opacity: 0,
                        transition: {
                            duration: 0.15,
                            ease: 'easeOut',
                        },
                    }
                }
                className={`snackbar ${snackBar.type}`}
            >
                <motion.span
                    variants={spanVariant}
                    transition={{duration: 0.2, delay: 0.1, ease: 'easeOut'}}
                >
                    {snackBar.message}
                </motion.span>
            </motion.div>
        )}
    </AnimatePresence>
  )
};

SnackBar.propTypes = {
    snackBar: PropTypes.object,
};

export default SnackBar
