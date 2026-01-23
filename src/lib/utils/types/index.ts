interface Client {
    id: string;
    firstname: string;
    lastname: string;
}

interface SoldPropertyPayment {
    id: number;
    amount_sold: string | null;
    commission: string | null;
    date_sold: string | null;
    status: string;
    client: Client;
}


interface Payments {
    id: 130,
    amount_sold: null,
    amount: string,
    commission: string,
    payment_date: string | Date,
    status: "completed" | 'pending',
    type: "instalment" | 'sold' | 'available'
}


export interface SoldPropertyDetails {
    property: {
      id: string,
      property_name: string,
      property_type: string,
      size: string,
      house_number: string,
      street_name: string,
      city_name: string,
      state_name: string,
      property_cost: string,
      status: string
    },
    sale_info: {
      id: string,
      amount_sold: string,
      status: string,
      date_sold: string,
      comment: string
    },
    delivery_details: {
      allocation_status: string,
      documentation_status: string,
      handover_status: string,
      payment_status: string
    },
    client: {
      id: string,
      firstname: string,
      lastname: string,
      email: string,
      phone: string | null
    },
    payments: Payments[],
    totals: {
      total_paid: number,
      total_commission: number,
      total_payments: number
    }
}


export interface InstalmentPropertyDetails {
    property_sale_id: string,
    property: {
      id: string,
      property_name: string,
      property_type: string,
      size: string,
      location: string
    },
    client: {
      id: string,
      firstname: string,
      lastname: string,
      email: string,
      phone: string | null
    },
    sale_information: {
      sale_price: string,
      first_deposit: string,
      payment_plan: string,
      first_payment_date: string,
      next_instalment_date: string,
      status: string,
      comment: string | null,
      duration: string | null
    },
    duration_in_months: number,
    payment_details: {
      total_amount_paid: number,
      total_commissioned_earned: number,
      outstanding_balance: number,
      instalment_payments: {
          id: number,
          amount: string,
          payment_date: string,
          commission: string,
          type: string,
          status: string,
          schedule_id: string
        }[
      ]
    },
    last_instalment_payment: {
      id: number,
      amount: string,
      payment_date: string,
      commission: string
    },
    next_instalment_payment: {
      schedule_id: string,
      amount_due: string,
      due_date: string,
      status: string
    }
}