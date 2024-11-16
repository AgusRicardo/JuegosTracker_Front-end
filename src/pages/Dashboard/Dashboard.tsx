import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import SearchGame from "../../components/SearchGame/SearchGame";


const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");

  const handleMenuClick = (item: string) => {
    setSelectedMenuItem(item);
  };

  return (
    <>
      <div className="container-dashboard">
        <Navbar onMenuClick={handleMenuClick} />
        <section className="container-selected-page">
          {selectedMenuItem === "Add" && <SearchGame />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
