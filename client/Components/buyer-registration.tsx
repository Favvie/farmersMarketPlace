"use client";

import { Form, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const signupFormSchema = yup.object().shape({
  location: yup.string().required("Please enter your country and/or location"),
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
  membership: yup.boolean().oneOf([true], "You need to agree to the terms")
});

type TSignupFormSchema = yup.InferType<typeof signupFormSchema>;

export default function BuyerRegistration() {
  const defaultValues: TSignupFormSchema = {
    location: "",
    firstName: "",
    lastName: "",
    membership: false,
  }

  const form = useForm<TSignupFormSchema>({
    resolver: yupResolver(signupFormSchema),
    defaultValues: defaultValues,
    mode: "all"
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<TSignupFormSchema> = (data) => {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className="space-y-6 w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-black">
                Country/Location
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your country and or location" 
                  {...field} 
                  className="rounded-full text-lg font-normal text-gray-500 bg-white h-14 px-6" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className="text-lg font-semibold text-black">Full Name:</FormLabel>
          <div className="flex gap-4">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Enter your first name" 
                      {...field} 
                      className="rounded-full text-lg font-normal text-gray-500 bg-white h-14 px-6" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Enter your last name" 
                      {...field} 
                      className="rounded-full text-lg font-normal text-gray-500 bg-white h-14 px-6" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormItem>
        <FormField
          control={control}
          name="membership"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-6 w-6 rounded border-gray-300 bg-white"
                  />
                  <FormLabel className="text-xl text-black font-bold">
                    I agree to free membership terms and agreement
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-32 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-full"
        >
          Register
        </Button>
      </form>
    </Form>
  )
}