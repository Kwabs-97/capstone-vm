"use client";
import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { POST } from "@/app/api/routes/new/route";

interface CustomDropzoneProps {
  register?: (name: string) => object;
}
const CustomDropzone = (register: CustomDropzoneProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  //endpoint for cloudinary
  const url = `https://api.cloudinary.com/v1_1/dfkxcmmu8/auto/upload`;

  const handleUpload = async (files: FileList) => {
    if (!files) return;
    try {
      setUploading(true);
      setProgress(0); //reset progress for each upload

      //tracking progress for each file
      const uploadPromises = Array.from(files).map((file, index) => {
        return new Promise<string>((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "ml_default");

          const xhr = new XMLHttpRequest();
          xhr.open("POST", url);

          //update progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const fileProgress = (event.loaded / event.total) * 100;

              setProgress((prev) => (prev + fileProgress) / files.length);
            }
          };

          //check upload status
          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response.secure_url);
            } else {
              reject(`failed to upload files: ${file.name}`);
            }
          };

          xhr.onerror = () => {
            reject(`Error uploading file: ${file.name}`);
          };

          xhr.send(data);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setUploadedFiles((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedFiles(files);
      handleUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      handleUpload(files);
    }
  };

  const handleDelete = (fileUrl: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileUrl));
    setProgress(0);
  };

  useEffect(() => {
    console.log(selectedFiles);
    console.log(uploadedFiles);
  }, [selectedFiles, uploadedFiles]);

  return (
    <div className="w-full max-w-[500px]">
      {/* Dropzone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 mb-4
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <div className="mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V16M12 4L8 8M12 4L16 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Drag & Drop files here or click to select files
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports .pdf, .docx, .doc, .txt
          </p>
          <input
            type="file"
            className="hidden w-full h-full"
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,.txt"
            multiple
          />
        </label>
      </div>

      {/*Progress bar */}
      {uploading && (
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Selected File Display */}
      {uploadedFiles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="flex justify-between items-center mb-2">
              <span className="text-sm truncate flex-grow text-black">
                {file}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(file)}
                className="text-gray-500 hover:text-gray-700 ml-2"
              >
                <Trash size={16} className="hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropzone;
