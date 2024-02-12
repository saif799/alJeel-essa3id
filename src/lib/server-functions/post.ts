"use server";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const studentSchema = z.object({
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
});
type StudentParams = z.infer<typeof studentSchema>;

export async function addStudent(input: StudentParams) {
  // disable cache for this server action
  return await db.student.create({
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
}

export async function getStudents() {
  return await db.student.findMany({
    orderBy: {
      Ahzab: "desc",
    },
  });
}

export async function addHizb(idsToUpdate: string[]) {
  const _cookies = cookies();

  try {
    const updated = await db.student.updateMany({
      where: {
        id: {
          in: idsToUpdate,
        },
        Ahzab: {
          lte: 59,
        },
      },

      data: {
        Ahzab: {
          increment: 1,
        },
      },
    });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("failed to update ", err);
  }
}
export async function RemoveHizb(idsToUpdate: string[]) {
  const _cookies = cookies();

  try {
    const updated = await db.student.updateMany({
      where: {
        id: {
          in: idsToUpdate,
        },
        Ahzab: {
          gte: 1,
        },
      },
      data: {
        Ahzab: {
          decrement: 1,
        },
      },
    });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("failed to update ", err);
  }
}
