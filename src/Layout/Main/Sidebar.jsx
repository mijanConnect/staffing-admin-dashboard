import { Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import {
  Dashboard,
  Marchant,
  Settings,
  People,
  SubscriptionManagement,
  PromotionManagement,
  SalesRep,
  AuditLog,
  loginCredentials,
  Rewords,
  FileIcon,
  UploadIcon,
  CategoryIcon,
} from "../../components/common/Svg";
import image4 from "../../assets/image4.png";
import { useUser } from "../../provider/User";

const Sidebar = ({ collapsed, setCollapsed, isMobile }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const showLogoutConfirm = () => setIsLogoutModalOpen(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };
  const handleCancel = () => setIsLogoutModalOpen(false);

  const isItemActive = (itemKey) =>
    selectedKey === itemKey ||
    (itemKey === "subMenuSetting" &&
      ["/profile", "/terms-and-conditions", "/privacy-policy"].includes(
        selectedKey
      ));

  const renderIcon = (IconComponent, itemKey) => {
    const isActive = isItemActive(itemKey);
    return (
      <div
        style={{ width: 20, height: 20 }}
        className={isActive ? "svg-active" : ""}
      >
        <IconComponent
          className="menu-icon"
          fill={isActive ? "#ffffff" : "#1E1E1E"}
        />
      </div>
    );
  };

  const rawMenuItems = [
    {
      key: "/dashboard",
      icon: renderIcon(FileIcon, "/dashboard"),
      label: (
        <Link to="/dashboard">{collapsed ? "" : "Dashboard Overview"}</Link>
      ),
      roles: ["ADMIN"],
    },
    {
      key: "/user-management",
      icon: renderIcon(People, "/user-management"),
      label: (
        <Link to="/user-management">{collapsed ? "" : "User Management"}</Link>
      ),
      roles: ["ADMIN"],
    },
    {
      key: "/subscription-management",
      icon: renderIcon(SubscriptionManagement, "/subscription-management"),
      label: (
        <Link to="/subscription-management">
          {collapsed ? "" : "Subscription Management"}
        </Link>
      ),
      roles: ["ADMIN"],
    },
    {
      key: "/reports-analytics",
      icon: renderIcon(CategoryIcon, "/reports-analytics"),
      label: (
        <Link to="/reports-analytics">
          {collapsed ? "" : "Reports & Analytics"}
        </Link>
      ),
      roles: ["ADMIN"],
    },
    {
      key: "subMenuSetting",
      icon: renderIcon(Settings, "subMenuSetting"),
      label: collapsed ? "" : "Settings",
      roles: ["ADMIN"],
      children: [
        {
          key: "/profile",
          label: <Link to="/profile">{collapsed ? "" : "Update Profile"}</Link>,
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link to="/terms-and-conditions">
              {collapsed ? "" : "Terms & Conditions"}
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy">
              {collapsed ? "" : "Privacy Policy"}
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={showLogoutConfirm}>{collapsed ? "" : "Logout"}</p>,
      roles: ["ADMIN"],
    },
  ];

  const menuItems = rawMenuItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path ||
        (item.children && item.children.some((sub) => sub.key === path))
    );
    if (selectedItem) {
      setSelectedKey(path);
      if (selectedItem.children) setOpenKeys([selectedItem.key]);
      else {
        const parentItem = menuItems.find(
          (item) =>
            item.children && item.children.some((sub) => sub.key === path)
        );
        if (parentItem) setOpenKeys([parentItem.key]);
      }
    }
  }, [path, menuItems]);

  return (
    <div
      className={`h-full flex flex-col bg-white transition-all duration-300 z-40 ${
        isMobile
          ? `fixed top-0 left-0 w-64 h-full shadow-lg transform ${
              collapsed ? "-translate-x-full" : "translate-x-0"
            }`
          : ""
      }`}
      style={{ width: collapsed && !isMobile ? 80 : 250 }}
    >
      {/* Logo */}
      {!collapsed && (
        <Link
          to={"/"}
          className="logo-container flex items-center justify-center py-11"
        >
          <img src={image4} alt="logo" className="w-40 " />
        </Link>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed && !isMobile}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          className="font-poppins text-black border-none"
          items={menuItems.map((item) => ({
            ...item,
            children: item.children
              ? item.children.map((subItem) => ({ ...subItem }))
              : undefined,
          }))}
        />
      </div>

      {/* Logout Modal */}
      <Modal
        centered
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
