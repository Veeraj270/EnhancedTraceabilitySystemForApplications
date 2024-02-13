import DeliveryItem from "./DeliveryItem";

export interface PlannedDelivery{
    id: number,
    name: string,
    deliveryTime: string,
    description: string,
    items: DeliveryItem[],
    deliveryInterval?: string,
}