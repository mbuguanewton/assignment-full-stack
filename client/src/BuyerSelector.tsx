import React,{ useCallback, useEffect, useState } from 'react'
import {Select} from 'antd'
import Api from './Api'

type BuyerSelectorProps = {
    initialBuyers: any[],
    value: string,
    onSelect: (value: string)=> void
}

function BuyerSelector({ initialBuyers, onSelect, value }:BuyerSelectorProps) {
  const {buyers, getBuyers} = useBuyers(initialBuyers)
  return (
    <Select showSearch value={value} placeholder='Filter by buyer' optionFilterProp='label' options={buyers}  onChange={(value)=> onSelect(value)} style={{ maxWidth: 300, minWidth: 300}} onSearch={async(val)=>{
      // add better debounce
      if(val.length < 3) return
      await getBuyers(val)
    }} /> 
  )
}

function useBuyers(initial: any[]){
    const [buyers, setBuyers] = useState(initial)

    const getBuyers = useCallback(async(buyer?: string)=>{
      const api = new Api();
      const opts = { buyer:""}

      if(buyer){
        opts.buyer = buyer
      }
      const response = await api.fetchBuyers({...opts})
      setBuyers(response.buyers ?? [])
    },[])

    useEffect(() => {
      getBuyers()
    }, [getBuyers]);
    return {buyers, getBuyers}
}

export default BuyerSelector