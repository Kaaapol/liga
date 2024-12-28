        // Funkcja do załadowania danych z Local Storage
        function loadTableData() {
            const tableData = JSON.parse(localStorage.getItem('tableData')) || {};
            const rows = document.querySelectorAll('#dataTable tr');

            rows.forEach((row, rowIndex) => {
                if (rowIndex === 0) return; // Pomijamy nagłówek
                const cells = row.querySelectorAll('td span');

                cells.forEach((cell, cellIndex) => {
                    const key = `${row.cells[0].textContent}_${cellIndex + 1}`;
                    if (tableData[key] !== undefined) {
                        cell.textContent = tableData[key];
                    }
                });
            });
        }

        // Funkcja do zwiększenia wartości i zapisania do Local Storage
        function increment(button, player, index) {
            const cell = button.previousElementSibling;
            const value = parseInt(cell.textContent) || 0;
            const newValue = value + 1;
            cell.textContent = newValue;

            updateLocalStorage(player, index, newValue);
        }

        // Funkcja do zmniejszenia wartości i zapisania do Local Storage
        function decrement(button, player, index) {
            const cell = button.nextElementSibling;
            const value = parseInt(cell.textContent) || 0;
            const newValue = value > 0 ? value - 1 : 0; // Nie pozwalamy na wartości ujemne
            cell.textContent = newValue;

            updateLocalStorage(player, index, newValue);
        }

        // Funkcja do aktualizacji Local Storage
        function updateLocalStorage(player, index, value) {
            const tableData = JSON.parse(localStorage.getItem('tableData')) || {};
            const key = `${player}_${index}`;
            tableData[key] = value;
            localStorage.setItem('tableData', JSON.stringify(tableData));
        }

        // Załaduj dane podczas startu strony
        document.addEventListener('DOMContentLoaded', loadTableData);