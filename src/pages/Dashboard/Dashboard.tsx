import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar"
import './Dashboard.css';

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");

  const handleMenuClick = (item: string) => {
    setSelectedMenuItem(item);
  };

  return (
    <>
    <div className="container-dashboard">
      <Navbar onMenuClick={handleMenuClick} />
      <div>{selectedMenuItem}</div>
    </div>
    </>
  )
}

export default Dashboard