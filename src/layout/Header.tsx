export default function Header() { 
    const tanggal = new Date()
    return (
      <header className="flex justify-between items-center p-4 bg-white shadow border-b">
        <div>
          <h2 className="text-xl font-semibold">Selamat datang, Muhammad Rizaldi!</h2>
          <p className="text-sm text-gray-500">Kamis, {`${new Date().getDate()} ${tanggal.toLocaleString('id-ID', { month: 'long' })} ${new Date().getFullYear()}`}</p>
        </div>
        <img
          src="https://ui-avatars.com/api/?name=Muhammad+Rizaldi" 
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
      </header>
    );
  }
  