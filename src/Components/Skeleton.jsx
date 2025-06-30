import React from 'react'

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Skeleton = () => {

  const skeletonLines = [1,2,3];

  const skeletonVariant = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.5,
      }
    },
  };

  const skeletonChidVariant = {
    start: { opacity: 0.5},
    end: {opacity: 1},
  };

  return (
    <motion.div variants={skeletonVariant} initial='start' animate='end'>
      {
        skeletonLines.map((lines) => {
          return (
            <motion.div
            variants={skeletonChidVariant}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.5,
            }}

            key={lines} 
            className='skeleton'></motion.div>
          )
        })
      }
    </motion.div>
  )
}

export default Skeleton;
