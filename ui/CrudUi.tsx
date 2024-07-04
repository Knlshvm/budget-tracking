interface formData {
  description: string;
  amount: number;
  type: "positive" | "negative";
}

interface Props {
  formEntries?: formData[];

  uniqueId: string[];
}

export function mappedValue({ formEntries = [], uniqueId }: Props) {
  const mappedEntries = uniqueId.map((id: any, index: any) => {
    return {
      id: id,
      entry: formEntries[index] || null,
    };
  });
  console.log("mappedValue", mappedEntries )
  console.log("uniqueId", uniqueId )
  console.log("formEntries", formEntries )

  return mappedEntries;
}



export function Edit({ formEntries, uniqueId }: Props) {
  const mappedEntries = mappedValue({ formEntries, uniqueId });
  let obj = mappedEntries.find((index) => {
    if(index.id===uniqueId?.[index.id]){
        return index.entry
    }
  });

  let result = obj ? obj.entry : null;
  console.log("particular entry", obj);
  return result;


}



export function Delete({ formEntries, uniqueId }: Props) {
    const mappedEntries = mappedValue({ formEntries, uniqueId });
    let obj = mappedEntries?.find((index) => {
      return uniqueId.includes(index.id);
    });
  
    let result = obj ? obj.entry : null;
    console.log("particular entry", result);
    return result;
}
