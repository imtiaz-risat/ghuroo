import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Tours from "./pages/Tours";
import UserBookings from "./pages/UserBookings";
import UserBlogs from "./pages/UserBlogs";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import WriteBlog from "./pages/WriteBlog";
import TourDetails from "./pages/TourDetails";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTours from "./pages/AdminTours";
import AdminBlogs from "./pages/AdminBlogs";
import AdminBookings from "./pages/AdminBookings";
import AdminReviews from "./pages/AdminReviews";
import AdminRoute from "./components/AdminRoute";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="profile" element={<Profile />}  />
            <Route path="reviews" element={<AdminReviews />}  />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="tours" element={<Tours />} />
          <Route path="tour/:id" element={<TourDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/write" element={<WriteBlog />} />
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="my-bookings" element={<UserBookings />} />
            <Route path="my-blogs" element={<UserBlogs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
