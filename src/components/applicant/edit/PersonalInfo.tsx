"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ApplicationLoading";
import  SuccessMessage  from "@/components/applicant/edit/ApplicationSuccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import useApplicantStore from "@/store/applicantStore";
import { Applicant } from "@/types/types";
import { uploadImageToCloudinary } from "@/lib/utils";

export default function PersonalInfo() {
  const [image, setImage] = useState<File | null>(null);

  const { applicant, setApplicant } = useApplicantStore();
  const [imageError, setImageError] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showImageUploadButton, setShowImageUploadButton] = useState(false);
  //   const [formData, setFormData] = useState({
  //     personalInfo: {},
  //     contactDetails: {},
  //     examCenter: {}
  //   })

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setApplicant({
      ...applicant,
      [e.target.name]: e.target.value,
    } as Applicant);
    console.log(applicant);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setShowImageUploadButton(true);
    // set applicant image to null to reset the image
    setApplicant({
      ...applicant,
      imageURL: "" as string,
    } as Applicant);
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        setImageError("Please upload a JPG or JPEG image.");
        return;
      }
      if (file.size > 1024 * 1024) {
        setImageError("Image size should be less than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(file);
          setImageError("");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      setApplicant({
        ...applicant,
        imageURL: "uploading" as string,
      } as Applicant);
      try {
        const url = await uploadImageToCloudinary(image);
        setApplicant({ ...applicant, imageURL: url } as Applicant);
        setShowImageUploadButton(false);
      } catch (error) {
        console.error("Failed to upload image", error);
        setImageError("Failed to upload image");
        setApplicant({
          ...applicant,
          imageURL: "" as string,
        } as Applicant);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/edit-application/contact-details");
  };

  const isFormValid = () => {
    return (
      applicant?.imageURL &&
      applicant?.name &&
      applicant?.alternativeNumber &&
      applicant?.aadharNumber &&
      applicant?.dob &&
      applicant?.guardiansName &&
      applicant?.fathersName &&
      applicant?.email
    );
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="image">Candidate's Image</Label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  {image || applicant?.imageURL ? (
                    <div className="w-full h-full object-cover">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : applicant?.imageURL
                            ? applicant.imageURL
                            : ""
                        }
                        alt="Candidate"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-[40%] left-6 flex items-center justify-center">
                        <span className="text-white text-sm bg-black bg-opacity-50 rounded-lg p-1">
                          {!applicant?.imageURL
                            ? "Not Uploaded"
                            : applicant?.imageURL === "uploading"
                            ? "Uploading..."
                            : applicant?.imageURL === ""
                            ? "Can't Upload"
                            : "Uploaded"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                  <Input
                    id="imageURL"
                    type="file"
                    onChange={handleImageSelect}
                    accept=".jpg,.jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Upload a JPG or JPEG image, max 1MB
                  </p>
                  {imageError && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {imageError}
                    </p>
                  )}

                  {(showImageUploadButton) &&
                    image && (
                      <Button
                        type="button"
                        onClick={handleImageUpload}
                        className="mt-2"
                        disabled={applicant?.imageURL === "uploading"}
                      >
                        Upload Image
                      </Button>
                    )}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={applicant?.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="alternativeNumber">Phone Number</Label>
              <Input
                id="alternativeNumber"
                name="alternativeNumber"
                value={applicant?.alternativeNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                name="aadharNumber"
                value={applicant?.aadharNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                // change Date to string
                // defaultValue={applicant?.dob.toString()}
                value={applicant?.dob?.getDate()}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="guardiansName">Guardian Name</Label>
              <Input
                id="guardiansName"
                name="guardiansName"
                value={applicant?.guardiansName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="fathersName">Father Name</Label>
              <Input
                id="fathersName"
                name="fathersName"
                value={applicant?.fathersName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={applicant?.email}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              className="relative left-[80%] md:left-[89%]"
              type="submit"
              disabled={!isFormValid()}
            >
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
