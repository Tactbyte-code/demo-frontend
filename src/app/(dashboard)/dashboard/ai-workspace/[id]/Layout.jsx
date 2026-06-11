export default function WorkspaceLayout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {children}
    </div>
  );
}