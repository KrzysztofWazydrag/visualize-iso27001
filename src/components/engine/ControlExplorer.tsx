import { useState } from "react";
import { Search, ArrowUpRight, ShieldCheck, Layers } from "lucide-react";
import { controls } from "@/data/controls";
import { cn } from "@/lib/utils";
interface Props {
  selected: string;
  onSelect: (id: string) => void;
}
export function ControlExplorer({ selected, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Organisational", "People", "Physical", "Technological"];
  const results = controls.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      `${c.id} ${c.title} ${c.purpose}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="control-explorer">
      <div className="explorer-intro">
        <span className="eyebrow">
          <Layers size={14} /> CONTROL REFERENCE SET
        </span>
        <h2>Protection has a purpose.</h2>
        <p>Explore how a control responds to a need, becomes an operational measure, and produces evidence.</p>
        <div className="reference-note">
          <ShieldCheck size={18} />
          <p>
            Annex A is a reference set. Necessary controls follow your context, obligations and risk treatment. This
            preview includes <strong>6 of 93 references</strong>.
          </p>
        </div>
      </div>
      <label className="search-box">
        <Search size={17} />
        <input
          type="search"
          aria-label="Search controls"
          placeholder="Search by control name or reference…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <span>{results.length}</span>
      </label>
      <div className="category-filters" aria-label="Filter controls by category">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={cn(category === c && "active")}
            onClick={() => {
              setCategory(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="control-table">
        <div className="table-heading">
          <span>CONTROL & PURPOSE</span>
          <span>CATEGORY</span>
        </div>
        {results.length ? (
          results.map((c) => (
            <button
              key={c.id}
              className={cn("control-row", selected === c.id && "selected")}
              aria-pressed={selected === c.id}
              onClick={() => {
                onSelect(c.id);
              }}
            >
              <span className="control-reference">{c.id}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.purpose}</p>
              </div>
              <span className="category-label">{c.category}</span>
              <ArrowUpRight size={17} />
            </button>
          ))
        ) : (
          <div className="empty-state">
            <Search size={24} />
            <h3>No matching controls</h3>
            <p>Try another phrase or select a different category.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      <p className="quiet-note">
        Sample coverage is intentionally limited. Additional controls use the same structured data and interface.
      </p>
    </div>
  );
}
