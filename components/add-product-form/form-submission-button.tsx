"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";
import styles from "./form-submission-button.module.scss";

type FormSubmitButtonProps = {
  children: React.ReactNode;
} & ComponentProps<typeof Button>;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={`${styles.submit_button} ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <Loader2 className={styles.loading_spinner} />}
      {children}
    </Button>
  );
}
