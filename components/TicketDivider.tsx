// The site's signature motif: a perforated ticket edge, used only at
// menu-category breaks and the Chaplin story spotlight — never decoratively.
export function TicketDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`ticket-edge h-3 bg-ink ${className}`}
    />
  );
}
