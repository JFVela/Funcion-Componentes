import Formulario from "./components/Formulario";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function App() {
  const handleSubmit = (valores) => {
    console.log("APPJS: ", valores);
  };

  return (
    <Container component="section" maxWidth="sm">
      <Typography variant="h3" align="center" component="section">
        Formualrio Registro
      </Typography>
      <Formulario handleSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
