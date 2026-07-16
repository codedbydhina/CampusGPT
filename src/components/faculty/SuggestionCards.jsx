const suggestions = [
    "Summarize uploaded notes",
    "Explain this topic",
    "Generate important questions",
    "Prepare for exams"
];

function SuggestionCards({ onSelect }) {
    return (
        <div className="suggestion-grid">
            {suggestions.map((suggestion) => (
                <button key={suggestion} className="suggestion-card" type="button" onClick={() => onSelect(suggestion)}>
                    {suggestion}
                </button>
            ))}
        </div>
    );
}

export default SuggestionCards;
