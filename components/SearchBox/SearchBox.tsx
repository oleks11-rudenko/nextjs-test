import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (newSearchQuery: string) => void;
}

export default function SearchBox({ searchQuery, onSearchChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery}
      onChange={handleChange}
    />
  );
}
