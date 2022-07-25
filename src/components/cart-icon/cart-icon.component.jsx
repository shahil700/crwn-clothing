import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () =>{
    const { isCartOpen,setIsCartOpen,cartCount } = useContext(CartContext);

    const ToggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={ToggleIsCartOpen}/>
            <span className='item-count' onClick={ToggleIsCartOpen}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;