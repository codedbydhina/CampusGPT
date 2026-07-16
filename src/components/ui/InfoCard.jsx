function InfoCard({ title, children }) {

    return (

        <div className="info-card">

            <h2>{title}</h2>

            {children}

        </div>

    );

}

export default InfoCard;