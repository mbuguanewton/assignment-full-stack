export type SearchRecordsRequest = {
  textSearch?: string;
  filters: {
    buyer?: string
  }
  limit: number;
  offset: number;
};
export type BuyerRequest = {
  buyer?: string
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  buyer: {
    id: string;
    name: string;
  };
  value?: number
  stage: string
  closeDate?: string
  awardDate?: string
};

export type BuyerRecord = {
  id: string,
  name: string,
}

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

export type BuyerResponse = {
  buyers: BuyerRecord[]
}

class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
  async fetchBuyers(
    request: BuyerRequest
  ): Promise<BuyerResponse> {
    const response = await fetch("/api/buyers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
  
}

export default Api;
