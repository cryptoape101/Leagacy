// import { EthProvider } from "./contexts/EthContext";
// import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from "./components/TopNavigation";
import MainContent from "./components/MainContent";
import CreateLeague from "./components/CreateLeague"; // import your new page component
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div id="App">
          <div className="container">
            <TopNavigation />
            <Routes>
              <Route path="/create-league" element={<CreateLeague />} />
              <Route path="/" element={<MainContent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
