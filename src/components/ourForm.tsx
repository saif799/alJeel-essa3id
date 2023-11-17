"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/trpc/react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2),
  familyName: z.string().min(2),
  parentName: z.string().min(4),
  parentNumber: z.string(),
  studentPhoneNumber: z.string().optional(),
  group: z.string(),
  adress: z.string(),
  educational_level: z.string(),
  Ahzab: z.string(),
  sex: z.literal("Male").or(z.literal("Female")),
});

export function ProfileForm() {
  const createStudent = api.post.createStudent.useMutation({});

  const [state, setstate] = useState();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adress: "",
      educational_level: "",
      familyName: "",
      group: "",
      parentName: "",
      // sex: "Male",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const numberOfAhzab = parseInt(values.Ahzab, 10);

    createStudent.mutate({ ...values, Ahzab: numberOfAhzab });
    // ✅ This will be type-safe and validated.
    console.log(`you created the student ${values.name} successfully`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>إسم الرائد(ة) : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>لقب الرائد(ة) : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>إسم الولي: </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم هاتف الولي : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* رقم هاتف الرائد(ة) : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educational_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المستوى الدراسي للرائد(ة) : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Ahzab"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ما يحفظه الرائد(ة) من القرآن : </FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الفوج</FormLabel>
              <Select
                dir="rtl"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className=" border-1 text-gray-700 ">
                    <SelectValue className=" " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" ">
                  <SelectItem value="first one">تسجيل </SelectItem>
                  <SelectItem value="second one">تسجيل </SelectItem>
                  <SelectItem value="thrid one">تسجيل</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان الكامل للرائد(ة) : </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الجنس :</FormLabel>
              <Select
                dir="rtl"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className=" border-1 ">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">ذكر</SelectItem>
                  <SelectItem value="Female">أنثى</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-center">
          <Button
            disabled={form.formState.disabled}
            type="submit"
            className=" w-32 rounded-2xl  "
          >
            تسجيل
          </Button>
        </div>
      </form>
    </Form>
  );
}
