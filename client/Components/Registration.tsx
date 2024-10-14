"use client";

import { Form, FormControl, FormLabel, FormItem, FormMessage, FormField } from "./ui/form"; 
import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const signupFormSchema = yup.object().shape({
  location: yup.string().required("Please  enter your location"),
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
  phoneNumber: yup.string().test("is-number", "Please enter a number", (value) => {
    if(!value) return true;

    return !isNaN(parseFloat(value)) && isFinite(+value))
  })).required("Enter your number"),
  membership: yup.boolean().required("You need to agree!")
})

type TSignupFormSchema = yup.InferType<typeof signupFormSchema>;

export default function RegistrationScreen() {
    const defaultValues: TSignupFormSchema = {
      location: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      membership: false,
    }

    const form = useForm<TSignupFormSchema>({
      resolver: yupResolver(signupFormSchema),
      defaultValues,
      mode: "all"
    })

    const {handleSubmit, control, formState: {errors}} = form;

    const onSubmit: SubmitHandler<TSignupFormSchema> = (data) => {
      console.log(data)
    }

    return (
<Form {...form}>
   <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex items-center space-x-4">
            <label htmlFor="country" className="text-gray-700 text-xl text-right font-bold ">Country/Location:</label>
            <input type="text" id="country" className="border rounded-3xl mb-4 p-3 flex-1 py-5" />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="fullname" className="text-gray-700 text-xl text-right font-bold ">Full Name:</label>
            <div className="flex space-x-2 flex-1">
              <input type="text" id="firstname" className="border rounded-3xl mb-4  p-3 flex-1 py-5" placeholder="First Name" />
              <input type="text" id="lastname" className="border rounded-3xl mb-4  p-3 flex-1 py-5" placeholder="Last Name" />
            </div>
          </div>
          <div className="flex items-center space-x-4 pl-28">
            <label htmlFor="tel" className="text-gray-700 text-xl text-right font-bold">Tel:</label>
            <div className="flex space-x-2 flex-1">
              <input type="text" id="tel-1" className="border rounded-3xl mb-4 p-3 w-1/6 py-5" />
              <input type="text" id="tel-2" className="border rounded-3xl mb-4 p-3 w-1/6 py-5" />
              <input type="text" id="tel-3" className="border rounded-3xl mb-4  p-3 w-1/2 py-5" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input type="checkbox" id="terms" className="mr-2 p-2" />
            <label htmlFor="terms" className="text-gray-700 font-bold text-xl m-4 ">
              I agree to free membership terms and aggrement
            </label>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-green-700 text-white px-8 py-2 rounded-2xl text-lg font-semibold">
              Register
            </button>
          </div> */}
          <FormField
            control={control}
            name="location"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Country/Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your country and/or location" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3">
          <FormLabel>Full Name</FormLabel>
           <FormField
            control={control}
            name="firstName"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name="lastName"
            render={({field}) => (
              <FormItem>
               
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          </div>
           <FormField
            control={control}
            name="phoneNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  Country/Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" variant={"greenBtn"}>Register</Button>
        </form>
        </Form>
    )
  }