import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },

    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 2,
    },

    text: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },

    blob: {
      maxFileSize: "32MB",
      maxFileCount: 10,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded:", file);

    return {
      url: file.url,
      name: file.name,
      key: file.key,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;