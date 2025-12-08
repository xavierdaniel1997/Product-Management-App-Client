"use client";

import { useState, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

export default function ImageUploader({
  images,
  setImages,
}: {
  images: File[];
  setImages: (imgs: File[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const fileArr = Array.from(files);

    if (images.length + fileArr.length > 5) return;

    setImages([...images, ...fileArr]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Add up to 5 images. High-quality photos recommended.</p>

      {/* UPLOAD AREA */}
      <div
        onClick={() => fileRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="
          w-full h-40 border-2 border-dashed border-gray-300 
          rounded-xl flex flex-col items-center justify-center
          cursor-pointer hover:border-blue-500 hover:bg-gray-50
          transition
        "
      >
        <FiUpload className="text-3xl text-gray-500" />
        <p className="text-sm mt-2 text-gray-500">Drag & drop or click to upload</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* IMAGE PREVIEW GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((file, idx) => (
          <div key={idx} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg border"
            />

            {/* DELETE BUTTON */}
            <button
              onClick={() => removeImage(idx)}
              className="
                absolute -top-2 -right-2 bg-black/70 text-white 
                p-1 rounded-full opacity-0 group-hover:opacity-100 
                transition
              "
            >
              <FiX className="text-sm" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
