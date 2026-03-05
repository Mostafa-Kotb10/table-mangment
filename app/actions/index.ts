"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const name = formData.get("name")?.toString();
  const quantity = Number(formData.get("quantity") ?? 0);
  if (!name) throw new Error("Missing product name");

  await prisma.product.create({ data: { name, quantity } });
  revalidatePath("/products");
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const quantity = Number(formData.get("quantity"));
  if (!id || quantity === undefined) throw new Error("Missing data");

  await prisma.product.update({ where: { id }, data: { quantity } });
  revalidatePath("/products");
}

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Missing ID");

  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
}

export async function createTableBatch(formData: FormData) {
  const name = formData.get("name")?.toString();
  const structureId = Number(formData.get("structureId"));
  const quantity = Number(formData.get("quantity"));

  if (!name || !structureId || !quantity) throw new Error("Missing data");

  await prisma.table.create({
    data: {
      name,
      structureId,
      quantity,
    },
  });

  revalidatePath("/tables");
}

export async function deleteTableBatch(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Missing batch ID");

  await prisma.table.delete({ where: { id } });
  revalidatePath("/tables");
}

export async function getStructures() {
  const structures = await prisma.structure.findMany({
    orderBy: { name: "asc" },
  });

  return structures;
}

export async function createStructure(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) throw new Error("Name is required");

  await prisma.structure.create({ data: { name } });
}

export async function deleteStructure(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Structure ID is required");

  await prisma.structure.delete({ where: { id } });
}


export async function assignProductToStructure(formData: FormData) {
  const structureId = Number(formData.get("structureId"));
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));

  if (!structureId || !productId || !quantity) throw new Error("All fields are required");

  await prisma.productStructure.create({
    data: { structureId, productId, quantity },
  });
}
