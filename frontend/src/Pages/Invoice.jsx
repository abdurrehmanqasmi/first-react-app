import { useState, useContext} from 'react'
import './Invoice.css'
import { ShopContext } from '../Context/ShopContext'
const Invoice = () => {
  const {getTotalCartAmount} = useContext(ShopContext)
  const [showInvoice, setShowInvoice] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("") 




  const handlePrint = () =>{
    window.print()
  }

  return (
    <>
    <main className='p-10 m-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow'>
     {showInvoice ? <div><header className='flex flex-col items-center justify-center mb-6'>
        <div>
        <h1 className='font-bold uppercase text-4xl mb-3'>Invoice</h1>
        </div>
        <div>
          <button onClick={handlePrint} className='mt-3 mb-6 bg-green-500 fond-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300'>Print</button>
        </div>
      </header>

      <section className='flex flex-col items-end justify-end'>
        {/* <input type="text" name='text' id='text' placeholder='Enter your name' /> */}
        <h2 className='font-bold uppercase text-2xl'>{name}</h2>
        <p className='text-xl font-bold'>{address}</p>
      </section>


      <div className="cartitem-down">
        <div className="cartitem-total">      
                <div className="cartitem-total-item">
                    <p className='font-bold'>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitem-total-item">
                    <p className='font-bold'>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitem-total-item">
                    <h3 className='font-bold'>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
        </div>
    </div>

      <footer >
        <ul className='flex flex-wrap items-center justify-center mt-20'>
          <li> <span className="font-bold">Your name :</span>{name}</li>
          <li><span className="font-bold">Your Email :</span>{email}</li>
          <li><span className="font-bold">Phone Number :</span>{phone}</li>
          <li><span className="font-bold">Your Address :</span>{address}</li>
        </ul>
      </footer> 
      <button onClick={()=>setShowInvoice(false)}className='mt-3 mb-6 bg-blue-500 fond-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Edit Information</button>
      </div> : (
       <>
       <div className='flex flex-col justify-center'>
       <article className='md:grid grid-cols-2 gap-10'>
                <div className='flex flex-col'>
                  <label htmlFor='name'>Enter your name</label>
                  <input type='text'
                    name='text'
                    id='name'
                    placeholder='Enter your name '
                    autoComplete='off'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='address'>Enter your full address</label>
                  <input type='text'
                    name='text'
                    id='address'
                    placeholder='Enter your address '
                    autoComplete='off'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </article>


              <article className="grid grid-cols-2 gap-10 mt-10">
                <div className='flex flex-col'>
                  <label htmlFor='Enter your email'>Enter your email</label>
                  <input type='text'
                    name='text'
                    id='Enter your email'
                    placeholder='Enter your email'
                    autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='Enter your phone'>Enter your phone</label>
                  <input type='text'
                    name='text'
                    id='Enter your phone'
                    placeholder='Enter your phone '
                    autoComplete='off'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>


              </article>
<button onClick={() => { setShowInvoice(true) }}  className='mt-3 mb-6 bg-blue-500 fond-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Preview Invoice</button>
</div>
 </>
      )}
    </main>
    </>
  )




}

export default Invoice
