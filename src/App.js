import React from "react";
import { Route, Routes } from "react-router-dom"; // Import Routes dan Route
import Sidebar from "./component/Navbar"; // Import Sidebar component
import Dashboard from "./component/Dashboard"; // Import Dashboard component
import TabelGuru from "./guru/TabelGuru"; // Mengganti nama impor Tabel dari guru
import TambahGuru from "./guru/Tambah_guru"; // Import Dashboard component
import EditGuru from "./guru/Ubah_guru"; // Import Dashboard component
import TabelSiswa from "./siswa/TabelSiswa"; // Mengganti nama impor Tabel dari siswa
import TambahSiswa from "./siswa/Tambah_siswa"; // Mengganti nama impor Tabel dari siswa
import UbahSiswa from "./siswa/Ubah_siswa"; // Mengganti nama impor Tabel dari siswa

function App() {
  return (
    <div>
      <Sidebar /> {/* Sidebar */}
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Halaman Dashboard */}
        <Route path="/TabelGuru" element={<TabelGuru />} />{" "}
        {/* Halaman Tabel Guru */}
        <Route path="/Tambah_guru" element={<TambahGuru />} />
        <Route path="/Ubah_guru/:id" element={<EditGuru />} />
        <Route path="/TabelSiswa" element={<TabelSiswa />} />{" "}
        <Route path="/Tambah_siswa" element={<TambahSiswa />} />{" "}
        <Route path="/Ubah_siswa/:id" element={<UbahSiswa />} />{" "}
        {/* Halaman Tabel Siswa */}
        {/* Tambahkan route lain sesuai kebutuhan */}
      </Routes>
    </div>
  );
}

export default App;
