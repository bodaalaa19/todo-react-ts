import { memo, useMemo } from "react";
import type { Todo } from "../types/todo";
import "./DateSidebar.css";

interface DateSidebarProps {
  todos: Todo[];
  onSelectDate: (date: string | null) => void;
}

function formatDate(dateString: string) {
  if (!dateString) {
    return "📅 No date";
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "📅 Today";
  }

  if (date.toDateString() === tomorrow.toDateString()) {
    return "📅 Tomorrow";
  }

  return `📅 ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

const DateSidebar = memo(function DateSidebar({
  todos,
  onSelectDate,
}: DateSidebarProps) {
  const sortedGroupedDates = useMemo(() => {
    const groupedDates = todos.reduce(
      (acc, todo) => {
        acc[todo.date] = (acc[todo.date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(groupedDates).sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB),
    );
  }, [todos]);

  return (
    <div className="date-sidebar">
      <h3>Dates</h3>

      {/* Show all todos */}
      <div className="date-item" onClick={() => onSelectDate(null)}>
        <span>📋 All Tasks</span>
      </div>

      {sortedGroupedDates.map(([date, count]) => (
        <div
          className="date-item"
          key={date}
          onClick={() => onSelectDate(date)}
        >
          <span>{formatDate(date)}</span>
          <span>({count}) ▶</span>
        </div>
      ))}
    </div>
  );
});

export default DateSidebar;
