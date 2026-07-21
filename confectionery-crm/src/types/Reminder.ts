export interface Reminder {
  id: string;
  orderId: string;
  reminderDate: string;
  description: string;
  isCompleted: boolean;
}
export type CreateReminderInput = Omit<Reminder, "id" | "orderId">;
