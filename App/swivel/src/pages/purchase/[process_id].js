import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import FileUpload from "@/pages/api/uploadBucketDoc/uploadBucketDoc";
import CheckoutPage from "@/components/general/checkout";
import { Container, Typography, Button, IconButton, Fade } from "@mui/material";
import DataTable from "@/components/general/Table";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import { Upload } from "@mui/icons-material";

export default function Process() {
  const router = useRouter();
  const { process_id } = router.query;

  console.log("process_id: " + process_id);
  const [process, setProcess] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [changedDocumentIndex, setChangedDocumentIndex] = useState([]);
  const [changedDocument, setChangedDocument] = useState(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [isOpen, setIsOpen] = useState([]);

  const fetchProcess = async () => {
    const response = await fetch(
      `/api/purchase-docs/with-mongo?process_id=${process_id}`,
      { method: "GET" }
    );

    const data = await response.json();

    if (data.result) {
      setProcess(data.result);
      const newDocuments = data.result.documentos.map((doc, i) => {
        return { ...doc, _id: i };
      });
      setDocuments(newDocuments);
    }
  };

  const addToIsOpen = async (newKey) => {
    let currentOpen = [...isOpen];
    currentOpen.push(newKey);
    setIsOpen(currentOpen);
  };

  // Save the indices that were changed
  const handleDocumentEdit = async (indx) => {

    console.log("uploadedDocument: " + uploadedDocument);
    console.log("changedDocumentIndex: " + changedDocumentIndex);
    const isOpenWithoutIndx = isOpen.filter(function (i) {
      return i !== indx;
    });

    setIsOpen(isOpenWithoutIndx);
    await handleSubmit();
  };

  const handleSubmit = async () => {
    let documentUrl = "";
    const currentDocs = documents;

    console.log("changedDocument: " + uploadedDocument);
    const i = changedDocumentIndex;
    const doc = uploadedDocument;

    if (!doc) {
      return;
    }

    documentUrl = await FileUpload(doc);
    console.log(documentUrl);

    currentDocs[i].url = documentUrl;
    currentDocs[i].fecha_modificacion = new Date().toISOString();
    currentDocs[i].estatus = "En_Revision";

    console.log("process_id: " + process_id);
    console.log("doc_index: " + i);
    console.log("file_url: " + documentUrl);
    console.log("update_date: " + currentDocs[i].fecha_modificacion);

    const result = await fetch(
      `/api/purchase-docs/update-document?process_id=${process_id}&doc_index=${i}&file_url=${documentUrl}&update_date=${currentDocs[i].fecha_modificacion}`,
      {
        method: "PUT",
      }
    );

    fetchProcess();
  };

  useEffect(() => {
    if (!process_id) {
      return;
    }
    fetchProcess();
  }, [process_id, uploadedDocument]);

  const columns = useMemo(
    () => [
      {
        field: "nombre_documento",
        headerName: "Nombre",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "url",
        headerName: "URL",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 2,
      },
      {
        field: "estatus",
        headerName: "Estatus",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "fecha_modificacion",
        headerName: "Última modificación",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "comentarios",
        headerName: "Comentarios",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "botones",
        headerName: "",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        type: "actions",
        renderCell: (params) => (
          <>
            {isOpen.includes(params.row._id) ? (
              <div>
                <label htmlFor="file-input">
                  <IconButton aria-label="delete" size="small" component="span">
                    <UploadIcon />
                  </IconButton>
                </label>
                <input
                  type="file"
                  id="file-input"
                  name="documents"
                  style={{ visibility: "hidden", width: 0, height: 0 }}
                  onChange={(e) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    setUploadedDocument(file)
                    setChangedDocumentIndex(params.row._id)
                  }}
                />

                <IconButton
                  aria-label="delete"
                  size="small"
                  component="span"
                  type="submit"
                  onClick={() =>
                    handleDocumentEdit(params.row._id)
                  }
                >
                  <CheckIcon />
                </IconButton>
              </div>
            ) : (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  addToIsOpen(params.row._id);
                }}
              >
                <UploadIcon />
              </IconButton>
            )}
          </>
        ),
      },
    ],
    [documents, isOpen]
  );

  if (process != null) {
    return (
      <div>
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <div className="section p-5">
              <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                fontSize={{ xs: 25, md: 28, lg: 33 }}
                className="pt-2 text-center"
              >
                Suba los documentos requeridos para finalizar su compra.
              </Typography>
            </div>
          </Fade>

          <Fade in={true} timeout={1500}>
            <div className="section px-5 text-sm-start text-center mb-3">
              <div className="row align-items-center shadow-sm rounded border p-2 mb-3">
                <div className="col-12 col-sm-6">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Marca:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      {process.auto.marca}
                    </span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Modelo:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      {process.auto.modelo}
                    </span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="pb-3"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Año:</strong>{" "}
                    <span style={{ color: "#333333" }}>{process.auto.ano}</span>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Cantidad a pagar:</strong>{" "}
                    <span style={{ color: "#333333" }}>
                      $ {Intl.NumberFormat().format(process.cantidad_a_pagar)} MXN
                    </span>
                  </Typography>
                </div>
                <div className="col-12 col-sm-6">
                  <img
                    src={process.auto.array_fotografias_url[0]}
                    alt="auto"
                    className="img-fluid rounded"
                  />
                </div>
              </div>

              <div className="row align-items-center shadow-sm rounded border p-2">
                <div className="col-12 col-sm-6">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Agente Asignado</strong>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#8a8a8a"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Hola! Soy {process.vendedor.nombres} <br />
                    Yo voy a estar revisando tus documentos <br />
                  </Typography>
                </div>
                <div className="col-12 col-sm-6 ">
                  <Typography
                    fontFamily="Lato"
                    color="#1F1F1F"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    <strong>Agencia</strong>
                  </Typography>
                  <Typography
                    fontFamily="Lato"
                    color="#8a8a8a"
                    className="py-1"
                    fontSize={{ xs: 13, md: 14, lg: 16 }}
                  >
                    Nombre: {process.agencia.nombres} <br />
                    Dirección: {process.agencia.direccion.calle}{" "}
                    {process.agencia.direccion.numero_exterior}{" "}
                    {process.agencia.direccion.ciudad}{" "}
                    {process.agencia.direccion.estado}{" "}
                    {process.agencia.direccion.pais}{" "}
                    {process.agencia.direccion.codigo_postal}
                    <br />
                    Teléfono: {process.agencia.numero_telefonico} <br />
                    Email: {process.agencia.email}
                  </Typography>
                </div>
              </div>
            </div>
          </Fade>

          <Fade in={true} timeout={1500}>
            <div className="section">
              <div className="pt-4">
                <DataTable
                  columns={columns}
                  rows={documents}
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
              </div>
            </div>
          </Fade>
          {/* <h1>Documentos</h1>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>URL</th>
                <th>Estatus</th>
                <th>Ultima modificación</th>
                <th>Comentarios</th>
                <th>Editar</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document, i) => (
                <tr key={i}>
                  <td>{document.nombre_documento}</td>
                  <td>{document.url}</td>
                  <td>{document.estatus}</td>
                  <td>{document.fecha_modificacion}</td>
                  <td>{document.comentarios}</td>
                  <td><button onClick={(e) => {
                    e.preventDefault();
                    addToIsOpen(i)
                  }
                  }> Editar </button></td>
                  {isOpen.includes(i) && (
                    <td>
                      <div>
                        <input type="file" name="documents" onChange={(e) => {
                          e.preventDefault();
                          const file = e.target.files[0];
                          setUploadedDocument(file)
                          setChangedDocumentIndex(i)
                          //console.log(uploadedDocument)
                        }} />
                        <button type="submit" onClick={() => handleDocumentEdit(i)}>Confirm</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table> */}

          <Fade in={true} timeout={1500}>
            <div className="text-center mt-4">
              <Button
                variant="outlined"
                sx={{
                  fontFamily: "Lato",
                  color: "000000",
                  width: 150,
                  // ":hover": {
                  //   backgroundColor: "#F68E70",
                  // },
                }}
                disableElevation
                type="button"
                href="/catalog"
                className="me-4"
              >
                Cancelar
              </Button>

              <CheckoutPage
                id={process_id}
                items={[
                  {
                    price_data: {
                      currency: "mxn",
                      product_data: {
                        name: `${process.auto.marca} ${process.auto.modelo} ${process.auto.ano}`,
                      },
                      unit_amount: parseFloat(process.cantidad_a_pagar) * 100,
                    },
                    quantity: 1,
                  },
                ]}
              />
            </div>
          </Fade>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading Process...</p>
      </div>
    );
  }
}
