/*
Diego Corrales Pinedo, Andrew Dunkerley
5/7/2023

Page to visualize the details of a driving
test.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import addDays from 'date-fns/addDays';
import axios from 'axios';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [agencyAddress, setAgencyAddress] = useState({});
  const [carData, setCarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const { id } = router.query;

  const fetchRequests = async () => {  
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest'
    , {params : {_id: id}});
    const retrievedRequest = res.data.proceso;
    const docs = res.data.proceso.documentos_url;
    setRequests(retrievedRequest);
    setAgencyAddress(res.data.proceso.direccion_agencia);
    setCarData(res.data.proceso.auto);
    setDocuments(docs);
  }


  const addDate = async (_id) => {
    await axios.put('/api/prueba-manejo/actualizar-fecha-prueba', { _id, selectedDate });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Execute addDate only when selectedDate changes
  useEffect(() => {
    if (selectedDate !== null) {
      addDate(request._id);
    }
  }, [selectedDate]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // This is the page that displays the details of a request
    <div>
        <h1>Request Details</h1>
        <p>Request ID: {request._id}</p>
        <p>User ID: {request.usuario_final_id}</p>
        <p>Tipo de Proceso: {request.tipo_proceso}</p>
        <p>Estatus: {request.estatus_validacion}</p>
        <p>Fecha de creación: {request.fecha_inicio}</p>
        
        <h1>Agency Details</h1>
        <p>Agency ID: {request.agencia_id}</p>
        <p>Agency Address: {agencyAddress.calle}</p>
        <p>{agencyAddress.numero_exterior}</p> 
        <p>{agencyAddress.numero_interior}</p>
        <p>{agencyAddress.ciudad}</p>
        <p>{agencyAddress.estado}</p>
        <p>{agencyAddress.pais}</p>
        <p>{agencyAddress.codigo_postal}</p>
        
        <h1>Car Details</h1>
        <p>Car ID: {carData.auto_id} </p>
        <p>Car Brand: {carData.marca} </p>
        <p>Car Model: {carData.modelo} </p>
        <p>Car Price: {carData.precio} </p>
        <p>Car Year: {carData.ano} </p>
        <p>Car Photo URLs: {carData.array_fotografias_url} </p>
        
        <h1>Agendar Cita</h1>
        <DatePicker
          selected={selectedDate} 
          onChange={date => setSelectedDate(date)}
          showTimeSelect
          timeFormat='hh aa'
          timeIntervals={60}
          minTime={setHours(new Date(), request.horas_min)}
          maxTime={setHours(new Date(), request.horas_max)}
          dateFormat='dd/MM/yyyy hh:mm aa'
          minDate={addDays(new Date(), request.dias_anticipo)}
          maxDate={addDays(new Date(), request.dias_max)}
        />
        <p>Fecha actualmente agendada: {request.fecha_agendada}</p>
        
        <div>
        {/* This is the table that displays the documents of a request*/}
        <h1>Request Documents</h1>
        <table>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Document Status</th>
              <th>Ultima modificación</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document,i) => (
              <tr key={i}>
                <td>{document.nombre_documento}</td>
                <td>{document.url}</td>
                <td>{document.estatus}</td>
                <td>{document.fecha_modificacion}</td>
                <td>
                  <p>{document.comentarios}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};





export default RequestDetails;