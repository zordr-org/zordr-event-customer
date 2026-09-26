export function MockQrCode({
  value,
  large = false,
}: {
  value: string;
  large?: boolean;
}) {
  const cells = Array.from({ length: 121 }, (_, index) => {
    const row = Math.floor(index / 11);
    const column = index % 11;
    const finder = (startRow: number, startColumn: number) => {
      const inBox =
        row >= startRow &&
        row < startRow + 5 &&
        column >= startColumn &&
        column < startColumn + 5;
      if (!inBox) return false;
      const edge =
        row === startRow ||
        row === startRow + 4 ||
        column === startColumn ||
        column === startColumn + 4;
      return edge || (row === startRow + 2 && column === startColumn + 2);
    };
    const hash = value.charCodeAt(index % value.length) + index * 17;
    return finder(0, 0) || finder(0, 6) || finder(6, 0) || hash % 5 < 2;
  });

  return (
    <div
      className={`grid aspect-square ${large ? "w-[132px] gap-[2px] p-3" : "w-[70px] gap-px p-2"} rounded-lg bg-white`}
      aria-label="Ticket QR code"
      role="img"
    >
      {cells.map((filled, index) => (
        <span key={index} className={filled ? "bg-[#080808]" : "bg-white"} />
      ))}
    </div>
  );
}
