import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  createStudent: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        familyName: z.string().min(2),
        parentName: z.string().min(4),
        parentNumber: z.string(),
        facbookAcount: z.string().optional(),
        studentPhoneNumber: z.string().optional(),
        group: z.string(),
        adress: z.string(),
        educational_level: z.string(),
        Ahzab: z.number(),
        sex: z.literal("Male").or(z.literal("Female")),
        dob:z.date()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.student.create({
        data: {
          name: input.name,
          famillyName: input.familyName,
          parentName: input.parentName,
          parentNumber: input.parentNumber,
          dob: input.dob,
          sex: input.sex,
          Ahzab: input.Ahzab,
          adress: input.adress,
          group: input.group,
          educational_level: input.educational_level,
          facbookAcount: input.facbookAcount,
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
