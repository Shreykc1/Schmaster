import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2,{message: "Too Short!"}),
    email: z.string().email({message:"Enter a valid email address!"}),
    password: z.string().min(8,{message: 'Password must be atleast 8 character!'})
  });

  export const SignInValidation = z.object({
    email: z.string().email({message:"Enter a valid email address!"}),
    password: z.string().min(8,{message: 'Password mus be atleast 8 character!'})
  });
