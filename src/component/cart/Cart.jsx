import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {removeFromCart, incrementQuantity, decrementQuantity,clearCart} from '../../redux/slice/cartSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cart price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const cleanAll=()=>{
    dispatch(clearCart());
  }

  return (
    <Paper elevation={5} sx={{ padding:4, backgroundColor: '#f7f7f7'}}>

      <Typography variant="h4" gutterBottom sx={{ color: '#3f51b1',fontWeight:'100'}}>
        Your Cart <Button variant='outlined' color='error'sx={{fontWeight:'400'}}
        onClick={cleanAll}
        >Clear Purchased</Button>
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3f51b5' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id} sx={{ backgroundColor: '#e8f0fe', '&:hover': { backgroundColor: '#d0e3fc' } }}>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>{item.title}</TableCell>
                <TableCell sx={{ color: '#333' }}>${item.price.toFixed(2)}</TableCell>
                <TableCell sx={{ color: '#333' }}>{item.quantity}</TableCell>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    variant="contained"
                    sx={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      marginRight: 1,
                      '&:hover': { backgroundColor: '#45a049' },
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    variant="contained"
                    sx={{
                      backgroundColor: '#ff9800',
                      color: '#fff',
                      marginRight: 1,
                      '&:hover': { backgroundColor: '#e68a00' },
                    }}
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    variant="contained"
                    sx={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#d32f2f' },
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {cartItems.length === 0 && (
        <Typography variant="h6" sx={{ color: '#f44336', marginTop: 2 }}>
          Your cart is empty!
        </Typography>
      )}

      {cartItems.length > 0 && (
        <Typography
          variant="h6"
          sx={{ color: '#333', fontWeight: 'bold', marginTop: 2, textAlign: 'right' }}
        >
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
      )}
    </Paper>
  );
};

export default Cart;
