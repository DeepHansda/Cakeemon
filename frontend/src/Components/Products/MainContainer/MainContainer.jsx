import {
  
  Typography,
  
  Chip,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ProjectContext } from "../../../App";
import { getProductsClient } from "../../../Redux/Actions/ProductsActions";
import Footer from "../../Footer/Footer";
import ProductsContainer from "../ProductsContainer";
import "./mainContainer.css";
import Pagination from "react-js-pagination";
import Loading from "../../Utils/Loading";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import MetaData from "../../Utils/MetaData";
import FilterDrawer from "./FilterDrawer";

export default function MainContainer() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { width } = useContext(ProjectContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = React.useState("");
  const [occasion, setOccasion] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const ratings = ""
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

  useEffect(() => {
    dispatch(
      getProductsClient(keyword, currentPage, category, occasion, ratings)
    );
  }, [keyword, currentPage, category, occasion]);

  const productsStates = useSelector((state) => state.products);
  const {
    filteredProductsCount,
    loading,
    productPerPage,
    products,
    productsCount,
    error,
  } = productsStates;

  // filter events------------------------------------------------

  

  return (
    <React.Fragment>
      <MetaData title="Our Cakes" />

      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="products-mainContainer">
            {/* filter box -------------------------------------------------*/}

            <FilterDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>

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
                <ProductsContainer products={products} />
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
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}
