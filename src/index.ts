import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { folderRoutes } from "./routes/folder";
import { fileRoutes } from "./routes/file";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(folderRoutes)
    .use(fileRoutes)
    .listen(3000);

console.log("🚀 Server running at http://localhost:3000");
