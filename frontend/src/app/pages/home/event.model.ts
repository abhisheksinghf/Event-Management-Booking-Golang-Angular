// event.model.ts (You can create a new file for the event model)
export interface Event {
  event_id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  ticket_price: number;
  total_tickets: number;
  available_tickets: number;
  organizer_id: number;
  image: string;  // Optionally add this if you are returning image URLs
}
