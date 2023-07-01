import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from './breadcrumb.module.scss'
import LoadingAPI from "../loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Breadcrumb() {
  const router = useRouter();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const paths = router.asPath.split('/')
    const breadcrumbList = [];
    while (paths.length > 0) {
      breadcrumbList.push({
        link: paths.join('/'),
        label: paths[paths.length - 1]
      })
      paths.pop();
    }
    breadcrumbList.pop();
    breadcrumbList.push({
      link : '/',
      label: <FontAwesomeIcon icon={faHome} />
    });
    setLinks(breadcrumbList.reverse())
  }, [router])

  if (links.length === 0) {
    return <LoadingAPI />
  }
  const lastLink = links.pop();
  return <nav className={style.breadcrumb}>
    <ul>
      {links.map((link, index) => 
        <li key={`crumb-${index}`}>
          <Link href={link.link}>{link.label} /</Link>
        </li>)}
        <li key={`crumb-last`}>
          <a>{lastLink.label}</a>
        </li>
    </ul>
  </nav>
}

export default Breadcrumb;