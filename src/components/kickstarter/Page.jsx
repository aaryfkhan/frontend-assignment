import React, { useEffect, useMemo, useState } from "react";
import "./Page.css";
import { TABLE_HEADER } from "../../constants";
import Pagination from "../pagination/Page";

export default function KickStart() {
  const [data, setData] = useState("");
  const [pageData, setPageData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    page: 0,
    items_per_page: 5,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ENDPOINT = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT);
        const jsonData = await response.json();
        setData(
          jsonData?.map((ele) => {
            let newObj = {};
            for (let key in ele) {
              if (TABLE_HEADER.some((tab) => tab.key === key)) {
                newObj = { ...newObj, [key]: ele[key] };
              }
            }
            return newObj;
          })
        );
        setPaginationData((p) => ({ ...p, total: jsonData?.length }));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setPageData(
      data.slice(
        paginationData.page * paginationData.items_per_page,
        paginationData.page * paginationData.items_per_page +
          paginationData.items_per_page
      )
    );
  }, [paginationData, data]);

  const renderRow = useMemo(
    () => (item, key) => {
      return (
        <tr key={key}>
          {TABLE_HEADER.map((ele) => (
            <td key={ele.key}>{item[ele.key]}</td>
          ))}
        </tr>
      );
    },
    []
  );

  return loading ? (
    <div role="status" aria-live="polite">
      Fetching data...
    </div>
  ) : error ? (
    <div role="alert">Failed to fetch data</div>
  ) : (
    <div className="container">
      <table role="table" aria-labelledby="table-title">
        <caption id="table-title">Kickstart Table</caption>
        <thead>
          <tr>
            {TABLE_HEADER.map((tab) => (
              <th key={tab.key} scope="col">
                {tab.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{pageData.map((item) => renderRow(item, item["s.no"]))}</tbody>
      </table>
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPaginationData}
      />
    </div>
  );
}
