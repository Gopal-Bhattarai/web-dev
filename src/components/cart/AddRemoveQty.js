import { Button, ButtonGroup, Grid } from "@mui/material";
import { useContext } from "react";
import { ProductContext } from "../State/ProductContext";

const AddRemoveQty = ({ product, btnSize }) => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

  //Add qty +1
  const moreOfThisProduct = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };

  //remove qty -1
  const lessOfThisProduct = (id) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  return (
      <ButtonGroup size={btnSize} aria-label="button group">
        <Button
          variant="contained"
          onClick={() => lessOfThisProduct(product._id)}
        >
          -
        </Button>
        <Button variant="text">
          {selectedProducts.filter((id) => id === product._id).length}
        </Button>
        <Button
          variant="contained"
          onClick={() => moreOfThisProduct(product._id)}
        >
          +
        </Button>
      </ButtonGroup>
  );
};

export default AddRemoveQty;
