import { useState } from "react";

export default function SearchBar(props) {
  const [search, setInput] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting search ${search}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search By Category
        <input
          type="text"
          value={search}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
