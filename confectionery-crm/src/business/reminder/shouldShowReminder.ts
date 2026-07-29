export function shouldShowReminder(reminderDate: string): boolean {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const reminder = new Date(reminderDate);

  reminder.setHours(0, 0, 0, 0);

  const nextReminder = new Date(reminder);

  nextReminder.setFullYear(nextReminder.getFullYear() + 1);

  nextReminder.setDate(nextReminder.getDate() - 15);

  return today >= nextReminder;
}
