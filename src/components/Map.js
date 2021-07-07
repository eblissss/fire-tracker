import { useRef, useState, useEffect } from "react";
import FireInfo from "./FireInfo";
import { Map as CreateMap } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { Icon, Style } from "ol/style";
import View from "ol/View";

// OL vector layer to update when new fileType requested
let vectorLayer = new VectorLayer({
  style: new Style({
    image: new Icon({
      scale: [0.3, 0.3],
      src: "/fire-tracker/assets/fire.svg",
    }),
  }),
});

// OL map with OSM tile layer and default view
const fireMap = new CreateMap({
  layers: [
    new TileLayer({
      source: new OSM(),
      zIndex: 0,
    }),
    vectorLayer,
  ],
  view: new View({
    center: fromLonLat([-122.87, 42.32]),
    zoom: 5,
  }),
});

const Map = ({ fireData, fileType }) => {
  const mapRef = useRef();
  const [fireInfo, setFireInfo] = useState(null);

  useEffect(() => {
    fireMap.setTarget(mapRef.current);

    return () => {
      fireMap.setTarget(undefined);
    };
  }, [mapRef]);

  // Update vector layer with new fire data
  useEffect(() => {
    vectorLayer.setSource(fireData);
  }, [fireData]);

  // Checking for click
  useEffect(() => {
    // Triggers way too much sometimes, this keeps page from freezing
    if (!fireInfo) {
      fireMap.on("click", function (e) {
        let feature = fireMap.forEachFeatureAtPixel(
          e.pixel,
          (feature) => feature
        );
        if (feature) {
          if (fileType === "json" || fileType === "api") {
            setFireInfo({
              id: feature.get("id"),
              title: feature.get("title"),
            });
          } else if (fileType === "csv") {
            setFireInfo({
              brightness: feature.get("brightness"),
              frp: feature.get("frp"),
            });
          }
        } else {
          setFireInfo(null);
        }
      });
    }
  });

  return (
    <div ref={mapRef} className="map">
      {fireInfo && <FireInfo info={fireInfo} fileType={fileType} />}
    </div>
  );
};

export default Map;
