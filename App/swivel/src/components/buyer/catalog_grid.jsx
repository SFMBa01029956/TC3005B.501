/*
Ana Paula Katsuda Zalce
23-04-2023

Grid que muestra el catálgo de autos. Se muestran las cartas de autos 
acomodadas y ordenadas en un grid. 
*/
import React from "react";
import { Grid } from "@mui/material";

import CarCard from "@/components/buyer/car_card";
import {formatDate} from "@/components/general/date_utils";

const json5 = require('json5');
/* Función que devuelve las cartas con infrmación de los autos acomodadas y con 
un carousel de imágenes de cada auto */
export default function CatalogGrid({ carListing, cardType }) {
  let carList;
  let cardProps;
  console.log("listing", carListing);
  if (carListing !== undefined) {
    carList = carListing.map((car) => {
      if (cardType === "catalog") {
        cardProps = {
          catalog: {
            carUrl: `/catalog/${car._id}`,
            carImage: json5.parse(car._source.fotos_3d)[0],
            carBrand: car._source.marca,
            carModel: car._source.modelo,
            carYear: car._source.año,
            carAgency: car._source.municipio_agencia,
            carLocation: car._source.estado_agencia,
            carColor: json5.parse(car._source.colores).length,
            carPrice: car._source.precio,
          },
        };
      } else {
        cardProps = {
          general: {
            carUrl: `/purchase/${car._id}`,
            carImage: car.auto.array_fotografias_url[0],
            carBrand: car.auto.marca,
            carModel: car.auto.modelo,
            carYear: car.auto.ano,
            carAgency: car.nombre_agencia,
            carPrice: car.auto.precio,
            status: car.estatus_validacion
          },
          drivingTest: {
            date: "Fecha de la cita: " + formatDate(car.fecha_agendada).formattedDate,
            testHour: "Horario de la cita: " + formatDate(car.hora_agendada).formattedTime,
          },
          purchasesCurrent: {
            date: car.fecha_inicio,
          },
          purchasesCompleted: {
            date: car.fecha_agendada
          },
          // favorites: {
          //   // Alternate set of props
          // },
        };
      }
        return (
          <Grid item xs={12} sm={12} md={6} lg={4} key={car._id}>
            {
              cardType === "catalog" ?
                <CarCard
                  {...cardProps[cardType]}
                  cardType={cardType}
                />
                :
                <CarCard
                  {...cardProps["general"]} {...cardProps[cardType]}
                  cardType={cardType}
                />
            }

          </Grid>
        );
      });
  }
  else {
    carList = <h1 className="d-flex flex-column justify-content-center align-items-center"> No se encontraron autos </h1>
  }
  return (
    <>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
        }}
      >
        {carList}
      </Grid>
    </>
  );
}