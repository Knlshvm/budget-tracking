"use client";
import React, { useState } from "react";
import Image from "next/image";

const ErorComp = ({ errorMsg }: any) => {
  const [visible, setVisibility] = useState<boolean>(false);
  function handleCancelClick() {
    setVisibility(!visible);
  }
  return visible ? null : (
    <div className="flex items-center justify-center space-x-5">
      <p className="text-red-600 font-semibold">{errorMsg ?? ""}</p>
      {errorMsg && (
        <Image
          src="/remove.png"
          height={20}
          width={20}
          alt="icon"
          onClick={handleCancelClick}
        />
      )}
    </div>
  );
};

export default ErorComp;
