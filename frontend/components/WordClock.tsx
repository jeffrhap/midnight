interface WordClockProps {
  highlightedWords?: string[];
  size?: "large" | "medium" | "small";
  dimmed?: boolean;
  pattern?: "default" | "0000";
  language?: "EN" | "NL";
}

// English clock layout
const CLOCK_ROWS_EN = [
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

// Dutch clock layout - exact grid from image
const CLOCK_ROWS_NL = [
  "HETEISGVIJF",      // Row 1: HET IS VIJF
  "TIENSWZVOOR",      // Row 2: TIEN VOOR
  "OVERMTKWART",      // Row 3: OVER KWART
  "HALFSPHOVER",      // Row 4: HALF OVER
  "VOORTHGEENS",      // Row 5: VOOR EEN
  "TWEEPVCDRIE",      // Row 6: TWEE DRIE
  "VIERVIJFZES",      // Row 7: VIER VIJF ZES
  "ZEVENONEGEN",      // Row 8: ZEVEN NEGEN
  "ACHTIENSELF",      // Row 9: ACHT TIEN ELF
  "TWAALFBFUUR",      // Row 10: TWAALF UUR
];

// English word positions
const WORD_POSITIONS_EN: Record<string, Array<{ row: number; start: number; end: number }>> = {
  IT: [{ row: 0, start: 0, end: 2 }],
  IS: [{ row: 0, start: 3, end: 5 }],
  MIDNIGHT: [{ row: 9, start: 0, end: 8 }],
  ELEVEN: [{ row: 7, start: 5, end: 11 }],
  EIGHT: [{ row: 7, start: 0, end: 5 }],
};

// Dutch word positions - based on the grid layout
// Words can appear in multiple places, so we store arrays of positions
const WORD_POSITIONS_NL: Record<string, Array<{ row: number; start: number; end: number }>> = {
  // Row 1
  HET: [{ row: 0, start: 0, end: 3 }],
  IS: [{ row: 0, start: 4, end: 6 }],
  VIJF: [
    { row: 0, start: 7, end: 11 }, // Row 1 (keeping first occurrence)
  ],
  // Row 2
  TIEN: [
    { row: 1, start: 0, end: 4 }, // Row 2
    { row: 8, start: 4, end: 8 }, // Row 9
  ],
  VOOR: [
    { row: 4, start: 0, end: 4 },  // Row 5 (removed first occurrence from row 2)
  ],
  // Row 3
  OVER: [
    { row: 2, start: 0, end: 4 }, // Row 3
    { row: 3, start: 7, end: 11 }, // Row 4
  ],
  KWART: [{ row: 2, start: 6, end: 11 }],
  // Row 4
  HALF: [{ row: 3, start: 0, end: 4 }],
  // Note: Row 4 has "HOVER" at positions 6-10, but we'll use "OVER" from row 2 or 3
  // Row 5
  EEN: [{ row: 4, start: 6, end: 9 }],
  // Row 6
  TWEE: [{ row: 5, start: 0, end: 4 }],
  DRIE: [{ row: 5, start: 7, end: 11 }],
  // Row 7
  VIER: [{ row: 6, start: 0, end: 4 }],
  ZES: [{ row: 6, start: 8, end: 11 }],
  // Row 8
  ZEVEN: [{ row: 7, start: 0, end: 5 }],
  NEGEN: [{ row: 7, start: 6, end: 11 }],
  // Row 9
  ACHT: [{ row: 8, start: 0, end: 4 }],
  ELF: [{ row: 8, start: 8, end: 11 }],
  // Row 10
  TWAALF: [{ row: 9, start: 0, end: 6 }],
  UUR: [{ row: 9, start: 8, end: 11 }],
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

export function WordClock({ highlightedWords = [], size = "large", dimmed = false, pattern = "default", language = "NL" }: WordClockProps) {
  const config = SIZE_CONFIG[size];
  
  // Calculate square cell size accounting for 11 columns and 10 rows
  // For square cells: cellSize should be the same for both dimensions
  // Width: 11 * cellSize + 10 * gap = gridWidth
  // Height: 10 * cellSize + 9 * gap = gridHeight
  // To make cells square, we calculate cellSize from the smaller dimension constraint
  const numCols = 11;
  const numRows = 10;
  const numGapsCols = numCols - 1;
  const numGapsRows = numRows - 1;
  
  // Calculate cell size that works for both dimensions (use the more restrictive one)
  const cellSizeFromWidth = (config.gridSize - numGapsCols * config.gap) / numCols;
  const cellSizeFromHeight = (config.gridSize - numGapsRows * config.gap) / numRows;
  const cellSize = Math.min(cellSizeFromWidth, cellSizeFromHeight);
  
  // Calculate actual grid dimensions with square cells
  const gridWidth = numCols * cellSize + numGapsCols * config.gap;
  const gridHeight = numRows * cellSize + numGapsRows * config.gap;
  
  // Select clock rows and word positions based on language
  const CLOCK_ROWS = language === "NL" ? CLOCK_ROWS_NL : CLOCK_ROWS_EN;
  const WORD_POSITIONS = language === "NL" ? WORD_POSITIONS_NL : WORD_POSITIONS_EN;

  // Build a set of highlighted positions for word-based highlighting
  const highlightedPositions = new Set<string>();

  if (pattern === "default") {
    highlightedWords.forEach((word) => {
      const positions = WORD_POSITIONS[word];
      if (positions) {
        // Handle both single position objects and arrays of positions
        const posArray = Array.isArray(positions) ? positions : [positions];
        posArray.forEach((pos) => {
          for (let i = pos.start; i < pos.end; i++) {
            highlightedPositions.add(`${pos.row}-${i}`);
          }
        });
      }
    });
  }

  return (
    <div
      className="bg-[var(--bg-card)] rounded border border-[var(--border-subtle)] flex items-center justify-center"
      style={{
        width: gridWidth + config.padding * 2,
        height: gridHeight + config.padding * 2,
        padding: config.padding,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(11, ${cellSize}px)`,
          gridTemplateRows: `repeat(10, ${cellSize}px)`,
          gap: config.gap,
          width: gridWidth,
          height: gridHeight,
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
