import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 *{
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     outline: 0;
 }

 body {
     background: #312E38;
     color: #FFF;

 }

 body, input, button {
     font-family: Arial, Helvetica, sans-serif;
     font-size: 16px;
 }

 button {
     cursor: pointer;
 }
`;
