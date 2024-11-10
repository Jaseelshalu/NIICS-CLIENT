import useSettingsStore from "@/store/settingsStore";
import React, { useEffect } from "react";

const PreSetting = () => {
  const { getSettings } = useSettingsStore();

  useEffect(() => {
    getSettings();
  }, []);

  return null;
};

export default PreSetting;
