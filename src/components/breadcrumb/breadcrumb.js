"use client";
import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import style from './breadcrumb.module.scss';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Breadcrumb() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter( path => path )
  const lastLink = pathNames.pop();
  return <nav className={style.breadcrumb}>
    <ul>
      <Link href="/"> <FontAwesomeIcon icon={faHome} /> / </Link>
      {pathNames.map((link, index) => 
        <li key={`crumb-${index}`}>
          <Link href={link}> {link} / </Link>
        </li>
      )}
      <li key={`crumb-last`}>
        <a>{lastLink}</a>
      </li>
    </ul>
  </nav>
}

export default Breadcrumb;