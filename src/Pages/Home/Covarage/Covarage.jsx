import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
const Covarage = () => {
    const covarageCenter = useLoaderData();
    const mapRef = useRef(null);
    console.log(covarageCenter);
    const position = [23.6850, 90.3563]

    // handle search
    const handleSearch=e=>{
        e.preventDefault();
        const location = e.target.search.value;
        const district = covarageCenter.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
        if(district){
            const cord = [district.latitude, district.longitude];
            // console.log(district, cord)
            mapRef.current.flyTo(cord, 12)
        }
        console.log("Clidked")
    }
    return (
        <div>
            <h2 className='text-5xl font-bold '>Our Covarage Area</h2>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Type here" className="input" name="search" />
                <button type='submit'>Submit</button>
            </form>

            <div className='w-full h-[800px]'>
                <MapContainer 
            center={position} 
            zoom={8} 
            scrollWheelZoom={false}
            className='w-full h-[800px]'
            ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    covarageCenter.map((center, index)=> <Marker key={index} position={[center.latitude, center.longitude]}>
                    <Popup>
                        <strong>{center.district}</strong> <br /> 
                        service area: {center.covered_area.join(", ")}
                    </Popup>
                </Marker>)
                }
            </MapContainer>
            </div>
        </div>
    );
};

export default Covarage;