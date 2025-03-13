export default function RepititionButton({ variant, cardId }) {
  return (
    <div class={variant} data-card-id={cardId}>
      <button id={`minus-${cardId}`}>
        <img src="/assets/minus-black.svg" alt="minus icon" />
      </button>
      <div>
        <p data-total-repititions="5" id={`number-${cardId}`}></p>
      </div>
      <button id={`plus-${cardId}`}>
        <img src="/assets/plus-black.svg" alt="plus icon" />
      </button>
    </div>
  );
}
