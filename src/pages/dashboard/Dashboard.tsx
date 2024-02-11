import { useState } from 'react';
import { Search } from '../../components/search/Search';
import './Dashboard.css'
import { Route, Routes, useNavigate } from 'react-router-dom';

export function Dashboard () {
    const navigate = useNavigate();

    const handleNavigate = (path:any) => {
        navigate(path);
    };

    const [activeFilter, setActiveFilter] = useState('Playlists'); // Establece el estado inicial como 'Playlists'

    const handleFilterClick = (filter:any) => {
        setActiveFilter(filter);
        // Aquí puedes realizar otras acciones relacionadas con el filtro seleccionado si es necesario
    };

    const logout = () => {
        window.localStorage.removeItem("token")
        window.location.reload();
    }

    return (
        <div className="content">
            <div className="menu">
                <section className="actions">
                    <div>
                        <span onClick={() => handleNavigate('/')}>Home</span>
                    </div>

                    <div>
                        <span onClick={() => handleNavigate('Search')}>Search</span>
                    </div>
                </section>

                <section className='library'> 

                    <span>Your library</span>

                    <div className='filters_l'>
                        <button
                            className={activeFilter === 'Playlists' ? 'active' : ''}
                            onClick={() => handleFilterClick('Playlists')}
                        >
                            Playlists
                        </button>
                        <button
                            className={activeFilter === 'Albums' ? 'active' : ''}
                            onClick={() => handleFilterClick('Albums')}
                        >
                            Albums
                        </button>
                    </div>

                    <div className='results_l'>

                    </div>
                </section>


            </div>

            <div className="results">
                <div>
                    <Routes>
                        <Route path="/Search" element={<Search />} />
                    </Routes>
                    <button
                        onClick={() => logout()}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}