import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Formulario({ handleSubmit }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [prom, setProm] = useState(true);
  const [nov, setNov] = useState(false);

  const [errors, setErrors] = useState({
    name: { error: false, message: "Deben ser al menos 3 caracteres" },
    lastName: { error: false, message: "El apellido es obligatorio" },
    email: { error: false, message: "Debe ser un correo válido" },
  });

  // Validaciones
  function validarNombre(nombre) {
    setErrors((prev) => ({
      ...prev,
      name: {
        error: nombre.trim().length < 3,
        message: "Deben ser al menos 3 caracteres",
      },
    }));
  }

  function validarApellido(apellido) {
    setErrors((prev) => ({
      ...prev,
      lastName: {
        error: apellido.trim() === "",
        message: "El apellido es obligatorio",
      },
    }));
  }

  function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación básica de correo
    setErrors((prev) => ({
      ...prev,
      email: {
        error: !regex.test(correo),
        message: "Debe ser un correo válido",
      },
    }));
  }

  // Validar todos los campos antes de enviar
  function validarFormulario() {
    validarNombre(name);
    validarApellido(lastName);
    validarCorreo(email);

    // Verificar si hay algún error
    return !(
      errors.name.error ||
      errors.lastName.error ||
      errors.email.error ||
      name.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === ""
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!validarFormulario()) {
          alert("Por favor, completa todos los campos correctamente.");
          return;
        }
        handleSubmit({ name, lastName, email, prom, nov });
      }}
    >
      <TextField
        id="name"
        label="Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setName(e.target.value)}
        value={name}
        error={errors.name.error}
        helperText={errors.name.error ? errors.name.message : ""}
        onBlur={(e) => validarNombre(e.target.value)}
      />
      <TextField
        id="apellido"
        label="Apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={errors.lastName.error}
        helperText={errors.lastName.error ? errors.lastName.message : ""}
        onBlur={(e) => validarApellido(e.target.value)}
      />
      <TextField
        id="correo"
        label="Correo"
        variant="outlined"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email.error}
        helperText={errors.email.error ? errors.email.message : ""}
        onBlur={(e) => validarCorreo(e.target.value)}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={prom}
              onChange={(e) => setProm(e.target.checked)}
            />
          }
          label="Promociones"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={nov} onChange={(e) => setNov(e.target.checked)} />
          }
          label="Novedades"
        />
      </FormGroup>
      <Button variant="contained" color="success" type="submit">
        Registrarte
      </Button>
    </form>
  );
}

export default Formulario;
