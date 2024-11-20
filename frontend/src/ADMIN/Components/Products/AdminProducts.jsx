import {
    Box,
  } from "@mui/material";
  import '../../../Pages/Products/products.style.css'
  import React, { useContext, useEffect, useState } from "react";
  import {  useSelector } from "react-redux";
  import { getProductsClient } from "../../../Redux/Actions/ProductsActions";
  import ProductsContainer from "./ProductsContainer";
  import Pagination from "react-js-pagination";
  import Loading from "../../../Components/Utils/Loading";
  import { useSearchParams } from "react-router-dom";
import ProductsDrawer from "./ProductsDrawer";
import Toast from "../../../Components/Utils/Toast";
import { ProjectContext } from "../../../App";
import ProductsForm from "./ProductsForm";

  
  export default function AdminProducts() {
    const { dispatch,setOpenAlert } = useContext(ProjectContext);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [keyword, setKeyword] = useState("");
    const [searchParams] = useSearchParams();
    const [brand, setBrand] = useState("");
    const [ratings, setRatings] = useState("");
    const [category, setCategory] = useState("");
    // getting search parameter form searchbar------------------------------
  
    var keywordParam = searchParams.get("keyword");
    useEffect(() => {
      setKeyword(keywordParam === null ? "" : keywordParam);
    }, [keywordParam]);
  
    
    // handling products------------------------------------------
   
   
    useEffect(() => {
      dispatch(getProductsClient(keyword, currentPage,category, ratings, brand));
    }, [keyword, currentPage,category, ratings, brand]);
  
    const productsStates = useSelector((state) => state.products);
    const {
      filteredProductsCount,
      loading,
      productPerPage,
      products,
      productsCount,
      error,
    } = productsStates;
  
    console.log(products);

    useEffect(() => {
      if(error && error.success==false){
        setOpenAlert({open: true,message:error.message,success:false})
      }
    },[error]);
  
    // filter events------------------------------------------------
  
    const handlePageChange = (event) => {
      setCurrentPage(event);
    };
    
    
  
    return (
      <Box>
        {loading ? (
          <Loading />
        ) : (
          <div>
          <Toast/>
            <Box sx={{display: 'flex',}}>
              {/* filter box -------------------------------------------------*/}
  
                {/* Drawer sections */}
                <ProductsDrawer/>
  
              {/* products box -------------------------------------------------*/}
  
              <div className="mainContainer-product-container">
                
                <ProductsContainer products={products} />
  
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


              <div>
                <ProductsForm/>
              </div>
            </Box>
          </div>
        )}
      </Box>
    );
  }
  