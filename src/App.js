import React from "react";
import { Route, Routes } from "react-router-dom"; // Import Routes dan Route
import Sidebar from "./component/Navbar"; // Import Sidebar component
import Dashboard from "./component/Dashboard"; // Import Dashboard component
import Tabel from "./guru/Tabel"; // Import Dashboard component

function App() {
  return (
    <div>
      <Sidebar /> {/* Sidebar */}
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Halaman Dashboard */}
        <Route path="/Tabel" element={<Tabel />} /> {/* Halaman Dashboard */}
        {/* Tambahkan route lain sesuai kebutuhan */}
      </Routes>
    </div>
  );
}

export default App;
