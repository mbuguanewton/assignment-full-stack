import { Input } from "antd";
import React from "react";
import BuyerSelector from "./BuyerSelector";
import {Button} from 'antd'

export type SearchFilters = {
  query: string;
  buyer: string;
};

type Props = {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, onChange } = props;

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

  return (
    <div>
    <div style={{display: "flex", alignItems:"center", justifyContent:"space-between", gap: 10, marginBottom: 10}}>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <BuyerSelector onSelect={handleFilterChange} value={filters.buyer} /> 
    </div>
    {filters.buyer && <Button style={{ marginBottom: 10  }} onClick={()=> onChange({...filters, buyer: ""})}>Reset Filters</Button>}
    </div>
  );
}

export default RecordSearchFilters;
