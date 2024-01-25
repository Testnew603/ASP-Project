    // ---------------------------------STUDENT SECTION-----------------------------------------//
    export interface StudentDetails
    {
        id: number,
        firstName: string,
        lastName: string,
        birthDate: string,
        gender: string,
        email: string,
        address: string,
        mobile: string,
        qualification: string,
        documents: string,
        domainId: string,
        password: '',
        profile: string,
        status: Status,
        role: string,
    }

    export enum Status {    
        PENDING, ACTIVE, BLOCKED, PLACED, TERMINATED
    }

// ---------------------------------ADMIN SECTION-----------------------------------------//
    export interface Admin {
        email: string;
        role: string;
        status: string;        
    }

// ---------------------------------ADVISOR SECTION-----------------------------------------//
    export interface Advisor {
        id: number;
        firstName :string;
        lastName :string;
        birthDate :string;
        gender :string;
        email :string;
        mobile :string;
        qualification :string;
        password :string;
        profile :string;
        documents :string;
        domainId: number;
        status: StaffStatus;
        role: string;
    }  
    
// ---------------------------------HR MANAGER SECTION-----------------------------------------//
    export interface HRManager {
        id: number;
        firstName: string;
        lastName: string;
        birthDate: string;
        gender: string;
        email: string;
        mobile: string;
        qualification: string;
        password: string;
        profile: string;
        documents: string;
        status: StaffStatus;
        role: string;
    }

// ---------------------------------MANAGER SECTION-----------------------------------------//
    
    export interface Manager {
        id: number;
        firstName: string;
        lastName: string;
        birthDate: string;
        gender: string;
        email: string;
        mobile: string;
        qualification: string;
        password: string;
        profile: string;
        documents: string;
        status: StaffStatus;
        role: string;
    }

// ---------------------------------REVIEWER SECTION-----------------------------------------//

    export interface Reviewer {
       id: number;
       firstName: string;
       lastName: string;
       gender: string;
       email: string;
       mobile: string;
       password: string;
       profile: string;
       domainId: number;
       status: StaffStatus;
       role: string;
    }

// ---------------------------------TRAINER SECTION-----------------------------------------//

    export interface Trainer {
       id: number;
       firstName: string;
       lastName: string;
       gender: string;
       email: string;
       mobile: string;
       password: string;
       profile: string;
       specializedIn: SpecializedIn;
       status: StaffStatus;
       role: string;
    }

    // ---------------------------------PUBLIC SECTION-----------------------------------------//
    export interface TokenData {
        id: number;
        firstName: string;
        lastName: string;
        birthDate: string;
        email: string;
        status: StaffStatus
        role: string;
    }

    export interface ResponseMessages {
        statusCode: number;
        isSuccess: boolean;
        result: any;
      }

      export interface Domain {
        id: number;
        mainDomain: string;
        subDomain: string;
      }

    export enum StaffStatus{    
        PENDING, ACTIVE, RESIGNED, BLOCKED
    }

    export enum SpecializedIn {       
        ENGLISH, APTITUDE, REASONINGSKILL, GK, OTHERS
    }

