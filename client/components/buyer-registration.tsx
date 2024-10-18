"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/wallet";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { client } from "@/utils/client";
import { MARKETPLACEADDRESS } from "@/lib/constants";
import { useSendTransaction } from "thirdweb/react";
import { toast } from "@/hooks/use-toast";

const signupFormSchema = yup.object().shape({
  location: yup.string().required("Please enter your country and/or location"),
  fullName: yup.string().required("Enter your first name"),
  role: yup.string().required("Please choose a role"),
  membership: yup.boolean().oneOf([true], "You need to agree to the terms"),
});

type TSignupFormSchema = yup.InferType<typeof signupFormSchema>;

export default function BuyerRegistration() {
  const defaultValues: TSignupFormSchema = {
    location: "",
    fullName: "",
    role: "",
    membership: false,
  };

  const form = useForm<TSignupFormSchema>({
    resolver: yupResolver(signupFormSchema),
    defaultValues: defaultValues,
    mode: "all",
  });

  const { handleSubmit, control } = form;

  const router = useRouter();

  const liskSepolia = defineChain(4202);
  const { userAddress } = useWallet();
  const { isPending: registering, mutateAsync: register } =
    useSendTransaction();

  const registerHandler = async ({
    name,
    location,
    role,
  }: {
    name: string;
    location: string;
    role: number;
  }) => {
    const marketplaceContract = getContract({
      client,
      address: MARKETPLACEADDRESS,
      chain: liskSepolia,
    });

    const registerTx = prepareContractCall({
      contract: marketplaceContract,
      method:
        "function registerUser(address _account, string memory _name, string memory _location, uint8 _role)",
      params: [userAddress, name, location, role],
    });
    await register(registerTx);
  };

  const onSubmit: SubmitHandler<TSignupFormSchema> = async (data) => {
    const values = {
      name: data.fullName,
      role: data.role === "farmer" ? 1 : 2,
      location: data.location,
    };

    try {
      await registerHandler(values);
      router.push(data.role === "farmer" ? "/dashboard" : "/marketplace");
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Account exists",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const roleOptions = ["farmer", "buyer"];

  return (
    <Form {...form}>
      <form className="space-y-6 w-10/12" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="items-center flex gap-2 ">
              <FormLabel className="text-lg text-black font-semibold whitespace-nowrap w-44">
                Country/Location:
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
        <FormItem className="items-center flex gap-2">
          <FormLabel className="text-lg font-semibold text-black whitespace-nowrap w-44">
            Full Name:
          </FormLabel>
          <div className="flex gap-4 w-full">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
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
          name="role"
          render={({ field }) => (
            <FormItem className="items-center flex gap-2">
              <FormLabel className="text-lg text-black font-semibold whitespace-nowrap w-44">
                Role:
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="rounded-full bg-white h-14 px-6 text-lg flex items-center gap-2 capitalize text-gray-0 font-medium"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
                    {roleOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="capitalize"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="membership"
          render={({ field }) => (
            <FormItem className="w-1/2 mx-auto pt-10">
              <FormControl>
                <div className="flex items-center gap-4">
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
        <div className="text-center">
          <Button
            type="submit"
            className="w-80 h-16 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-full"
          >
            {registering ? "Registering" : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
