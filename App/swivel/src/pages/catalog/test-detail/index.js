/*
Diego Corrales Pinedo
15/5/2023

Page to visualize the details of a driving
test request before confirming it. The 
request will only be saved to the db once 
the user has selected the "confirm" button.
Here the user is able to choose a date and
time for their driving test.
*/
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import addDays from 'date-fns/addDays';
import { format } from "date-fns";
import axios from 'axios';
import { useSession } from "next-auth/react";
import FileUpload from '@/pages/api/uploadBucketDoc/uploadBucketDoc';
import { Grid, Button } from '@mui/material';

import BuyerNavbar from '@/components/buyer/navbar';
import PhaseIndicator from '@/components/general/phase_indicator';
import LocationsMap from '@/components/general/locations_map';


import styles from '@/styles/test_details.module.css';
import DataTable from '@/components/general/Table';

export default function RequestDetails() {

  const { data: session } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState(null);
  const [changedDocumentIndices, setChangedDocumentIndices] = useState([]);
  const [changedDocuments, setChangedDocuments] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [carData, setCarData] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [processId, setProcessId] = useState('');
  const [managerData, setManagerData] = useState(null);
  const [isOpen, setIsOpen] = useState([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const { auto_id } = router.query;
  // TODO
  // user_id = session.id;
  const user_id = "646e7555cfb24b65a4f5d1b7"; 

  const fetchDetails = async () => {
    let rawCar = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
      { method: 'GET' });
    const res = await rawCar.json();
    const retrievedAuto = res.auto._source;

    let rawData = await fetch(`http://localhost:3000/api/prueba-manejo/get-user-manager-info?agency_name=${retrievedAuto.nombre_agencia}&_id=${user_id}`,
      { method: 'GET' });
    const resData = await rawData.json();
    const retrievedManager = resData.manager;
    const retrievedUser = resData.user;
    const retrievedDocuments = resData.user.documentos_url;
    const retrievedAddress = resData.user.direccion;

    setCarData(retrievedAuto);
    setFirstImage(retrievedAuto.fotos_3d[0]);
    setManagerData(retrievedManager);
    setUserData(retrievedUser);
    setDocuments(retrievedDocuments);
    setUserAddress(retrievedAddress);  
  }

  const createDrivingTest = async () => {
    // Save the changed documents to firebase
    await handleSubmit();

    const filteredDocuments = documents.filter(json => {
      return json.nombre_documento === "licencia" || json.nombre_documento === "identificacion";
    });
    
    // Create driving test request
    const res = await axios.post('/api/prueba-manejo/crear-prueba-completa',
      { auto_id: auto_id, user_id: user_id, documents: filteredDocuments, selected_date: selectedDate, selected_time: selectedTime });

    // Go to list of user's driving tests
    router.push({
      pathname: '/catalog',
    })
  };

  const handleDocumentEdit = (doc, indx) => {
    const documentIndices = [...changedDocumentIndices];
    documentIndices.push(indx);
    setChangedDocumentIndices(documentIndices);

    const currentChangedDocuments = [...changedDocuments];
    currentChangedDocuments.push(doc);
    setChangedDocuments(currentChangedDocuments);

    const isOpenWithoutIndx = isOpen.filter(function (i) {
      return i !== indx;
    });

    setIsOpen(isOpenWithoutIndx);
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    // Store the changed documents inside firebase
    for(const [i, doc] of changedDocuments.entries()) {
      // Upload to firebase
      documentUrl = await FileUpload(doc);
      // Assign new URL
      currentDocs[changedDocumentIndices[i]].url = documentUrl;
      // Change modification date, status and comments
      currentDocs[changedDocumentIndices[i]].fecha_modificacion = new Date().toISOString();
      currentDocs[changedDocumentIndices[i]].estatus = "En revision";
      currentDocs[changedDocumentIndices[i]].comentarios = "";

      setDocuments(currentDocs);
    }
  };

  const addToIsOpen = async (newKey) => {
    let currentOpen = [...isOpen];
    currentOpen.push(newKey);
    setIsOpen(currentOpen);
  }

  const documentInfo = (document, i) => {
    if (document.nombre_documento === "licencia" || document.nombre_documento === "identificacion") {
      return (
        <tr key={i}>
          <td>{document.nombre_documento}</td>
          {/* <td>{document.url}</td> */}
          <td>{document.fecha_modificacion}</td>
          <td><button onClick={() => addToIsOpen(i)}>Editar</button></td>
          {isOpen.includes(i) && (
            <td>
              <div>
                <input type="file" name="documents" onChange={(e) => setUploadedDocument(e.target.files[0])}/>
                <button type="submit" onClick={() => handleDocumentEdit(uploadedDocument, i)}>Confirmar</button>
              </div>
            </td>
          )}
          <td>{document.estatus}</td>
          <td>{document.comentarios}</td>
        </tr>
      );
    }
    return;
  };

  useEffect(() => {  
    if (auto_id) {
      fetchDetails();
    }
  }, [auto_id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const phases = ['Datos', 'Elección de horario', 'Confirmación'];

  const car_dealerships = [
    { brand: 'Toyota', position: { lat: 19.4226, lng: -99.1676 } },
    { brand: 'Honda', position: { lat: 19.4124, lng: -99.1546 } },
    { brand: 'Ford', position: { lat: 19.4294, lng: -99.1409 } },
    { brand: 'Chevrolet', position: { lat: 19.4257, lng: -99.1710 } },
    { brand: 'Nissan', position: { lat: 19.4191, lng: -99.1539 } },
    { brand: 'Volkswagen', position: { lat: 19.4269, lng: -99.1483 } },
    { brand: 'BMW', position: { lat: 19.4208, lng: -99.1913 } },
    { brand: 'Mercedes-Benz', position: { lat: 19.4106, lng: -99.1782 } },
    { brand: 'Audi', position: { lat: 19.4216, lng: -99.2039 } },
    { brand: 'Mazda', position: { lat: 19.4324, lng: -99.1367 } },
  ];

  const columns = [
    {
      field: 'Documento',
      headerName: 'Documento',
      headerAlign: 'center',
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row.nombre_documento
          ? `${params.row.nombre_documento}`
          : 'No existe fecha de entrega';
        return cell;
      },
    },
    {
      field: "FechaEntrega",
      headerName: "Fecha de entrega",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row.fecha_modificacion
          ? `${params.row.fecha_modificacion}`
          : "No existe fecha de entrega";
        return cell;
      },
    },
    {
      field: "subir",
      headerName: "Fecha de entrega",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        let cell = params.row.fecha_modificacion
          ? `${params.row.fecha_modificacion}`
          : "Este proceso no contiene auto";
        return cell;
      },
    },
  ]

  const rows = []

  if (userData != null && documents != null && userAddress != null && carData != null && firstImage != null && managerData != null) {
    return (
      <>
        <BuyerNavbar />
        <h1 className={styles.request}>Solicitud de prueba de manejo</h1>
        <PhaseIndicator
          phases={phases}
          currentPhaseIndex={activeSectionIndex}
          className
        />
        {activeSectionIndex === 0 && (
          <>
            <div className={styles.schedule}>
              <h4>Datos personales</h4>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <span>Nombre(s):  {userData.nombres}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span>Apellidos: {userData.apellidos}</span>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <span>Correo: {userData.email}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span>Celular: {userData.numero_telefonico}</span>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <span>Estado de residencia: {userAddress.estado}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span>CP: {userAddress.codigo_postal}</span>
                </Grid>
              </Grid>
              <table>
                <thead>
                  <tr>
                    <th>Documento</th>
                    {/* <th>URL</th> */}
                    <th>Fecha de entrega</th>
                    <th>Subir</th>
                    <th>Estatus</th>
                    <th>Comentarios</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, i) => (              
                    documentInfo(document, i)
                  ))}
                </tbody>
              </table>
              <DataTable
                columns={columns}
                rows={rows}
                rowSelection={false}
            sx={{
              border: 1,
              borderColor: "#D9D9D9",
              "& .MuiDataGrid-cell": {
                border: 1,
                borderRight: 0,
                borderTop: 0,
                borderLeft: 0,
                borderColor: "#D9D9D9",
                fontFamily: "Lato",
                fontWeight: 500,
                fontSize: "12px",
                color: "#333333",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontFamily: "Lato",
                fontSize: "16px",
                color: "#333333",
                borderBottom: 0,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 800,
              },
              "& .MuiPaginationItem-text": {
                fontFamily: "Lato",
                color: "#333333",
              },
            }}
              />
              <Button variant='contained' href='/catalog'>Cancelar</Button>
              <Button variant='contained' onClick={() => setActiveSectionIndex(1)}>Continuar</Button>
            </div>
          </>
        )}
        {activeSectionIndex === 1 && (
          <>
            <div className={styles.schedule}>
              <div className={styles.carView}>
                <img src={firstImage} className={styles.imageDiv} />
                <div className={styles.carInfo}>
                  <h1 className={styles.carName}>{carData.marca} {carData.modelo}</h1>
                  <span className={styles.year}> {carData.año} </span>
                  <h4 className={styles.priceTag}> Dirección de la Agencia: </h4>
                  <p className={styles.address}>{carData.direccion_agencia}</p>
                  <h1 className={styles.priceTag}>${carData.precio}</h1>
                </div>
              </div>
              <div className={styles.testInfo}>
                <div className={styles.schedule}>
                  <h2 className={styles.schedule_header}>Elegir un horario:</h2>
                  <h3 className={styles.schedule_header}> Elegir Fecha* </h3>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat='dd/MM/yyyy'
                    minDate={addDays(new Date(), managerData.dias_anticipo)}
                    maxDate={addDays(new Date(), managerData.dias_max)}
                    startDate={addDays(new Date(), managerData.dias_anticipo)}
                  />
                  <h3 className={styles.schedule_header}> Elegir Hora* </h3>
                  <DatePicker
                    selected={selectedTime}
                    onChange={time => setSelectedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat='hh aa'
                    timeIntervals={60}
                    minTime={setHours(new Date(), managerData.horas_min)}
                    maxTime={setHours(new Date(), managerData.horas_max)}
                    dateFormat='hh:mm aa'
                  />
                </div>
                <LocationsMap
                  locationsData = {[{brand: 'Toyota', position: { lat: 40.7128, lng: -74.0059 }}]}
                />
              </div>
              {selectedDate && (
                <p>
                  Fecha actualmente agendada:{" "}
                  {/* La fecha se guarda en UTC, pero se muestra en tiempo local */}
                  {format(selectedDate, "dd/MM/yyyy")} (Tiempo local)
                </p>
              )}
              {selectedTime && (
                <p>
                  Hora actualmente agendada:{" "}
                  {/* La hora se guarda en UTC, pero se muestra en tiempo local */}
                  {format(selectedTime, "hh:mm aa")} (Tiempo local)
                </p>
              )}
              <Button variant='contained' onClick={() => setActiveSectionIndex(0)}>Volver</Button>
              {(selectedDate && selectedTime) ? (
                <div>
                  <Button variant='contained' onClick={() => setActiveSectionIndex(2)}>Continuar</Button>
                </div>
              ) : (
                <div>
                  <p>*Selecciona una fecha y horario para confirmar tu cita.</p>
                </div>
              )}
            </div>
          </>
        )}
        {activeSectionIndex === 2 && (
          <>
            <div className={styles.confirmation}>
              <p>
                Fecha:{" "}
                {format(selectedDate, "dd/MM/yyyy")}
                Horario:{" "}
                {format(selectedTime, "hh:mm aa")}
                Dirección:{" "}
                {carData.direccion_agencia}
                Teléfono:{" "}
                {managerData.numero_telefonico}
              </p>
              <Button variant='contained' onClick={() => setActiveSectionIndex(1)}>Volver</Button>
              <Button variant='contained' onClick={() => createDrivingTest()}>Confirmar</Button>
            </div>
          </>
        )}
      </>
    ); 
  } else {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }
};