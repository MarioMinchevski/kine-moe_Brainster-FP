import { BrowserRouter as Router } from "react-router-dom";
import { ScreenResizeModal } from './Layout/ScreenResizeModal/ScreenResizeModal';
import { MainRouter } from './Routes/MainRouter';
// import { useUserLoggedInContext } from "./Context/UserLoggedInContext";
// import { useEffect } from "react";

function App() {
  return (
    <>
      <Router>
        <MainRouter />
        <ScreenResizeModal />
      </Router>
    </>
  )
}

export default App
