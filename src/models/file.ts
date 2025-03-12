import pool from "../config/db";

export interface File {
    id: number;
    name: string;
    folder_id: number;
    file_type: string;
    size: number;
    created_at: string;
}

export const getAllFiles = async (): Promise<File[]> => {
    const [rows] = await pool.query("SELECT * FROM files");
    return rows as File[];
};

export const getFilesById = async (folderId: number): Promise<File[]> => {
    const [rows] = await pool.query("SELECT * FROM files WHERE id = ?", [folderId]);
    return rows as File[];
};

export const getFilesInFolder = async (folderId: number): Promise<File[]> => {
    const [rows] = await pool.query("SELECT * FROM files WHERE folder_id = ?", [folderId]);
    return rows as File[];
};

export const createFile = async (name: string, folder_id: number, file_type: string, size: number): Promise<File | null> => {
    try {
        const [result]: any = await pool.query(
            "INSERT INTO files (name, folder_id, file_type, size) VALUES (?, ?, ?, ?)",
            [name, folder_id, file_type, size]
        );

        return { id: result.insertId, name, folder_id, file_type, size, created_at: new Date().toISOString() };
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const deleteFile = async (id: number): Promise<boolean> => {
    const [result]: any = await pool.query("DELETE FROM files WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
