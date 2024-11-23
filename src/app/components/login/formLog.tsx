import React, { useState } from "react";
import { db } from "@/app/utils/dbfirebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

function FormLog() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage("Correo no encontrado.");
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      const isPasswordValid = await bcrypt.compare(formData.password, userData.password);
      if (isPasswordValid) {
        setMessage("Inicio de sesión exitoso.");
        console.log("Inicio de sesión exitoso:", userData.fullName);
      } else {
        setMessage("Contraseña incorrecta.");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setMessage("Ocurrió un error durante el inicio de sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-500 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-500 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          type="submit"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </section>
  );
}

export default FormLog;
