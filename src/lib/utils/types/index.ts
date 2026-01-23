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
      date_sold: string
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
    next_due_payment: string,
    property: {
      id: string,
      property_name: string,
      property_type: string,
      size: string,
      status: string,
      house_number: string,
      street_name: string,
      city_name: string,
      property_cost: string,
      state_name: string
    },
    instalment_details: {
      id: string,
      sale_price: string,
      first_deposit: string,
      payment_plan: string,
      status: string,
      total_paid: number,
      outstanding_balance: number,
      first_payment_date: string,
      next_instalment_date: string
    },
    payments: SoldPropertyPayment[]
}