export default interface Event{
    id?: number;
    timestamp?: string;
    ownerId?: number;
    type?: string;
    userResponsible?: string;
    data?: any;
}