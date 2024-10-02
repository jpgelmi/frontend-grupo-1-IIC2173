import React from 'react'
import { motion } from 'framer-motion'

const Cargando = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#E6F3FF] to-white">
      <motion.div
        className="w-16 h-16 border-4 border-[#40B3E8] border-t-[#2A3E6D] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.h2
        className="mt-4 text-2xl font-bold text-[#2A3E6D]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Cargando
      </motion.h2>
      <motion.div
        className="mt-2 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-[#40B3E8] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Cargando