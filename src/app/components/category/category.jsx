
"use client";

import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  CircularProgress, 
  Box
} from '@mui/material';

const Category = ({ onCategorySelect, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const res = await fetch("https://store-2b74.vercel.app/api/category");
        console.log('API Response Status:', res.status);
        const data = await res.json();
        console.log('API Response Data:', data);
        
        // Check if the response has a data property or is the array directly
        const productsData = data.data || data.products || data;
        console.log('Extracted Products:', productsData);
        
        setProducts(Array.isArray(productsData) ? productsData : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{  px: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
        Our Categories
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        borderRadius: '10px',
        pl: { xs: '20px', md: '30%' },
        pr: { xs: '30px', md: 0 },
        gap: 3,
        paddingBottom: '40px',
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        justifyContent: { xs: 'flex-start', md: 'center' },
        '&::-webkit-scrollbar': {
          height: '2px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}>
        {[...products].reverse().map((product) => (
          <Box key={product._id} sx={{ 
            minWidth: '250px', 
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Card 
              onClick={() => onCategorySelect && onCategorySelect(product._id === selectedCategory ? null : product._id)}
              sx={{ 
                height: '300px',
                width: '250px',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                border: product._id === selectedCategory ? '2px solid #1976d2' : '2px solid transparent',
                '&:hover': {
                  border: '2px solid #1976d2',
                  boxShadow: 3
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                p: 3,
                '& .MuiCardMedia-root': {
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                }
              }}>
                <CardMedia
                  component="img"
                  image={product.image?.url || "https://via.placeholder.com/300x200"}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Category;
