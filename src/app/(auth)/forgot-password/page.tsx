"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import Axios from "@/lib/Axios";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email")
    .min(5)
    .max(50),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await Axios.post("/api/auth/forgot-password", {
        email: values.email,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Reset link sent!");
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="lg:p-10 px-4 py-12 space-y-10 w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="space-y-2 text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Forgot your password?
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We'll send you a reset link if the email is registered.
        </motion.p>
      </div>

      {/* Form */}
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    disabled={isLoading}
                    className="rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-xl text-base font-semibold"
          >
            {isLoading ? "Submitting..." : "Send Reset Link"}
          </Button>
        </motion.form>
      </Form>

      {/* Redirect link */}
      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Remembered your password?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Login here
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
