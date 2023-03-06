import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;
