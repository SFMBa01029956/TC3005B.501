/*
Ana Paula Katsuda Zalce
Salvador Federico Milanes Braniff
Sebastián González Villacorta
18-04-2023

Catalogo de vehiculos, con sidebar de filtros
y searchbar que emplearía elastic search.
*/
import React, { useState, useEffect } from 'react';
import { Grid, Chip, Button } from '@mui/material';

import Searchbar from '@/components/ui/searchbar';
import LandingPageLayout from '@/components/landing_page_layout';

export default function Catalog() {
  const [filters, setFilters] = useState([]);

  const handleDelete = (index) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  useEffect(() => {
    const fetchFilters = async () => {
      const response = await fetch('http://localhost:3000/api/catalogo/buscar-autos');
      const data = await response.json();
      setFilters(data);
    };
    fetchFilters();
  }, []);

  return (
    <>
      <LandingPageLayout>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <div style={{ padding: '10px', borderRight: '1px solid lightgray', borderTop: '1px solid lightgray'}}>
              <Button>Aplicar filtros</Button>
              Agregar filtro
              {filters.map((filter, index) => (
                <Chip
                  key={index}
                  label={filter}
                  sx={{ marginRight: 1 }}
                  onDelete={() => handleDelete(index)}
                />
              ))}

            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Searchbar />
            <div style={{
              padding: '3%', 
              overflowY: 'scroll',
              maxHeight: '100vh',
            }}>
              {/* <CatalogGrid /> */}
            </div>
          </Grid>
        </Grid>
      </LandingPageLayout>
    </>
  );
}