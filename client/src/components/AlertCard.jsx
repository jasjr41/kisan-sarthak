function AlertCard({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getSeverity = (alert) => {
    const text = alert.toLowerCase();

    if (
      text.includes("storm") ||
      text.includes("extreme") ||
      text.includes("danger") ||
      text.includes("critical")
    ) {
      return {
        level: "Critical",
        icon: "🔴",
        className: "critical"
      };
    }

    if (
      text.includes("heavy") ||
      text.includes("high temperature") ||
      text.includes("strong wind") ||
      text.includes("heat")
    ) {
      return {
        level: "Warning",
        icon: "🟡",
        className: "warning"
      };
    }

    return {
      level: "Normal",
      icon: "🟢",
      className: "normal"
    };
  };

  return (
    <section className="alert-card">

      <div className="section-title">
        <span>⚠️</span>

        <div>
          <h2>Weather Alerts</h2>
          <p>Important conditions that may affect your farming activities</p>
        </div>
      </div>

      <div className="alert-list">

        {alerts.map((alert, index) => {

          const severity = getSeverity(alert);

          return (
            <div
              className={`alert-item ${severity.className}`}
              key={index}
            >

              <div className="alert-severity">
                <span>{severity.icon}</span>
                <strong>{severity.level}</strong>
              </div>

              <p>{alert}</p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default AlertCard;