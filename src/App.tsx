import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';

import MahasiswaLayout from '@/pages/Mahasiswa';
import MahasiswaList from '@/pages/Mahasiswa/MahasiswaList';
import MahasiswaForm from '@/pages/Mahasiswa/MahasiswaForm';

import MatakuliahLayout from '@/pages/Matakuliah';
import MatakuliahList from '@/pages/Matakuliah/MatakuliahList';
import MatakuliahForm from '@/pages/Matakuliah/MatakuliahForm';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<MahasiswaList />} />
            <Route path="new" element={<MahasiswaForm />} />
          </Route>
          <Route path="/matakuliah" element={<MatakuliahLayout />}>
            <Route index element={<MatakuliahList />} />
            <Route path=":path" element={<MatakuliahForm />} />
            <Route path="new" element={<MatakuliahForm />} />
          </Route>

        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
