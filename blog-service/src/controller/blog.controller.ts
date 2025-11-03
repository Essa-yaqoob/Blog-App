import axios from "axios";

import { db } from "../config/db.config";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { TryCatch } from "../utils/TryCatch";
import { client } from "../config/redis.config";

export const getAllBlogs = TryCatch(async (req, res) => {
  const { query = "", category = "" } = req.query;

  const cachedKey = `blogs:${query}:${category}`;

  const cachedData = await client.get(cachedKey);

  if (cachedData) {
    return res.status(HttpStatusCode.OK).json({
      message: "Blog fetched successfully",
      blog: JSON.parse(cachedData),
    });
  }

  let blog;

  if (query && category) {
    blog = await db.blog.findMany({
      where: { title: query as string, category: category as string },
    });
  } else if (query) {
    blog = await db.blog.findMany({
      where: { title: query as string },
    });
  } else if (category) {
    blog = await db.blog.findMany({
      where: { category: category as string },
    });
  } else {
    blog = await db.blog.findMany({});
  }

  await client.set(cachedKey, JSON.stringify(blog), "EX", 3600);

  return res.status(HttpStatusCode.OK).json({
    message: "Blog fetched successfully",
    blog,
  });
});

export const getBlogById = TryCatch(async (req, res) => {
  const { id } = req.params;

  const cachedKey = `blog:${id}`;

  const cachedData = await client.get(cachedKey);

  if (cachedData) {
    return res.status(HttpStatusCode.OK).json({
      message: "Blog fetched successfully",
      blog: JSON.parse(cachedData)?.blog,
      author: JSON.parse(cachedData)?.author,
    });
  }

  const blog = await db.blog.findUnique({
    where: { id: Number(id) },
  });

  if (!blog) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "Blog not found",
    });
  }

  let author = null;

  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/profile/${blog.author}`
    );
    author = response.data.user;
  } catch (error) {
    console.warn("Author service unavailable — skipping author info");
  }

  await client.set(cachedKey, JSON.stringify({ blog, author }), "EX", 3600);

  return res.status(HttpStatusCode.OK).json({
    message: "Blog fetched successfully",
    blog,
    author,
  });
});
