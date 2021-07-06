import { Vector } from "ol/source";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

/* Load fire data from CSV file,
   specifically from VIIRS 375m / NOAA-20 accessible at
   https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-txt */
function CSVLoader(fileLocation) {
  const vectorSource = new Vector();

  const loader = new XMLHttpRequest();
  loader.open("GET", fileLocation);

  loader.onload = () => {
    const csv = loader.responseText;
    const fires = [];

    let prevIndex = csv.indexOf("\n") + 1;
    let currIndex = csv.indexOf("\n", prevIndex);

    while ((currIndex = csv.indexOf("\n", prevIndex)) !== -1) {
      const line = csv.substr(prevIndex, currIndex - prevIndex).split(",");

      prevIndex = currIndex + 1;

      const coords = fromLonLat([parseFloat(line[1]), parseFloat(line[0])]);

      fires.push(
        new Feature({
          brightness: parseFloat(line[2]) || 0,
          frp: parseFloat(line[11]) || 0,
          geometry: new Point(coords),
        })
      );
    }
    vectorSource.addFeatures(fires);
  };

  loader.send();

  return vectorSource;
}

export default CSVLoader;
