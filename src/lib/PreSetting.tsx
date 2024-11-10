import useApplicantStore from "@/store/applicantStore";
import useSettingsStore from "@/store/settingsStore";
import React, { useEffect } from "react";

const PreSetting = () => {
  const { getSettings } = useSettingsStore();
  const { getApplicant , setEditingApplicant } = useApplicantStore();

  useEffect(() => {
    getSettings();
    // if applicant in local storage, set it to the store
    const applicant = JSON.parse(localStorage.getItem("applicant") as string);
    if (applicant) {
      getApplicant(applicant._id);
    }
    const editingApplicant = JSON.parse(localStorage.getItem("applicant") as string);
    if (editingApplicant) {
      // make the editingApplicant.examCenter.name to editingApplicant.examCenter
      editingApplicant.examCenter = editingApplicant.examCenter._id;
      // make the editingApplicant.options the array of institution model to array of institution._id
      editingApplicant.options = editingApplicant.options.map((option: any) => option._id);
      setEditingApplicant(editingApplicant);
    }
  }, []);

  return null;
};

export default PreSetting;
