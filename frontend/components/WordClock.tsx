interface WordClockProps {
  highlightedWords?: string[];
  size?: "large" | "medium" | "small";
  dimmed?: boolean;
  pattern?: "default" | "0000";
}

const CLOCK_ROWS = [
  "ITLISASTIME",
  "ACQUARTERDC",
  "TWENTYFIVEX",
  "HALFBTENFTO",
  "PASTERUNINE",
  "ONESIXTHREE",
  "FOURFIVEKWO",
  "EIGHTELEVEN",
  "SEVENTWELVE",
  "MIDNIGHTXXX",
];

// Define which letters to highlight for each word
const WORD_POSITIONS: Record<string, { row: number; start: number; end: number }> = {
  IT: { row: 0, start: 0, end: 2 },
  IS: { row: 0, start: 3, end: 5 },
  MIDNIGHT: { row: 9, start: 0, end: 8 },
  ELEVEN: { row: 7, start: 5, end: 11 },
  EIGHT: { row: 7, start: 0, end: 5 },
};

// Pattern for displaying "00:00" visually
// 1 = lit, 0 = dim
const ZERO_ZERO_PATTERN = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 0: empty
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0], // Row 1: top of first 00
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Row 2
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Row 3
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0], // Row 4: bottom of first 00
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 5: separator
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0], // Row 6: top of second 00
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Row 7
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // Row 8
  [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0], // Row 9: bottom of second 00
];

const SIZE_CONFIG = {
  large: { gridSize: 480, cellSize: 40, fontSize: 28, padding: 16, gap: 4 },
  medium: { gridSize: 352, cellSize: 28, fontSize: 20, padding: 16, gap: 3 },
  small: { gridSize: 264, cellSize: 22, fontSize: 14, padding: 12, gap: 2 },
};

export function WordClock({ highlightedWords = [], size = "large", dimmed = false, pattern = "default" }: WordClockProps) {
  const config = SIZE_CONFIG[size];

  // Build a set of highlighted positions for word-based highlighting
  const highlightedPositions = new Set<string>();

  if (pattern === "default") {
    highlightedWords.forEach((word) => {
      const pos = WORD_POSITIONS[word];
      if (pos) {
        for (let i = pos.start; i < pos.end; i++) {
          highlightedPositions.add(`${pos.row}-${i}`);
        }
      }
    });
  }

  return (
    <div
      className="bg-[var(--bg-card)] rounded border border-[var(--border-subtle)]"
      style={{
        width: config.gridSize + config.padding * 2,
        height: config.gridSize + config.padding * 2,
        padding: config.padding,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(11, ${config.cellSize}px)`,
          gridTemplateRows: `repeat(10, ${config.cellSize}px)`,
          gap: config.gap,
          width: config.gridSize,
          height: config.gridSize,
        }}
      >
        {CLOCK_ROWS.map((row, rowIndex) =>
          row.split("").map((letter, colIndex) => {
            let isHighlighted = false;

            if (pattern === "0000") {
              // Use the 00:00 pattern
              isHighlighted = ZERO_ZERO_PATTERN[rowIndex]?.[colIndex] === 1;
            } else {
              // Use word-based highlighting
              isHighlighted = highlightedPositions.has(`${rowIndex}-${colIndex}`);
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex items-center justify-center font-mono font-bold"
                style={{
                  fontSize: config.fontSize,
                  color: dimmed ? "var(--text-clock-dim)" : isHighlighted ? "var(--text-glow)" : "var(--text-clock-dim)",
                  textShadow: isHighlighted && !dimmed ? "0 0 12px rgba(255, 255, 255, 0.5)" : "none",
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
