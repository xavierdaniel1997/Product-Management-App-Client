"use client";

import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { DataTable } from "@/components/shared/DataTable";
import { useAdminProducts, useDeleteProduct } from "@/hooks/useCreateProduct";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";

export default function Dashboard() {
     const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const router = useRouter()
  const { data, isLoading } = useAdminProducts(1, 20);
  const deleteMutation = useDeleteProduct();

  const products = data?.items || [];

  if (isLoading) return <p className="p-4">Loading...</p>;

  
  const handleDeleteClick = (product: IProduct) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    deleteMutation.mutate(selectedProduct._id, {
      onSuccess: () => {
        setOpen(false);
        setSelectedProduct(null);
      },
    });
  };


  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>₹ {row.original.price}</span>,
    },
     {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="line-clamp-1 w-60">{row.original.description}</span>
      ),
    },
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const img = row.original.images?.[0];
        return img ? (
          <img
            src={img}
            className="w-12 h-12 rounded object-cover border"
            alt="product"
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
    <div className="flex items-center gap-3">

      {/* EDIT BUTTON */}
      <button
        className="p-2 text-gray-500 cursor-pointer"
        onClick={() => router.push(`/dashboard/edit/${row.original._id}`)}


      >
        <MdOutlineEdit className="text-lg" />
      </button>

      {/* DELETE BUTTON */}
      <button
        className="p-2 text-gray-500 rounded-md cursor-pointer"
         onClick={() => handleDeleteClick(row.original)}
      >
        <FiTrash className="text-lg" />
      </button>

    </div>
  ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Products</h1>

      <DataTable columns={columns} data={products} />

      <ConfirmDialog
  open={open}
  setOpen={setOpen}
  title="Delete Product"
  description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
  loading={deleteMutation.isPending}
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleConfirmDelete}
/>

    </div>
  );
}
