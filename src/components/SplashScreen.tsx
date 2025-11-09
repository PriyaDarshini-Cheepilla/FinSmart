import { motion } from 'motion/react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#A7E0F3] to-[#E6F7FF] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background coins */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <IndianRupee className="w-12 h-12 text-[#0D47A1] opacity-20" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-12"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -360]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <IndianRupee className="w-8 h-8 text-[#81C784] opacity-20" />
      </motion.div>

      {/* Main Logo Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Logo Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
          className="bg-white rounded-full p-6 shadow-lg mb-6"
        >
          <div className="relative">
            <TrendingUp className="w-16 h-16 text-[#0D47A1]" strokeWidth={2.5} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -top-2 -right-2 bg-[#81C784] rounded-full p-1"
            >
              <IndianRupee className="w-6 h-6 text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#0D47A1] mb-2"
          style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
        >
          FinSmart
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#0D47A1] text-center px-8"
        >
          <p className="opacity-70">Smart Finance, Simple Life</p>
          <p className="text-sm opacity-60 mt-1">స్మార్ట్ ఫైనాన్స్, సింపుల్ లైఫ్</p>
        </motion.div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex gap-2"
      >
        <motion.div
          className="w-2 h-2 bg-[#0D47A1] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-[#0D47A1] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-[#0D47A1] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
}
