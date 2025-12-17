import { Sidebar } from '../../components/layout';
import { EditableText } from '../../components/common';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import { CalendarProvider, useCalendarContext } from '../../contexts/CalendarContext';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import './Main.css';

function MainContent() {
  const { currentWorkspace, updateWorkspaceTitle, updateWorkspaceSubtitle } = useWorkspace();
  const { fullSelectedDate } = useCalendarContext();

  return (
    <div className="main-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-header">
          <EditableText
            value={currentWorkspace.title}
            onChange={updateWorkspaceTitle}
            className="page-title"
            placeholder="워크스페이스 이름"
          />
          <EditableText
            value={currentWorkspace.subtitle}
            onChange={updateWorkspaceSubtitle}
            className="page-subtitle"
            placeholder="부제목 추가"
          />
        </div>

        <div className="content-body">
          <Calendar />
          <TodoList selectedDate={fullSelectedDate} />
        </div>
      </main>
    </div>
  );
}

function Main() {
  return (
    <CalendarProvider>
      <MainContent />
    </CalendarProvider>
  );
}

export default Main;
