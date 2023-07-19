export const Layout = ({ children }) => {
  return (
    <div className="px-auto flex flex-col bg-background h-full min-h-screen p-5 gap-5">
      {children}
    </div>
  );
};
