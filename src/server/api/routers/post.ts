import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

enum Sex {
  Male,
  Female,
}
export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),
  createStudent: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        familyName: z.string().min(2),
        parentName: z.string().min(4),
        parentNumber: z.string(),
        studentPhoneNumber: z.string().optional(),
        group: z.string(),
        adress: z.string(),
        educational_level: z.string(),
        Ahzab: z.number(),
        sex: z.literal("Male").or(z.literal("Female")),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.student.create({
        data: {
          name: input.name,
          famillyName: input.familyName,
          parentName: input.parentName,
          parentNumber: input.parentNumber,
          sex: input.sex,
          adress: input.adress,
          Ahzab: input.Ahzab,
          educational_level: input.educational_level,
          group: input.group,
          studentPhoneNumber: input.studentPhoneNumber,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
