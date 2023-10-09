import useProxyState from 'react-useproxystate' 
import {InputGroup, Card, ListGroup,Button, Row, Container, Col, Modal, Form, FormControl, Nav, Navbar, NavbarBrand, NavbarToggle, NavLink, Badge, Alert } from 'react-bootstrap'
import {CartFill, CartCheckFill, CartPlusFill, Scooter} from 'react-bootstrap-icons'
import './App.css'
import Jumbotron from './static/Jumbotron'

function App() {
  
  const user = useProxyState({name: '', email: '', quantity: 1})
  const bike = useProxyState({title: 'Bike', price: 439.50, quantity: 1, img: 'https://i5.walmartimages.com/seo/John-Deere-12-In-Boys-Bicycle-Kids-Bike-with-Training-Wheels-and-Front-Hand-Brake-Green_6b3f0bdc-a7ce-49d0-82e6-8f656ca9e61d_1.17fa4ce68b8e75ac10bf6b3dbc16fcd6.jpeg?odnHeight=256&odnWidth=256&odnBg=FFFFFF'})
  const slinky = useProxyState({title: 'Slinky', price: 9.99, quantity: 1, img: 'https://i5.walmartimages.com/seo/Slinky-the-Original-Walking-Spring-Toy-Plastic-Rainbow-Giant-Slinky-Kids-Toys-for-Ages-5-Up-Easter-Basket-Stuffers-and-Small-Gifts_8cbf6517-70e7-4bf9-a549-681af36b3ad4.ea77aaa7c127bdb3154bd2ad08738a8d.jpeg?odnHeight=256&odnWidth=256&odnBg=FFFFFF'})
  const scooter = useProxyState({title: 'Scoorer', price: 99.99, quantity: 1, img: 'https://i5.walmartimages.com/seo/HALO-Rise-Above-Supreme-Big-Wheel-8-Scooters-Designed-for-Adults-and-Children-Unisex-Commuting-Made-Easy_1c742c0e-b03a-4991-874a-e6ee94b35b7b_1.2378b5ead0fa053e151a38a5a1887d3d.jpeg?odnHeight=256&odnWidth=256&odnBg=FFFFFF'})
  const inventory = useProxyState([bike, slinky, scooter])
  const cart = useProxyState([])
  const cartModal = useProxyState({show: false})
  const checkout = useProxyState({active: false})
  const display = useProxyState({jumbotronShowMore: false})
  
  const cartTotal = (taxRate, sum) => {
    let t = 0;
    cart.forEach(i => t+=(i.price * i.quantity));
    if ( taxRate && sum ) {
      t = t + (taxRate * t);
    } else if ( taxRate ) {
      t *= taxRate;
    }
    return <Price value={t} />;
  }
  
  const addToCart = (item, btn) => {
    btn.setAttribute('disabled', 'disabled')
    //! Array proxy state push method!
    cart.push({...item})
    setTimeout(()=>{
      cartModal.show = true;
      btn.removeAttribute('disabled')
    }, 500)
  }

  const checkoutNow = () => {
    const ccNumber = prompt("Credit Card Number", "");
    if (ccNumber != null) {
      const ccExp = prompt("Credit Card Expiration", "");
      if ( ccExp != null ) {
        const ccCode = prompt("Credit Card Code", "");
        if ( ccCode != null ) {
          if (window.confirm(`Please confirm: ${ccNumber} ${ccExp} ${ccCode}`)) {
            alert("Thanks for your order!");
            cart.length = 0;
            cartModal.show = false;
            checkout.active = false;
          }
        }
      }
    }
  }

  const register = e => {
    e.preventDefault()
    e.stopPropagation()
    user.id = btoa(user.email)
  }

  const Price = ({value}) => {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    let formatted = USDollar.format(value);
    console.log( formatted.split(/[\$|\.]{1,}/g) )
    const [dollars, cents] = formatted.split('.');
    return <span className=''>{dollars}<sup>.{cents}</sup></span>
  }

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg">
        <Container>
          <NavbarBrand href="#home"><Scooter /> Toy Store</NavbarBrand>
          <NavbarToggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink href="#" onClick={e=>cartModal.show=true}>{!cart.length ? <CartFill size={32} /> : <CartCheckFill size={32} />}</NavLink>
            </Nav>
            {!user.id ? 
              <Form className="d-flex" onSubmit={register} data-bs-theme="light" >
                <FormControl name='username' type="text" placeholder="Username" className="me-2" aria-label="Username" onChange={e=>user.name = e.target.value} required autoComplete='off' />
                <FormControl name='email' type="email" placeholder="Email" className="me-2" aria-label="Email" onChange={e=>user.email = e.target.value} required autoComplete='off' />
                <Button variant="info" type='submit'>Register</Button>
              </Form>
            :
              <Navbar.Text>Signed in as: <a href={`/${user.name}`}>{user.name}</a></Navbar.Text>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Jumbotron display={display} />
      <Container className='py-4'>
        <Row className='inventory'>{inventory.map((item, index)=>{
          return <Col sm={6} lg={4} className='item' key={`inv-${index}`}>
            <Card style={{ backgroundColor: '#dde1ea' }} className='mb-4'>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text><Price value={item.price} /></Card.Text>
                <InputGroup>
                  <InputGroup.Text>Quantity</InputGroup.Text>
                  <Form.Control type="number" min={1} max={99} placeholder="Quantity" value={item.quantity} onChange={e=>item.quantity=Number(e.target.value)} className='text-center' name='quantity' autoComplete='off' />
                  <Button variant="outline-secondary" onClick={e=>addToCart(item, e.currentTarget)}><CartPlusFill size={32} /></Button>
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        })}</Row>
      </Container>
      <Modal show={cartModal.show} onHide={()=>cartModal.show=false} className={checkout.active ? 'cart checkout' : 'cart'}>
        <Modal.Header closeButton>
          <Modal.Title>{!cart.length ? <CartFill size={32} /> : <CartCheckFill size={32} />} {checkout.active && 'Checkout'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {cart.length > 0 && cart.map((item, index)=>{
              return <ListGroup.Item key={`cart-${index}`} className='d-flex'>
                <div className='me-auto'> <Badge>&times;{item.quantity}</Badge> <strong>{item.title}</strong> <Price value={item.price} /></div>
                <Button variant='secondary' onClick={e=>cart.splice(index, 1)}>&times;</Button>
              </ListGroup.Item>
            })}
            {!cart.length && <ListGroup.Item><Alert variant='info' className='m-0'>Your cart is empty.</Alert></ListGroup.Item>}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          {cart.length > 0 && <div className='w-100'>
            {!checkout.active ? <>
              <p><strong>Total</strong>: {cartTotal()}</p>
              <p className='m-0'>
                <Button variant='primary' className='w-100' size='xl' onClick={e=>checkout.active=true}>Checkout</Button>
              </p>
            </>:<>
              <p><em>Subtotal</em>: {cartTotal()}</p>
              <p><em>Taxes</em>: {cartTotal(0.385)}</p>
              <p><strong>Grand Total</strong>: {cartTotal(0.385, true)}</p>
              <p className=''>
                <Button variant='primary' className='w-100' size='xl' onClick={checkoutNow}>Complete Order</Button>
              </p>
              <p className='m-0'>
                <Button variant='secondary' className='w-100' size='xl' onClick={e=>checkout.active=false}>&times; Cancel</Button>
              </p>
            </>}
          </div>}
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default App
