import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Upload from "./components/Upload";
import Playback from "./components/Playback";
import Playbacks from "./components/Playbacks";
import Instructions from "./components/Instructions";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const Home = () => (
  <div className="mx-auto font-poppins">
    <Header />
    <main className="mt-[120px] container max-w-5xl mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-center text-[#365486] mb-8">
        Upload Your Images
      </h1>
      <Upload />
      <Playback />
      <Instructions />
      <FAQ />
    </main>
    <Footer />
  </div>
);

// Playbacks
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Halaman Utama */}
        <Route
          path="/playbacks"
          element={
            <div className="font-poppins">
              <Header />
              <main className="mt-[120px]">
                <Playbacks /> {/* Halaman Playbacks dengan struktur sendiri */}
                <Footer />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
