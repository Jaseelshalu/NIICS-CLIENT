'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function SuccessMessage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const tickVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
          <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="58"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="4"
            variants={circleVariants}
          />
          <motion.path
            d="M35 60 L55 80 L85 40"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={tickVariants}
          />
        </motion.svg>
      <div className="text-center ">
      
        <motion.h1 
          className="text-3xl font-bold mt-8 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Admission Application
        </motion.h1>
        {showMessage && (
          <motion.p 
            className="text-xl mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Application submitted successfully!
          </motion.p>
        )}
      </div>
    </div>
  )
}