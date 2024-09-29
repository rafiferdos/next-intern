// prisma.d.ts

import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Export an empty object to make this a module
export {}