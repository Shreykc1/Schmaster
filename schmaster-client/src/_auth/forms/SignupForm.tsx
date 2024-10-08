import { Button } from "@/components/ui/button"
import { SignUpValidation } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUp } from "@/lib/calls"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"





const SignupForm = () => {
  const {toast} = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();


  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    
        const session = await SignUp(
          values.name,
          values.email,
          values.password
        );       

       if (!session){
        return toast({
          title: "Sign in failed. Please try again.",
          description: "Sorry for the inconvinience 😇",
        })
       } 
      

       
       const isAuth = await checkAuthUser();
       if(isAuth){
        form.reset();
        navigate('/');
       }
       else{
        return  toast({
          title: "Sign up failed. Please try again.",
          description: "Email Already Exists 😇",
        })
       }

      
    
  }


  return (
   
        <Form {...form}>

        <div className="sm:w-420 flex-center flex-col">

        <img 
            src="/assets/images/logo.svg" 
            alt="logo" 
            width={400}
            className="mb-5 "
            />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign Up to your account
        </h2>

        <p className="text-light-3 small-medium md:base-regular text-center mt-2">
          Welcome, Please enter your account details
        </p>
        

      <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col gap-5 w-full mt-4">

      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="string" className="shad-input" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

<FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
              Sign up
          </Button>
      </form>

      <div className="flex gap-2 mt-5 small-regular">
              <p >Already have an account?</p>
              <Link to='/sign-in'>
              <p className="text-primary-500 font-bold"> Sign in</p>
              </Link>
            </div>

      </div>
    </Form>

  )
}

export default SignupForm