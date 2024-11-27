import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { addToCart } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('priceAsc');
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  };

  const { data: products = [], isLoading, isError } = useQuery('fetchProducts', fetchProducts, {
    onSuccess: (data) => setFilteredProducts(data),
    refetchOnWindowFocus: false,
  });

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.price.toString().includes(query)||
        product.rating.rate.toString().includes(query)
    );

    setFilteredProducts(filtered);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (option === 'priceAsc') return a.price - b.price;
      if (option === 'priceDesc') return b.price - a.price;
      if (option === 'nameAsc') return a.title.localeCompare(b.title);
      if (option === 'nameDesc') return b.title.localeCompare(a.title);
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Search Input */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: '20px' }}
      />

      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={handleSort}>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          <MenuItem value="nameAsc">Name: A to Z</MenuItem>
          <MenuItem value="nameDesc">Name: Z to A</MenuItem>
        </Select>
      </FormControl>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                backgroundColor: '#f5f5f5',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', padding: '10px', backgroundColor: '#f5f5f5' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '10px' }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: '10px',
                    color: '#424242',
                    fontStyle: 'italic',
                  }}
                >
                  {product.description.substring(0, 100)}...
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: '10px', color: '#e53935', fontWeight: 'bold' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {product.rating.rate} ⭐
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => handleAddToCart(product)}
                sx={{
                  borderRadius: '0',
                  padding: '10px 0',
                  borderColor: '#e53935',
                  color: '#e53935',
                  fontWeight: 'bold',
                  '&:hover': { borderColor: '#b71c1c' },
                }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
