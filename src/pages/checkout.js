const { default: Header } = require("../components/Header");
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectItemsTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

function Checkout() {
    const cartItems = useSelector(selectItems);
    const cartTotal = useSelector(selectItemsTotal);
    const [session] = useSession();
    return (
        <div className="bg-gray-100">
            <Header/>
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm bg-white">
                    <Image 
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain" 
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white"> 
                        <h1 className="text-3xl border-b pb-4">{cartItems.length === 0 ? "Your shopping cart is empty" : "Shopping Cart"}</h1>
                    </div>
                    {cartItems.map((cartItem, i) => (
                        <CheckoutProduct 
                            key={i}
                            id={cartItem.id}
                            title={cartItem.title}
                            rating={cartItem.rating}
                            price={cartItem.price}
                            description={cartItem.description}
                            category={cartItem.category}
                            image={cartItem.image}
                            hasPrime={cartItem.hasPrime}
                        />
                    ))}
                </div>
                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md mr-5">
                    {cartItems.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap" >Subtotal ({cartItems.length} items): 
                            <span className="font-bold">
                                <Currency quantity={cartTotal * 72.64} Currency="INR" symbol="₹"/>
                            </span>
                            </h2>
                            <button disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed'}`}>
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
