import { z } from "zod";

const newsPostValidation = z.object({
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  liked: z.number(),
  date: z.string(),
  url: z.string(),
  share: z.string(),
  image: z.string(),
});

export default newsPostValidation;
