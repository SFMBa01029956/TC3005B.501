/*
Autores: Karla Mondragón, Andreína Sananez, Ana Paula Katsuda, Salvador Federico Milanés Braniff

Código utilizado para el formulario de registro de usuario comprador. 
*/

"use client";

import axios from "axios";
import React, { useState } from "react";
import AuthComponent from "@/components/login/auth_component";

import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

/* Función que retorna el formulario de registro de comprador con nombre, 
correo electrónico y contraseña, junto con los botones de ingreso  */
export default function SignupBuyer() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { encryptRole } = require("@/utils/crypto");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        name,
        surname,
        email,
        password,
        role: "user",
      });

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <AuthComponent
        title="Regístrate"
        fields={
          <form className="d-flex flex-column" onSubmit={submitHandler}>
            <div className="form-outline mb-2">
              <div className="d-flex flex-row ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre(s)"
                  value={name}
                  pattern="[a-zA-Z]+"
                  onChange={(e) => setName(e.target.value)}
                  required

                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellidos"
                  value={surname}
                  pattern="[a-zA-Z]+"
                  onChange={(e) => setSurname(e.target.value)}
                  required

                />
              </div>
            </div>
            <div className="form-outline mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-outline mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />
            </div>
            <div className="form-outline mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Contraseña"
              />
            </div>
            <div className="d-flex flex-column text-center pt-1 mb-2 pb-1">
              <button type="submit" className="btn btn-primary btn-block mb-2">
                <Typography
                  wrap
                  sx={{
                    color: "white",
                    fontFamily: "lato",
                  }}
                >
                  {" "}
                  Crear Cuenta{" "}
                </Typography>
              </button>
              <button type="submit" className="btn btn-secondary btn-block mb-2">
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "lato",
                  }}
                >
                  {" "}
                  <img alt="logo de google" src="/google_logo.svg" /> Ingresar con
                  Google{" "}
                </Typography>
              </button>
            </div>
            <div className="text-center">
              <p>
                ¿Representas a un Grupo Automotriz?<a href="#!"> Regístrate aquí</a>
              </p>
            </div>
          </form>
        }
      />
    </>
  );
}