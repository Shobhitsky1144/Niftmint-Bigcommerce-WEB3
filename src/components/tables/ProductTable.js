import React, { useRef, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit } from "react-icons/fa";
import DashboardPopup from "../dialog modal/admin-popup/DashboardPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomizedSwitches from "../toggle-switch/Switch";
import CustomSwitch from "../toggle-switch/CustomSwitch";
import { API_BASE_URL, API_ROUTES } from "../../constants/ApiBaseUrl";

import { toast } from "react-toastify";
import Axios from "axios";
import swal from "sweetalert";
import { allCollectionData } from "../../redux/actions/collectionAction";

export default function ProductTable({
  labels,
  rows,
  nftData,
  setEditCollection,
  setShow,
  setGetCollection,
  collectionTable,
  setGetNft,
  setEditNft,
  setDeleteState,
  setDeleteCollection,
}) {
  const brandId = useSelector((state) => state.BrandReducer.currentUser.id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showToken, setShowToken] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const changeVisibility = async (collectionId, status) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to change this Collection Visibility?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Go Back", "Yes"],
    }).then(async (visible_status) => {
      if (visible_status) {
        try {
          const res = await Axios.put(
            `${API_BASE_URL}${API_ROUTES.COLLECTION.COLLECTION_VISIBLITY}${collectionId}/${status}`
          );

          toast(res.data.message);

          dispatch(allCollectionData(brandId));
          swal(`Your Collection Visibility has been Changed!`, {
            icon: "success",
          });
        } catch (error) {
          toast.error(error.response.data.details);
        }
      } else {
      }
    });
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {labels.map((labels) => (
                <TableCell
                  key={labels.id}
                  align={labels.align}
                  style={{ minWidth: labels.minWidth }}
                  className="font-weight-bold"
                >
                  {labels}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map(
              (
                {
                  id,
                  image_url,
                  name,
                  categories,
                  blockchain,
                  op,
                  cat,
                  size,
                  collectionName,
                  sku,
                  price,
                  supply,
                  status,
                  is_visible,
                  // isnftMinted,
                  nftMinted,
                },
                ind
              ) => {
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                return (
                  <>
                    {collectionTable ? (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={id}
                          onClick={() => navigate(`/collection-info/${id}`)}
                          className="cursor-pointer"
                        >
                          <TableCell align={labels.align}>
                            <img
                              src={image_url}
                              width={56}
                              height={56}
                              style={{ objectFit: "cover" }}
                              className=" mr-2"
                            />
                            {name && name}
                          </TableCell>
                          {/* <TableCell align={labels.align}>
                            {size && size}
                          </TableCell> */}
                          <TableCell align={labels.align}>
                            {categories && categories.join(",")}
                          </TableCell>
                          <TableCell align={labels.align}>
                            {blockchain && blockchain}
                          </TableCell>
                          <TableCell
                            align={labels.align}
                            // onClick={(e) => e.stopPropagation()}
                          >
                            {/* <CustomSwitch
                              is_visible={is_visible}
                              collectionId={id}
                              changeVisibility={changeVisibility}
                            /> */}
                            {is_visible ? "Enabled" : "Disabled"}
                          </TableCell>
                          <TableCell
                            align={labels.align}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {FaEdit && (
                              <DashboardPopup
                                setShow={setShow}
                                setEditCollection={setEditCollection}
                                setGetCollection={setGetCollection}
                                collectionTable={collectionTable}
                                id={id}
                                setDeleteCollection={setDeleteCollection}
                                is_visible={is_visible}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={id}
                          onClick={() => navigate(`/nft-info/${id}`)}
                          className="cursor-pointer"
                        >
                          <TableCell align={labels.align}>
                            <img
                              src={image_url}
                              width={56}
                              height={56}
                              style={{ objectFit: "cover" }}
                              className=" mr-2"
                            />
                            {name && name}
                          </TableCell>
                          {/* <TableCell align={labels.align}>{sku && sku}</TableCell> */}
                          <TableCell align={labels.align}>
                            {supply && supply}
                          </TableCell>

                          <TableCell align={labels.align}>
                            ${price && price}
                          </TableCell>
                          <TableCell align={labels.align}>
                            {collectionName && collectionName}
                          </TableCell>
                          <TableCell align={labels.align}>
                            {nftMinted && nftMinted === true
                              ? "Pre-mint"
                              : "Soft-Minted"}
                          </TableCell>

                          <TableCell
                            align={labels.align}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {FaEdit && (
                              <DashboardPopup
                                setShow={setShow}
                                setEditNft={setEditNft}
                                setGetNft={setGetNft}
                                nftid={id}
                                setDeleteState={setDeleteState}
                                nftMinted={nftMinted}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
