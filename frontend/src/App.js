import Header from './components/Header/header.js';
import AppRoutes from './AppRoutes.js';
import Footer from './components/Footer/footer.js';
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <AppRoutes />
            <ToastContainer />
          </div>
        </section>
      </main>
    </>
  )
}

export default App;