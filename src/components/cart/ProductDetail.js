import { Grid, Typography } from "@mui/material";

const ProductDetail = ({product}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h5">{product.productName}</Typography>
      <Typography variant="body2" color="text.secondary">
        Rs. {product.price}
      </Typography>
    </Grid>
  );
};

export default ProductDetail;
