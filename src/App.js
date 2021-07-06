import { useState, useEffect } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import CSVLoader from "./components/CSVLoad";
import JSONLoader from "./components/JSONLoad";

const App = () => {
  const [fileType, setFileType] = useState("json");
  const [fireData, setFireData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch fire data from CSV, JSON, or API
  useEffect(() => {
    const fetchFires = async () => {
      let response = null;
      setLoading(true);

      if (fileType === "csv") {
        response = await CSVLoader("/data/nasafiredata.csv");
      } else if (fileType === "json") {
        response = await JSONLoader("/data/nasafireevents.json");
      } else if (fileType === "api") {
        response = await JSONLoader(
          "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
        );
      }
      setFireData(response);
      setLoading(false);
    };

    fetchFires();
  }, [fileType]);

  return (
    <div>
      {!loading ? <Map fireData={fireData} fileType={fileType} /> : <Loader />}
      <Footer setFile={setFileType} />
    </div>
  );
};

export default App;
