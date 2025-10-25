import { motion } from 'framer-motion'
import { Users, Search, Filter, UserPlus } from 'lucide-react'

const AdminUsers = () => {
  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">User Management 👥</h1>
          <p className="text-white/60 text-lg">Manage all users across the platform</p>
        </motion.div>

        <div className="glass-card p-6 rounded-2xl">
          <p className="text-white">User management page - Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
