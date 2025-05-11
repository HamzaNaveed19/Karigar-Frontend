import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Cache for address lookups
const addressCache = new Map();

const MapSelector = ({ onSelect }) => {
  const [status, setStatus] = useState("Detecting your location...");
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const selectedMarkerRef = useRef(null);

  useEffect(() => {
    let watchId;
    const cleanup = () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };

    const initMap = (coords) => {
      const map = L.map("address-map", {
        zoomControl: false,
        preferCanvas: true,
      }).setView([coords.lat, coords.lng], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Simple circle for user location
      L.circle([coords.lat, coords.lng], {
        radius: 10,
        color: "#3388ff",
        fillColor: "#3388ff",
        fillOpacity: 0.5,
      }).addTo(map);

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        setStatus("Looking up address...");

        // Remove previous marker if exists
        if (selectedMarkerRef.current) {
          map.removeLayer(selectedMarkerRef.current);
        }

        // Add new marker
        selectedMarkerRef.current = L.circleMarker([lat, lng], {
          radius: 8,
          color: "#10b981",
          fillColor: "#10b981",
          fillOpacity: 1,
        }).addTo(map);

        try {
          // Check cache first
          const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
          if (addressCache.has(cacheKey)) {
            const cachedData = addressCache.get(cacheKey);
            onSelect({
              city: cachedData.address?.city || cachedData.address?.town || "",
              state: cachedData.address?.state || "",
              country: cachedData.address?.country || "",
              latitude: lat,
              longitude: lng,
            }, { lat, lng });
            setStatus("Location selected");
            return;
          }

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          addressCache.set(cacheKey, data);

          onSelect({
            city: data.address?.city || data.address?.town || "",
            state: data.address?.state || "",
            country: data.address?.country || "",
            latitude: lat,
            longitude: lng,
          }, { lat, lng });

          setStatus("Location selected");
        } catch (error) {
          console.error("Error fetching address:", error);
          setError("Failed to fetch address. Please try again.");
          setStatus("Click to select location");
        }
      });

      mapRef.current = map;
      setStatus("Click to select location");
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          initMap({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          navigator.geolocation.clearWatch(watchId);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          // Fallback to default location
          setError("Couldn't get precise location. Using default.");
          initMap({ lat: 31.5204, lng: 74.3587 });
        },
        { enableHighAccuracy: false, maximumAge: 30000, timeout: 5000 }
      );
    } else {
      setError("Geolocation not supported. Using default location.");
      initMap({ lat: 31.5204, lng: 74.3587 });
    }

    return cleanup;
  }, [onSelect]);

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs shadow-sm z-10">
          {error}
        </div>
      )}
      <div id="address-map" style={{ height: "300px", width: "100%" }}></div>
      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs shadow-sm z-10">
        {status}
      </div>
    </div>
  );
};

export default MapSelector;