import React, { useState } from "react";
import Image from "next/image";
import { Edit, Delete } from "@/ui/CrudUi";

interface FormEntry {
  description: string;
  amount: number;
  type: "positive" | "negative";

}

interface expenseProps {
  totalAmount: number;
  income: number;
  expense: number;
  error: boolean;
  sno?: number;
}

interface TableCompProps {
  formEntries: FormEntry[];
  expense?: expenseProps;
  visible: boolean;
}

const TableComp: React.FC<TableCompProps> = ({
  formEntries,
  expense,
  visible,
}) => {
const[uniqueId, setuniqueId]=useState(0);

  return (
    <>
      {visible && (
        <div className="flex items-center justify-between mx-28">
          <div>
            <h1 className="text-green-700 text-[40px] font-semibold">INCOME</h1>
            <ul>
              {formEntries
                .filter((entry) => entry.type === "positive")
                .map((items, id) => (
                  <li key={id}>
                    <div className="h-12 w-96 rounded-lg shadow-lg flex items-center justify-between mb-4">
                      <div className="mx-3 w-[75%] flex justify-between">
                        <span>{id}</span>
                        <span>{items.description}</span>
                        <span>{items.amount}</span>
                      </div>
                      <div className="space-x-2 px-2">
                        <button
                          onClick={() => {
                            Edit({ id, formEntries });
                          }}
                        >
                          <Image
                            src="/icons8-edit.png"
                            alt="icon"
                            height={20}
                            width={20}
                          />
                        </button>
                        <button
                          onClick={() => {
                            Delete({ sno:id, formEntries });
                          }}
                        >
                          <Image
                            src="/icons8-delete.png"
                            alt="icon"
                            height={20}
                            width={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h1 className="text-red-600 text-[40px] font-semibold">EXPENSE</h1>
            <ul>
              {formEntries
                .filter((entry) => entry.type === "negative")
                .map((items, id: number) => (
                  <li key={id}>
                    <div className="h-12 w-96 rounded-lg shadow-lg flex items-center justify-between mb-4">
                      <div className="mx-3 w-[75%] flex justify-between">
                        <span>{id}</span>
                        <span>{items.description}</span>
                        <span>{items.amount}</span>
                      </div>
                      <div className="space-x-2 px-2">
                        <button
                          onClick={() => {
                            Edit({ sno:id, formEntries });
                          }}
                        >
                          <Image
                            src="/icons8-edit.png"
                            alt="icon"
                            height={20}
                            width={20}
                          />
                        </button>
                        <button
                          onClick={() => {
                            Delete({ sno:id, formEntries });
                          }}
                        >
                          <Image
                            src="/icons8-delete.png"
                            alt="icon"
                            height={20}
                            width={20}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TableComp;
