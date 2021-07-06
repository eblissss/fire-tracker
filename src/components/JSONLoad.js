import { Vector } from "ol/source";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

/* Load/Retrieve data in JSON format in form of,
   https://eonet.sci.gsfc.nasa.gov/api/v2.1/events */
async function JSONLoader(fileLocation) {
  const vectorSource = new Vector();

  const response = await fetch(fileLocation);
  const { events } = await response.json();

  const fires = [];

  for (const event of events) {
    if (event.categories[0].id === 8) {
      const coords = fromLonLat(event.geometries[0].coordinates);

      fires.push(
        new Feature({
          id: event.id || 0,
          title: event.title || 0,
          link: event.link || 0,
          "Time seen": event.geometries[0].date || 0,
          geometry: new Point(coords),
        })
      );
    }
  }

  vectorSource.addFeatures(fires);

  return vectorSource;
}

export default JSONLoader;
