"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus, Trash } from "lucide-react"

const questionSchema = z.object({
  problemStatement: z.string().min(2, {
    message: "problem statement must be atleast 2 characters"
  }),

  checkParameter: z.string().min(2, {
    message: "check parameter must be atleast 2 characters"
  }),

  marks: z.coerce.string(),
  questionOrder: z.coerce.string()
})

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  description: z.string().min(2, {
    message: "description must be of atleast 2 characters."
  }),

  questionCount: z.coerce.string(),
  totalMarks: z.coerce.string(),
  startTime: z.string(),
  endTime: z.string(),
  question: z.array(questionSchema),

})

export function CreateContestForm() {
  const form = useForm<z.infer<typeof formSchema>>({

    resolver: zodResolver(formSchema),
    defaultValues: {
      question: [],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "question",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  // ...

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[1050px] p-4 border rounded-lg  relative">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Algorithm 101" {...field} />
              </FormControl>
              <FormDescription>
                Enter your contest name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="This is a contest on Algorithms..." {...field} />
              </FormControl>
              <FormDescription>
                Enter your contest description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="questionCount"
          render={({ field }) => (

            <FormItem>
              <FormLabel>QuestionCount</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Enter the count of questions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalMarks"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Total Marks</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Enter total marks.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local"  {...field} />
              </FormControl>
              <FormDescription>
                Enter start time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (

            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local"  {...field} />
              </FormControl>
              <FormDescription>
                Enter end time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="font-semibold text-lg">Questions</div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 pt-10 border rounded-lg space-y-4 relative "
          >
            <FormField
              control={form.control}
              name={`question.${index}.problemStatement`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter problem statement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`question.${index}.checkParameter`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Parameter</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter check parameter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`question.${index}.marks`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marks</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`question.${index}.questionOrder`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Order</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="absolute top-1 right-1"
            >
              <Trash className="w-4 h-4" />
            </Button>
            
          </div>
        ))}
        
        <Button
          type="button"
          className="flex items-center gap-2"
          onClick={() =>
            append({
              problemStatement: "",
              checkParameter: "",
              marks: 0,
              questionOrder: fields.length + 1,
            })
          }
        >
          <Plus className="w-4 h-4" />
          Add question
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}