import { styled } from ".."

export const Cart = styled('sidebar',{
  position: 'absolute',
  top: 0,
  right: 0,

  height: '100vh',
  width: '480px',

  zIndex: 1,
  backgroundColor: '$gray800',
})

export const CartCloseButton = styled('button',{
  display: 'flex',
  margin: '2rem 2rem 0 auto',
  background: 'transparent',
  outline: 'none',
  border: 'none',

  cursor: 'pointer',
})

export const CartContainer = styled('div',{
  marginLeft: '3rem',
  marginTop: '3rem',

  textAlign: 'left',

  fontSize: '1rem',

})

export const CartProduct = styled('div',{
  marginTop: '1rem',

  display: 'flex',
  flexDirection: 'row',

  gap: '1.5rem',

  div:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
 

    button:{
      backgroundColor: 'transparent',

      alignItems: 'left',
      outline: 'none',
      border: 'none',

      color: '$green500',
      fontSize: '1rem',

      width: '20px',

      cursor: 'pointer',
    },
  }

})

export const ImageContainer = styled('div',{
  width: '100%',
  maxWidth: 105,
  height: 95,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const CartCheckout = styled('div',{
  position: 'fixed',
  bottom: 50,
  width: '380px',
  
  button:{
    cursor: 'pointer',
  },

  div:{
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: '1rem',
  }
})

export const CartTotal = styled('div',{
  fontSize: '$xl',
  fontWeight: 'bolder'
})

export const CartFinishOrderButton = styled('button',{
  border: 'none',
  outline: 'none',

  width: '100%',
  height: '4rem',
  marginTop: '1.5rem',

  backgroundColor: '$green300',
  borderRadius: 8,

  color: '$white',
  fontWeight: 'bold',
  fontSize: '1rem',
})