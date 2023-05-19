/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
Diego Corrales Pinedo
18-05-2023

Catalogo de vehiculos de agencia, con sidebar 
de filtros y searchbar que emplearía elastic 
search.
*/
import React, { useState, useEffect } from "react";
import { Grid, Chip, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Searchbar from "@/components/general/searchbar";
import LandingPageLayout from "@/components/buyer/landing_page_layout";
import CatalogGrid from "@/components/buyer/catalog_grid";
import styles from "@/styles/catalog.module.css";
import { Delete, HelpOutline } from "@mui/icons-material";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Catalog() {
  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});

  const router = useRouter();

  const fetchFilters = async () => {
    let queryString = selectedFilters.length
      ? `${selectedFilters
        .map((filter) => filter.replace("modelos", "modelo"))
        .join("&")}`
      : "";

    const agencyName = "Kia";

    const response = await fetch(
      `http://localhost:3000/api/catalogo-gerente/buscar-auto-agencia?agencyName=${encodeURIComponent(agencyName)}&${queryString}`
    );

    const data = await response.json();

    setFilterHeaders(data.filterHeaders);
    setFilters(data.filters);
    setApiData(data);
    setCatalogData(data.result);
  };

  useEffect(() => {
    fetchFilters();
  }, [selectedFilters]);

  const handleMenuItemClick = (category, item) => {
    event.stopPropagation();
    setExpandedMenuItems((prevExpandedMenuItems) => ({
      ...prevExpandedMenuItems,
      [category]: {
        ...prevExpandedMenuItems[category],
        [item]: !prevExpandedMenuItems[category]?.[item],
      },
    }));

    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = [...prevSelectedFilters];
      if (expandedMenuItems[category]?.[item]) {
        const filterIndex = newSelectedFilters.indexOf(`${category}=${item}`);
        if (filterIndex > -1) {
          newSelectedFilters.splice(filterIndex, 1);
        }
        setSelectedChips((prevSelectedChips) =>
          prevSelectedChips.filter(
            (chip) => chip.category !== category || chip.value !== item
          )
        );
      } else {
        // remove any existing filter for this category
        newSelectedFilters.filter((f) => !f.startsWith(`${category}=`));
        // add the new filter if it's not null
        if (item) {
          newSelectedFilters.push(`${category}=${item}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category, value: item };
            const isChipDuplicate = prevSelectedChips.find(
              (chip) =>
                chip.category === newChip.category &&
                chip.value === newChip.value
            );
            if (isChipDuplicate) {
              return prevSelectedChips;
            } else {
              return [...prevSelectedChips, newChip];
            }
          });
        }
      }
      return newSelectedFilters;
    });
  };

  const renderSubMenu = (category, subMenuItems) => (
    <ul className={styles.filters}>
      {subMenuItems.map((subMenuItem) => (
        <li key={subMenuItem}>
          <FormControlLabel
            className={styles.label}
            control={
              <Checkbox
                size="small"
                checked={expandedMenuItems[category]?.[subMenuItem]}
                onChange={() => handleMenuItemClick(category, subMenuItem)}
              />
            }
            label={
              <Typography className={styles.labelText}>
                {subMenuItem}
              </Typography>
            }
          />
        </li>
      ))}
    </ul>
  );

  const viewCreateCar = () => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/crear-auto',
      query: {},
    })
  };

  const viewEditCar = (auto_id) => {
    // Navigate to the page to create cars
    router.push({
      pathname: '/providers/manager/editar-auto',
      query: {auto_id},
    })
  };

  const deleteCar = async (auto_id) => {
    // Delete car from elastic
    let res = await fetch(`http://localhost:3000/api/catalogo-gerente/borrar-auto-elastic?auto_id=${auto_id}`, 
    {method: 'DELETE'});
    fetchFilters();
  };

  return (
    <>
      <LandingPageLayout>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <div className={styles.filterContainer}>
              <div className={styles.filterTitle}>Filtros</div>
              {/* {selectedChips.map((chip, index) => (
                <Chip
                  key={`${chip.category}-${chip.value}-${index}`}
                  label={`${filterHeaders[chip.category]}: ${chip.value}`}
                  onDelete={() =>
                    handleMenuItemClick(chip.category, chip.value)
                  }
                  color="primary"
                  variant="outlined"
                  className={styles.filterChip}
                />
              ))} */}
              {filters && (
                <ul className={styles.filterList}>
                  {Object.entries(filters).map(([category, subMenuItems]) => (
                    <li key={category} className={styles.filterItem}>
                      <button
                        className={styles.filterButton}
                        onClick={() => handleMenuItemClick(category, null)}
                      >
                        {filterHeaders[category]}
                      </button>
                      {expandedMenuItems[category]?.[null] &&
                        renderSubMenu(category, subMenuItems)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={10}>
            {/*
              Pasar la función fetchSearch como prop al componente Searchbar
              // para que se ejecute cuando se presione el botón de búsqueda
            */}
            <Searchbar
              setState={setSelectedFilters}
            > </Searchbar>
            <div
              style={{
                padding: "3%",
                overflowY: "scroll",
                maxHeight: "100vh",
              }}
            >
              {/* <div style={{ fontSize: "20px", margin: "10px 0" }}>
                {`http://localhost:3000/api/catalogo/buscar-autos${
                  selectedFilters.length ? `?${selectedFilters.join("&")}` : ""
                }`}
              </div>
              <ApiDataDisplay apiData={apiData} /> */}
              {/* <CatalogGrid carListing={catalogData} /> */}
              {/* Display listing of cars */}
              {catalogData ? (
                    <div>
                      <div>
                        <table style={{width: "100%"}}>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Marca</th>
                            <th>ID</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogData.map((car, i) => (
                            <tr key={i}>
                                <td><img src={car._source.fotos_3d[0]} height="50" width="60"/></td>
                                <td>{car._source.modelo}</td>
                                <td>{car._source.año}</td>
                                <td>{car._source.marca}</td>
                                <td>{car._id}</td>
                                <td><button onClick={() => viewEditCar(car._id)}> Editar </button></td>
                                <td><button onClick={() => deleteCar(car._id)}> Borrar </button></td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2>No se econtraron autos.</h2>
                    </div>
                  )}
            <button onClick={() => viewCreateCar()}> Agregar auto </button>
            </div>
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}