"use server";

import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL"),
  price: z.coerce.number().min(0, "Price must be positive"),
});

type ProductFormData = z.infer<typeof productSchema>;

export async function addProduct(data: ProductFormData) {
  const validatedData = productSchema.parse(data);

  await prisma.product.create({
    data: validatedData,
  });

  // redirect("/");
}
