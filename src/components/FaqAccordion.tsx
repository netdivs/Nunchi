export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({
  items,
}: {
  items: readonly FaqItem[];
}) {
  return (
    <div className="nc-faq">
      {items.map((item) => (
        <details key={item.question} className="nc-faq-item">
          <summary className="nc-faq-question">
            <span>{item.question}</span>
            <span className="nc-faq-icon" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="nc-faq-answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
