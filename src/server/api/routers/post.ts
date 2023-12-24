import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
        sex: z.enum(["Male", "Female"]),
        dob: z.date(),
        start_date: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const student = await ctx.db.student.create({
          data: {
            name: input.name,
            famillyName: input.familyName,
            parentName: input.parentName,
            parentNumber: input.parentNumber,
            studentPhoneNumber: input.studentPhoneNumber,
            facbookAcount: input.facbookAcount,
            educational_level: input.educational_level,
            sex: input.sex,
            Ahzab: input.Ahzab,
            adress: input.adress,
            group: input.group,
            start_date: input.start_date,
            dob: input.dob,
          },
        });

        if (student) return { success: true };
        else
          throw new TRPCError({
            message: "student was not added ",
            code: "INTERNAL_SERVER_ERROR",
          });
      } catch (err) {
        throw new TRPCError({
          message: "student was not added ",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  // numberOfstudents: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.student.count({
  //     where: {
  //       sex: "Female",
  //     },
  //   });
  //   const Males = ctx.db.student.count({
  //     where: {
  //       sex: "Male",
  //     },
  //   });

  //   return { Females, Males };
  // }),

  getMales: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.count({
      where: {
        sex: "Male",
      },
    });
  }),
  getFemales: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.count({
      where: {
        sex: "Female",
      },
    });
  }),
  AhzabSum: publicProcedure.query(async ({ ctx }) => {
    const totalAhzab = await ctx.db.student.aggregate({
      _sum: {
        Ahzab: true,
      },
    });

    return { Ahzab: totalAhzab._sum };
  }),
  // getGroupsCounts: publicProcedure.query(async ({ ctx }) => {
  //   const groupCounts = await ctx.db.student.groupBy({
  //     by: ["group"],
  //     _count: true,
  //     _sum: {
  //       Ahzab: true,
  //     },
  //   });

  //   const formattedGroupCounts = groupCounts.map((groupCount) => ({
  //     id: groupCount.group,
  //     value: groupCount._count,
  //     ...groupCount._sum,
  //   }));

  //   return formattedGroupCounts;
  // }),
  getGroups: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.groupBy({
      by: ["group"],
      _count: true,
      _sum: {
        Ahzab: true,
      },
    });
  }),
  // getAllStudents: publicProcedure.query(async ({ ctx }) => {
  //   const students = await ctx.db.student.findMany({
  //     orderBy: {
  //       Ahzab: "desc",
  //     },
  //   });

  //   return students;
  // }),
  getAllStudents: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.findMany({
      orderBy: {
        Ahzab: "desc",
      },
    });
  }),
});
