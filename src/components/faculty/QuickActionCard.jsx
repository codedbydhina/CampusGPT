import { memo } from "react";

function QuickActionCard({ icon: Icon, title, description, buttonLabel, onClick }) {
    return (
        <button className="quick-action-card" type="button" onClick={onClick}>
            <div className="quick-action-card__icon">
                <Icon />
            </div>
            <div className="quick-action-card__content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <span className="quick-action-card__button">{buttonLabel}</span>
        </button>
    );
}

export default memo(QuickActionCard);
