"use client";
import DeputadoProfile from "@/components/deputado/profile";
import React from "react";

const DeputadoDetailsPageClient = ({info}) => {
  console.log(info)
  return <>
    <DeputadoProfile {...info} />
  </>
}
export default DeputadoDetailsPageClient;