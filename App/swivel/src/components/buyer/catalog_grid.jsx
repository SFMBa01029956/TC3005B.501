/*
Ana Paula Katsuda Zalce
23-04-2023

Grid que muestra el catálgo de autos. Se muestran las cartas de autos 
acomodadas y ordenadas en un grid. 
*/
import React from "react";
import { Grid } from "@mui/material";

import CarCard from "@/components/buyer/car_card";

/* Función que devuelve las cartas con infrmación de los autos acomodadas y con 
un carousel de imágenes de cada auto */
export default function CatalogGrid({ carListing, cardType }) {
  let carList;
  if (carListing !== undefined) {
    carList = carListing.map((car) => (
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CarCard
          carUrl={`/catalogo/${car._id}`}  //{car.carUrl}
          carImage={car._source.fotos_3d[0]} //{car.carImages}
          // carImage=
          // {<Carousel autoPlay={false} animation='slide' duration={300} indicatorContainerProps={{
          //     style: {
          //         position: 'absolute',
          //         marginTop: '-23px',
          //         zIndex: 1,
          //         backgroundColor: 'rgba(217,217,214, 0.3)',
          //     }
          // }} indicatorIconButtonProps={{
          //     style: {
          //         color: 'white',
          //     }
          // }} activeIndicatorIconButtonProps={{
          //     style: {
          //         color: 'grey',
          //     }
          // }}>
          //     {car.carImages.map((image) =>
          //         <a href={image.url}>
          //             <img src={image.image} alt={image.alt} height='30%' width='100%' />
          //         </a>
          //     )}
          // </Carousel>}
          carBrand={car._source.marca}
          carModel={car._source.modelo}
          carYear={car._source.año}
          carLocation={car._source.estado_agencia} //{car.carLocation}
          carAgency={car._source.municipio_agencia}
          carColor={car._source.colores.length}
          carPrice={car._source.precio}
        />
      </Grid>
    ));
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
