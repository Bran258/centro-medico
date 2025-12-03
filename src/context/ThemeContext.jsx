import React, { createContext, useState, useEffect } from "react";
import { getAutoConfig } from "../utils/dateLogic";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState("");
  const [currentCampaign, setCurrentCampaign] = useState("default");
  const [isAutomatic, setIsAutomaticState] = useState(false);
  const [loading, setLoading] = useState(true);

  // ➜ usando .env
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTheme = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data) {
        setIsAutomaticState(data.isAutomatic);

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
    if (key === "isAutomatic") {
      setIsAutomaticState(value);
      if (value) runAutoMode();
    } else if (!isAutomatic) {
      if (key === "theme") applyTheme(value);
      if (key === "campaign") setCurrentCampaign(value);
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
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
