import React, {useMemo} from 'react';

type ModalProps = {
    plannedDeliveries: PlannedDelivery[];
    onConfirm: () => void;
    onCancel: () => void;

}

type PlannedDelivery = {
    id: number;
    name: string;
    description: string;
    items: DeliveryItem[];

};

type DeliveryItem = {
    id: number;
    label: string;
    gtin: string;
}



const OrderDeliveriesModal: React.FC<ModalProps> = ({plannedDeliveries, onConfirm, onCancel }) => {

    const aggregatedDeliveryItems = useMemo(() => plannedDeliveries.map(delivery => {
        const labelCount = delivery.items.reduce((acc, item) => {
            acc[item.label] = (acc[item.label] || 0) + 1;
            return acc;
        }, {});

        const aggregatedItems = Object.entries(labelCount).map(([label, count]) => ({
            label,
            quantity: count,
        }));

        return {
            ...delivery,
            items: aggregatedItems,
        };
    }), [plannedDeliveries]);

    return(
      <div className="modal">
          <h2>Planned Deliveries</h2>
          <ul>
              {aggregatedDeliveryItems.map(delivery => (
                  <li key={(delivery.id)}>
                      <strong>{delivery.name} - {delivery.description}</strong>
                      <ul>
                          {delivery.items.map((item, index) => (
                              <li key={index}>{item.label} (Quantity: {item.quantity})</li>
                          ))}
                      </ul>
                  </li>
              ))
              }
          </ul>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
      </div>
    );

}
export default OrderDeliveriesModal;