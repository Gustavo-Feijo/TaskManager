import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "../../../auth";
import prisma from "@/server/db";
import { utapi } from "@/server/uploadting";
const f = createUploadthing();

// Base configuration for UploadThing, provided by the docs.

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user?.user?.id) throw new UploadThingError("Unauthorized");

      // Returns the user id to be used on the uploadComplete for database manipulation.
      return { userId: user.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Get the current data from the user.
      const curImg = await prisma.user.findFirst({
        where: { id: metadata.userId },
      });

      // Verify if the user already has a profile picture, if so, delete it from the storage.
      if (curImg?.imageKey) {
        await utapi.deleteFiles(curImg?.imageKey);
      }
      // Add the key for the new profile picture to the database.
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { imageKey: file.key },
      });
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
