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
        password: string,
        profile: string,
        status: Status,
        type: string,
    }

    export enum Status
    {
        PENDING, ACTIVE, BLOCKED, PLACED, TERMINATED
    }
