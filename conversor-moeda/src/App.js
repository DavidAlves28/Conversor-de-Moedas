
import { Container, Row, Button, Col, Form, Modal, Spinner , Alert } from 'react-bootstrap';
import { FontAwesomeIcon, fontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ListarMoedas from './listar-moedas';
function App() {
  return (
    <div>
      <h1 style={{ background: 'chocolate',fontSize:'50px', textAlign:'center',height:'12vh',padding:'5px',textDecoration:'Underline' }}>Conversor de Moedas</h1>
      <Alert variant='danger' show={false}>
        Erro obtendo dados de conversão, tente novamente.
      </Alert>
      <Container style={{background:'#2222',
      padding:'5vh',
      height: '16vh',
      width:'95vw',
      border:'1px solid',
      borderRadius:'8px'
      }} >
        <Form>
          <Row >
            <Col sm='3'>
              <Form.Control placeholder='0' value={1} required />
            </Col>

            <Col sm='3'>
              <Form.Control as='select'>
              <ListarMoedas/>
              </Form.Control>
            </Col>

            <Col sm='1' className='text-center' style={{paddingTop:'6px'}}>
            <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </Col>
            <Col sm='3'>
              <Form.Control as='select'>
              <ListarMoedas/>
              </Form.Control>
            </Col>
            <Col sm='2'>
              <Button variant='success' type='submit'>
              <Spinner animation='border' size='sm'/>
                Converter</Button>
            </Col>
          </Row>
        </Form>
        <Modal show={false}>
          <Modal.Header closeButton>
          <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Resultado da conversão
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' >
              Nova Coversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
