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
  Badge,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import bloodRequestService from "../../services/bloodRequest.service";
import Swal from "sweetalert2"; // Import SweetAlert2

const AllBloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userRole, setUserRole] = useState("");

  // Fetch role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  // Fetch blood requests on page load and whenever page changes
  useEffect(() => {
    fetchBloodRequests(currentPage);
  }, [currentPage]);

  const fetchBloodRequests = async (page = 0) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await bloodRequestService.getAllBloodRequests(
        page,
        10,
        "id,asc"
      );
      setBloodRequests(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage("Error fetching blood requests");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change based on role with SweetAlert confirmation
  const handleStatusChange = async (id, currentStatus) => {
    try {
      let newStatus = "";
      let actionText = "";

      if (userRole === "ADMIN" && currentStatus === "PENDING") {
        newStatus = "APPROVED";
        actionText = "Approve Request";
      } else if (
        userRole === "HOSPITAL_STAFF" &&
        currentStatus === "APPROVED"
      ) {
        newStatus = "TRANSACTION_COMPLETED";
        actionText = "Mark as Transaction Completed";
      }

      if (newStatus) {
        // Show SweetAlert confirmation before proceeding
        const result = await Swal.fire({
          title: `Are you sure you want to ${actionText}?`,
          text: `This action will change the status to ${newStatus}.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, proceed",
          cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
          await bloodRequestService.updateStatus(id, newStatus);
          fetchBloodRequests(currentPage);
          Swal.fire("Success!", `Status changed to ${newStatus}`, "success");
        }
      }
    } catch (error) {
      console.error("Error updating status", error);
      Swal.fire("Error!", "There was an error updating the status.", "error");
    }
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: (row) => row.bloodGroup || "N/A",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Urgency",
      selector: (row) => {
        const urgency = row.urgency || "LOW";
        let color = "secondary";
        if (urgency === "LOW") color = "success";
        if (urgency === "MEDIUM") color = "warning";
        if (urgency === "HIGH") color = "danger";
        return (
          <Badge pill bg={color}>
            {urgency}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        const status = row.status || "PENDING";
        let color = "secondary";
        if (status === "PENDING") color = "primary";
        if (status === "APPROVED") color = "success";
        if (status === "TRANSACTION_COMPLETED") color = "dark";
        return (
          <Badge pill bg={color}>
            {status}
          </Badge>
        );
      },
      sortable: true,
    },

    {
      name: "Requested Time",
      selector: (row) => new Date(row.requestedTime).toLocaleString(),
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          {userRole === "ADMIN" && row.status === "PENDING" && (
            <Button
              variant="primary"
              onClick={() => handleStatusChange(row.id, row.status)}
            >
              Approve Request
            </Button>
          )}
          {userRole === "HOSPITAL_STAFF" && row.status === "APPROVED" && (
            <Button
              variant="success"
              onClick={() => handleStatusChange(row.id, row.status)}
            >
              Mark as Transaction Completed
            </Button>
          )}
        </div>
      ),
      width: "250px", // Fixed width for action column
    },
  ];

  // Custom pagination component for DataTable
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
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">Blood Requests</Card.Title>

              {loading && <Spinner animation="border" variant="primary" />}

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <DataTable
                columns={columns}
                data={bloodRequests}
                progressPending={loading}
                pagination
                paginationComponent={CustomPagination}
                highlightOnHover
                striped
                responsive
                defaultSortFieldId={0}
                defaultSortAsc={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AllBloodRequests;
