import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./dashboard.css";
import Steam from "../Steam/Steam";
import EpicGames from "../EpicGames/EpicGames";
import Xbox from "../Xbox/Xbox";
import PrimeGaming from "../PrimeGaming/PrimeGaming";
import Gog from "../Gog/Gog";
import Itch from "../Itch/Itch";
import Home from "../Home/Home";


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
          {selectedMenuItem === "Home" && <Home />}
          {selectedMenuItem === "Steam" && <Steam />}
          {selectedMenuItem === "Epic Games" && <EpicGames />}
          {selectedMenuItem === "Xbox" && <Xbox />}
          {selectedMenuItem === "Prime Gaming" && <PrimeGaming />}
          {selectedMenuItem === "Gog" && <Gog />}
          {selectedMenuItem === "Itch" && <Itch />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
