import { Route, Routes } from "react-router-dom";
import Dashboard from "../Containers/Dashboard/Dashboard";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import BlogHomePage from "../Containers/Blogs/BlogHomePage";
import AddBlog from "../Containers/Blogs/AddBlog";
// import News from "../containers/News/News";
// import Events from "../containers/Events/Events";

// import AddNewsModal from "../containers/News/NewsModal";
// import AddEventModal from "../containers/Events/EventsModal";
// // import AddBlogModal from "../containers/Blogs/AddBlogs";
// import NewsDetail from "../containers/News/NewsDetail";
// import AllNews from "../containers/News/AllNews";
// import Login from "../components/Login";
// import PrivateRoute from "../components/PrivateRoute";
// import AddEventsModal from "../containers/Events/EventsModal";
// import EventsDetail from "../containers/Events/EventsDetail";
// import AllEvents from "../containers/Events/AllEvents";
// import AllBlogs from "../containers/Blogs/AllBlogs";
// import AddBlogsModal from "../containers/Blogs/BlogsModal";
// import BlogsDetail from "../containers/Blogs/BlogsDetail";
// import Blogs from "../containers/Blogs/Blogs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogHomePage />} />
        <Route path="/add-blog" element={<AddBlog />} />
        {/* <Route path="/news" element={<News />} />
        <Route path="/allNews" element={<AllNews />} />
        <Route path="/newsmodal" element={<AddNewsModal />} />
        <Route path="/newsmodal/:id" element={<AddNewsModal />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventsmodal" element={<AddEventModal />} />
        <Route path="/eventsmodal/:id" element={<AddEventsModal />} />
        <Route path="/events/:slug" element={<EventsDetail />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogsmodal" element={<AddBlogsModal />} />
        <Route path="/blogsmodal/:id" element={<AddBlogsModal />} />
        <Route path="/blogs/:slug" element={<BlogsDetail />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
