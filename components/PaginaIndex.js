import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from './Cabecalho';
import { Container } from 'react-bootstrap';

function Pagina(props) {
  return (
    <div style={{backgroundColor:'red',}}>
      <Cabecalho />
      <div className=" text-black text-center shadow" style={{backgroundColor:'#E4CDB8', paddingTop:'10%', paddingBottom:"9%"}}>
      <img src="https://picwishhk.oss-cn-hongkong.aliyuncs.com/tasks/output/segmentation/e22ea74b-11d5-404f-9fad-d65127cbb716-image.png?Expires=1687881944&OSSAccessKeyId=LTAI5tGjJnh66c1txANiRBQN&Signature=hK51Ya%2BCOlUGIvgwwXQ3CJw4o9Y%3D&x-oss-process=image/resize%2Cw_2048%2Ch_2048" alt="GIF" style={{ width: '50vw', height: '49vh' }} />
      
        <Container>
          <h1 className="display-4">{props.titulo}</h1>
          
        </Container>
      </div>
      <Container>
        
        
        {props.children}
      </Container>
    </div>
  );
}

export default Pagina;
