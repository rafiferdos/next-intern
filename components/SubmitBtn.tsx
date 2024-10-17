"use client";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import React from "react";



const SubmitBtn = ({ text,isLoading }: { text: string ,isLoading:boolean}) => {

  return (
    <Button
      size="lg"
      radius="full"
      type="submit"
      disabled={isLoading}
      variant="bordered"
      color="primary"
    >
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};

export default SubmitBtn;