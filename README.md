# INFOKES BE

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run 
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


====================
# Spesifikasi Teknis
## Database
- Menyimpan data folder dan file.
- Harus menggunakan MySQL, MariaDB, atau PostgreSQL.
```
CREATE TABLE folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE CASCADE
);

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    folder_id INT NOT NULL,
    file_type VARCHAR(50),
    size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);
```

## Backend
- Menyediakan API untuk frontend.
- Memuat data dari database saat ada permintaan API.
- Harus menggunakan TypeScript.
- Bisa menggunakan vanilla atau framework apa pun, tetapi kami lebih menyukai Elysia.
- Bisa menggunakan NodeJS atau Bun, tetapi kami lebih menyukai Bun.

## Apa yang Akan Kami Nilai?
- Seberapa bersih dan jelas kode yang Anda tulis.
- Struktur data yang Anda pilih.
- Algoritma yang digunakan.
- Penerapan best practices.

## Poin Bonus (Opsional)
- Menampilkan file di panel kanan.
- Membuat folder di panel kiri bisa dibuka/tutup (seperti Windows Explorer atau file explorer di IDE).
- Membuat aplikasi lebih scalable (misalnya bisa menangani jutaan data dan ribuan pengguna bersamaan).
- Menerapkan fungsi pencarian (search function).
- Menggunakan komponen UI.
- Menggunakan arsitektur hexagonal atau clean architecture.
- Menggunakan service dan repository layer.
- Menerapkan prinsip SOLID.
- Menulis unit test.
- Menulis unit test untuk komponen UI.
- Menulis integration test.
- Menulis E2E test.
- Menggunakan standar REST API (versioning, method, naming).
- Menggunakan runtime Bun daripada NodeJS.
- Menggunakan Elysia.
- Menggunakan monorepo.
- Menggunakan ORM.