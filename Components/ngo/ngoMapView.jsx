import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


export default function NGOMapView({ cases }) {
    const validCases = cases.filter(c => c.location?.latitude && c.location?.longitude);

    if (validCases.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No cases with valid locations to display on map.</div>;
    }

    const centerLat = validCases.reduce((sum, c) => sum + c.location.latitude, 0) / validCases.length;
    const centerLng = validCases.reduce((sum, c) => sum + c.location.longitude, 0) / validCases.length;

    return (
        <MapContainer center={[centerLat, centerLng]} zoom={10} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {validCases.map(caseItem => (
                <Marker key={caseItem.id} position={[caseItem.location.latitude, caseItem.location.longitude]}>
                    <Popup>
                        <div className="font-semibold">{caseItem.title}</div>
                        <p>{caseItem.location.address}</p>
                        <p>Status: <span className="font-medium">{caseItem.status.replace("_", " ")}</span></p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}