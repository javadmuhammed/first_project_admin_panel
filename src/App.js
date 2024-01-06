import { Fragment, } from "react";
import RouterComponent from "./Components/Router/RouterComponent";
import { Provider } from "react-redux";
import AdminStore from "./Redux/Store";
import ImageModelContext from "./Context/ImageModelContext";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import $ from 'jquery'
import { useLocation } from "react-router-dom";

function App() {




  return (
    <Fragment>
      <ToastContainer />
      <Provider store={AdminStore}>
        <ImageModelContext>
          <RouterComponent />
        </ImageModelContext>
      </Provider>
    </Fragment>
  );
}

export default App;
