import { useEffect, useState } from "react";

function Square({ stats, box, onSquareClick }) {
  return (
    <button
      className={`square text-xs text-gray-900 ${
        stats.find((obj) => obj.row === box.iRow && obj.col === box.iCol)
          ? "bg-[red]"
          : ""
      }`}
      onClick={onSquareClick}
    >
      {box.value}
      {/* <i>{index}</i> */}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState([]);
  const [size, setSize] = useState("x10");
  const [turn, setTurn] = useState(false);
  const [statsWin, setStatsWin] = useState([]);

  const defineBlock = {
    x10: {
      w: "w-[240px]",
      h: "h-[240px]",
      n: Array.from({ length: 10 }, (_, iRow) => {
        return Array.from({ length: 10 }, (_, iCol) => {
          return { iRow: iRow, iCol: iCol, value: "" };
        });
      }),
    },
    x20: {
      w: "w-[480px]",
      h: "h-[480px]",
      n: Array.from({ length: 20 }, (_, iRow) => {
        return Array.from({ length: 20 }, (_, iCol) => {
          return { iRow: iRow, iCol: iCol, value: "" };
        });
      }),
    },
    x30: {
      w: "w-[720px]",
      h: "h-[720px]",
      n: Array.from({ length: 30 }, (_, iRow) => {
        return Array.from({ length: 30 }, (_, iCol) => {
          return { iRow: iRow, iCol: iCol, value: "" };
        });
      }),
    },
  };

  useEffect(() => {
    setSquares([...defineBlock[size]?.n]);
  }, []);

  const handleClick = (col) => {
    if (squares[col.iRow][col.iCol].value || statsWin?.length === 5) return;

    setSquares((prevData) => {
      const newGrid = [...prevData];
      if (!newGrid[col.iRow][col.iCol].value) {
        setTurn(!turn);
        newGrid[col.iRow][col.iCol].value = turn ? "X" : "O";
      }
      return newGrid;
    });

    if (
      checkWinner(col.iRow, col.iCol, 0, 1) ||
      checkWinner(col.iRow, col.iCol, 1, 0) ||
      checkWinner(col.iRow, col.iCol, 1, 1) ||
      checkWinner(col.iRow, col.iCol, 1, -1)
    ) {
      // alert(`Player ${turn ? "X" : "O"} wins!`);
    }
  };

  const handleChangeSize = (size) => {
    setSize(size);
    setSquares(defineBlock[size]?.n);
  };

  const checkWinner = (row, col, rowIncrement, colIncrement) => {
    const player = turn ? "X" : "O";
    const positions = [{ row: row, col: col }];
    let countToWin = 1;

    for (let i = -4; i <= 4; i++) {
      const newRow = row + i * rowIncrement;
      const newCol = col + i * colIncrement;

      if (!squares[newRow] || squares[newRow][newCol].value !== player) {
        // break;
      } else {
        countToWin += 1;
        positions.push({ row: newRow, col: newCol });
      }
    }

    if (positions.length === 5) {
      setStatsWin([...positions]);
    }
    return countToWin === 5;
  };

  const reset = () => {
    setSquares([...defineBlock[size]?.n]);
    setStatsWin([]);
    setTurn(false);
  };

  return (
    <>
      <div className="flex w-48 justify-between">
        <div
          onClick={() => handleChangeSize("x10")}
          className="cursor-pointer bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text font-bold text-lg"
        >
          10x10
        </div>
        <div
          onClick={() => handleChangeSize("x20")}
          className="cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-transparent bg-clip-text font-bold text-lg"
        >
          20x20
        </div>
        <div
          onClick={() => handleChangeSize("x30")}
          className="cursor-pointer bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-transparent bg-clip-text font-bold text-lg"
        >
          30x30
        </div>
      </div>
      <div className="cursor-pointer" onClick={reset}>
        Đánh lại
      </div>
      <div
        className={`flex flex-wrap overflow-hidden ${defineBlock[size]?.w}  ${defineBlock[size]?.h} transition-all duration-300 ease-in-out`}
      >
        {squares?.map((row, i) => {
          return row?.map((col, j) => (
            <Square
              key={i + "-" + j}
              box={col}
              onSquareClick={() => handleClick(col)}
              stats={statsWin}
            />
          ));
        })}
      </div>
    </>
  );
}

export default function CARO() {
  return (
    <>
      <div>đánh tí cờ</div>
      <Board />
    </>
  );
}
