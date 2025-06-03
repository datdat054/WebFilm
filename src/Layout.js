import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeaderAdmin from "./components/HeaderAdmin";
import HeaderTechnical from "./components/HeaderTechnical";
import DangAnime from "./pages/User/DangAnime";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import MoviePlayer from "./components/MoviePlayer";
import Profile from "./pages/User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUser from "./pages/Admin/ManageUser";
import ManageMovie from "./pages/Admin/ManageMovie";
import UserInfor from "./components/UserDetail";
import EditMovie from "./components/EditMovie";
import AddEpisode from "./components/AddEpisode";
import SearchResults from "./pages/User/PageSearch";
import CategoryMovies from "./pages/User/TheLoai";
import AddMovie from "./components/AddMovie";
import Favorites from "./pages/User/FavoritesList";
import MovieDetail from "./pages/User/MovieDetail";
import WatchHistoryList from "./pages/User/WatchHistoryList";
import ListSearchUser from "./pages/Admin/ListSearchUser";
import ListSearchMovie from "./pages/Admin/ListSearchMovie";
import BugList from "./pages/Technical/BugList";
import BugResponse from "./pages/Technical/BugResponse";
import { FilterProvider } from "./components/FilterContext";
import ReportBug from "./pages/User/ReportBug";
import XemResponse from "./pages/User/XemResponse";

export default function Layout() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/manage");
  const isTechnicalRoute = location.pathname.startsWith("/technical");

  return (
    <>
      {isAdminRoute ? (
        <HeaderAdmin />
      ) : isTechnicalRoute ? (
        <FilterProvider>
          <HeaderTechnical />
          <Routes>
            <Route path="/technical" element={<BugList />} />
            <Route path="/technical/responsed" element={<BugList />} />
            <Route path="/technical/unresponse" element={<BugList />} />
            <Route path="/technical/detail/:report_id" element={<BugResponse />} />
          </Routes>
        </FilterProvider>
      ) : (
        <Header />
      )}
      {!isTechnicalRoute && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dang-anime" element={<DangAnime />} />
          <Route path="/the-loai/:name" element={<CategoryMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id/episode/:episodeNumber" element={<MoviePlayer />} />
          <Route path="/movies/search" element={<SearchResults />} />
          <Route path="/movies/favorites" element={<Favorites />} />
          <Route path="/movieDetail/:id" element={<MovieDetail />} />
          <Route path="/movies/watch-history" element={<WatchHistoryList />} />
          <Route path="/report-bug" element={<ReportBug />} />
          <Route path="/xem-response" element={<XemResponse/>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/managemovie" element={<ManageMovie />} />
          <Route path="/admin/user/:userId" element={<UserInfor />} />
          <Route path="/admin/edit/:movieId" element={<EditMovie />} />
          <Route path="/admin/add/:movieId/episode" element={<AddEpisode />} />
          <Route path="/admin/search-users" element={<ListSearchUser />} />
          <Route path="/admin/search-movies" element={<ListSearchMovie />} />
          <Route path="/admin/add" element={<AddMovie />} />
        </Routes>
      )}
    </>
  );
}