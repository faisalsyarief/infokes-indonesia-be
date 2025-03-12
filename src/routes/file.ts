import { Elysia } from "elysia";
import { getAllFiles, getFilesById, createFile, deleteFile } from "../models/file";
import { createResponse } from "../utils/response";

interface FilePayload {
    name: string;
    folder_id: number;
    file_type: string;
    size: number;
}

export const fileRoutes = new Elysia()
    .get("/files", async () => {
        try {
            const folders = await getAllFiles();
            return folders
                ? createResponse("00", "Berhasil", folders)
                : createResponse("99", "Gagal Ambil Data!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .get("/files/:id", async ({ params }) => {
        try {
            const folder = await getFilesById(Number(params.id));
            return folder ? createResponse("00", "Berhasil", folder) : createResponse("01", "ID Tidak Ditemukan!", null);
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .post("/files", async ({ body }) => {
        try {
            const data = body as FilePayload;
            if (!data.name) return createResponse("01", "Tidak Boleh Kosong!");

            const newFile = await createFile(data.name, data.folder_id, data.file_type, data.size);
            return newFile
                ? createResponse("00", "Berhasil", newFile)
                : createResponse("99", "Gagal Simpan!");
        } catch (error) {
            console.error("Error creating folder:", error);
            return createResponse("99", "Internal Server Error");
        }
    })

    .delete("/files/:id", async ({ params }) => {
        try {
            const success = await deleteFile(Number(params.id));
            return success
                ? createResponse("00", "Berhasil")
                : createResponse("01", "ID Tidak Ditemukan!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    });
