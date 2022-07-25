import { Outlet} from 'react-router-dom';
import { Fragment,useContext } from 'react';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown (1).svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser} from '../../utils/firebase.utils';
import { LogoContainer, NavigationContainer, NavLinkscontainer, NavLink } from './navigation.styles.jsx';

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);


  console.log(currentUser);
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <div><CrwnLogo className='logo' /></div>
          </LogoContainer>
            <NavLinkscontainer>
                <NavLink to='/shop'>SHOP</NavLink>
                {
                  currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>SIGNIN</NavLink>)
                }
                <CartIcon />
            </NavLinkscontainer>
          {isCartOpen && <CartDropDown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;