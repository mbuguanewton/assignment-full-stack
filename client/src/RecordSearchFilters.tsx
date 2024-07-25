import { Input } from "antd";
import React, { useMemo } from "react";
import BuyerSelector from "./BuyerSelector";
import { ProcurementRecord } from "./Api";

export type SearchFilters = {
  query: string;
  buyer: string;
};

type Props = {
  filters: SearchFilters;
  records: ProcurementRecord[]
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters,records, onChange } = props;

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleFilterChange = React.useCallback(
    (value: string) => {
      onChange({
        ...filters,
        buyer:value
      });
    },
    [onChange, filters]
  );

  const buyers = useMemo(()=>{
    if(!Array.isArray(records)) return []

    const allBuyers = records.map((record)=> ({
      value: record.buyer.name,
      label: record.buyer.name
    }))
    return allBuyers
  },[records])

  return (
    <div style={{display: "flex", alignItems:"center", justifyContent:"space-between", gap: 10, marginBottom: 10}}>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <BuyerSelector initialBuyers={buyers} onSelect={handleFilterChange} value={filters.buyer} /> 
    </div>
  );
}

export default RecordSearchFilters;
