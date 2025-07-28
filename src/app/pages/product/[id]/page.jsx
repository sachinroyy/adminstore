

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetails = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id') || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [related, setRelated] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://store-2b74.vercel.app/api/products`)
      .then(res => res.json())
      .then(data => {
        const products = data.data || data.products || data;
        const prod = Array.isArray(products) ? products.find(p => p._id === id) : null;
        setProduct(prod);
        setLoading(false);
        // Fetch related products
        if (prod && prod.category) {
          fetch(`https://store-2b74.vercel.app/api/products?category=${prod.category}`)
            .then(res => res.json())
            .then(rdata => {
              const arr = rdata.data || rdata.products || [];
              setRelated(arr.filter(p => p._id !== prod._id).slice(0, 5));
            });
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  }
  if (!product) {
    return <Typography variant="h6">Product Not Found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1, md: 4 }, bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, mb: 4 }}>
        {/* Image section */}
        <Box sx={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CardMedia
            component="img"
            image={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || "/placeholder.png")}
            alt={product.name}
            sx={{ width: 350, height: 350, objectFit: 'contain', borderRadius: 3, bgcolor: '#fafafa', boxShadow: 2 }}
          />
          {/* Thumbnails */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {(product.images || [product.image]).slice(0,4).map((img, idx) => (
              <CardMedia key={idx} component="img" image={img} alt={product.name} sx={{ width: 60, height: 60, objectFit: 'contain', border: '1px solid #eee', borderRadius: 2, cursor: 'pointer', bgcolor: '#fafafa' }} />
            ))}
          </Box>
        </Box>
        {/* Details section */}
        <Box sx={{ flex: 1, minWidth: 320 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom color="black">{product.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" color="black" fontWeight={700}>₹{product.price?.toFixed(2)}</Typography>
            {product.discount && (
              <>
                <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>₹{(product.price / (1 - product.discount/100))?.toFixed(2)}</Typography>
                <Typography variant="caption" color="success.main" sx={{ bgcolor: 'success.light', px: 1, py: 0.5, borderRadius: 1, fontWeight: 600 }}>Save {product.discount}%</Typography>
              </>
            )}
          </Box>
          <Typography variant="body1" color="black" sx={{ mb: 2 }}>{product.description || 'No description available.'}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <IconButton onClick={() => setLiked(like => !like)} color={liked ? 'error' : 'default'}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2">{liked ? 'You like this product' : 'Like'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="contained" color="success" disabled={cartLoading}>Add to Cart</Button>
            <Button variant="outlined" color="primary" onClick={() => router.push('/')}>Back to Products</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <Typography variant="caption" color="text.secondary">SKU: {product.sku || product._id}</Typography>
            <Typography variant="caption" color="text.secondary">Category: {product.category || '-'}</Typography>
          </Box>
        </Box>
      </Box>
      {/* Description & Related */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} color="black" gutterBottom>Description </Typography> 
        <Typography variant="body2" color="black" sx={{ mb: 3 , fontWeight: 600 }}>{product.description || 'No description available.'}</Typography>
        {related.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" fontWeight={700} color="black" gutterBottom>Related products</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {related.map(rel => (
                <Card key={rel._id} sx={{ width: 180, p: 1, boxShadow: 1, cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: 5 } }} onClick={() => router.push(`/pages/product/${rel._id}?id=${rel._id}`)}>
                  <CardMedia component="img" image={Array.isArray(rel.images) && rel.images.length > 0 ? rel.images[0] : (rel.image || '/placeholder.png')} alt={rel.name} sx={{ height: 100, objectFit: 'contain', bgcolor: '#fafafa', borderRadius: 1 }} />
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ minHeight: 48 }} color="black">{rel.name}</Typography>
                    <Typography variant="body2" color="black">₹{rel.price?.toFixed(2)}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;

    