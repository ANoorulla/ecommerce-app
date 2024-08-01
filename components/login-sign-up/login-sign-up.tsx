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
import { useRouter } from "next/navigation";

const FormSchemaSignUp = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
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

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof FormSchemaSignUp>>({
    resolver: zodResolver(FormSchemaSignUp),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isFormFilled = Object.values(form.getValues()).every(
    (value) => value !== ""
  );
  const isFormValid =
    isFormFilled && Object.keys(form.formState.errors).length === 0;

  async function onSubmit(data: z.infer<typeof FormSchemaSignUp>) {
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/cart");
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
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
        <div className={styles.dialog_title}>Sign Up</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div className={styles.loginsignup_fields}>
                  <FormItem>
                    <FormLabel htmlFor="username" className={styles.label_name}>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          form.setValue("username", e.target.value);
                          form.trigger("username");
                        }}
                        id="username"
                        className={styles.input_field}
                        placeholder="Enter your username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
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
                Sign Up
              </Button>
              <div className={styles.loginsignup_login}>
                <p>
                  Already have an account? &nbsp;{" "}
                  <span>
                    <Link href="/login">Sign in</Link>
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

export default SignUpForm;
