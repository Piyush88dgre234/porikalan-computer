import { motion } from 'framer-motion';
import { BookOpen, Phone } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white text-gray-800">
      <header className="p-6 shadow-md bg-white sticky top-0 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <BookOpen /> Wisdom Coaching Center
        </h1>
        <a
          href="tel:789658787"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Phone size={18} /> 789658787
        </a>
      </header>

      <main className="p-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center text-indigo-700 mb-6"
        >
          Welcome to Wisdom Coaching
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          We provide high-quality education and guidance for competitive exams.
          Join us to achieve your dreams with structured learning and expert mentors.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-xl font-bold mb-2">Our Courses</h3>
            <p>SSC, Banking, Railway, Defence and more.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
            <p>Expert faculty, modern methods, personalized attention.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
