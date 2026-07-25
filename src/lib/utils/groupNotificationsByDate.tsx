import moment from "moment";


export const groupNotificationsByDate = (notifications: any[]) => {
  const groups = new Map<string, any[]>();

  notifications
    .sort(
      (a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    )
    .forEach((notification) => {
      const date = moment(notification.created_at);

      let label = '';

      if (date.isSame(moment(), 'day')) {
        label = 'Today';
      } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        label = 'Yesterday';
      } else if (date.isAfter(moment().subtract(7, 'days'))) {
        label = date.format('dddd');
      } else {
        label = date.format('MMMM D, YYYY');
      }

      if (!groups.has(label)) {
        groups.set(label, []);
      }

      groups.get(label)!.push(notification);
    });

  return Array.from(groups.entries()).map(([label, notifications]) => ({
    label,
    notifications,
  }));
};
