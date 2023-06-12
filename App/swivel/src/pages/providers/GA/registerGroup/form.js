"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PhaseIndicator from '@/components/general/phase_indicator';
import { useSession } from "next-auth/react";
import GANavbar from '@/components/providers/GA/navbar'
import styles from '@/styles/test_details.module.css';
import mexicanStates from "@/components/general/states";

export default function RegisterForm() {
    const { data: session } = useSession();
    const router = useRouter();

    const [GAName, setGAName] = useState("");
    const [url, setUrl] = useState("");
    const [rfc, setRfc] = useState("");
    const [GAphone, setGAPhone] = useState("");
    const [street, setStreet] = useState("");
    const [exterior_num, setExteriorNum] = useState("");
    const [interior_num, setInteriorNum] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("México");
    const [postalCode, setPC] = useState("");
    const [GAemail, setGAEmail] = useState("");

    const [legalName, setLegalName] = useState("");
    const [legalSurname, setLegalSurname] = useState("");
    const [legalEmail, setLegalEmail] = useState("");
    const [legalPhone, setLegalPhone] = useState("");

    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);

    useEffect(() => {
    }, [first, second]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("/api/GA/GA-register", {
                nombre_agencia: GAName,
                GAPhone: GAphone,
                GAemail: GAemail,
                url: url,
                rfc: rfc,
                docs: ["Acta constitutiva", "RFC", "Comprobante de domicilio"],
                admin: session.id,

                direccion: {
                    calle: street,
                    numero_exterior: exterior_num,
                    numero_interior: interior_num,
                    ciudad: city,
                    estado: state,
                    pais: country,
                    codigo_postal: postalCode,
                },

                legal: {
                    lNombres: legalName,
                    lApellidos: legalSurname,
                    lEmail: legalEmail,
                    lNumero_telefonico: legalPhone
                }
            });

            console.log(result)

            router.push(`/providers/GA/registerGroup/${result.data.id}`);
        }
        catch (error) {
            console.log(error);
        }
    };

    const firstSection = () => {
        setFirst(true);
        setSecond(false);
    };

    const secondSection = () => {
        setFirst(false);
        setSecond(true);
    };

    const phases = ['Datos', 'Legal', 'Documentos'];
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <GANavbar />
                <h1 className={styles.request}>Solicitud de registro de Grupo Automotriz</h1>
                <PhaseIndicator phases={phases} currentPhaseIndex={activeSectionIndex} />
                {first &&
                    <div className="mt-5">
                        <h3
                            style={{
                                paddingLeft: "12vw",
                                paddingRight: "12vw",
                            }}
                        >Datos generales del Grupo Automotriz</h3>
                        <div className="container"
                            style={{
                                paddingLeft: "8vw",
                                paddingRight: "8vw",
                            }}
                        >
                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del Grupo Automotriz"
                                        value={GAName}
                                        onChange={(e) => setGAName(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="URL del sitio web"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Número telefónico"
                                        value={GAphone}
                                        onChange={(e) => setGAPhone(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="RFC"
                                        value={rfc}
                                        onChange={(e) => setRfc(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo electrónico de contacto"
                                        value={GAemail}
                                        onChange={(e) => setGAEmail(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <h3
                            style={{
                                paddingLeft: "12vw",
                                paddingRight: "12vw",
                                marginTop: "3rem"
                            }}
                        >Dirección del Grupo Automotriz</h3>
                        <div className="container"
                            style={{
                                paddingLeft: "8vw",
                                paddingRight: "8vw",
                            }}
                        >
                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Calle"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-6 col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Numero exterior"
                                        value={exterior_num}
                                        onChange={(e) => setExteriorNum(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-6 col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Numero interior"
                                        value={interior_num}
                                        onChange={(e) => setInteriorNum(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ciudad"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Estado"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="País"
                                        value="México"
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                        inputProps={{ readOnly: true }}
                                    />
                                </div>
                                <div className="col-12 col-md-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Código postal"
                                        value={postalCode}
                                        onChange={(e) => setPC(e.target.value)}
                                        required
                                        style={{
                                            marginBottom: "0.8rem"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-8">
                                </div>
                                <div className="col-12 col-md-2">
                                    <button
                                        style={{
                                            flex: '25%',
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '100%',
                                            padding: '0.5rem 1rem',
                                        }}
                                    //onClick={secondSection}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col-12 col-md-2">
                                    <button
                                        style={{
                                            flex: '25%',
                                            backgroundColor: '#F55C7A',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '100%',
                                            padding: '0.5rem 1rem',
                                        }}
                                        //onClick={secondSection}
                                        onClick={() => {
                                            setActiveSectionIndex(1)
                                            console.log(activeSectionIndex)
                                            secondSection()
                                        }}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}

                {second &&
                    <div className="mt-5">
                        <h3
                            style={{
                                paddingLeft: "12vw",
                                paddingRight: "12vw",
                            }}
                        >Datos legales del Grupo Automotriz</h3>
                        <div className="container"
                            style={{
                                paddingLeft: "8vw",
                                paddingRight: "8vw",
                            }}
                        >
                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre(s)"
                                        value={legalName}
                                        pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                        onChange={(e) => setLegalName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Apellido(s)"
                                        value={legalSurname}
                                        pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                        onChange={(e) => setLegalSurname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo electrónico"
                                        value={legalEmail}
                                        onChange={(e) => setLegalEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Número telefónico"
                                        value={legalPhone}
                                        onChange={(e) => setLegalPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                </div>
                                <div className="col-12 col-md-3">
                                    <button
                                        style={{
                                            flex: '25%',
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '100%',
                                            padding: '0.5rem 1rem',
                                        }}
                                        onClick={() => {
                                            setActiveSectionIndex(0)
                                            firstSection()
                                        }}
                                    >
                                        Atrás
                                    </button>
                                </div>
                                <div className="col-12 col-md-3">
                                    <button
                                        style={{
                                            flex: '25%',
                                            backgroundColor: '#F55C7A',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '100%',
                                            padding: '0.5rem 1rem',
                                        }}
                                        onClick={submitHandler}
                                    >

                                        Confirmar información
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}