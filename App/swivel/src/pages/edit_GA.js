import React, { useState } from 'react';
import { Button, TextField, FormHelperText } from '@mui/material';
import styles from '@/styles/edit_GA.module.css';

export default function EditGA() {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
  });
  const [formErrors, setFormErrors] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = {};
    let hasErrors = false;

    if (formValues.nombre.trim() === '') {
      errors.nombre = true;
      hasErrors = true;
    }

    if (formValues.apellido.trim() === '') {
      errors.apellido = true;
      hasErrors = true;
    }

    if (formValues.correo.trim() === '') {
      errors.correo = true;
      hasErrors = true;
    }

    if (formValues.telefono.trim() === '') {
      errors.telefono = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    // Clear form errors
    setFormErrors({});

    // Handle save logic here
    console.log('Form values:', formValues);
    // Upload form data
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancel');
  };

  return (
    <div>
      <h1>Editar Perfil</h1>

      <form>
        <div>
          <div>
            <h4>Nombre(s)</h4>
            <TextField
              className={styles.inputField}
              id="nombre"
              label="Nombre actual"
              variant="outlined"
              fullWidth
              value={formValues.nombre}
              onChange={handleChange}
              error={formErrors.nombre}
            />
            {formErrors.nombre && (
              <FormHelperText error={true}>Este campo es requerido</FormHelperText>
            )}
          </div>

          <div>
            <h4>Apellido(s)</h4>
            <TextField
              className={styles.inputField}
              id="apellido"
              label="Apellido actual"
              variant="outlined"
              fullWidth
              value={formValues.apellido}
              onChange={handleChange}
              error={formErrors.apellido}
            />
            {formErrors.apellido && (
              <FormHelperText error={true}>Este campo es requerido</FormHelperText>
            )}
          </div>
        </div>

        <div>
          <h4>Correo</h4>
          <TextField
            className={styles.inputField}
            id="correo"
            label="Correo actual"
            variant="outlined"
            fullWidth
            value={formValues.correo}
            onChange={handleChange}
            error={formErrors.correo}
          />
          {formErrors.correo && (
            <FormHelperText error={true}>Este campo es requerido</FormHelperText>
          )}
        </div>

        <div>
          <h4>Teléfono</h4>
          <TextField
            className={styles.inputField}
            id="telefono"
            label="Teléfono actual"
            variant="outlined"
            fullWidth
            value={formValues.telefono}
            onChange={handleChange}
            error={formErrors.telefono}
          />
          {formErrors.telefono && (
            <FormHelperText error={true}>Este campo es requerido</FormHelperText>
          )}
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disableElevation
            sx={{
              backgroundColor: '#F55C7A',
              fontFamily: 'lato',
              fontWeight: 'bold',
              ':hover': { backgroundColor: '#BABABA' },
            }}
            onClick={handleSave}
          >
            Guardar
          </Button>

          <Button
            variant="contained"
            className={styles.button}
            disableElevation
            sx={{
              backgroundColor: '#979797',
              fontFamily: 'lato',
              fontWeight: 'bold',
              ':hover': { backgroundColor: '#BABABA' },
            }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
