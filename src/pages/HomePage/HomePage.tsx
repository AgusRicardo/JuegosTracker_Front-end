import './homePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="homePage">
            <div className="navbar">
                <img
                    className="navbarLogo"
                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/gamepad-512.png"
                    alt="Juegos tracker"
                />
                <div className="navbarButtons">
                    <button onClick={() => navigate('/login')}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Iniciar sesión
                        </span>
                    </button>
                </div>
            </div>
            <div className="homePageOverlay"></div>
            <div className="homePageContent">
                <h1 className="homePageTitle">Todos tus juegos en un solo lugar</h1>
                <h2 className="homePageSubtitle">Todas tus plataformas, al alcance de tu mano</h2>
                <p className="homePageDescription">
                    Click en Jugar para comenzar tu aventura en Juegos Tracker
                </p>
                <div className="homePageForm">
                    <button onClick={() => navigate('/signUp')}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Jugar
                        </span>
                    </button>
                </div>
            </div>
            <footer className="footer">
                <a href="https://github.com/AgusRicardo/juegosTracker_Front-end" target="_blank" rel="noopener noreferrer" className="footerIcon">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png" alt="GitHub" />
                </a>
                <p className="footerText">MDW | Agustin Ricardo, Gisela Dieguez</p>
            </footer>
        </div>
    );
};

export default HomePage;
