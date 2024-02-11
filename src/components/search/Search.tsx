import { useState } from 'react';
import './Search.css'
import axios from 'axios';

export function Search() {
    const token = window.localStorage.getItem('token');
    const url = "https://localhost:7093/api/search";

    const [items, setItems] = useState<any[]>([]);
    const [consult, setConsult] = useState('');
    const [type, setType] = useState('track');

    const buscar = async () => {
        try {
            const respuesta = await axios.get(`${url}/${consult}/${type}/${token}`);
            const data = JSON.parse(respuesta.data.data);
            setItems(data);
        } catch (error) {
            console.error('Error al buscar:', error);
        }
    }

    const filterOptions = [{name:'Songs',key:'track'},{name:'Artists',key:'artist'}, {name:'Albums',key:'album'}];
    const [activeFilter, setActiveFilter] = useState('track');
    const handleFilterClick = (filter:string) => {
        setType(filter)
        setActiveFilter(filter);
    };

    return (
        <div className='content_search'>
            <section className='conten_input'>
                <input type="text" onChange={(e) => {setConsult(e.target.value);}} placeholder='What do you want to listen to?' className='input_search'/>
                <button onClick={buscar} className='button_search'>Buscar</button>
            </section>

            <section className='filters_container'>
                <div className='filters'>
                    {filterOptions.map((option, index) => (
                        <button
                            key={index}
                            className={activeFilter === option.key ? 'active' : ''}
                            onClick={() => handleFilterClick(option.key)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </section>

            {
               consult ? <section className='result_search'>
                {
                    items.map( (item, i) => (
                        <div className="card" key={i}>
                            <img src={item?.image?.url} alt="" className='card-image' />
                            <div className="card-info">
                                <span>Nombre: {item?.name}</span>
                                { item.type == 'track' ? <span>Duración: {item?.duration_ms}</span> : "" }
                                { item.type == 'artist' ? <span>Seguidores: {item?.followers.total}</span> : "" }
                                { item.type == 'artist' ? <span>popularidad: {item?.popularity}</span> : "" }
                                { item.type == 'artist' ? <span>Tipo de música: {item?.genres?.join(', ')}</span> : "" }
                                { item.type == 'album' ? <span>Tipo de album: {item?.album_type}</span> : "" }
                                { item.type == 'album' ? <span>Total canciones: {item?.total_tracks}</span> : "" }
                                { item.type == 'album' ? <span>Fecha lanzamiento: {item?.release_date}</span> : "" }
                                { item.type == 'album' ? <span>Artistas: {item?.artist}</span> : "" }
                            </div>
                        </div>
                    ))
                }
                </section> : ""
            }
            
        </div>
    )
}