import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import UserModal from "./UserModal";

const { Option } = Select;

const components = {
  header: {
    row: (props) => (
      <tr
        {...props}
        style={{
          backgroundColor: "#f0f5f9",
          height: "50px",
          color: "secondary",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
    cell: (props) => (
      <th
        {...props}
        style={{
          color: "secondary",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
  },
};

const LoginCredentials = () => {
  const employeeData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      location: "New York",
      phone: "+1234567890",
      joiningDate: "2025-08-01",
      shiftCompleted: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@email.com",
      location: "Los Angeles",
      phone: "+9876543210",
      joiningDate: "2025-08-05",
      shiftCompleted: 8,
      status: "Inactive",
    },
  ];

  const clientData = [
    {
      id: 1,
      name: "Michael Brown",
      email: "michael@client.com",
      location: "Chicago",
      phone: "+2233445566",
      joiningDate: "2025-09-01",
      shiftCompleted: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma@client.com",
      location: "San Francisco",
      phone: "+3344556677",
      joiningDate: "2025-09-03",
      shiftCompleted: 7,
      status: "Inactive",
    },
  ];

  const [activeTab, setActiveTab] = useState("Employee");
  const [data, setData] = useState(employeeData);
  const [filteredData, setFilteredData] = useState(employeeData);
  const [roles, setRoles] = useState(["Admin", "User", "Client"]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalForm] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState("");

  const showModal = (record = null) => {
    setSelectedRecord(record);
    setIsEdit(!!record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleSave = () => {
    modalForm.validateFields().then((values) => {
      if (isEdit) {
        setData((prev) =>
          prev.map((item) =>
            item.id === selectedRecord.id ? { ...item, ...values } : item
          )
        );
        Swal.fire({
          title: "Updated!",
          text: "User updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const newUser = {
          id: data.length + 1,
          joiningDate: new Date().toISOString().split("T")[0],
          shiftCompleted: 0,
          status: "Active",
          ...values,
        };
        setData((prev) => [...prev, newUser]);
        Swal.fire({
          title: "Added!",
          text: "User added successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      modalForm.resetFields();
      setIsModalVisible(false);
    });
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
    setSelectedRecord(null);
    setFilterStatus("All");
    if (tab === "Employee") {
      setData(employeeData);
      setFilteredData(employeeData);
    } else {
      setData(clientData);
      setFilteredData(clientData);
    }
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  // Update filteredData whenever data or filterStatus changes
  useEffect(() => {
    if (filterStatus === "All") setFilteredData(data);
    else setFilteredData(data.filter((item) => item.status === filterStatus));
  }, [data, filterStatus]);

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    { title: "User Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      align: "center",
    },
    {
      title: "Shift Completed",
      dataIndex: "shiftCompleted",
      key: "shiftCompleted",
      align: "center",
    },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Button
          type={record.status === "Active" ? "primary" : "default"}
          style={{ width: 100 }}
          onClick={() => {
            const newStatus =
              record.status === "Active" ? "Inactive" : "Active";
            Swal.fire({
              title: "Are you sure?",
              text: `Change status to ${newStatus}?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                setData((prev) =>
                  prev.map((item) =>
                    item.id === record.id
                      ? { ...item, status: newStatus }
                      : item
                  )
                );
                Swal.fire({
                  title: "Updated!",
                  text: `Status changed to ${newStatus}.`,
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }
            });
          }}
        >
          {record.status === "Active" ? "Active" : "Inactive"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            type="primary"
            onClick={() => toggleTab("Employee")}
            className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium 
        ${
          activeTab === "Employee"
            ? "bg-primary !text-white border-primary"
            : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
        }`}
          >
            Employee
          </Button>

          <Button
            type="primary"
            onClick={() => toggleTab("Client")}
            className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium 
        ${
          activeTab === "Client"
            ? "bg-primary !text-white border-primary"
            : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
        }`}
          >
            Client
          </Button>

          {/* Dropdown Filter for both tabs */}
          <Select
            value={filterStatus}
            onChange={handleFilterChange}
            style={{ width: 150, height: 42 }}
            className="mt-2 sm:mt-0" // add top margin on small screens
          >
            <Option value="All">All</Option>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-2 lg:mt-0">
          <Input.Search
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            enterButton
            className="custom-search !w-full sm:!w-[400px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered={false}
          size="small"
          rowClassName="custom-row"
          components={components}
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
      </div>

      <UserModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
        form={modalForm}
        roles={roles}
        record={selectedRecord}
        isEdit={isEdit}
      />
    </div>
  );
};

export default LoginCredentials;
