interface formData{
    description: string;
  amount: number;
  type: "positive" | "negative";
 

}

interface Props{

    formEntries?: formData[]
    sno:number;
    id:number;
}


export function Edit({formEntries,sno}:Props){
    // const{description}=formEntries?.[id];
    console.log("edit is clicked", sno)
    console.log("formEntries is clicked", formEntries?.[sno]?.description)
    return;
}

export function Delete({formEntries,sno}:Props){
    console.log("delete is clicked", sno,formEntries)
    return;
}