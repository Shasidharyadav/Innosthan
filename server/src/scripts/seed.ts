import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Module from '../models/Module'
import bcrypt from 'bcryptjs'
import path from 'path'

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '../../../.env') })

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innosthan')
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Module.deleteMany({})
    console.log('Cleared existing data')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const admin = new User({
      name: 'Admin User',
      email: 'admin@innosthan.com',
      password: hashedPassword,
      role: 'admin',
      xp: 1000,
      level: 10,
      badges: ['admin', 'founder'],
      isVerified: true
    })
    await admin.save()
    console.log('Created admin user')

    // Create mentor user
    const mentorPassword = await bcrypt.hash('mentor123', 12)
    const mentor = new User({
      name: 'Dr. Sarah Johnson',
      email: 'sarah@innosthan.com',
      password: mentorPassword,
      role: 'mentor',
      xp: 5000,
      level: 15,
      badges: ['expert-mentor', 'serial-entrepreneur'],
      isVerified: true
    })
    await mentor.save()
    console.log('Created mentor user')

    // Create sample student
    const studentPassword = await bcrypt.hash('student123', 12)
    const student = new User({
      name: 'Alex Kumar',
      email: 'alex@innosthan.com',
      password: studentPassword,
      role: 'student',
      xp: 250,
      level: 3,
      badges: ['first-steps', 'problem-solver'],
      isVerified: true
    })
    await student.save()
    console.log('Created student user')

    // Create modules
    const modules = [
      {
        moduleNumber: 0,
        title: 'Foundation',
        description: 'Entrepreneurship basics and mindset development',
        content: {
          videos: [
            {
              title: 'Introduction to Entrepreneurship',
              url: 'https://example.com/video1',
              duration: 1200,
              description: 'Understanding the entrepreneurial mindset'
            }
          ],
          chapters: [
            {
              title: 'What is Entrepreneurship?',
              content: 'Entrepreneurship is the process of creating, launching, and running a new business...',
              order: 1
            }
          ],
          resources: [
            {
              title: 'Entrepreneurship Guide PDF',
              url: 'https://example.com/guide.pdf',
              type: 'pdf'
            }
          ]
        },
        quizzes: [
          {
            question: 'What is the primary goal of entrepreneurship?',
            options: ['To make money', 'To solve problems', 'To be famous', 'To avoid work'],
            correctAnswer: 1,
            explanation: 'Entrepreneurship is fundamentally about solving problems and creating value.'
          }
        ],
        deliverables: [
          {
            title: 'Personal Vision Statement',
            description: 'Write a 500-word vision statement for your entrepreneurial journey',
            type: 'reflection'
          }
        ],
        prerequisites: [],
        isUnlocked: true,
        order: 0,
        estimatedHours: 8,
        difficulty: 'beginner',
        tags: ['foundation', 'mindset', 'basics']
      },
      {
        moduleNumber: 1,
        title: 'Ideation',
        description: 'Problem identification and solution design',
        content: {
          videos: [
            {
              title: 'Problem Discovery Techniques',
              url: 'https://example.com/video2',
              duration: 1800,
              description: 'How to identify real problems worth solving'
            }
          ],
          chapters: [
            {
              title: 'Finding Problems',
              content: 'The best entrepreneurs are problem finders, not just problem solvers...',
              order: 1
            }
          ],
          resources: [
            {
              title: 'Problem Discovery Worksheet',
              url: 'https://example.com/worksheet.pdf',
              type: 'pdf'
            }
          ]
        },
        quizzes: [
          {
            question: 'What is the first step in the ideation process?',
            options: ['Build a solution', 'Find a problem', 'Raise funding', 'Hire a team'],
            correctAnswer: 1,
            explanation: 'You must first identify a real problem before you can build a solution.'
          }
        ],
        deliverables: [
          {
            title: 'Problem Statement',
            description: 'Define a clear problem statement for your business idea',
            type: 'assignment'
          }
        ],
        prerequisites: [0],
        isUnlocked: true,
        order: 1,
        estimatedHours: 12,
        difficulty: 'beginner',
        tags: ['ideation', 'problem-solving', 'creativity']
      },
      {
        moduleNumber: 2,
        title: 'Validation',
        description: 'Market research and customer discovery',
        content: {
          videos: [
            {
              title: 'Customer Discovery Process',
              url: 'https://example.com/video3',
              duration: 2100,
              description: 'How to validate your idea with real customers'
            }
          ],
          chapters: [
            {
              title: 'Market Research Basics',
              content: 'Understanding your target market is crucial for success...',
              order: 1
            }
          ],
          resources: [
            {
              title: 'Customer Interview Template',
              url: 'https://example.com/interview-template.pdf',
              type: 'pdf'
            }
          ]
        },
        quizzes: [
          {
            question: 'How many customers should you interview for validation?',
            options: ['5-10', '20-30', '50+', '100+'],
            correctAnswer: 2,
            explanation: 'You need at least 50 customer interviews to get reliable validation data.'
          }
        ],
        deliverables: [
          {
            title: 'Customer Validation Report',
            description: 'Conduct 20 customer interviews and create a validation report',
            type: 'project'
          }
        ],
        prerequisites: [1],
        isUnlocked: true,
        order: 2,
        estimatedHours: 15,
        difficulty: 'intermediate',
        tags: ['validation', 'market-research', 'customer-discovery']
      }
    ]

    for (const moduleData of modules) {
      const module = new Module(moduleData)
      await module.save()
    }
    console.log('Created modules')

    console.log('✅ Database seeded successfully!')
    console.log('\n📋 Test Accounts:')
    console.log('Admin: admin@innosthan.com / admin123')
    console.log('Mentor: sarah@innosthan.com / mentor123')
    console.log('Student: alex@innosthan.com / student123')

  } catch (error) {
    console.error('Seeding error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seedData()
