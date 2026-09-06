import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout({
  children,
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
  onAddTask,
  sidebarOpen,
  onSidebarToggle,
  onSidebarClose,
}) {
  const titles = {
    dashboard: 'Dashboard',
    tasks: 'All Tasks',
    completed: 'Completed Tasks',
    settings: 'Settings',
  };

  return (
    <div className="layout">
      <Sidebar
        activeView={activeView}
        onViewChange={onViewChange}
        isOpen={sidebarOpen}
        onClose={onSidebarClose}
      />
      <div className="layout-main">
        <Header
          title={titles[activeView] || 'Dashboard'}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onAddTask={onAddTask}
          onMenuToggle={onSidebarToggle}
        />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}
