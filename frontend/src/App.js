import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/* ---------------- NAVBAR ---------------- */
import Navbar from "./components/Navbar";

/* ---------------- AUTH ---------------- */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* ---------------- DASHBOARDS ---------------- */
import AdminHome from "./pages/admin/AdminHome";
import UserHome from "./pages/user/UserHome";

/* ---------------- MAINTENANCE (ADMIN) ---------------- */
import MaintenanceHome from "./pages/admin/maintenance/MaintenanceHome";
import AddMembership from "./pages/admin/maintenance/AddMembership";
import UpdateMembership from "./pages/admin/maintenance/UpdateMembership";
import AddBook from "./pages/admin/maintenance/AddBook";
import UpdateBook from "./pages/admin/maintenance/UpdateBook";
import AddUser from "./pages/admin/maintenance/AddUser";
import UpdateUser from "./pages/admin/maintenance/UpdateUser";

/* ---------------- TRANSACTIONS ---------------- */
import TransactionsHome from "./pages/transactions/TransactionsHome";
import BookAvailability from "./pages/transactions/BookAvailability";
import SearchResults from "./pages/transactions/SearchResults";
import RequestIssue from "./pages/transactions/RequestIssue";
import ReturnBook from "./pages/transactions/ReturnBook";
import PayFine from "./pages/transactions/PayFine";
import PendingIssues from "./pages/transactions/PendingIssues";
import ActiveIssues from "./pages/transactions/ActiveIssues";
import OverdueBooks from "./pages/transactions/OverdueBooks";   // ⭐ USER + ADMIN VIEW

/* ---------------- REPORTS ---------------- */
import ReportsHome from "./pages/reports/ReportsHome";
import MasterBooks from "./pages/reports/MasterBooks";
import MasterMemberships from "./pages/reports/MasterMemberships";
import MasterUsers from "./pages/reports/MasterUsers";

function App() {
  const { user } = useContext(AuthContext);

  /* ------------------------------------------- */
  /* PROTECTED ROUTES */
  /* ------------------------------------------- */

  const ProtectedRoute = (element) =>
    user ? element : <Navigate to="/" />;

  const AdminRoute = (element) =>
    user?.role === "admin" ? element : <Navigate to="/" />;

  const UserRoute = (element) =>
    user?.role === "user" ? element : <Navigate to="/" />;

  const RedirectIfLoggedIn = (page) =>
    user ? (
      <Navigate to={user.role === "admin" ? "/admin" : "/user"} />
    ) : (
      page
    );

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ---------------- AUTH ---------------- */}
        <Route path="/" element={RedirectIfLoggedIn(<Login />)} />
        <Route path="/signup" element={RedirectIfLoggedIn(<Signup />)} />

        {/* ---------------- DASHBOARDS ---------------- */}
        <Route path="/admin" element={AdminRoute(<AdminHome />)} />
        <Route path="/user" element={UserRoute(<UserHome />)} />

        {/* ---------------- MAINTENANCE (ADMIN) ---------------- */}
        <Route path="/admin/maintenance" element={AdminRoute(<MaintenanceHome />)} />
        <Route path="/admin/maintenance/add-membership" element={AdminRoute(<AddMembership />)} />
        <Route path="/admin/maintenance/update-membership" element={AdminRoute(<UpdateMembership />)} />
        <Route path="/admin/maintenance/add-book" element={AdminRoute(<AddBook />)} />
        <Route path="/admin/maintenance/update-book" element={AdminRoute(<UpdateBook />)} />
        <Route path="/admin/maintenance/add-user" element={AdminRoute(<AddUser />)} />
        <Route path="/admin/maintenance/update-user" element={AdminRoute(<UpdateUser />)} />

        {/* ---------------- TRANSACTIONS ---------------- */}
        <Route path="/transactions" element={ProtectedRoute(<TransactionsHome />)} />
        <Route path="/transactions/book-availability" element={ProtectedRoute(<BookAvailability />)} />
        <Route path="/transactions/search-results" element={ProtectedRoute(<SearchResults />)} />
        <Route path="/transactions/request-issue" element={ProtectedRoute(<RequestIssue />)} />
        <Route path="/transactions/return-book" element={ProtectedRoute(<ReturnBook />)} />
        <Route path="/transactions/pay-fine" element={ProtectedRoute(<PayFine />)} />

        {/* Admin Only */}
        <Route path="/transactions/pending-issues" element={AdminRoute(<PendingIssues />)} />
        <Route path="/transactions/active-issues" element={AdminRoute(<ActiveIssues />)} />

        {/* ⭐ USER + ADMIN Overdue Books */}
        <Route path="/transactions/overdue" element={ProtectedRoute(<OverdueBooks />)} />

        {/* ---------------- REPORTS ---------------- */}
        <Route path="/reports" element={ProtectedRoute(<ReportsHome />)} />
        <Route path="/reports/master-books" element={ProtectedRoute(<MasterBooks />)} />
        <Route path="/reports/master-memberships" element={ProtectedRoute(<MasterMemberships />)} />
        <Route path="/reports/master-users" element={ProtectedRoute(<MasterUsers />)} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
