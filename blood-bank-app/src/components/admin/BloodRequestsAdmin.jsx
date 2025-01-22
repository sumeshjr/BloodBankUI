import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Alert,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import bloodRequestService from "../../services/bloodRequest.service";
import AdminNavbar from "./AdminNavbar";
import AllBloodRequests from "../../common/CommonJsx/AllBloodRequests";

const BloodRequestsAdmin = () => {
  return (
    <>
      <AdminNavbar />
      <AllBloodRequests />
    </>
  );
};

export default BloodRequestsAdmin;
