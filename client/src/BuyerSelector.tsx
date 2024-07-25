import React,{ useEffect, useState } from 'react'
import {Select} from 'antd'

type BuyerSelectorProps = {
    initialBuyers: any[],
    value: string,
    onSelect: (value: string)=> void
}

function BuyerSelector({ initialBuyers, onSelect, value }:BuyerSelectorProps) {
  const {buyers} = useBuyers(initialBuyers)
  return (
    <Select showSearch value={value} placeholder='Filter by buyer' optionFilterProp='label' options={buyers}  onChange={(value)=> onSelect(value)} style={{ maxWidth: 300, minWidth: 300}} /> 
  )
}

function useBuyers(initial: any[]){
    const [buyers, setBuyers] = useState(()=>initial ?? [])

    useEffect(()=>{
      if(initial.length > 0){
        setBuyers(initial)
      }
    },[initial])
    return {buyers}
}

export default BuyerSelector