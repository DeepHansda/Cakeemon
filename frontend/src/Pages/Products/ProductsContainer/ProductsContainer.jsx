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
import MainLayout from "../../../Layouts/MainLayout";

export default function ProductsContainer() {
  const { width } = useContext(ProjectContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({
    keyword: "",
    currentPage: 1,
    category: "",
    occasion: "",
    ratings: "",
    price:""
  });
  // getting search parameter form searchbar------------------------------
console.log(params)
  const { productsStates, isLoading, refetch } = useGetProductsClientQuery(
    params,
    {
      selectFromResult: ({ data, isLoading, refetch }) => ({
        productsStates: data ?? {
          products: [],
          productPerPage: 0,
          productsCount: 0,
        },
        isLoading,
        refetch,
      }),
    }
  );
  const { products, productPerPage, productsCount } = productsStates;

  var keywordParam = searchParams.get("keyword");
  useEffect(() => {
    setParams((prev) => ({ ...prev, keyword: keywordParam || "" }));
  }, [keywordParam]);

  var categoryParam = searchParams.get("category");
  useEffect(() => {
    setParams((prev) => ({ ...prev, category: categoryParam || "" }));
  }, [categoryParam]);

  var occasionParam = searchParams.get("occasion");
  useEffect(() => {
    setParams((prev) => ({ ...prev, occasion: occasionParam || "" }));
  }, [occasionParam]);

  const breakPo = () => {
    return width <= 600;
  };

  const handlePageChange = (event) => {
    setParams((prev) => ({ ...prev, currentPage: event }));
  };

  // useEffect(() => {
  //   refetch();
  // }, [keyword, currentPage, category, occasion]);

  return (
    <React.Fragment>
      <MainLayout>
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
                setParams={setParams}
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
                    activePage={params.currentPage}
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
      </MainLayout>
    </React.Fragment>
  );
}
