import React from 'react';

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
    return(
      <div className="modal">
          <h2>Planned Deliveries</h2>
          <ul>
              {plannedDeliveries.map(delivery => (
                  <li key={(delivery.id)}>
                      <strong>{delivery.name} - {delivery.description}</strong>
                      <ul>
                          {delivery.items.map((item) => (
                              <li key={item.id}>{item.label} (GTIN: {item.gtin})</li>
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