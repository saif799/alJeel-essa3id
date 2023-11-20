"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ar from "date-fns/locale/ar";

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
import { DatePickerDemo } from "./DatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  familyName: z.string().min(2),
  parentName: z.string().min(2),
  parentNumber: z.string().max(10).min(10),
  facbookAcount: z.string().optional(),
  studentPhoneNumber: z.string().optional(),
  group: z.string(),
  adress: z.string(),
  educational_level: z.string(),
  Ahzab: z.string(),
  sex: z.literal("Male").or(z.literal("Female")),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function ProfileForm() {
  const createStudent = api.post.createStudent.useMutation({});
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-4 gap-3">
          <div className="col-span-2">
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
          </div>
          <div className="col-span-2">
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
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>إسم الولي : </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="parentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم هاتف الولي : </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" pattern="0[5-7][0-9]{8}" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="facbookAcount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*حساب الرائد(ة) على فايسبوك : </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
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
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="educational_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المستوى الدراسي للرائد(ة) : </FormLabel>
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
                      <SelectItem value="elementary school">إبتدائي</SelectItem>
                      <SelectItem value="middle school">متوسط</SelectItem>
                      <SelectItem value="high school">ثانوي</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="Ahzab"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ما يحفظه الرائد(ة) من القرآن : </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عدد الأحزاب"
                      type="number"
                      min={0}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
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
          </div>
          <div className="col-span-1">
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
          </div>

          {/* DatePicker field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex  flex-col">
                  <FormLabel>تاريخ الميلاد :</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="rounded-2xl border-1">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ar })
                          ) : (
                            <span> اليوم / الشهر / السنة</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        lang="ar"
                        locale={ar}
                        captionLayout="dropdown-buttons"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        fromYear={1980}
                        toYear={2025}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>الفوج : </FormLabel>
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
                      {}
                      {form.getValues("sex") === "Male" ||
                      form.getValues().sex == undefined ? (
                        <>
                          <SelectItem value="إثمار">إثمار</SelectItem>
                          <SelectItem value="فتية الإسلام">
                            فتية الإسلام
                          </SelectItem>
                          <SelectItem value="شموس الأمة">
                            {" "}
                            شموس الأمة
                          </SelectItem>
                        </>
                      ) : null}

                      {form.getValues("sex") == "Female" ||
                      form.getValues().sex == undefined ? (
                        <>
                          <SelectItem value="بذور"> بذور </SelectItem>
                          <SelectItem value="رواء">رواء </SelectItem>
                          <SelectItem value="إشراق">إشراق </SelectItem>
                        </>
                      ) : null}

                      <SelectItem value="الماهر بالقرآن براعم">
                        الماهر بالقرآن براعم
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4 flex justify-center">
            <Button
              disabled={form.formState.disabled}
              type="submit"
              className=" w-32 rounded-2xl  "
            >
              تسجيل
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
