
import { useEffect, useState } from 'react';

const MatrixBackground = () => {
  const [columns, setColumns] = useState<Array<{ id: number; left: string; duration: string; delay: string; characters: string }>>([]);

  useEffect(() => {
    // Generate random characters for the matrix effect
    const generateRandomChars = () => {
      // Mélange de chiffres et symboles pour l'effet matrix
      const chars = "01010101010";
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    };

    // Create initial columns
    const createColumns = () => {
      const newColumns = [];
      const columnCount = Math.floor(window.innerWidth / 30); // Adjust spacing

      for (let i = 0; i < columnCount; i++) {
        newColumns.push({
          id: i,
          left: `${(i / columnCount) * 100}%`,
          duration: `${5 + Math.random() * 15}s`, // Random duration
          delay: `${Math.random() * 5}s`, // Random delay
          characters: generateRandomChars()
        });
      }
      
      setColumns(newColumns);
    };

    // Create columns on mount and window resize
    createColumns();
    
    const handleResize = () => {
      createColumns();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="matrix-animation-container">
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-column"
          style={{
            left: column.left,
            animationDuration: column.duration,
            animationDelay: column.delay
          }}
        >
          {column.characters}
        </div>
      ))}
    </div>
  );
};

export default MatrixBackground;
