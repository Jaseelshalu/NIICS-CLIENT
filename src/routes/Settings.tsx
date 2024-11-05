"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings } from "@/types/types";
import useSettingsStore from "@/store/settingsStore";
import { format } from "date-fns";

export default function AdminSettings() {
  const { isNull, errorMessage, getSettings, settings, updateSettings } =
    useSettingsStore();

  const [settingsState, setSettingsState] = useState<Settings>({
    _id: "",
    academicYear: "",
    admissionStartsAt: "",
    admissionEndsAt: "",
    resultsPublishingAt: "",
    resultsEndingAt: "",
    applicantDOBStarting: "",
    applicantDOBEnding: "",
    admissionMin: 0,
    admissionMax: 0,
  });

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    if (settings) {
      setSettingsState({
        _id: settings?._id,
        academicYear: settings?.academicYear,
        admissionStartsAt: format(
          new Date(
            new Date(settings?.admissionStartsAt as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd'T'HH:mm"
        ),
        admissionEndsAt: format(
          new Date(
            new Date(settings?.admissionEndsAt as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd'T'HH:mm"
        ),
        resultsPublishingAt: format(
          new Date(
            new Date(settings?.resultsPublishingAt as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd'T'HH:mm"
        ),
        resultsEndingAt: format(
          new Date(
            new Date(settings?.resultsEndingAt as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd'T'HH:mm"
        ),
        applicantDOBStarting: format(
          new Date(
            new Date(settings?.applicantDOBStarting as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd"
        ),
        applicantDOBEnding: format(
          new Date(
            new Date(settings?.applicantDOBEnding as string).getTime() -
              (5 * 60 + 30) * 60 * 1000
          ),
          "yyyy-MM-dd"
        ),
        admissionMin: settings?.admissionMin,
        admissionMax: settings?.admissionMax,
      } as Settings);
    }
  }, [settings]);

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting settings:", settingsState);
    updateSettings(settingsState);
  };

  return (
    <div className="w-full">
      {/* <Sidebar/> */}
      <div className="bg-gradient-to-br from-background to-secondary">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary">
            Admin Settings
          </CardTitle>
          <CardDescription>
            Manage admission and academic settings
          </CardDescription>
        </CardHeader>
        {settings === null && isNull === false && errorMessage === "" && (
          <CardContent>
            <div className="space-y-6 py-6">
              {/* Academic Year */}
              <div className="space-y-4">
                <LoadingLabel />
                <LoadingInput />
              </div>

              <Separator className="my-4" />

              {/* Admission Period */}
              <LoadingSection />

              <Separator className="my-4" />

              {/* Results Period */}
              <LoadingSection />

              <Separator className="my-4" />

              {/* DOB Range */}
              <LoadingSection />

              <Separator className="my-4" />

              {/* Institution Limits */}
              <LoadingSection />

              {/* Submit Button */}
              <div className="w-full h-10 bg-muted/50 animate-pulse rounded-md mt-6" />
            </div>
          </CardContent>
        )}
        {
          // Error Message
          errorMessage && (
            <CardContent>
              <div className="space-y-6 py-6">
                <div className="text-center text-lg font-semibold text-red-500">
                  {errorMessage}
                </div>
              </div>
            </CardContent>
          )
        }
        {isNull && (
          <CardContent>
            <div className="space-y-6 py-6">
              <div className="text-center text-lg font-semibold text-red-500">
                Settings not found
              </div>
            </div>
          </CardContent>
        )}
        {settings !== null && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="academicYear" className="text-lg font-semibold">
                  Academic Year
                </Label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  value={settingsState?.academicYear}
                  onChange={handleSettingsChange}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Admission Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admissionStartsAt">Starts At</Label>
                    <Input
                      id="admissionStartsAt"
                      name="admissionStartsAt"
                      type="datetime-local"
                      value={settingsState?.admissionStartsAt}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionEndsAt">Ends At</Label>
                    <Input
                      id="admissionEndsAt"
                      name="admissionEndsAt"
                      type="datetime-local"
                      value={settingsState?.admissionEndsAt}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resultsPublishingAt">Publishing At</Label>
                    <Input
                      id="resultsPublishingAt"
                      name="resultsPublishingAt"
                      type="datetime-local"
                      value={settingsState?.resultsPublishingAt}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resultsEndingAt">Ending At</Label>
                    <Input
                      id="resultsEndingAt"
                      name="resultsEndingAt"
                      type="datetime-local"
                      value={settingsState?.resultsEndingAt}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Applicant Date of Birth Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicantDOBStarting">Starting</Label>
                    <Input
                      id="applicantDOBStarting"
                      name="applicantDOBStarting"
                      type="date"
                      value={settingsState?.applicantDOBStarting}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicantDOBEnding">Ending</Label>
                    <Input
                      id="applicantDOBEnding"
                      name="applicantDOBEnding"
                      type="date"
                      value={settingsState?.applicantDOBEnding}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Institution Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admissionMin">Minimum</Label>
                    <Input
                      id="admissionMin"
                      name="admissionMin"
                      type="number"
                      value={settingsState?.admissionMin}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionMax">Maximum</Label>
                    <Input
                      id="admissionMax"
                      name="admissionMax"
                      type="number"
                      value={settingsState?.admissionMax}
                      onChange={handleSettingsChange}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                Save Changes
              </Button>
            </form>
          </CardContent>
        )}
      </div>
    </div>
  );
}

const LoadingInput = () => (
  <div className="h-10 bg-primary/15 animate-pulse rounded-md" />
);

const LoadingLabel = () => (
  <div className="h-5 w-32 bg-primary/15 animate-pulse rounded-md" />
);

const LoadingSection = ({ inputs = 2 }) => (
  <div className="space-y-4">
    <div className="h-6 w-48 bg-primary/15 animate-pulse rounded-md" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(inputs)].map((_, i) => (
        <div key={i} className="space-y-2">
          <LoadingLabel />
          <LoadingInput />
        </div>
      ))}
    </div>
  </div>
);
