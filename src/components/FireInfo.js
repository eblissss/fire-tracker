const FireInfo = ({ fileType, info }) => {
  if (fileType === "json" || fileType === "api") {
    return (
      <div className="fire-info">
        <h2>Fire Location Info</h2>
        <ul>
          <li>
            ID: <strong>{info.id}</strong>
          </li>
          <li>
            Title: <strong>{info.title}</strong>
          </li>
        </ul>
      </div>
    );
  } else if (fileType === "csv") {
    return (
      <div className="fire-info">
        <h2>Fire Location Info</h2>
        <ul>
          <li>
            Brightness (K): <strong>{info.brightness}</strong>
          </li>
          <li>
            Fire Radiative Power (MW): <strong>{info.frp}</strong>
          </li>
        </ul>
      </div>
    );
  }
};

export default FireInfo;
