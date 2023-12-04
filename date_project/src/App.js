import { Container } from "@mui/material";
import "./App.css";
import Header from "./Component/Header/Header";
import Timeone from "./Component/Timezone/Timeone";

function App() {
  return (
    <div className="App">
      <Container maxWidth="1700px">
        <Header />
        <Timeone />
      </Container>
    </div>
  );
}

export default App;
