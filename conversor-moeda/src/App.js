
import axios from 'axios'
import { Container, Row, Button, Col, Form, Modal, Spinner, Alert, Footer, CardImg } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import ListarMoedas from './listar-moedas';
import { useState } from 'react';
import './App.css'
import github from './Imagens/github.png'
import linkedin from './Imagens/linkedin.png'
function App() {

  // URL DA API FIXER.IO
  const FixerUrl = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3'

  //valor do input 
  const [valor, setValor] = useState('1')
  // onchange para input 
  function changeValue(e) {
    //o Valor do input receberá  somente números.
    setValor(e.target.value.replace(/\D/g, ''))

  }
  // estado para moeda inicial.
  const [moedaInicial, setMoedaInicial] = useState('BRL')

  // onChange para selecinar moeda.
  function selecionarMoeda(e) {
    setMoedaInicial(e.target.value)
  }
  // estado para moeda final.
  const [moedaFinal, setMoedaFinal] = useState('USD')
  // onChange para selecinar moeda
  function selecionarMoedaFinal(e) {
    setMoedaFinal(e.target.value)
  }
  // estado para desabilitar o icone spinner 
  const [spinner, setSpinner] = useState(false)

  // função responsável por fazer a validação e imprimir resultado da cotação.  
  function converter(e) {
    e.preventDefault()
    setFormValidade(true)
    // valida se form está como true para chamar a API.
    if (e.currentTarget.checkValidity() === true) {
      //implementa chamada Fixer.io 
      setSpinner(true) // icone spinner

      axios.get(FixerUrl)
        .then((res) => {
          // resultado da API(res) fica em uma const para que possa implementar dados. 
          const cotacao = obterCotacao(res.data) // retorno da API 

          if (cotacao) {
            // template String para renderizar informações do resultado.
            setResultadoConversao(`${valor} ${moedaInicial} = ${cotacao} ${moedaFinal} `)
            // exibirá Modal com as informações acima.
            setExibirModal(true)
            //icone spinner desabilitado.
            setSpinner(false)
            // reseta mensagem de erro caso houver.
            setMensagemErro(false)
          } else {
            //funcao que retorna erros
            exibirErro()
          }
        })
        .catch((error) => {
          //funcao que retorna erros
          exibirErro()
        })
    }
    else {
      alert('Preencha todos os campos necessários!')
    }
  }

  // função para tratar erros da API caso não houver dados ou se os dados não forem verdadeiros.
  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false
    }
    // cotacaoDe = valor da moedaInicial, e  '.rates' é caminho do objeto onde está alocada as Moedas de conversão na API
    const cotacaoDe = dadosCotacao.rates[moedaInicial]

    // cotacaoPara = valor da moedaFinal, e  '.rates' é caminho do objeto onde está alocada as Moedas de conversão na API
    const cotacaoPara = dadosCotacao.rates[moedaFinal]

    // operação das moedas para que converter os valor e retornar a quantia do input.
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor
    return cotacao.toFixed(2)
  }

  // função que fechará o Modal e dará reset nos estados abaixo.
  function fecharModal(e) {
    setValor('1')
    setMoedaInicial('BRL')
    setMoedaFinal('USD')
    setFormValidade(false)
    setExibirModal(false)
  }

  // função que exibe o erro em um Alert e desabilita icone spinner.
  function exibirErro() {
    setMensagemErro(true)
    setSpinner(false)
  }
  // Estados 
  const [formValidado, setFormValidade] = useState(false)
  const [exibirModal, setExibirModal] = useState(false)
  const [resultadoConversao, setResultadoConversao] = useState('')
  const [mensagemErro, setMensagemErro] = useState(false)


  return (

    <div>
      <h1 className='p-3 mb-2 bg-success text-white' style={{ fontSize: '50px', textAlign: 'center', height: '15vh', padding: '5px', textDecoration: 'Underline' }}>Conversor de Moedas</h1>



      <Alert variant='danger' show={mensagemErro}>
        Erro obtendo dados de conversão, tente novamente.
      </Alert>
      <Container style={{
        background: '#2222',
        padding: '8vh 8vh',
        height: '100%',
        width: '95vw',
        border: '1px solid',
        borderRadius: '8px',
        boxShadow:'1px 1px 7px black',
        marginTop:'100px'
      }} >
        <Form onSubmit={converter} noValidate validated={formValidado}>
          <Row >
            <Col sm='3'>
              <Form.Control placeholder='0' value={valor} onChange={changeValue} required />
            </Col>

            <Col sm='3'>
              <Form.Control as='select' value={moedaInicial} onChange={selecionarMoeda}>
                <ListarMoedas />
              </Form.Control>
            </Col>

            <Col sm='1' className='text-center' style={{ paddingTop: '6px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm='3'>
              <Form.Control as='select' value={moedaFinal} onChange={selecionarMoedaFinal}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm='2'>
              <Button variant='success' type='submit'>
                <span className={spinner ? null : 'hidden'}  >
                  <Spinner animation='border' size='sm' />
                </span>
                <span className={spinner ? 'hidden' : null}>
                  Converter
                </span>
              </Button>
            </Col>
          </Row>
        </Form>


        <Modal show={exibirModal} onHide={fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {resultadoConversao}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={fecharModal}>
              Nova Conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      
      <div className='p-3 mb-2 bg-success text-white'
       style={{position:'fixed',bottom:'0px',height:'12vh',width:'100%',textAlign:'center'}}>
       Criado por David Alves Costa 
        <a href='https://github.com/DavidAlves28' target={'_blank'}>  <img src={github} className='github' /></a>
        <a href='https://www.linkedin.com/in/david-alves-costa-7a2b90145/' target={'_blank'}>  <img src={linkedin} className='github' /></a>

        
        </div>
    </div>
  );
}

export default App;
