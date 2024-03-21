//Note: Can add optional values to TypeScript interfaces

export interface Event {
    id: number;
    timestamp: number;
    ownerId: number;
    type: string;

    //Will need to include "data" in the future
}

