import './Header.css'

export function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Sistema de registros</p>
        <h1>Doceria Hesel</h1>
      </div>

      <div className="app-header__status">
        <span className="app-header__status-dot" aria-hidden="true" />
        <span>Em desenvolvimento</span>
      </div>
    </header>
  )
}
