// src/types/Settings.ts

export interface Settings {
  academicYear: string;
  admissionStartsAt: Date;
  admissionEndsAt: Date;
  resultsPublishingAt: Date;
  resultsEndingAt: Date;
  applicantDOBStarting: Date;
  applicantDOBEnding: Date;
  admissionMax: number;
  admissionMin: number;
  createdAt?: Date; // Optional since timestamps will be auto-generated
  updatedAt?: Date; // Optional since timestamps will be auto-generated
}

// src/types/MarkColumn.ts

export interface MarkColumn {
  name: string;
  maxMark: number;
  description: string;
  marks?: Mark[]; // Assuming marks are stored as references (ObjectIds) to the "Mark" model
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Mark.ts

export interface Mark {
  applicant: Applicant; // ObjectId as a string reference
  markColumn: MarkColumn; // ObjectId as a string reference
  mark: number;
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Institution.ts

export interface Institution {
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
  code: string;
  name: string;
  address: string;
  contact: number;
  active: boolean;
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Credential.ts

export enum Role {
  ADMIN = "admin",
  EXAM_CENTER = "exam_center",
}

export interface Credential {
  userName: string;
  password: string;
  role: Role;
  examCenter?: ExamCenter; // ObjectId as a string reference, optional if not populated
  createdAt?: Date; // Optional, auto-generated
  updatedAt?: Date; // Optional, auto-generated
}

// src/types/Applicant.ts

export interface Applicant {
  name: string;
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
  examCenter: ExamCenter; // ObjectId as string reference
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
