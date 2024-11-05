// src/types/Settings.ts

export interface Settings {
  _id: string;
  academicYear: string;
  admissionStartsAt: string;
  admissionEndsAt: string;
  resultsPublishingAt: string;
  resultsEndingAt: string;
  applicantDOBStarting: string;
  applicantDOBEnding: string;
  admissionMax: number;
  admissionMin: number;
  createdAt?: Date; // Optional since timestamps will be auto-generated
  updatedAt?: Date; // Optional since timestamps will be auto-generated
}

// src/types/MarkColumn.ts

export interface MarkColumn {
  _id: string;
  name: string;
  maxMark: number;
  description: string;
  marks?: Mark[]; // Assuming marks are stored as references (ObjectIds) to the "Mark" model
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Mark.ts

export interface Mark {
  _id: string;
  applicant: Applicant; // ObjectId as a string reference
  markColumn: MarkColumn; // ObjectId as a string reference
  mark: number;
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Institution.ts

export interface Institution {
  _id: string;
  code: string;
  name: string;
  address: string;
  contact: number;
  seatCount: number;
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/ExamCenter.ts

export interface ExamCenter {
  _id: string;
  code: string;
  name: string;
  address: string;
  contact: number;
  active: boolean;
  // createdAt?: Date; // Optional, auto-generated
  // updatedAt?: Date; // Optional, auto-generated
}

// src/types/Credential.ts

export enum Role {
  ADMIN = "admin",
  EXAM_CENTER = "exam_center",
}

export interface Credential {
  _id: string;
  userName: string;
  password: string;
  role: Role;
  examCenter?: ExamCenter; // ObjectId as a string reference, optional if not populated
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Applicant.ts

export interface Applicant {
  _id: string;
  name: string;
  applicationNumber: string;
  imageURL: string;
  dob: Date;
  fathersName: string;
  guardiansName: string;
  aadharNumber: string;
  state: string;
  district: string;
  village: string;
  postOffice: string;
  policeStation: string;
  pinCode: string;
  whatsapp: string;
  alternativeNumber: string;
  email: string;
  examCenter: ExamCenter; // ObjectId as a string reference
  options: Institution[]; // Array of ObjectId references to institutions
  aadharDocument: string;
  birthCertificate: string;
  institution: string;
  applied: boolean;
  appliedAt?: Date;
  accepted: boolean;
  acceptedAt?: Date;
  hallticketDownloaded: boolean;
  hallticketDownloadedAt?: Date;
  paid: boolean;
  paidAt?: Date;
  verified: boolean;
  verifiedAt?: Date;
  admitCardDownloaded: boolean;
  admitCardDownloadedAt?: Date;
  marks?: Mark[]; // Array of ObjectId references to marks
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}
