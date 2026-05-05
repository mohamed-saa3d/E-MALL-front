import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL:
  z.url().refine((val) => {
  try {
    const url = new URL(val)
    if(process.env.NODE_ENV === "production") {
      return url.protocol === "https:"
    }
    if(process.env.NODE_ENV === "development") {
      return url.protocol === "http:" 
    }
  } catch {
    return false
  }
}, {
  message: "Invalid URL format or protocol",
}),
  NEXT_PUBLIC_SOCKET_URL: z.url(),
  NEXT_PUBLIC_API_TIMEOUT:z.coerce.number().positive().default(15000)
});


const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  NEXT_PUBLIC_API_TIMEOUT:process.env.NEXT_PUBLIC_API_TIMEOUT
};


const result = envSchema.safeParse(processEnv);

if (!result.success) {
  const errors = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  console.error(`Invalid environment variables:\n${errors}`);
  throw new Error(`Invalid environment variables:\n${errors}`);
}

export const env = result.data;
