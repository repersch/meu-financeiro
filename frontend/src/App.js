import Header from './components/Header/header.js';
import AppRoutes from './AppRoutes.js';
import Footer from './components/Footer/footer.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <AppRoutes />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App;