import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
import TopNavigation from "./components/TopNavigation";
// import Footer from "./components/Footer";
import MainContent from "./components/MainContent";

function App() {
  // Placeholder wallet address, replace with actual logic
  const walletAddress = null; // Example: "0x123...456"

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <TopNavigation walletAddress={walletAddress} />
          <MainContent walletAddress={walletAddress} />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
