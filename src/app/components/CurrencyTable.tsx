import { useState } from "react";
import styles from "./CurrencyTable.module.css";
import { CurrencyRow } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaUp,
  faSortAlphaDown,
  faSortNumericUp,
  faSortNumericDown,
} from "@fortawesome/free-solid-svg-icons";

interface CurrencyTableProps {
  data: CurrencyRow[];
}

const CurrencyTable = ({ data }: CurrencyTableProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof CurrencyRow | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  });

  const sortedData = (): CurrencyRow[] => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const valueA = typeof a[sortConfig.key!] === "number" ? a[sortConfig.key!] : String(a[sortConfig.key!]);
      const valueB = typeof b[sortConfig.key!] === "number" ? b[sortConfig.key!] : String(b[sortConfig.key!]);

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key: keyof CurrencyRow) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof CurrencyRow) => {
    if (sortConfig.key === key) {
      if (key === "currency") {
        return sortConfig.direction === "asc" ? (
          <FontAwesomeIcon icon={faSortAlphaUp} />
        ) : (
          <FontAwesomeIcon icon={faSortAlphaDown} />
        );
      } else {
        return sortConfig.direction === "asc" ? (
          <FontAwesomeIcon icon={faSortNumericUp} />
        ) : (
          <FontAwesomeIcon icon={faSortNumericDown} />
        );
      }
    }
    return null;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort("currency")} style={{ width: "40%" }}>
              Moeda {getSortIndicator("currency")}
            </th>
            <th onClick={() => requestSort("value")} style={{ width: "30%" }}>
              Valor (em BRL) {getSortIndicator("value")}
            </th>
            <th onClick={() => requestSort("time")} style={{ width: "30%" }}>
              Horário {getSortIndicator("time")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((row, index) => (
            <tr key={index}>
              <td>{row.currency}</td>
              <td>{Number(row.value).toFixed(2)}</td>
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;