const Footer = ({ setFile }) => {
  return (
    <footer className="footer">
      <div className="chooseFile">
        <button onClick={() => setFile("csv")}>Use CSV</button>
        <button onClick={() => setFile("json")}>Use JSON</button>
        <button onClick={() => setFile("api")}>Use API</button>
        {/* CHANGE TO API*/}
      </div>
      <h1>Wildfire Tracker</h1>
    </footer>
  );
};

export default Footer;
