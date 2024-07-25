import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
};

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: "Value",
        render: (record: ProcurementRecord)=> {
          let valueWithCurrency = "-"
          if(record.value){
            valueWithCurrency = new Intl.NumberFormat("en-GB", { style: 'currency', currency:"GBP", maximumFractionDigits:0}).format(record.value)
          }

          return valueWithCurrency
        }
      },
      {
        title: "Stage",
        render:(record: ProcurementRecord)=> {
          // do something here ...
          if(record.stage === "CONTRACT"){
            return `Awarded on ${new Date(record.awardDate).toDateString()}`
          }else {
            if(!record.closeDate) return "Open until -"

            // check if close date is in the future
            const close = new Date(record.closeDate)
            const today = new Date().getTime()

            if(close.getTime() > today){
              return `Open until ${close.toDateString()}`
            }
            return "Closed"
          }
        }
      }

    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
