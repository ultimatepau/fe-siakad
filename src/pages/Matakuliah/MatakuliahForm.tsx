import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMatakuliah, getMatakuliahByKode, updateMatakuliah } from '@/services/api';
import type { MatakuliahType } from '@/types/matakuliah';
import axios from 'axios';

const initialForm: MatakuliahType = {
  kode: '',
  nama: '',
  semester: '',
  sks: 0,
  jurusan: '',
};

export default function MatakuliahForm() {
  const [form, setForm] = useState<MatakuliahType>(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(), params = useParams() as { path: string };

  useEffect(() => {
    if (params.path) getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await getMatakuliahByKode(params.path);
      setForm(data);
    } catch (e) {
      console.log(e);
      alert('Gagal menyimpan data mata kuliah');
      navigate('/matakuliah');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sks' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (params.path) await updateMatakuliah(form.kode, form);
      else await createMatakuliah(form);
      navigate('/matakuliah');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err?.response?.data?.message || 'Gagal menyimpan data mata kuliah');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">{params.path ? 'Edit' : 'Tambah'} Matakuliah</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Kode</label>
          <input
            name="kode"
            type="text"
            value={form.kode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <input
            name="semester"
            type="text"
            value={form.semester}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKS</label>
          <input
            name="sks"
            type="number"
            value={form.sks} min={0}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Jurusan</label>
          <input
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/mahasiswa')}
            className="text-sm text-gray-500 hover:underline"
          >
            Batal / Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
