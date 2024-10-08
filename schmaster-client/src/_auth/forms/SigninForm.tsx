import { Button } from "@/components/ui/button"
import { SignInValidation } from "@/validations"
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
import { SignIn } from "@/lib/calls"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"




const SigninForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const {checkAuthUser} = useUserContext();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    
        const session = await SignIn(
          values.email,
          values.password
        );       
        
       if (!session){
        return toast({
          title: "Sign in failed. Please try again.",
          description: "Sorry for the inconvinience 😇",
        })
       } 
      

      
       const isLoggedIn = await checkAuthUser();

    
       if(isLoggedIn){
        form.reset();
        navigate('/');
       }
       else{
      
        return toast({
          title: "Sign in failed. Please try again.",
          description: "Sorry for the inconvinience 😇",
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
          

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-main">
          Sign In to your account
        </h2>

        <p className="text-light-3 small-medium md:base-regular text-center mt-2">
          Welcome, Please enter your account details
        </p>
        

      <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col gap-5 w-full mt-4">
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
              Sign In
          </Button>
      </form>

            <div className="flex gap-2 mt-5 small-regular">
              <p className="text-main">New to Schamster?</p>
              <Link to='/sign-up'>
              <p className="text-primary-500 font-bold"> Sign up</p>
              </Link>
            </div>

      </div>
    </Form>

  )
}

export default SigninForm