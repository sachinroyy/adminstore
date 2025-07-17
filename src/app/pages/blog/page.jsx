"use client";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Healthy Eating",
    excerpt: "Discover our top tips for maintaining a healthy diet and lifestyle.",
    image: "/images/blog1.jpg",
    date: "July 11, 2025"
  },
  {
    id: 2,
    title: "The Benefits of Organic Food",
    excerpt: "Learn why organic food is better for you and the environment.",
    image: "/images/blog2.jpg",
    date: "July 5, 2025"
  },
  {
    id: 3,
    title: "Quick and Easy Recipes",
    excerpt: "Delicious recipes you can make in under 30 minutes.",
    image: "/images/blog3.jpg",
    date: "June 28, 2025"
  }
];

export default function BlogPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Our Blog
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {blogPosts.map((post) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {post.date}
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {post.excerpt}
                </Typography>
                <Button variant="text" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
