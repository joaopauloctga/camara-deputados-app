import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";


function GoToLink({label, link}) {
  return <Link className="text-sm uppercase px-2 py-1 rounded-sm bg-4 hover:underline cursor-pointer m-2" href={link}>{label} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </Link>
}

export default GoToLink;