import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({ id, title, rating, price, description, category, image, hasPrime }) {
    const dispatch = useDispatch();
    const addItemToCart = () => {
        const product = { id, title, rating, price, description, category, image, hasPrime };
        dispatch(addToBasket(product));
    }
    const removeItemFromCart = () => {
        dispatch(removeFromBasket({id}));
    }

    return (
        <div className="grid grid-cols-5 bg-white mb-10">
            <Image 
                src={image}
                height={150}
                width={150}
                objectFit="contain"
            />
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                            <StarIcon className="h-5 text-yellow-500"/>
                        ))}
                </div>
                <p className="text-xs mt-2 mb-2 line-clamp-3">{description}</p>
                <Currency quantity={price * 72.64} currency="INR" symbol="₹"/>
                {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img loading="lazy" className="w-12" src="https://links.papareact.com/fdw" alt=""/>
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}
            </div>
            <div className="flex flex-col space-y-2 my-auto justify-self-end mx-5">
                <button onClick={addItemToCart} className="button">Add to Cart</button>
                <button onClick={removeItemFromCart} className="button">Remove Item</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
