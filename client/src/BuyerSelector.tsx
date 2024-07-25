import React,{ useEffect, useState } from 'react'
import {Select} from 'antd'
import Api from './Api'

type BuyerSelectorProps = {
    initialBuyers: any[],
    value: string,
    onSelect: (value: string)=> void
}

function BuyerSelector({ initialBuyers, onSelect, value }:BuyerSelectorProps) {
  const {buyers} = useBuyers(initialBuyers, value)
  return (
    <Select showSearch value={value} placeholder='Filter by buyer' optionFilterProp='label' options={buyers}  onChange={(value)=> onSelect(value)} style={{ maxWidth: 300, minWidth: 300}} /> 
  )
}

function useBuyers(initial: any[], filter?: string){
    const [buyers, setBuyers] = useState(initial)

    useEffect(() => {
      void (async () => {
        const api = new Api();
        const response = await api.fetchBuyers({
          buyer: filter
        });
        setBuyers(response.buyers ?? [])
      })();
    }, [filter]);
    return {buyers}
}

export default BuyerSelector