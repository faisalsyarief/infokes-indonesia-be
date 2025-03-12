import pool from "../config/db";

export interface Folder {
  id?: number;
  name: string;
  parent_id?: number | null;
  created_at?: string;
}

export const getParentFolders = async (): Promise<Folder[]> => {
  const [rows] = await pool.query("SELECT * FROM folders WHERE parent_id IS NULL");
  return rows as Folder[];
};

export const getAllFolders = async (): Promise<Folder[]> => {
  const [rows] = await pool.query("SELECT * FROM folders");
  return rows as Folder[];
};

export const getFolderById = async (id: number): Promise<Folder | null> => {
  const [rows] = await pool.query("SELECT * FROM folders WHERE id = ?", [id]);
  const folders = rows as Folder[];
  return folders[0] ?? null;
};

export const getSubfolders = async (parent_id: number): Promise<Folder[]> => {
  const [rows] = await pool.query("SELECT * FROM folders WHERE parent_id = ?", [parent_id]);
  return rows as Folder[];
};

export const createFolder = async (name: string, parent_id: number | null): Promise<Folder | null> => {
  try {
    const [result]: any = await pool.query(
      "INSERT INTO folders (name, parent_id) VALUES (?, ?)",
      [name, parent_id]
    );

    return {
      id: result.insertId,
      name,
      parent_id,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const deleteFolder = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query("DELETE FROM folders WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
