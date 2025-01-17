// src/types/quotes.ts
export interface Quote {
    id: string;
    user_id: string;
    vehicle_details: {
      make: string;
      model: string;
      year: number;
      trim?: string;
    };
    status: 'pending' | 'active' | 'expired' | 'completed';
    created_at: string;
  }
  
  export interface DealerQuote {
    id: string;
    quote_id: string;
    dealer_id: string;
    price: number;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
  }
  
  export interface Deadline {
    id: string;
    quote_id: string;
    deadline_time: string;
    status: 'active' | 'expired';
  }
  
  export interface DealerProfile {
    id: string;
    user_id: string;
    dealership_name: string;
    contact_info: {
      email: string;
      phone: string;
      address: string;
    };
  }