import React, { useState } from "react";
import { db } from "@/app/utils/dbfirebase";
import { collection, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

function FormRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
    newsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const dataToSave = {
        fullName: formData.fullName,
        email: formData.email,
        newsletter: formData.newsletter,
        password: hashedPassword,
      };

      const docRef = await addDoc(collection(db, "users"), dataToSave);
      alert(`Usuario registrado con ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error al registrar el usuario: ", error);
    }
  };

  return (
    <section>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="fullName">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <label className="w-full block text-gray-500 font-bold text-center">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            <span className="text-sm">accept the terms and conditions</span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="ext-gray-400 bg-gray-800  hover:bg-gray-700 px-4 py-2 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default FormRegister;
