import { useEffect, useRef, useState } from "react";

import styles from "./Autocomplete.module.css";

interface AutocompleteProps<T> {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  value: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => Promise<T[]>;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  disabled?: boolean;
  minChars?: number;
}

export function Autocomplete<T>({
  label,
  placeholder,
  hint,
  error,
  value,
  onQueryChange,
  onSearch,
  getLabel,
  onSelect,
  disabled,
  minChars = 1,
}: AutocompleteProps<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  useEffect(() => {
    if (value.trim().length < minChars) {
      setResults([]);
      return;
    }
    const id = ++requestId.current;
    setLoading(true);
    const timer = setTimeout(() => {
      onSearch(value)
        .then((items) => {
          if (requestId.current === id) {
            setResults(items);
            setOpen(true);
          }
        })
        .finally(() => {
          if (requestId.current === id) setLoading(false);
        });
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, minChars]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.field} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrap}>
        <input
          className={[styles.input, error ? styles.inputError : ""].filter(Boolean).join(" ")}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {open && (results.length > 0 || loading) && (
          <ul className={styles.dropdown}>
            {loading && <li className={styles.status}>Поиск…</li>}
            {!loading &&
              results.map((item, i) => (
                <li
                  key={i}
                  className={styles.option}
                  onClick={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  {getLabel(item)}
                </li>
              ))}
          </ul>
        )}
      </div>
      {error ? (
        <span className={styles.errorText}>{error}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
}
