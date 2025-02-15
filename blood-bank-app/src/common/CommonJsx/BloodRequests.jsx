import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Alert,
  Spinner,
  Button,
  Badge,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import bloodRequestService from "../../services/bloodRequest.service";
import Swal from "sweetalert2";

const BloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("role");
    setUserId(storedUserId);
    setUserRole(storedUserRole);
  }, []);

  const fetchBloodRequests = async (page = 0) => {
    if (!userId) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await bloodRequestService.getBloodRequests(
        userId,
        page,
        10
      );
      setBloodRequests(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage(
        "Something went wrong while fetching the blood requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      fetchBloodRequests(currentPage);
    }
  }, [userId, currentPage]);

  const handleStatusChangeStaff = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this request as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as completed",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bloodRequestService.updateStatus(
            requestId,
            "TRANSACTION_COMPLETED"
          );
          fetchBloodRequests(currentPage);
          Swal.fire(
            "Success!",
            "The request has been marked as completed.",
            "success"
          );
        } catch (error) {
          setErrorMessage("Failed to update status.");
          Swal.fire(
            "Error!",
            "Failed to update status. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleStatusChangeAdmin = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bloodRequestService.updateStatus(requestId, "APPROVED");
          fetchBloodRequests(currentPage);
          Swal.fire("Success!", "The request has been approved.", "success");
        } catch (error) {
          setErrorMessage("Failed to update status.");
          Swal.fire(
            "Error!",
            "Failed to update status. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Conditional row styling
  const conditionalRowStyles = [
    {
      when: () => true, // Applies to all rows
      style: {
        backgroundColor: "#e3f2fd", // Light gray background
        color: "#212529", // Dark text color
      },
    },
  ];
  

  // Columns with badges for status
  const columns = [
    {
      name: "UserName",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge
          bg={
            row.status === "PENDING"
              ? "secondary"
              : row.status === "APPROVED"
              ? "primary"
              : "success"
          }
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row) => new Date(row.requestedTime).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Approval Date",
      selector: (row) =>
        row.approvedTime
          ? new Date(row.approvedTime).toLocaleDateString()
          : "N/A",
      sortable: true,
    },
    {
      name: "Transaction Date",
      selector: (row) =>
        row.transactionCompletedTime
          ? new Date(row.transactionCompletedTime).toLocaleDateString()
          : "N/A",
      sortable: true,
    }
  ];

  const CustomPagination = () => (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => setCurrentPage(index)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </Pagination>
  );

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">
                Your Blood Requests
              </Card.Title>

              {loading && <Spinner animation="border" variant="primary" />}

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <div style={{ overflowX: "auto", minWidth: "100%" }}>
                <DataTable
                  columns={columns}
                  data={bloodRequests}
                  progressPending={loading}
                  pagination
                  paginationComponent={CustomPagination}
                  highlightOnHover
                  striped
                  responsive
                  conditionalRowStyles={conditionalRowStyles}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BloodRequests;
