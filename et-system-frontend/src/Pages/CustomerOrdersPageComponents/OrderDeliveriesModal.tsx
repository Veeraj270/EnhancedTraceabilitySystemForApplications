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

};


const OrderDeliveriesModal: React.FC<ModalProps> = ({plannedDeliveries, onConfirm, onCancel }) => {
    return(
      <div className="modal">
          <h2>Planned Deliveries</h2>
          <ul>
              {plannedDeliveries.map(delivery => (
                  <li key={(delivery.id)}>{delivery.name} - {delivery.description}</li>
              ))
              }
          </ul>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
      </div>
    );

}
export default OrderDeliveriesModal;