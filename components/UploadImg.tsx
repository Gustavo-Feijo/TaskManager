"use client";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { FaX } from "react-icons/fa6";

/**
 * Component that returns a upload button for images.
 */
function UploadImg({
  isVisible,
  changeVisibility,
  className,
}: {
  isVisible: boolean;
  changeVisibility: () => void;
  className?: string;
}) {
  // Use the navigation router for refreshing the page after uploading the image, to force the image to be loaded.
  const router = useRouter();
  return (
    <div
      className={`w-60 h-24 bg-slate-400 flex-center flex-col rounded-lg absolute transition-all ${
        isVisible ? " scale-100" : " scale-0"
      } ${className}`}
    >
      <span>Upload your image</span>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          alert("Upload Completed");

          router.refresh();
        }}
      />
      <FaX
        className="absolute top-1 right-1 text-red-600 cursor-pointer"
        onClick={changeVisibility}
      />
    </div>
  );
}

export default UploadImg;
