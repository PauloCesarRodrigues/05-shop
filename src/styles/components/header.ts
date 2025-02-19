import { styled } from "..";


export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  div:{
    span: {
      position: 'relative', 
      width: '25px',
      height: '25px',

      marginLeft: '2.3rem',
      marginBottom: '-0.8rem',
    
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    
      fontSize: '$xs',
      background: '$green500',
    
      borderRadius: '99999px',
      outline: '3px solid $gray900',
    }
  },

  button:{
    padding: '12px',

    backgroundColor: '$gray800',
    outline: 'none',
    border: 'none',
    borderRadius: 8,

    cursor: 'pointer',
  }
})

