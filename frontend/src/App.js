import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/* ---------------- NAVBAR ---------------- */
import Navbar from "./components/Navbar";

/* ---------------- LOGIN + SIGNUP ---------------- */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* ---------------- DASHBOARDS ---------------- */
import AdminHome from "./pages/admin/AdminHome";
import UserHome from "./pages/user/UserHome";

/* ---------------- MAINTENANCE PAGES (ADMIN) ---------------- */
import MaintenanceHome from "./pages/admin/maintenance/MaintenanceHome";
import AddMembership from "./pages/admin/maintenance/AddMembership";
import UpdateMembership from "./pages/admin/maintenance/UpdateMembership";
import AddBook from "./pages/admin/maintenance/AddBook";
import UpdateBook from "./pages/admin/maintenance/UpdateBook";
import AddUser from "./pages/admin/maintenance/AddUser";
import UpdateUser from "./pages/admin/maintenance/UpdateUser";

/* ---------------- TRANSACTIONS PAGES ---------------- */
import TransactionsHome from "./pages/transactions/TransactionsHome";
import BookAvailability from "./pages/transactions/BookAvailability";
import SearchResults from "./pages/transactions/SearchResults";
import IssueBook from "./pages/transactions/IssueBook";
import ReturnBook from "./pages/transactions/ReturnBook";
import PayFine from "./pages/transactions/PayFine";

/* ---------------- REPORT PAGES ---------------- */
import ReportsHome from "./pages/reports/ReportsHome";
import MasterBooks from "./pages/reports/MasterBooks";
import MasterMemberships from "./pages/reports/MasterMemberships";
import MasterUsers from "./pages/reports/MasterUsers";
import PendingRequests from "./pages/reports/PendingRequests";
import ActiveIssues from "./pages/reports/ActiveIssues";
import OverdueBooks from "./pages/reports/OverdueBooks";

function App() {
  const { user } = useContext(AuthContext);

  /* Protect routes: requires login */
  const ProtectedRoute = (element) =>
    user ? element : <Navigate to="/" />;

  /* Admin-only routes */
  const AdminRoute = (element) =>
    user?.role === "admin" ? element : <Navigate to="/" />;

  /* User-only routes */
  const UserRoute = (element) =>
    user?.role === "user" ? element : <Navigate to="/" />;

  /* Redirect logged-in users away from login/signup */
  const RedirectIfLoggedIn = (page) =>
    user ? (
      <Navigate to={user.role === "admin" ? "/admin" : "/user"} />
    ) : (
      page
    );

  return (
    <BrowserRouter>

      {/* NAVBAR appears only when user is logged in */}
      <Navbar />

      <Routes>

        {/* ---------------- AUTH ---------------- */}
        <Route path="/" element={RedirectIfLoggedIn(<Login />)} />
        <Route path="/signup" element={RedirectIfLoggedIn(<Signup />)} />

        {/* ---------------- DASHBOARDS ---------------- */}
        <Route path="/admin" element={AdminRoute(<AdminHome />)} />
        <Route path="/user" element={UserRoute(<UserHome />)} />

        {/* ---------------- MAINTENANCE (ADMIN ONLY) ---------------- */}
        <Route path="/admin/maintenance" element={AdminRoute(<MaintenanceHome />)} />

        <Route
          path="/admin/maintenance/add-membership"
          element={AdminRoute(<AddMembership />)}
        />

        <Route
          path="/admin/maintenance/update-membership"
          element={AdminRoute(<UpdateMembership />)}
        />

        <Route
          path="/admin/maintenance/add-book"
          element={AdminRoute(<AddBook />)}
        />

        <Route
          path="/admin/maintenance/update-book"
          element={AdminRoute(<UpdateBook />)}
        />

        <Route
          path="/admin/maintenance/add-user"
          element={AdminRoute(<AddUser />)}
        />

        <Route
          path="/admin/maintenance/update-user"
          element={AdminRoute(<UpdateUser />)}
        />

        {/* ---------------- TRANSACTIONS (ADMIN + USER) ---------------- */}
        <Route path="/transactions" element={ProtectedRoute(<TransactionsHome />)} />

        <Route
          path="/transactions/book-availability"
          element={ProtectedRoute(<BookAvailability />)}
        />

        <Route
          path="/transactions/search-results"
          element={ProtectedRoute(<SearchResults />)}
        />

        <Route
          path="/transactions/issue-book"
          element={ProtectedRoute(<IssueBook />)}
        />

        <Route
          path="/transactions/return-book"
          element={ProtectedRoute(<ReturnBook />)}
        />

        <Route
          path="/transactions/pay-fine"
          element={ProtectedRoute(<PayFine />)}
        />

        {/* ---------------- REPORTS ---------------- */}
        <Route path="/reports" element={ProtectedRoute(<ReportsHome />)} />

        <Route
          path="/reports/master-books"
          element={ProtectedRoute(<MasterBooks />)}
        />

        <Route
          path="/reports/master-memberships"
          element={ProtectedRoute(<MasterMemberships />)}
        />

        <Route
          path="/reports/master-users"
          element={ProtectedRoute(<MasterUsers />)}
        />

        <Route
          path="/reports/pending-requests"
          element={ProtectedRoute(<PendingRequests />)}
        />

        {/* Admin-only reports */}
        <Route
          path="/reports/active-issues"
          element={AdminRoute(<ActiveIssues />)}
        />

        <Route
          path="/reports/overdue"
          element={AdminRoute(<OverdueBooks />)}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
