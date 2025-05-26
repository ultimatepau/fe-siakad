import { useEffect, useState } from 'react';
import { deleteMatakuliah, getMatakuliah } from '@/services/api';
import type { MatakuliahType } from '@/types/matakuliah';
import { useNavigate } from 'react-router-dom';

export default function MahasiswaList() {
  const [data, setData] = useState<MatakuliahType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getMatakuliah()
      .then((res) => setData(res.data as MatakuliahType[]))
      .catch(() => alert('Gagal mengambil data matakuliah'));
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border">Kode</th>
              <th className="px-4 py-3 border">Nama</th>
              <th className="px-4 py-3 border">Semester</th>
              <th className="px-4 py-3 border">Sks</th>
              <th className="px-4 py-3 border">Jurusan</th>
              <th className="px-4 py-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pageData.map((matkul) => (
              <tr key={matkul.kode} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{matkul.kode}</td>
                <td className="px-4 py-2 border">{matkul.nama}</td>
                <td className="px-4 py-2 border">{matkul.semester}</td>
                <td className="px-4 py-2 border text-center">{matkul.sks}</td>
                <td className="px-4 py-2 border">{matkul.jurusan}</td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/matakuliah/' + matkul.kode)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const conf = confirm(`Apakah kamu yakin ingin menghapus mata kuliah ${matkul.nama}?`);
                        if (conf) {
                          deleteMatakuliah(matkul.kode)
                            .then(() => {
                              getData()
                            })
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data mata kuliah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 border'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
