"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import ar from "date-fns/locale/ar";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string({ required_error: "يرجى إدخال الإسم" }).min(2, {
    message: "يجب ان يتكون الإسم على الأقل من 3 أحرف",
  }),
  familyName: z.string({ required_error: "يرجى إدخال الإسم" }).min(2, {
    message: "يجب ان يتكون اللقب على الأقل من 3 أحرف",
  }),
  parentName: z.string({ required_error: "يرجى إدخال الإسم" }).min(2, {
    message: "يجب ان يتكون الإسم على الأقل من 3 أحرف",
  }),
  parentNumber: z
    .string({ required_error: "يرجى إدخال رقم الهاتف" })
    .max(10, "رقم الهاتف يجب أن يتكون من 10 أرقام")
    .min(10),

  facbookAcount: z.string().optional(),
  studentPhoneNumber: z
    .string({ required_error: "يرجى إدخال رقم الهاتف" })
    .max(10, "رقم الهاتف يجب أن يتكون من 10 أرقام")
    .min(10),
  group: z.string(),
  adress: z.string(),
  educational_level: z.string(),
  Ahzab: z.string(),
  sex: z.enum(["Male", "Female"]),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  // start_date: z.date(),
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
    },
  });

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    const numberOfAhzab = parseInt(values.Ahzab, 10);
    createStudent.mutate({ ...values, Ahzab: numberOfAhzab });
    router.push("/successful");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-4 gap-3">
          <div className=" col-span-2">
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
                  <FormLabel>حساب فيسبوك* </FormLabel>
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
                    <Input type="tel" {...field} pattern="0[5-7][0-9]{8}" />
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
                      lang="en"
                      min={0}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
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
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
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
                      {form.watch("sex") === "Male" ||
                      form.watch().sex == undefined ? (
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

                      {form.watch("sex") == "Female" ||
                      form.watch().sex == undefined ? (
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

          {/* DatePicker field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex  flex-col gap-1">
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
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>الجنس :</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" border-1 text-gray-700  ">
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
          {/* <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex  flex-col gap-1">
                <FormLabel> تاريخ الالتحاق </FormLabel>
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
                          format(field.value, "yyyy-MM", { locale: ar })
                        ) : (
                          <span> الشهر / السنة</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      ISOWeek
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
          /> */}
          <div className="col-span-4 flex justify-center ">
            <Button
              disabled={form.formState.disabled}
              type="submit"
              className=" w-32 rounded-2xl"
            >
              تسجيل
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
