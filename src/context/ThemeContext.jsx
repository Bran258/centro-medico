// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getAutoConfig } from "../utils/dateLogic";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState("");
  const [currentCampaign, setCurrentCampaign] = useState("default");
  const [isAutomatic, setIsAutomaticState] = useState(false);
  const [loading, setLoading] = useState(true);

  // ➜ usando .env con fallback
  const API_URL =
    import.meta.env.VITE_API_URL_CAMPAÑA ||
    "https://centro-medico-backend.vercel.app/api/theme";

  const fetchTheme = async () => {
    // Si no hay URL, no sigas
    if (!API_URL) {
      console.error("API_URL no está definida");
      setLoading(false);
      return;
    }

    try {
      console.log("Llamando a:", API_URL);
      const response = await fetch(API_URL);

      const contentType = response.headers.get("content-type");
      const raw = await response.text();

      // Si NO es JSON, no intentes parsear
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Respuesta NO JSON desde API_URL:", raw);
        setLoading(false);
        return;
      }

      const data = JSON.parse(raw);
      console.log("DATA THEME:", data);

      if (data) {
        setIsAutomaticState(!!data.isAutomatic);

        if (data.isAutomatic) {
          runAutoMode();
        } else {
          applyTheme(data.activeTheme || "");
          setCurrentCampaign(data.activeCampaign || "default");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const runAutoMode = () => {
    const auto = getAutoConfig();
    applyTheme(auto.theme);
    setCurrentCampaign(auto.campaign);
  };

  const applyTheme = (theme) => {
    setCurrentThemeState(theme);
    document.body.className = theme || "";
  };

  const saveConfig = async (key, value) => {
    // Actualizamos estado en el front
    if (key === "isAutomatic") {
      setIsAutomaticState(value);
      if (value) runAutoMode();
    } else if (!isAutomatic) {
      if (key === "theme") applyTheme(value);
      if (key === "campaign") setCurrentCampaign(value);
    }

    if (!API_URL) {
      console.error("API_URL no está definida (saveConfig)");
      return;
    }

    try {
      console.log("Guardando config:", key, value);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });

      const contentType = res.headers.get("content-type");
      const text = await res.text();

      if (!contentType || !contentType.includes("application/json")) {
        console.error("Respuesta NO JSON en POST /api/theme:", text);
        return;
      }

      const data = JSON.parse(text);
      console.log("Respuesta POST /api/theme:", data);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentCampaign,
        isAutomatic,
        toggleAutomatic: (v) => saveConfig("isAutomatic", v),
        setCurrentTheme: (v) => !isAutomatic && saveConfig("theme", v),
        setCampaign: (v) => !isAutomatic && saveConfig("campaign", v),
        loading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

