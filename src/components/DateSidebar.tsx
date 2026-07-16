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

  const date = new Date(dateString);

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

function DateSidebar({ todos, onSelectDate }: DateSidebarProps) {
  const groupedDates = todos.reduce(
    (acc, todo) => {
      acc[todo.date] = (acc[todo.date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="date-sidebar">
      <h3>Dates</h3>

      {/* Show all todos */}
      <div className="date-item" onClick={() => onSelectDate(null)}>
        <span>📋 All Tasks</span>
      </div>

      {Object.entries(groupedDates)
        .sort(([dateA], [dateB]) => {
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        })
        .map(([date, count]) => (
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
}

export default DateSidebar;
