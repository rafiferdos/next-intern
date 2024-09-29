import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

// Check if we are in development mode (to avoid creating multiple instances)
if (process.env.NODE_ENV === 'development') {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
} else {
  prisma = new PrismaClient()
}

export default prisma