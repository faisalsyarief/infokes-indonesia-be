import { Elysia } from "elysia";
import { getParentFolders, getAllFolders, getFolderById, getSubfolders, createFolder, deleteFolder } from "../models/folder";
import { getFilesInFolder } from "../models/file";
import { createResponse } from "../utils/response";

interface FilePayload {
    name: string;
    parent_id: number | null;
}

export const folderRoutes = new Elysia()

    .get("/getParentFolders", async () => {
        try {
            const folders = await getParentFolders();
            return folders
                ? createResponse("00", "Berhasil", folders)
                : createResponse("99", "Gagal Ambil Data!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .get("/folders", async () => {
        try {
            const folders = await getAllFolders();
            return folders
                ? createResponse("00", "Berhasil", folders)
                : createResponse("99", "Gagal Ambil Data!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .get("/folders/:id", async ({ params }) => {
        try {
            const folder = await getFolderById(Number(params.id));
            return folder ? createResponse("00", "Berhasil", folder) : createResponse("01", "ID Tidak Ditemukan!", null);
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .get("/folders/subfolders/:id", async ({ params }) => {
        try {
            const subfolders = await getSubfolders(Number(params.id));
            return subfolders
                ? createResponse("00", "Berhasil", subfolders)
                : createResponse("99", "Gagal Ambil Sub Folder!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .get("/foldersFiles/:id", async ({ params }) => {
        try {
            const files = await getFilesInFolder(Number(params.id));
            return files
                ? createResponse("00", "Berhasil", files)
                : createResponse("99", "Gagal Ambil File ID!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    })

    .post("/folders", async ({ body }) => {
        try {
            const data = body as FilePayload;
            if (!data.name) return createResponse("01", "Tidak Boleh Kosong!");

            const newFolder = await createFolder(data.name, data.parent_id);
            return newFolder
                ? createResponse("00", "Berhasil", newFolder)
                : createResponse("99", "Gagal Simpan!");
        } catch (error) {
            console.error("Error creating folder:", error);
            return createResponse("99", "Internal Server Error");
        }
    })

    .delete("/folders/:id", async ({ params }) => {
        try {
            const success = await deleteFolder(Number(params.id));
            return success
                ? createResponse("00", "Berhasil")
                : createResponse("01", "ID Tidak Ditemukan!");
        } catch (error) {
            console.error("Error:", error);
            return createResponse("99", "Internal Server Error", null);
        }
    });
