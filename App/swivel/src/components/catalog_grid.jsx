/*
Ana Paula Katsuda Zalce
23-04-2023

Grid que muestra el catálgo de autos. Se muestran las cartas de autos 
acomodadas y ordenadas en un grid. 
*/
import React from 'react';
import Grid from '@mui/material';
// import Carousel from 'react-material-ui-carousel';

import CarCard from '@/components/ui/car_card';

// Datos que se consumirán para mostrar el catálogo de autos.
const carTest = [
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Toyota",
        carModel: "Sienna",
        carYear: "2023",
        carLocation: "Interlomas",
        carAgency: "Toyota Interlomas",
        carPrice: "$ 1,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Honda",
        carModel: "Civic",
        carYear: "2022",
        carLocation: "Santa Fe",
        carAgency: "Honda Santa Fe",
        carPrice: "$ 13,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Nissan",
        carModel: "Versa",
        carYear: "2021",
        carLocation: "Santa Fe",
        carAgency: "Nissan Santa Fe",
        carPrice: "$ 10,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Ford",
        carModel: "Fusion",
        carYear: "2020",
        carLocation: "Azcapotzalco",
        carAgency: "Ford Azcapotzalco",
        carPrice: "$ 15,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Chevrolet",
        carModel: "Camaro",
        carYear: "2021",
        carLocation: "Santa Fe",
        carAgency: "Chevrolet Santa Fe",
        carPrice: "$ 20,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Toyota",
        carModel: "Sienna",
        carYear: "2023",
        carLocation: "Interlomas",
        carAgency: "Toyota Interlomas",
        carPrice: "$ 12,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "BMW",
        carModel: "M3",
        carYear: "2021",
        carLocation: "Polanco",
        carAgency: "BMW Polanco",
        carPrice: "$ 30,000 MXN"
    },
    {
        carUrl: "https://www.truecar.com/new-cars-for-sale/listings/",
        carImages: [
            {
                id: 1,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_1.png",
                alt: "car"
            },
            {
                id: 2,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_2.png",
                alt: "car"
            },
            {
                id: 3,
                url: "https://www.truecar.com/new-cars-for-sale/listings/",
                image: "/info_card_photo_3.png",
                alt: "car"
            }
        ],
        carBrand: "Kia",
        carModel: "Soul",
        carYear: "2021",
        carLocation: "Santa Fe",
        carAgency: "Kia Santa Fe",
        carPrice: "$ 15,000 MXN"
    }
]

/* Función que devuelve las cartas con infrmación de los autos acomodadas y con 
un carousel de imágenes de cada auto */
export default function CatalogGrid(props) {
    const carList = carTest.map((car) =>
        <Grid item xs={12} sm={6} md={4}>
            <CarCard
                carUrl={car.carUrl}
                carImages={car.carImages}
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
                carBrand={car.carBrand}
                carModel={car.carModel}
                carYear={car.carYear}
                carLocation={car.carLocation}
                carAgency={car.carAgency}
                carPrice={car.carPrice}
            />
        </Grid>
    );
    return (
        <>
            <Grid container spacing={3} style={{
                display: 'flex',
            }}>
                {carList}
            </Grid>
        </>
    );
}