import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'


const CheckoutItem = ({cartItem}) =>{
    
    const { clearItemFromCart,addItemToCart,removeItemFromCart } = useContext(CartContext)
    const { name,quantity,imageUrl,price } = cartItem

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => {addItemToCart(cartItem)}}>+</div>
                    {quantity}
                <div className='arrow' onClick={() => {removeItemFromCart(cartItem)}}>-</div>
                </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => {clearItemFromCart(cartItem)}}>&#10005;</div>
        </div>
    )

}

export default CheckoutItem;