import "./PageHeader.css";

export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div className="page-header-info">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>

      {/* Aquí puedes pasar botones u otros elementos */}
      {children && <div className="page-header-actions">{children}</div>}
    </div>
  );
}
