import { Prisma, PrismaClient } from '@prisma/client'

const WRITE_METHODS = [
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
] as const

const ReadonlyClient = Prisma.defineExtension({
  name: 'ReadonlyClient',
  model: {
    $allModels: Object.fromEntries(
      WRITE_METHODS.map((method) => [
        method,
        function (args: never) {
          throw new Error(
            `Calling the \`${method}\` method on a readonly client is not allowed`
          )
        },
      ])
    ) as {
      [K in (typeof WRITE_METHODS)[number]]: (
        args: `Calling the \`${K}\` method on a readonly client is not allowed`
      ) => never
    },
  },
})

const prisma = new PrismaClient()
export const readonlyPrisma = prisma.$extends(ReadonlyClient)
