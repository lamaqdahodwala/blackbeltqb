import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String',
        hashedPassword: 'String',
        salt: 'String',
        skillLevel: 7039220,
      },
    },
    two: {
      data: {
        username: 'String',
        hashedPassword: 'String',
        salt: 'String',
        skillLevel: 6484831,
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
