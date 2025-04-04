import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import blogsImage from "../../assets/BlogsBanner.jpg";
  
  const blogsData = [
    {
      date: "20-12-2024",
      title: "Ms G S Shraddha Makes CMS B School Proud at TVS Credit E.P.I.C 6.0",
      slug: "ms-gs-shraddha-tvs-epic",
    },
    {
      date: "12-09-2024",
      title: "Data-Driven Decisions: The Future of HR - A CMS Business School HR Conclave",
      slug: "data-driven-decisions-hr",
    },
    {
      date: "18-06-2024",
      title: "Masterclass on Cybersecurity by Dr. Kulkarni",
      slug: "cybersecurity-masterclass",
    },
    {
      date: "03-03-2024",
      title: "Master Class for Finance Students by Dr. Lata Chakravarthy",
      slug: "finance-masterclass",
    },
  ];
  
  const BlogsHomePage = () => {
    const navigate = useNavigate();
  
    const handleReadMore = (slug) => {
      navigate(`/blogs/${slug}`);
    };
  
    return (
      <Box>
        <img src={blogsImage} style={{ width: "100%" }} alt="Blogs Banner" />
        <Box paddingX={5}>
          <Typography paddingY={1} color="#034ea2">Blogs</Typography>
          <Grid container spacing={2}>
            {blogsData.map((blog, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <Card sx={{ minWidth: 275, height: "250px" }}>
                  <CardContent sx={{ padding: 2, position: "relative" }}>
                    <Box display="flex" alignItems="center" paddingY={1}>
                      <CalendarMonthIcon sx={{ marginRight: 1, color: "orange" }} />
                      <Typography fontSize={14}>{blog.date}</Typography>
                    </Box>
                    <Typography sx={{ color: "#034ea2", height: "90px" }}>{blog.title}</Typography>
                    <Button
                      onClick={() => handleReadMore(blog.slug)}
                      sx={{
                        background: "orange",
                        padding: "5px 15px",
                        borderRadius: "10px",
                        color: "#fff",
                        marginTop: 2,
                        '&:hover': { background: "darkorange" }
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };
  
  export default BlogsHomePage;
  