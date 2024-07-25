import { useCallback, useEffect, useState } from 'react'
import {Select} from 'antd'
import Api, { BuyerRecord } from './Api'

type BuyerSelectorProps = {
    value: string,
    onSelect: (value: string)=> void
}


function BuyerSelector({ onSelect, value }:BuyerSelectorProps) {
  const [buyers, setBuyers] = useState<BuyerRecord[]>([])

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
    }, [getBuyers, value]);
  return (
    <Select showSearch value={value} placeholder='Filter by buyer' optionFilterProp='label' options={buyers}  onChange={(value)=> onSelect(value)} style={{ maxWidth: 300, minWidth: 300}} onSearch={async(val)=>{
      // add better debounce
      if(val.length < 3) return
      await getBuyers(val)
    }} /> 
  )
}

export default BuyerSelector