import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import SearchGame from "../SearchGame/SearchGame";
import Steam from "../Steam/Steam";
import EpicGames from "../EpicGames/EpicGames";
import Xbox from "../Xbox/Xbox";
import PrimeGaming from "../PrimeGaming/PrimeGaming";
import Gog from "../Gog/Gog";
import Itch from "../Itch/Itch";


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
          {selectedMenuItem === "SearchGame" && <SearchGame />}
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
