'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'

export default function ErrorMessageEdit() {
  const [showMessage, setShowMessage] = useState(false)
  const [afterShow, setAfterShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    setTimeout(() => {
      setAfterShow(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const crossVariants = {
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
    <>
      {afterShow ? (
        <Navigate to="/edit-application/personal-details" />
      ) : (
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
              stroke="#FF5252"
              strokeWidth="4"
              variants={circleVariants}
            />
            <motion.path
              d="M40 40 L80 80 M80 40 L40 80"
              fill="none"
              stroke="#FF5252"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={crossVariants}
            />
          </motion.svg>
          <div className="text-center">
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
                Oops! Something went wrong with your application.
              </motion.p>
            )}
            <motion.button
              className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={() => setAfterShow(true)}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      )}
    </>
  )
}