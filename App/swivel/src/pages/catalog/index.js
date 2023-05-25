/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
18-04-2023

Catalogo de vehiculos, con sidebar de filtros
y searchbar que emplearía elastic search.
*/

import React, { useState, useEffect } from "react";
import { Grid, Chip, Checkbox, FormControlLabel, Typography, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

import BuyerLayout from "@/components/buyer/layout";
import CatalogPagination from "@/components/buyer/catalog_pagination";
import SortCatalog from "@/components/buyer/sort_catalog";
import styles from "@/styles/catalog.module.css";
import { useRouter } from "next/router";
import Searchbar from "@/components/general/searchbar";

export default function Catalog() {

  const router = useRouter();

  // Filter variables
  const [filterHeaders, setFilterHeaders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [expandedMenuItems, setExpandedMenuItems] = useState({});
  const [selectedChips, setSelectedChips] = useState([]);

  // Data variables
  const [apiData, setApiData] = useState(null);
  const [catalogData, setCatalogData] = useState([]);

  const buildQuery = (selectedFilters) => {
    let query = {};
    selectedFilters.forEach((filter) => {
      const [category, item] = filter.split(":");
      if (!query[category]) {
        query[category] = [];
      }
      query[category].push(item);
    });

    let queryString = "";
    Object.entries(query).forEach(([category, items]) => {
      if (items.length) {
        queryString += `${queryString ? "&" : ""}${category}=${items.join(",")}`;
      }
    });

    return queryString;
  };

  const fetchFilters = async () => {

    if (router.query.marca) {
      removeQueryParam("marca");
      if (!selectedFilters.includes(`marca:${router.query.marca}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`marca:${router.query.marca}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "marca", value: router.query.marca };
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
          return newSelectedFilters;
        });
      }
    }

    if (router.query.tipo) {
      removeQueryParam("tipo");
      if (!selectedFilters.includes(`tipo_vehiculo:${router.query.tipo}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`tipo_vehiculo:${router.query.tipo}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "tipo_vehiculo", value: router.query.tipo };
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
          return newSelectedFilters;
        });
      }
    }

    if (router.query.year) {
      removeQueryParam("year");
      if (!selectedFilters.includes(`ano:${router.query.year}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`ano:${router.query.year}`);
          setSelectedChips((prevSelectedChips) => {
            const newChip = { category: "ano", value: router.query.year };
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
          return newSelectedFilters;
        });
      }
    }

    if (router.query.searchQuery) {
      removeQueryParam("searchQuery");
      if (!selectedFilters.includes(`search=${router.query.searchQuery}`)) {
        setSelectedFilters((prevSelectedFilters) => {
          const newSelectedFilters = [...prevSelectedFilters];
          newSelectedFilters.push(`search=${router.query.searchQuery}`);
          return newSelectedFilters;
        });
      }
    }

    console.log(selectedFilters);
    let queryString = buildQuery(selectedFilters);

    const response = await fetch(
      `http://localhost:3000/api/catalogoNuevo/filter?${queryString}`
    );

    const data = await response.json();

    setFilterHeaders(data.filterHeaders);
    setFilters(data.filters);
    setApiData(data);
    setCatalogData(data.result);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFilters();
    }
  }, [selectedFilters, router.isReady]);

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
        const filterIndex = newSelectedFilters.indexOf(`${category}:${item}`);
        if (filterIndex > -1) {
          newSelectedFilters.splice(filterIndex, 1);
        }
        setSelectedChips((prevSelectedChips) =>
          prevSelectedChips.filter(
            (chip) => chip.category !== category || chip.value !== item
          ));
      } else {
        // remove any existing filter for this category
        //newSelectedFilters.filter((f) => { !f.startsWith(`${category}=`) });


        // add the new filter if it's not null
        if (item) {

          newSelectedFilters.push(`${category}:${item}`);
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

  const handleUncheckAllFilters = () => {
    setSelectedFilters([]);
    setSelectedChips([]);
    setExpandedMenuItems({});
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

  const removeQueryParam = (param) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace(
      { pathname, query: params.toString() },
      undefined,
      { shallow: true }
    );
  };

  const handleNoSort = () => {
    setCatalogData(apiData.result);
  };

  const handleSortByAscPrice = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return a._source.precio - b._source.precio; // Sort in ascending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByDescPrice = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return b._source.precio - a._source.precio; // Sort in descending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByAscModel = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return a._source.modelo.localeCompare(b._source.modelo); // Sort in ascending order
    });
    setCatalogData(sortedData);
  };

  const handleSortByDescModel = () => {
    const sortedData = [...catalogData].sort((a, b) => {
      return b._source.modelo.localeCompare(a._source.modelo); // Sort in descending order
    });
    setCatalogData(sortedData);
  };

  const handleSelectedSortOption = (selectedOption) => {
    if (selectedOption === "price-asc") {
      handleSortByAscPrice();
    } else if (selectedOption === "price-des") {
      handleSortByDescPrice();
    } else if (selectedOption === "model-asc") {
      handleSortByAscModel();
    } else if (selectedOption === "model-des") {
      handleSortByDescModel();
    } else if (selectedOption === "restart") {
      handleNoSort();
    }
  };

  return (
    <>
      <BuyerLayout>
        <Grid container sx={
          {
            paddingLeft: "3%",
            paddingRight: "1%"
          }
        } >
          <Grid item xs={12} md={3} sm={4}>
            <div className={styles.filterContainer}>
              <div className={styles.filterHeader}>
                <div className={styles.filterTitle}>
                  <div className={styles.iconWrapper}>
                    <FilterListIcon className={styles.filterListIcon} />
                  </div>
                  <span>Filtros</span>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    variant="text"
                    onClick={handleUncheckAllFilters}
                    sx={{
                      textDecoration: "underline",
                      textAlign: "right",
                      justifyContent: "flex-end",
                    }}
                  >
                    Eliminar filtros
                  </Button>
                </div>
              </div>
              <div className={styles.filterBody}>
                {/* {selectedChips.map((chip, index) => (
                  <Chip
                    key={`${chip.category}-${chip.value}-${index}`}
                    label={`${filterHeaders[chip.category]}: ${chip.value}`}
                    onDelete={() =>
                      handleMenuItemClick(chip.category, chip.value)
                    }
                    color="primary"
                    sx={{
                      marginBottom: "0.2rem",
                      marginRight: "0.2rem",
                    }}
                    variant="outlined"
                    className={styles.filterChip}
                  />
                ))} */}
              </div>
              {filters && (
                <ul className={styles.filterList}>
                  {Object.entries(filters).map(([category, subMenuItems]) => (
                    <li key={category} className={styles.filterItem}>
                      <button
                        className={styles.filterButton}
                        onClick={() => handleMenuItemClick(category, null)}
                      >
                        <div >
                          {filterHeaders[category]}
                          <div className={styles.arrow}>
                            {expandedMenuItems[category]?.[null] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                          </div>
                        </div>
                      </button>
                      {expandedMenuItems[category]?.[null] &&
                        renderSubMenu(category, subMenuItems)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={9} sm={8}>
            {/*
                Pasar la función fetchSearch como prop al componente Searchbar
                // para que se ejecute cuando se presione el botón de búsqueda
              */}
            <Searchbar
              setState={setSelectedFilters}
            > </Searchbar>
            <div>
              <div className={styles.catalogHeader}>
                <span className="justify-content-start align-items-center">
                  <Typography color="text.secondary" sx={{
                    fontFamily: "Lato",
                  }}>
                    Mostrando&nbsp;
                    {
                      catalogData !== undefined ? Intl.NumberFormat().format(catalogData.length) : 0
                    }
                    &nbsp;resultados
                  </Typography>
                </span>
                <span className="d-flex align-items-center">
                  <span style={{
                    marginRight: "1rem"
                  }}>Ordenar por </span><SortCatalog handleSortOption={handleSelectedSortOption} />
                </span>
              </div>
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
                  <ApiDataDisplay apiData={catalogData} /> */}
                <CatalogPagination
                  catalogData={catalogData}
                  itemsPerPage={30}
                  // carCardType="drivingTest"
                  carCardType="catalog"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </BuyerLayout>
    </>
  );
};

