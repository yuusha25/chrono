import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();

  // Ambil kode verifikasi dari query parameter
  const queryParams = new URLSearchParams(location.search);
  const verificationCode = queryParams.get("code");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch("http://localhost:8080/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // Menampilkan pesan sukses
          // Redirect atau lakukan tindakan setelah verifikasi berhasil
        } else {
          const errorData = await response.json();
          alert(errorData.message); // Menampilkan pesan error
        }
      } catch (error) {
        console.error("Error during email verification:", error);
      }
    };

    if (verificationCode) {
      verifyEmail(); // Panggil fungsi verifikasi saat komponen dimuat
    } else {
      alert("Kode verifikasi tidak ditemukan.");
    }
  }, [verificationCode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Verifikasi Email</h2>
        <p className="text-gray-400 text-center mt-2">
          Sedang memverifikasi email Anda...
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
