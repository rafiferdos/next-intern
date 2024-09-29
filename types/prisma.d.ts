// prisma.d.ts

import { PrismaClient } from '@prisma/client'

declare global {
  let prisma: PrismaClient | undefined
}

// Export an empty object to make this a module
export {}