import cloudinary from "../config/cloudinary";
import { db } from "../config/db.config";
import { getBuffer } from "../utils/helper";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { TryCatch } from "../utils/TryCatch";

export const createBlog = TryCatch(async (req, res) => {
  const { title, description, blogContent, category } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "File not found",
    });
  }

  //@ts-ignore
  const authorId = req.userId;

  const bufferData = getBuffer(req.file);

  const result = await cloudinary.uploader.upload(
    bufferData.content as string,
    {
      folder: "blogs",
    }
  );

  const newBlog = await db.blog.create({
    data: {
      author: authorId,
      title,
      description,
      category,
      blogContent,
      image: result.secure_url,
    },
  });

  return res.status(HttpStatusCode.OK).json({
    message: "Blog created successfully",
    blog: newBlog,
  });
});

export const updateBlog = TryCatch(async (req, res) => {
  const { title, description, blogContent, category } = req.body;
  const file = req.file;
  const { id } = req.params;

  //@ts-ignore
  const authorId = req.userId;

  const isBlogExist = await db.blog.findUnique({
    where: { id: Number(id) },
  });

  if (!isBlogExist) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthrized User",
    });
  }

  if (authorId !== isBlogExist.author) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthrized User",
    });
  }

  const bufferData = getBuffer(req.file);

  const result = await cloudinary.uploader.upload(
    bufferData.content as string,
    {
      folder: "blogs",
    }
  );

  const updatedBlog = await db.blog.update({
    where: { id: Number(id) },
    data: {
      title: title || isBlogExist.title,
      description: description || isBlogExist.description,
      category: category || isBlogExist.category,
      blogContent: blogContent || isBlogExist.blogContent,
      image: result?.secure_url || isBlogExist.image,
    },
  });

  return res.status(HttpStatusCode.OK).json({
    message: "Blog updated successfully",
    blog: updatedBlog,
  });
});

export const deleteBlog = TryCatch(async (req, res) => {
  const { id } = req.params;

  //@ts-ignore
  const authorId = req.userId;

  const isBlogExist = await db.blog.findUnique({
    where: { id: Number(id) },
  });

  if (!isBlogExist) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthrized User",
    });
  }

  if (authorId !== isBlogExist.author) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthrized User",
    });
  }

  await db.blog.delete({
    where: { id: Number(id) },
  });

  return res.status(HttpStatusCode.OK).json({
    message: "Blog deleted successfully",
  });
});
