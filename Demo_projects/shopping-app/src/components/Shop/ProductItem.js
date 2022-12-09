import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {cartAction} from '../../store/Cart';
import {useDispatch} from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();

  //add Items to the cart
  const addToCartHandler=()=>{
    const product = {
      title : props.title,
      price : props.price,
      description : props.description,
      quantity : 1
    }
    dispatch(cartAction.addItems(product));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
