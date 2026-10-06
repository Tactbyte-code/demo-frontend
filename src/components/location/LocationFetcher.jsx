"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { FaSpinner, FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";

// Added onLocationFetched prop
export default function LocationFetcher({ onLocationFetched }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressData, setAddressData] = useState(null);

    const fetchLocation = () => {
        setLoading(true);
        setError(null);
        setAddressData(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                try {
                    const response = await api.post("/location/reverse-geocode", { lat, lng });

                    if (response.status !== 200) {
                        throw new Error(`Backend error: ${response.statusText}`);
                    };

                    setAddressData(response.data);
                    
                    // Pass the data back to the parent page
                    if (onLocationFetched) {
                        onLocationFetched({
                            lat,
                            lng,
                            ...response.data
                        });
                    };

                } catch (err) {
                    setError(err.message || "Failed to fetch address.");
                } finally {
                    setLoading(false);
                }
            },
            (geoError) => {
                setLoading(false);
                switch (geoError.code) {
                    case geoError.PERMISSION_DENIED:
                        setError("Location permission denied.");
                        break;
                    case geoError.POSITION_UNAVAILABLE:
                        setError("Location unavailable.");
                        break;
                    case geoError.TIMEOUT:
                        setError("Location request timed out.");
                        break;
                    default:
                        setError("An unknown error occurred.");
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="inline-flex items-center bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-200 text-xs sm:text-sm font-medium transition-all">
            {loading && (
                <div className="flex items-center text-emerald-600 gap-2">
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Locating...</span>
                </div>
            )}

            {!loading && error && (
                <div className="flex items-center text-rose-600 gap-2" title={error}>
                    <FaExclamationCircle className="text-sm" />
                    <span>Location failed</span>
                </div>
            )}

            {!loading && !error && addressData && (
                <div className="flex items-center text-slate-700 gap-1">
                    <FaMapMarkerAlt className="text-emerald-600 text-sm" />
                    <span className="text-xs text-emerald-600 font-medium">{addressData.raw_address.quarter}, {addressData.raw_address.suburb}, {addressData.raw_address.state_district}</span>
                </div>
            )}
        </div>
    );
}