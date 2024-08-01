"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input/input";
import styles from "@/components/login-sign-in/login-sign-in.module.scss";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchemaLogin = z.object({
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must contain at least one special character, one digit, and be 8 characters long.",
    }),
});

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof FormSchemaLogin>>({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isFormFilled = Object.values(form.getValues()).every(
    (value) => value !== ""
  );
  const isFormValid =
    isFormFilled && Object.keys(form.formState.errors).length === 0;

  async function onSubmit(data: z.infer<typeof FormSchemaLogin>) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error(result.error);
      } else {
        console.log("Signed in successfully");
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className={styles.loginsignup}>
      <div className={styles.loginsignup_container}>
        <div className={styles.user_icon}>
          <CircleUserRound size={50} color="#2c4152" />
        </div>
        <div className={styles.dialog_title}>Sign In</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className={styles.loginsignup_fields}>
                  <FormItem>
                    <FormLabel htmlFor="email" className={styles.label_name}>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          form.setValue("email", e.target.value);
                          form.trigger("email");
                        }}
                        id="email"
                        className={styles.input_field}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className={styles.loginsignup_fields}>
                  <FormItem>
                    <FormLabel htmlFor="password" className={styles.label_name}>
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className={styles.password_field}>
                        <Input
                          {...field}
                          onChange={(e) => {
                            form.setValue("password", e.target.value);
                            form.trigger("password");
                          }}
                          id="password"
                          className={styles.input_field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <button
                          className={styles.eye_icon}
                          type="button"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <Eye size={20} color="#2c4152" />
                          ) : (
                            <EyeOff size={20} color="#2c4152" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div className={styles.form_footer}>
              <Button
                className={styles.login_btn}
                type="submit"
                disabled={!isFormValid}
              >
                Login
              </Button>
              <div className={styles.loginsignup_login}>
                <p>
                  Don't have an account? &nbsp;{" "}
                  <span>
                    <Link href="/sign-up">Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
