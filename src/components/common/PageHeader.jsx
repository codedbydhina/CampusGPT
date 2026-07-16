function PageHeader({ title, buttonText, onButtonClick }) {

    return (

        <div className="page-header">

            <h1>{title}</h1>

            {buttonText ? (
                <button
                    className="primary-btn"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            ) : null}

        </div>

    );

}

export default PageHeader;