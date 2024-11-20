import { Chip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ProjectContext } from "../../../App";
import { getProductsClient } from "../../../Redux/Actions/ProductsActions";
import { useGetProductsClientQuery } from "../../../Redux/slices/productsApiSlice";

import Product from "../Product";
import "../products.style.css";
import FilterDrawer from "./FilterDrawer";
import MetaData from "../../../Components/Utils/MetaData";
import Loading from "../../../Components/Utils/Loading";

export default function ProductsContainer() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { width } = useContext(ProjectContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = React.useState("");
  const [occasion, setOccasion] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const ratings = "";
  // getting search parameter form searchbar------------------------------

  var keywordParam = searchParams.get("keyword");
  useEffect(() => {
    setKeyword(keywordParam === null ? "" : keywordParam);
  }, [keywordParam]);

  var categoryParam = searchParams.get("category");
  useEffect(() => {
    setCategory(categoryParam === null ? "" : categoryParam);
  }, [categoryParam]);

  var occasionParam = searchParams.get("occasion");
  useEffect(() => {
    setOccasion(occasionParam === null ? "" : occasionParam);
  }, [occasionParam]);

  const breakPo = () => {
    return width <= 600;
  };

  const handlePageChange = (event) => {
    setCurrentPage(event);
  };

  // handling products------------------------------------------
  const {data:productsStates,isLoading} = useGetProductsClientQuery({keyword, currentPage, category, occasion})

  // useEffect(() => {
  //   useGetProductsClientQuery(
  //     (keyword, currentPage, category, occasion, ratings)
  //   );
  // }, [keyword, currentPage, category, occasion]);

  


  const products = productsStates?.products
  const productPerPage = productsStates?.productPerPage
  const productsCount = productsStates?.productsCount
  // filter events------------------------------------------------

  return (
    <React.Fragment>
      <MetaData title="Our Cakes" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="products-mainContainer">
            {/* filter box -------------------------------------------------*/}

            <FilterDrawer
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />

            {/* products box -------------------------------------------------*/}

            <div className="mainContainer-product-container">
              <div className="chip-container">
                {breakPo() && (
                  <Chip
                    label="Filter"
                    icon={<FiSettings />}
                    variant="outlined"
                    onClick={() => setOpenDrawer(true)}
                  />
                )}
              </div>
              {products.length != 0 ? (
                <div className="products-container">
                  {products.map((product, index) => {
                    return <Product product={product} key={index} />;
                  })}
                </div>
              ) : (
                <Container>
                  <Typography variant="h5">Products not Found !</Typography>
                </Container>
              )}

              <div className="products-container-pagination">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={productPerPage}
                  totalItemsCount={productsCount}
                  onChange={handlePageChange}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}
